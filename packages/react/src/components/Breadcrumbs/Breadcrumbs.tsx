import { Fragment, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../Icon';
import './Breadcrumbs.css';

export interface BreadcrumbItem {
  label: ReactNode;
  /** Omit href on the current page. */
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /** Accessible name. @default 'Breadcrumb' */
  label?: string;
  className?: string;
  /** Props forwarded to each anchor (e.g. onClick for router integration). */
  linkProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
}

export function Breadcrumbs({
  items,
  label = 'Breadcrumb',
  className = '',
  linkProps,
}: BreadcrumbsProps) {
  return (
    <nav aria-label={label} className={`mx-breadcrumbs ${className}`.trim()}>
      <ol className="mx-breadcrumbs__list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={i}>
              <li className="mx-breadcrumbs__item">
                {item.href && !isLast ? (
                  <a className="mx-breadcrumbs__link" href={item.href} {...linkProps}>
                    {item.label}
                  </a>
                ) : (
                  <span
                    className="mx-breadcrumbs__current"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className="mx-breadcrumbs__separator">
                  <Icon name="chevron-right" size="sm" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
