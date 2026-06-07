import React from 'react';
import cx from 'classnames';
import './MultiSelection.css';

export interface MultiSelectionAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  /** Highlights the action with a success-green background. Use for the
   *  primary/confirming action of the batch (e.g. "Bestätigen"). */
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface MultiSelectionProps {
  /** Number of selected items, shown in the badge. */
  count: number;
  /** Phrase next to the count, e.g. "ausgewählte Belege". */
  itemLabel?: string;
  /** Batch actions, rendered as a horizontal row to the right of the count. */
  actions: MultiSelectionAction[];
  className?: string;
}

/**
 * Batch-action toolbar shown when one or more items are selected (Figma 19:299).
 * Left segment: count badge + descriptive label. Right segments: action buttons
 * with icon + label, separated by thin dividers. Mark one action as `active` to
 * highlight it in success green (matches Figma's leftmost "Bestätigen").
 */
export const MultiSelection: React.FunctionComponent<MultiSelectionProps> = ({
  count,
  itemLabel,
  actions,
  className,
}) => {
  return (
    <div className={cx('bhb-multi-selection', className)} role="toolbar" aria-label={itemLabel}>
      <div className="bhb-multi-selection__count">
        <span className="bhb-multi-selection__count-badge" aria-hidden="true">
          {count}
        </span>
        {itemLabel && (
          <span className="bhb-multi-selection__count-label">{itemLabel}</span>
        )}
      </div>

      <div className="bhb-multi-selection__actions">
        {actions.map(action => (
          <button
            key={action.id}
            type="button"
            className={cx('bhb-multi-selection__action', {
              'bhb-multi-selection__action--active': action.active,
            })}
            onClick={action.onClick}
            disabled={action.disabled}
          >
            {action.icon && (
              <span className="bhb-multi-selection__action-icon" aria-hidden="true">
                {action.icon}
              </span>
            )}
            <span className="bhb-multi-selection__action-label">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
