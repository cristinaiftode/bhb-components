import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { TimesIcon } from '../icons/icons';
import './Popup.css';

export interface PopupProps {
  open: boolean;
  onClose: () => void;
  /** Title shown in the header bar. Bold, large. */
  title?: React.ReactNode;
  /** Body content — anything you want between header and footer. */
  children?: React.ReactNode;
  /** Right-aligned footer slot. Compose with Buttons. */
  footer?: React.ReactNode;
  /**
   * Left-aligned footer slot, typically a BackLink or a row of tool icons.
   * When provided, the footer uses justify-content: space-between.
   */
  footerLeft?: React.ReactNode;
  /** Width in px or any CSS value. Default 1000 (Figma). */
  width?: number | string;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  closeLabel?: string;
}

/**
 * Large overlay surface (Figma 23:1248) with a three-zone layout:
 * - Header bar: mist background, bold title on the left, × close button on the right
 * - Body:       white background, user content
 * - Footer bar: white background, action buttons right-aligned (or split with footerLeft)
 *
 * Rendered via portal. Backdrop click + Escape close. Use Popup when the workflow
 * needs more vertical real estate than a Modal can comfortably hold.
 */
export const Popup: React.FunctionComponent<PopupProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  footerLeft,
  width = 1000,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className,
  closeLabel = 'Schließen',
}) => {
  React.useEffect(() => {
    if (!open || !closeOnEscape) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeOnEscape, onClose]);

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  const node = (
    <div
      className="bhb-popup-backdrop"
      onClick={closeOnBackdropClick ? onClose : undefined}
      role="presentation"
    >
      <div
        className={cx('bhb-popup', className)}
        role="dialog"
        aria-modal="true"
        style={{ width }}
        onClick={e => e.stopPropagation()}
      >
        {(title || true) && (
          <header className="bhb-popup__header">
            <div className="bhb-popup__title">{title}</div>
            <button
              type="button"
              className="bhb-popup__close"
              onClick={onClose}
              aria-label={closeLabel}
            >
              <TimesIcon size={15} />
            </button>
          </header>
        )}

        {children !== undefined && (
          <div className="bhb-popup__body">{children}</div>
        )}

        {(footer || footerLeft) && (
          <footer
            className={cx('bhb-popup__footer', {
              'bhb-popup__footer--split': Boolean(footerLeft),
            })}
          >
            {footerLeft && <div className="bhb-popup__footer-left">{footerLeft}</div>}
            {footer && <div className="bhb-popup__footer-right">{footer}</div>}
          </footer>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(node, document.body);
};
