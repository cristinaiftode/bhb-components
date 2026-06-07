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
  /** Horizontal alignment of the menu relative to the trigger. */
  align?: 'center' | 'end';
  /** Menu width in pixels. */
  width?: number;
  /** Optional callback fired after any item is clicked (after the item's own onClick). */
  onItemClick?: (item: SettingsMenuItem) => void;
  className?: string;
}

export const SettingsMenu: React.FunctionComponent<SettingsMenuProps> = ({
  sections,
  children,
  align = 'center',
  width = 260,
  onItemClick,
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const [anchor, setAnchor] = React.useState<DOMRect | null>(null);
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

  // Position: menu sits ~8px below the trigger (room for the caret), aligned
  // by the `align` prop. Always clamped to the viewport.
  let style: React.CSSProperties | null = null;
  let caretLeft = '50%';
  if (open && anchor) {
    const gap = 12; // distance from trigger bottom to top edge of menu (caret occupies ~8px)
    const triggerCenter = anchor.left + anchor.width / 2;
    let left = align === 'end' ? anchor.right - width : triggerCenter - width / 2;
    const maxLeft = window.innerWidth - width - 8;
    left = Math.max(8, Math.min(left, maxLeft));
    const top = anchor.bottom + gap;
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
              ref={menuRef}
              role="menu"
              className={cx('bhb-settings-menu', className)}
              style={style}
            >
              <div
                className="bhb-settings-menu__caret"
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
