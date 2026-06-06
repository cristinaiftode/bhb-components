import React from 'react';
import cx from 'classnames';
import './InputWithIcon.css';

export interface InputWithIconProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  prompt?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const InputWithIcon: React.FunctionComponent<InputWithIconProps> = ({
  label,
  helperText,
  error,
  prompt = false,
  iconLeft,
  iconRight,
  className,
  id,
  disabled,
  readOnly,
  ...rest
}) => {
  const reactId = React.useId();
  const inputId = id ?? reactId;
  const helperId = `${inputId}-helper`;
  const hasError = Boolean(error);
  const helper = error ?? helperText;

  const wrapperClass = cx(
    'bhb-input-icon',
    {
      'bhb-input-icon--error': hasError,
      'bhb-input-icon--disabled': disabled,
      'bhb-input-icon--readonly': readOnly,
      'bhb-input-icon--prompt': prompt,
      'bhb-input-icon--has-left': Boolean(iconLeft),
      'bhb-input-icon--has-right': Boolean(iconRight),
    },
    className,
  );

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={inputId} className="bhb-input-icon__label">
          {label}
        </label>
      )}
      <div className="bhb-input-icon__field">
        {iconLeft && (
          <span className="bhb-input-icon__icon bhb-input-icon__icon--left" aria-hidden="true">
            {iconLeft}
          </span>
        )}
        <input
          {...rest}
          id={inputId}
          type={rest.type ?? 'text'}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={hasError || undefined}
          aria-describedby={helper ? helperId : undefined}
          className="bhb-input-icon__control"
        />
        {iconRight && (
          <span className="bhb-input-icon__icon bhb-input-icon__icon--right" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </div>
      {helper && (
        <span id={helperId} className="bhb-input-icon__helper">
          {helper}
        </span>
      )}
    </div>
  );
};
