import React from 'react';
import cx from 'classnames';
import {
  CheckIcon,
  ExclamationTriangleIcon,
  InfoCircleIcon,
  TimesIcon,
} from '../icons/icons';
import './Message.css';

export type MessageType =
  | 'success'
  | 'info'
  | 'warning'
  | 'warning-light'
  | 'error'
  | 'brand'
  | 'inactive';

/**
 * - `content` — minimal: small icon + colored text on transparent background.
 *   Use inside another container (e.g. above a form field) to flag a state without
 *   stealing visual weight.
 * - `stack` — full-width banner with icon, message, and a × close button.
 *   Use at the top of a page or modal to surface an event.
 * - `inline` — full-width banner without icon or close button. Use as a static
 *   informational strip embedded in content.
 */
export type MessagePosition = 'content' | 'stack' | 'inline';

export interface MessageProps {
  type?: MessageType;
  position?: MessagePosition;
  /** When provided AND `position="stack"`, renders a × close button on the right. */
  onClose?: () => void;
  /** Override the default icon for this type. Pass `null` to suppress the icon. */
  icon?: React.ReactNode | null;
  closeLabel?: string;
  className?: string;
  children: React.ReactNode;
}

const defaultIconByType: Record<MessageType, React.ReactNode> = {
  success: <CheckIcon />,
  info: <InfoCircleIcon />,
  warning: <InfoCircleIcon />,
  'warning-light': <InfoCircleIcon />,
  error: <ExclamationTriangleIcon />,
  brand: <InfoCircleIcon />,
  inactive: <InfoCircleIcon />,
};

export const Message: React.FunctionComponent<MessageProps> = ({
  type = 'info',
  position = 'stack',
  onClose,
  icon,
  closeLabel = 'Schließen',
  className,
  children,
}) => {
  const showIcon = position !== 'inline' && icon !== null;
  const resolvedIcon = icon !== undefined ? icon : defaultIconByType[type];
  const showClose = position === 'stack' && Boolean(onClose);

  return (
    <div
      role={type === 'error' || type === 'warning' ? 'alert' : 'status'}
      className={cx(
        'bhb-message',
        `bhb-message--${position}`,
        `bhb-message--${type}`,
        className,
      )}
    >
      {showIcon && (
        <span className="bhb-message__icon" aria-hidden="true">
          {resolvedIcon}
        </span>
      )}
      <span className="bhb-message__content">{children}</span>
      {showClose && (
        <button
          type="button"
          className="bhb-message__close"
          onClick={onClose}
          aria-label={closeLabel}
        >
          <TimesIcon size={10} />
        </button>
      )}
    </div>
  );
};
