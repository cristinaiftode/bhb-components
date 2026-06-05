import React from 'react';
import cx from 'classnames';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'large' | 'medium' | 'small';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconOnly?: boolean;
  loading?: boolean;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  variant = 'primary',
  size = 'large',
  iconLeft,
  iconRight,
  iconOnly = false,
  loading = false,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}) => {
  const classes = cx(
    'bhb-button',
    `bhb-button--${variant}`,
    `bhb-button--size-${size}`,
    {
      'bhb-button--icon-only': iconOnly,
      'bhb-button--loading': loading,
    },
    className,
  );

  return (
    <button
      {...rest}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading ? (
        <span className="bhb-button__spinner" aria-hidden="true" />
      ) : (
        <>
          {iconLeft && <span className="bhb-button__icon bhb-button__icon--left">{iconLeft}</span>}
          {!iconOnly && children && <span className="bhb-button__label">{children}</span>}
          {iconOnly && children && <span className="bhb-button__icon">{children}</span>}
          {iconRight && <span className="bhb-button__icon bhb-button__icon--right">{iconRight}</span>}
        </>
      )}
    </button>
  );
};
