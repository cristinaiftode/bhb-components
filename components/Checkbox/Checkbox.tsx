import React from 'react';
import cx from 'classnames';
import './Checkbox.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
}

export const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  label,
  className,
  id,
  disabled,
  readOnly,
  checked,
  defaultChecked,
  ...rest
}) => {
  const reactId = React.useId();
  const inputId = id ?? reactId;

  const wrapperClass = cx(
    'bhb-checkbox',
    {
      'bhb-checkbox--disabled': disabled,
      'bhb-checkbox--readonly': readOnly,
    },
    className,
  );

  return (
    <label htmlFor={inputId} className={wrapperClass}>
      <input
        {...rest}
        id={inputId}
        type="checkbox"
        disabled={disabled}
        readOnly={readOnly}
        checked={checked}
        defaultChecked={defaultChecked}
        className="bhb-checkbox__input"
      />
      <span className="bhb-checkbox__box" aria-hidden="true">
        <svg className="bhb-checkbox__check" viewBox="0 0 16 16" width="12" height="12">
          <path
            d="M3 8.5 L6.5 12 L13 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
      </span>
      {label !== undefined && <span className="bhb-checkbox__label">{label}</span>}
    </label>
  );
};
