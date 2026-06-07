import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import './SettingsMenu.css';
import { CheckIcon } from '../icons/icons';

/**
 * SettingsMenu — sectioned popover menu anchored under a trigger (Figma 357:477).
 *
 * Used for account/company switching and global settings access. A small caret
 * on top points at the trigger. Each section has an optional caps header + a
 * list of items. Items are either icon + label, or check-marked (selected)
 * entries used for the active company/tenant.
 *
 * Wrap any trigger in <SettingsMenu sections={…}>{trigger}</SettingsMenu> and
 * clicking the trigger opens the menu. Closes on Escape, outside click, or
 * item selection.
 */

export interface SettingsMenuItem {
  /** Stable id for keying + onItemClick. */
  id: string;
  /** Label text/element. */
  label: React.ReactNode;
  /** Optional 20×20 leading icon. Ignored when `selected` is true (a check is shown instead). */
  icon?: React.ReactNode;
  /**
   * Mark as currently active. When true, a green check icon is rendered at the
   * left and the label is rendered in steel-grey (signalling "you're here").
   * Used for the active company in the switcher section.
   */
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface SettingsMenuSection {
  /** Caps section header. Omit for an untitled section. */
  title?: string;
  items: SettingsMenuItem[];
}

export interface SettingsMenuProps {
  sections: SettingsMenuSection[];
  /**
   * Trigger element. Clicking it toggles the menu open. The menu is
   * positioned below the trigger with the caret pointing at it.
   */
  children: React.ReactElement;
  /**
   * Horizontal alignment of the menu relative to the trigger.
   * - `center` (default) — menu centered under the trigger
   * - `start`  — menu's LEFT edge aligned with trigger's LEFT edge (use for left-side triggers like a sidebar user-row)
   * - `end`    — menu's RIGHT edge aligned with trigger's RIGHT edge (use for top-right user avatars)
   */
  align?: 'center' | 'start' | 'end';
  /** Menu width in pixels. */
  width?: number;
  /**
   * Vertical placement of the menu relative to the trigger.
   * - `bottom` (default) — menu opens below the trigger, caret on top
   * - `top`    — menu opens above the trigger, caret on bottom (use for
   *              triggers near the bottom of the viewport, e.g. overflow
   *              buttons on a sticky bottom toolbar)
   */
  placement?: 'bottom' | 'top';
  /** Optional callback fired after any item is clicked (after the item's own onClick). */
  onItemClick?: (item: SettingsMenuItem) => void;
  className?: string;
}

export const SettingsMenu: React.FunctionComponent<SettingsMenuProps> = ({
  sections,
  children,
  align = 'center',
  width = 260,
  placement = 'bottom',
  onItemClick,
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const [anchor, setAnchor] = React.useState<DOMRect | null>(null);
  const [menuHeight, setMenuHeight] = React.useState(0);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  const close = React.useCallback(() => setOpen(false), []);

  const toggle = React.useCallback(() => {
    if (triggerRef.current) {
      setAnchor(triggerRef.current.getBoundingClientRect());
    }
    setOpen((v) => !v);
  }, []);

  // Reposition on window resize/scroll while open
  React.useEffect(() => {
    if (!open) return;
    const update = () => {
      if (triggerRef.current) {
        setAnchor(triggerRef.current.getBoundingClientRect());
      }
    };
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open]);

  // Outside-click + Escape dismissal
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (menuRef.current?.contains(t)) return;
      if (triggerRef.current?.contains(t)) return;
      close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDocClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDocClick);
    };
  }, [open, close]);

  // Wrap the user-provided trigger so we can attach a ref + onClick
  const trigger = React.cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      triggerRef.current = node;
      // Preserve any existing ref on the user's element
      const existingRef = (children as { ref?: React.Ref<HTMLElement> }).ref;
      if (typeof existingRef === 'function') {
        existingRef(node);
      } else if (existingRef && typeof existingRef === 'object') {
        (existingRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    onClick: (e: React.MouseEvent) => {
      const existingOnClick = (children.props as { onClick?: (e: React.MouseEvent) => void }).onClick;
      existingOnClick?.(e);
      if (!e.defaultPrevented) toggle();
    },
  } as React.HTMLAttributes<HTMLElement> & { ref: React.Ref<HTMLElement> });

  const handleItem = (item: SettingsMenuItem) => {
    if (item.disabled) return;
    item.onClick?.();
    onItemClick?.(item);
    close();
  };

  // Measure menu height so 'top' placement can position above the trigger.
  // Falls back to 0 on the first render; the next paint will use the real value.
  const setMenuRef = React.useCallback((node: HTMLDivElement | null) => {
    menuRef.current = node;
    if (node) setMenuHeight(node.offsetHeight);
  }, []);

  // Position: menu sits ~12px from the trigger (with room for an 8px caret),
  // aligned by the `align` prop and placed above OR below per `placement`.
  // Always clamped to the viewport.
  let style: React.CSSProperties | null = null;
  let caretLeft = '50%';
  if (open && anchor) {
    const gap = 12;
    const triggerCenter = anchor.left + anchor.width / 2;
    let left: number;
    if (align === 'end') {
      left = anchor.right - width;
    } else if (align === 'start') {
      left = anchor.left;
    } else {
      left = triggerCenter - width / 2;
    }
    const maxLeft = window.innerWidth - width - 8;
    left = Math.max(8, Math.min(left, maxLeft));
    const top =
      placement === 'top'
        ? anchor.top - gap - menuHeight
        : anchor.bottom + gap;
    style = { top, left, width };
    // Position caret over the trigger center, regardless of menu clamping
    const caretX = Math.max(16, Math.min(width - 16, triggerCenter - left));
    caretLeft = `${caretX}px`;
  }

  return (
    <>
      {trigger}
      {open && style
        ? ReactDOM.createPortal(
            <div
              ref={setMenuRef}
              role="menu"
              className={cx(
                'bhb-settings-menu',
                `bhb-settings-menu--${placement}`,
                className,
              )}
              style={style}
            >
              <div
                className={cx(
                  'bhb-settings-menu__caret',
                  `bhb-settings-menu__caret--${placement}`,
                )}
                style={{ left: caretLeft }}
                aria-hidden="true"
              />
              {sections.map((section, sIdx) => (
                <div
                  key={section.title ?? `section-${sIdx}`}
                  className="bhb-settings-menu__section"
                >
                  {section.title ? (
                    <div className="bhb-settings-menu__section-title">{section.title}</div>
                  ) : null}
                  <div className="bhb-settings-menu__items">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        role="menuitem"
                        className={cx('bhb-settings-menu__item', {
                          'bhb-settings-menu__item--selected': item.selected,
                          'bhb-settings-menu__item--disabled': item.disabled,
                          'bhb-settings-menu__item--no-icon': !item.icon && !item.selected,
                        })}
                        disabled={item.disabled}
                        onClick={() => handleItem(item)}
                      >
                        {item.selected ? (
                          <span className="bhb-settings-menu__item-icon bhb-settings-menu__item-icon--check">
                            <CheckIcon size={20} aria-hidden="true" />
                          </span>
                        ) : item.icon ? (
                          <span className="bhb-settings-menu__item-icon">{item.icon}</span>
                        ) : null}
                        <span className="bhb-settings-menu__item-label">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>,
            document.body,
          )
        : null}
    </>
  );
};
