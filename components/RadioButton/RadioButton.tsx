import React from 'react';
import cx from 'classnames';
import './RadioButton.css';

export interface RadioButtonProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode;
}

export const RadioButton: React.FunctionComponent<RadioButtonProps> = ({
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
    'bhb-radio',
    {
      'bhb-radio--disabled': disabled,
      'bhb-radio--readonly': readOnly,
    },
    className,
  );

  return (
    <label htmlFor={inputId} className={wrapperClass}>
      <input
        {...rest}
        id={inputId}
        type="radio"
        disabled={disabled}
        readOnly={readOnly}
        checked={checked}
        defaultChecked={defaultChecked}
        className="bhb-radio__input"
      />
      <span className="bhb-radio__circle" aria-hidden="true">
        <span className="bhb-radio__dot" />
      </span>
      {label !== undefined && <span className="bhb-radio__label">{label}</span>}
    </label>
  );
};
