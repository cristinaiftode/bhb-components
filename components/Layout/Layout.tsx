import React from 'react';
import cx from 'classnames';
import './Layout.css';

export interface LayoutProps {
  /** Vertical primary navigation, typically a <Sidebar /> instance. Spans the full
   *  height of the layout. */
  sidebar: React.ReactNode;
  /** Optional thin footer pinned to the bottom of the main content area, typically
   *  a <Footer /> instance. Not rendered when omitted. */
  footer?: React.ReactNode;
  /** Main content (everything to the right of the sidebar, above the footer). */
  children: React.ReactNode;
  /**
   * When true, the main content area has no padding — it sits flush against
   * the sidebar (and the right edge of the viewport). Use for data-heavy
   * pages whose rows/toolbars need to extend from the sidebar to the very
   * right edge. The page is then responsible for its own internal padding.
   */
  flush?: boolean;
  className?: string;
}

/**
 * App shell: sidebar on the left (full height), main content in the centre,
 * optional footer pinned to the bottom of the main content area. Matches the
 * BuchhaltungsButler app structure from Figma node 17:113.
 *
 * Layout fills its container vertically — wrap in a `min-height: 100vh` parent
 * (or set on the body) to get a full-viewport app shell.
 */
export const Layout: React.FunctionComponent<LayoutProps> = ({
  sidebar,
  footer,
  children,
  flush = false,
  className,
}) => {
  return (
    <div className={cx('bhb-layout', className)}>
      <aside className="bhb-layout__sidebar">{sidebar}</aside>
      <main className={cx('bhb-layout__main', { 'bhb-layout__main--flush': flush })}>
        {children}
      </main>
      {footer && <div className="bhb-layout__footer">{footer}</div>}
    </div>
  );
};
