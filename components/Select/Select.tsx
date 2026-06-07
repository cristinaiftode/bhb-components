import React from 'react';
import cx from 'classnames';
import { CaretDownIcon } from '../icons/icons';
import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  prompt?: boolean;
  options?: SelectOption[];
  placeholder?: string;
}

export const Select: React.FunctionComponent<SelectProps> = ({
  label,
  helperText,
  error,
  prompt = false,
  options,
  placeholder,
  className,
  id,
  disabled,
  children,
  value,
  defaultValue,
  ...rest
}) => {
  const reactId = React.useId();
  const inputId = id ?? reactId;
  const helperId = `${inputId}-helper`;
  const hasError = Boolean(error);
  const helper = error ?? helperText;

  const wrapperClass = cx(
    'bhb-select',
    {
      'bhb-select--error': hasError,
      'bhb-select--disabled': disabled,
      'bhb-select--prompt': prompt,
    },
    className,
  );

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={inputId} className="bhb-select__label">
          {label}
        </label>
      )}
      <div className="bhb-select__field">
        <select
          {...rest}
          id={inputId}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue ?? (placeholder !== undefined ? '' : undefined)}
          aria-invalid={hasError || undefined}
          aria-describedby={helper ? helperId : undefined}
          className="bhb-select__control"
        >
          {placeholder !== undefined && (
            <option value="" disabled>{placeholder}</option>
          )}
          {options
            ? options.map(o => (
                <option key={o.value} value={o.value} disabled={o.disabled}>
                  {o.label}
                </option>
              ))
            : children}
        </select>
        <span className="bhb-select__chevron" aria-hidden="true">
          <CaretDownIcon size={12} />
        </span>
      </div>
      {helper && (
        <span id={helperId} className="bhb-select__helper">
          {helper}
        </span>
      )}
    </div>
  );
};
