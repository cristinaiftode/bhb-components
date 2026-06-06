import React from 'react';
import cx from 'classnames';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  prompt?: boolean;
}

export const Input: React.FunctionComponent<InputProps> = ({
  label,
  helperText,
  error,
  prompt = false,
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
    'bhb-input',
    {
      'bhb-input--error': hasError,
      'bhb-input--disabled': disabled,
      'bhb-input--readonly': readOnly,
      'bhb-input--prompt': prompt,
    },
    className,
  );

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={inputId} className="bhb-input__label">
          {label}
        </label>
      )}
      <input
        {...rest}
        id={inputId}
        type={rest.type ?? 'text'}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={hasError || undefined}
        aria-describedby={helper ? helperId : undefined}
        className="bhb-input__control"
      />
      {helper && (
        <span id={helperId} className="bhb-input__helper">
          {helper}
        </span>
      )}
    </div>
  );
};
