import React from 'react';
import cx from 'classnames';
import './Textarea.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  prompt?: boolean;
}

export const Textarea: React.FunctionComponent<TextareaProps> = ({
  label,
  helperText,
  error,
  prompt = false,
  className,
  id,
  disabled,
  readOnly,
  rows = 3,
  ...rest
}) => {
  const reactId = React.useId();
  const inputId = id ?? reactId;
  const helperId = `${inputId}-helper`;
  const hasError = Boolean(error);
  const helper = error ?? helperText;

  const wrapperClass = cx(
    'bhb-textarea',
    {
      'bhb-textarea--error': hasError,
      'bhb-textarea--disabled': disabled,
      'bhb-textarea--readonly': readOnly,
      'bhb-textarea--prompt': prompt,
    },
    className,
  );

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={inputId} className="bhb-textarea__label">
          {label}
        </label>
      )}
      <textarea
        {...rest}
        id={inputId}
        rows={rows}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={hasError || undefined}
        aria-describedby={helper ? helperId : undefined}
        className="bhb-textarea__control"
      />
      {helper && (
        <span id={helperId} className="bhb-textarea__helper">
          {helper}
        </span>
      )}
    </div>
  );
};
