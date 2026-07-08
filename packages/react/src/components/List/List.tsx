import { forwardRef, type HTMLAttributes, type LiHTMLAttributes } from 'react';
import { Icon, type IconName } from '../Icon';
import './List.css';

export interface ListProps extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  /** List semantics/marker. @default 'unordered' */
  variant?: 'unordered' | 'ordered' | 'plain';
  /** Divider between items. */
  divided?: boolean;
}

export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(function List(
  { variant = 'unordered', divided = false, className = '', children, ...rest },
  ref,
) {
  const classes = ['mx-list', `mx-list--${variant}`, divided && 'mx-list--divided', className]
    .filter(Boolean)
    .join(' ');

  if (variant === 'ordered') {
    return (
      <ol ref={ref as React.Ref<HTMLOListElement>} className={classes} {...rest}>
        {children}
      </ol>
    );
  }
  return (
    <ul ref={ref as React.Ref<HTMLUListElement>} className={classes} {...rest}>
      {children}
    </ul>
  );
});

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  /** Leading icon (plain lists). */
  icon?: IconName;
  /** Icon color role. @default 'muted' */
  iconColor?: 'muted' | 'primary' | 'success' | 'warning' | 'danger';
}

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(function ListItem(
  { icon, iconColor = 'muted', className = '', children, ...rest },
  ref,
) {
  return (
    <li ref={ref} className={`mx-list__item ${className}`.trim()} {...rest}>
      {icon && (
        <Icon name={icon} size="sm" className={`mx-list__icon mx-list__icon--${iconColor}`} />
      )}
      <span className="mx-list__content">{children}</span>
    </li>
  );
});
