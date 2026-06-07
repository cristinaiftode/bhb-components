import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import './Modal.css';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Footer slot — typically composed of Button(s). */
  footer?: React.ReactNode;
  /** Width in px or any CSS value. Default 608 (Figma). */
  width?: number | string;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  /** aria-label for the dialog when no visible title is set. */
  ariaLabel?: string;
}

/**
 * Compact dialog (Figma 151:301). 608×auto by default, 8px radius, white bg,
 * 16px gap stack: title → body → footer. Rendered via portal into body, with
 * a semi-transparent backdrop. Closes on backdrop click, Escape, or via the
 * controlled `open` prop.
 */
export const Modal: React.FunctionComponent<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  width = 608,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className,
  ariaLabel,
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
      className="bhb-modal-backdrop"
      onClick={closeOnBackdropClick ? onClose : undefined}
      role="presentation"
    >
      <div
        className={cx('bhb-modal', className)}
        role="dialog"
        aria-modal="true"
        aria-label={!title ? ariaLabel : undefined}
        style={{ width }}
        onClick={e => e.stopPropagation()}
      >
        {title && <div className="bhb-modal__title">{title}</div>}
        {children !== undefined && <div className="bhb-modal__body">{children}</div>}
        {footer && <div className="bhb-modal__footer">{footer}</div>}
      </div>
    </div>
  );

  return ReactDOM.createPortal(node, document.body);
};
