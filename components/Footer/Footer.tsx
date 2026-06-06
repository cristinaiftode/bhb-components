import React from 'react';
import cx from 'classnames';
import './Footer.css';

export interface FooterLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface FooterProps {
  links?: FooterLink[];
  copyright?: string;
  className?: string;
}

export const Footer: React.FunctionComponent<FooterProps> = ({
  links = [],
  copyright,
  className,
}) => {
  return (
    <footer className={cx('bhb-footer', className)}>
      <ul className="bhb-footer__links">
        {links.map(link => (
          <li key={link.label} className="bhb-footer__item">
            {link.href ? (
              <a href={link.href} onClick={link.onClick} className="bhb-footer__link">
                {link.label}
              </a>
            ) : (
              <button
                type="button"
                onClick={link.onClick}
                className="bhb-footer__link bhb-footer__link--button"
              >
                {link.label}
              </button>
            )}
          </li>
        ))}
      </ul>
      {copyright && <span className="bhb-footer__copyright">{copyright}</span>}
    </footer>
  );
};
