import React from 'react';
import cx from 'classnames';
import './Tooltip.css';

/**
 * Where the tooltip sits relative to its trigger.
 * - `top` — tooltip above the trigger, pointer at the bottom (Figma: Pointer=Bottom)
 * - `bottom` — tooltip below the trigger, pointer at the top (Figma: Pointer=Top)
 * - `left` — tooltip to the left of the trigger, pointer on the right (Figma: Pointer=Right)
 * - `right` — tooltip to the right of the trigger, pointer on the left (Figma: Pointer=Left)
 */
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Content shown inside the tooltip bubble (string, JSX, anything). */
  content: React.ReactNode;
  /** Where the tooltip appears relative to the trigger. Default `top`. */
  placement?: TooltipPlacement;
  /** Milliseconds before showing on hover. Default 100ms. */
  delay?: number;
  /** When true, the tooltip is suppressed (trigger still renders normally). */
  disabled?: boolean;
  className?: string;
  /** The trigger element. Hover, focus, or touch this to show the tooltip. */
  children: React.ReactNode;
}

export const Tooltip: React.FunctionComponent<TooltipProps> = ({
  content,
  placement = 'top',
  delay = 100,
  disabled = false,
  className,
  children,
}) => {
  const [visible, setVisible] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reactId = React.useId();
  const tooltipId = `bhb-tooltip-${reactId}`;

  const show = React.useCallback(() => {
    if (disabled) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (delay > 0) {
      timerRef.current = setTimeout(() => setVisible(true), delay);
    } else {
      setVisible(true);
    }
  }, [disabled, delay]);

  const hide = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Allow Escape to dismiss the tooltip
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && visible) {
      hide();
    }
  };

  return (
    <span
      className={cx('bhb-tooltip-wrapper', className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={handleKeyDown}
    >
      <span className="bhb-tooltip-wrapper__trigger" aria-describedby={visible ? tooltipId : undefined}>
        {children}
      </span>
      {!disabled && visible && (
        <span
          role="tooltip"
          id={tooltipId}
          className={cx('bhb-tooltip', `bhb-tooltip--${placement}`)}
        >
          <span className="bhb-tooltip__content">{content}</span>
          <span className="bhb-tooltip__pointer" aria-hidden="true" />
        </span>
      )}
    </span>
  );
};
