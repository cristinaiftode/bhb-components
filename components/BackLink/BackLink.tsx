import React from 'react';
import cx from 'classnames';
import { ArrowLeftIcon } from '../icons/icons';
import './BackLink.css';

export interface BackLinkProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Children override the default "Zurück" label. */
  children?: React.ReactNode;
  /** Renders as an <a> with this href instead of a <button>. */
  href?: string;
}

/**
 * Small "← Zurück" navigation link. Used inside Popup footers when a back
 * affordance is needed (Figma 27:1433, 297:438), but also reusable anywhere
 * a subtle back link makes sense.
 */
export const BackLink: React.FunctionComponent<BackLinkProps> = ({
  children = 'Zurück',
  href,
  className,
  ...rest
}) => {
  const content = (
    <>
      <ArrowLeftIcon size={12} className="bhb-backlink__icon" />
      <span className="bhb-backlink__label">{children}</span>
    </>
  );

  if (href) {
    const { type: _t, ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={cx('bhb-backlink', className)} {...anchorRest}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={cx('bhb-backlink', className)} {...rest}>
      {content}
    </button>
  );
};
