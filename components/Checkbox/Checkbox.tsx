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
        <span className="bhb-checkbox__fill">
          <svg className="bhb-checkbox__check" viewBox="0 0 9 7" width="9" height="7">
            <path
              d="M0.5 3.5 L3.25 6 L8.5 0.75"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </span>
      </span>
      {label !== undefined && <span className="bhb-checkbox__label">{label}</span>}
    </label>
  );
};
