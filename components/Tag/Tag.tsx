import React from 'react';
import cx from 'classnames';
import './Tag.css';
import {
  PaperPlaneIcon,
  CheckIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from '../icons/icons';

/**
 * Tag — small inline status pill used to flag the state of a row, record,
 * or item (e.g. "Bezahlt", "Offen", "Überfällig").
 *
 * Compact (24px tall), rounded 2px, semantic colour per type:
 *
 *   - info     → mist bg + steel-grey text     (neutral/informational)
 *   - success  → success-light bg + success-shade text
 *   - warning  → warning-light bg + warning text
 *   - error    → alert-light bg + alert-shade text
 *
 * Each type ships with a default icon (paper-plane / check / exclamation-circle
 * / exclamation-triangle); pass `icon` to override or `icon={null}` to omit.
 *
 * Figma: node 274:416 ("Tag" — Type=Info/Success/Warning/Error).
 */

export type TagType = 'info' | 'success' | 'warning' | 'error';

export interface TagProps {
  /** Visual variant. Drives the bg colour, text colour, and default icon. */
  type?: TagType;
  /** Label content. */
  children: React.ReactNode;
  /**
   * Override the default leading icon. Pass `null` to hide it entirely.
   * Custom icons should render at 16×16 in `currentColor`.
   */
  icon?: React.ReactNode | null;
  /** Extra class on the root pill. */
  className?: string;
}

const DEFAULT_ICONS: Record<TagType, React.ReactNode> = {
  info: <PaperPlaneIcon size={16} aria-hidden="true" />,
  success: <CheckIcon size={16} aria-hidden="true" />,
  warning: <ExclamationCircleIcon size={16} aria-hidden="true" />,
  error: <ExclamationTriangleIcon size={16} aria-hidden="true" />,
};

export const Tag: React.FunctionComponent<TagProps> = ({
  type = 'info',
  children,
  icon,
  className,
}) => {
  const leadingIcon = icon === undefined ? DEFAULT_ICONS[type] : icon;

  return (
    <span className={cx('bhb-tag', `bhb-tag--${type}`, className)}>
      {leadingIcon !== null && leadingIcon !== false ? (
        <span className="bhb-tag__icon">{leadingIcon}</span>
      ) : null}
      <span className="bhb-tag__label">{children}</span>
    </span>
  );
};
