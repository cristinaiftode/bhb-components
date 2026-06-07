import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import './ContextMenu.css';

export interface ContextMenuItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export interface ContextMenuProps {
  /** Items rendered in the menu. */
  items: ContextMenuItem[];
  /** Trigger element. Right-clicking it (or clicking, when `triggerOnClick` is set) opens the menu at the cursor position. */
  children: React.ReactNode;
  /** When true, the menu also opens on regular left-click (useful for "⋮" menu buttons). */
  triggerOnClick?: boolean;
  /** Menu width in px. Default 280 (Figma). */
  width?: number;
  className?: string;
}

/**
 * Right-click context menu (Figma 184:492). Dark navy dropdown with icon + label
 * items, separated by thin dividers. Wrap any element with this component to make
 * it right-clickable; the menu opens at the cursor coordinates via portal.
 *
 * Closes on Escape, outside click, or any item selection.
 */
export const ContextMenu: React.FunctionComponent<ContextMenuProps> = ({
  items,
  children,
  triggerOnClick = false,
  width = 280,
  className,
}) => {
  const [position, setPosition] = React.useState<{ x: number; y: number } | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  const open = (x: number, y: number) => {
    // Clamp to viewport so the menu doesn't render offscreen
    const w = width;
    const h = items.length * 45;
    const maxX = window.innerWidth - w - 8;
    const maxY = window.innerHeight - h - 8;
    setPosition({ x: Math.min(x, Math.max(8, maxX)), y: Math.min(y, Math.max(8, maxY)) });
  };

  const close = React.useCallback(() => setPosition(null), []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    open(e.clientX, e.clientY);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!triggerOnClick) return;
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    open(rect.left, rect.bottom + 4);
  };

  React.useEffect(() => {
    if (!position) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const onDocClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener('keydown', onKey);
    // capture phase so we run before any in-menu click handlers
    document.addEventListener('mousedown', onDocClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDocClick);
    };
  }, [position, close]);

  const handleItemClick = (item: ContextMenuItem) => {
    if (item.disabled) return;
    item.onClick?.();
    close();
  };

  const menu =
    position && typeof document !== 'undefined'
      ? ReactDOM.createPortal(
          <div
            ref={menuRef}
            className={cx('bhb-context-menu', className)}
            role="menu"
            style={{ top: position.y, left: position.x, width }}
          >
            {items.map(item => (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                disabled={item.disabled}
                className="bhb-context-menu__item"
                onClick={() => handleItemClick(item)}
              >
                {item.icon && (
                  <span className="bhb-context-menu__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                <span className="bhb-context-menu__label">{item.label}</span>
              </button>
            ))}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <span
        className="bhb-context-menu-trigger"
        onContextMenu={handleContextMenu}
        onClick={handleClick}
      >
        {children}
      </span>
      {menu}
    </>
  );
};
