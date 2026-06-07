import React from 'react';
import cx from 'classnames';
import { CogIcon } from '../icons/icons';
import './Sidebar.css';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  logo?: React.ReactNode;
  userName?: string;
  organization?: string;
  onSettingsClick?: () => void;
  sections: SidebarSection[];
  footerItems?: SidebarItem[];
  className?: string;
  ariaLabel?: string;
}

const renderItem = (item: SidebarItem) => {
  const itemClass = cx('bhb-sidebar__item', {
    'bhb-sidebar__item--active': item.active,
  });
  const inner = (
    <>
      {item.icon && <span className="bhb-sidebar__item-icon" aria-hidden="true">{item.icon}</span>}
      <span className="bhb-sidebar__item-label">{item.label}</span>
    </>
  );
  if (item.href) {
    return (
      <a
        key={item.id}
        href={item.href}
        onClick={item.onClick}
        className={itemClass}
        aria-current={item.active ? 'page' : undefined}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      key={item.id}
      type="button"
      onClick={item.onClick}
      className={itemClass}
      aria-current={item.active ? 'page' : undefined}
    >
      {inner}
    </button>
  );
};

export const Sidebar: React.FunctionComponent<SidebarProps> = ({
  logo,
  userName,
  organization,
  onSettingsClick,
  sections,
  footerItems,
  className,
  ariaLabel = 'Hauptnavigation',
}) => {
  const showHeader = Boolean(logo || userName || organization);

  return (
    <nav className={cx('bhb-sidebar', className)} aria-label={ariaLabel}>
      {showHeader && (
        <header className="bhb-sidebar__header">
          {logo && <span className="bhb-sidebar__logo" aria-hidden="true">{logo}</span>}
          <div className="bhb-sidebar__user">
            {userName && <div className="bhb-sidebar__user-name">{userName}</div>}
            <div className="bhb-sidebar__user-row">
              {organization && <span className="bhb-sidebar__user-org">{organization}</span>}
              {onSettingsClick && (
                <button
                  type="button"
                  className="bhb-sidebar__settings"
                  onClick={onSettingsClick}
                  aria-label="Einstellungen"
                >
                  <CogIcon size={14} />
                </button>
              )}
            </div>
          </div>
        </header>
      )}

      <div className="bhb-sidebar__nav">
        {sections.map((section, idx) => (
          <div className="bhb-sidebar__section" key={section.title ?? `s-${idx}`}>
            {section.title && (
              <div className="bhb-sidebar__section-title">{section.title}</div>
            )}
            {section.items.map(renderItem)}
          </div>
        ))}
      </div>

      {footerItems && footerItems.length > 0 && (
        <div className="bhb-sidebar__footer">
          {footerItems.map(renderItem)}
        </div>
      )}
    </nav>
  );
};
