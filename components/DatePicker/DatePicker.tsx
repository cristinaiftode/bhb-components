import React from 'react';
import cx from 'classnames';
import { CalendarIcon } from '../icons/icons';
import './DatePicker.css';

export interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: string;
  helperText?: string;
  error?: string;
  prompt?: boolean;
}

export const DatePicker: React.FunctionComponent<DatePickerProps> = ({
  label,
  helperText,
  error,
  prompt = false,
  className,
  id,
  disabled,
  readOnly,
  placeholder = 'TT.MM.JJJJ',
  ...rest
}) => {
  const reactId = React.useId();
  const inputId = id ?? reactId;
  const helperId = `${inputId}-helper`;
  const hasError = Boolean(error);
  const helper = error ?? helperText;

  const wrapperClass = cx(
    'bhb-datepicker',
    {
      'bhb-datepicker--error': hasError,
      'bhb-datepicker--disabled': disabled,
      'bhb-datepicker--readonly': readOnly,
      'bhb-datepicker--prompt': prompt,
    },
    className,
  );

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={inputId} className="bhb-datepicker__label">
          {label}
        </label>
      )}
      <div className="bhb-datepicker__field">
        <input
          {...rest}
          id={inputId}
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={hasError || undefined}
          aria-describedby={helper ? helperId : undefined}
          className="bhb-datepicker__control"
        />
        <span className="bhb-datepicker__icon" aria-hidden="true">
          <CalendarIcon />
        </span>
      </div>
      {helper && (
        <span id={helperId} className="bhb-datepicker__helper">
          {helper}
        </span>
      )}
    </div>
  );
};
