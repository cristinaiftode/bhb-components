import React from 'react';
import cx from 'classnames';
import './MultiSelection.css';

/**
 * Visual intent for a batch action:
 * - `default` (steel-grey bg, white text) — most actions
 * - `primary` (success-shade green, white text) — the primary/confirming action
 * - `danger`  (snow bg, steel-grey text) — destructive actions like "Löschen"
 */
export type MultiSelectionTone = 'default' | 'primary' | 'danger';

export interface MultiSelectionAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  tone?: MultiSelectionTone;
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
 * Left segment: count badge + label on a `--mist` background.
 * Right segments: action buttons separated by 1px white gaps. Set `tone: 'primary'`
 * on the confirming action to highlight in `--success-shade`; `tone: 'danger'`
 * on destructive actions to render on a `--snow` background with steel-grey text.
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

      {actions.map(action => (
        <button
          key={action.id}
          type="button"
          className={cx(
            'bhb-multi-selection__action',
            `bhb-multi-selection__action--${action.tone ?? 'default'}`,
          )}
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
  );
};
