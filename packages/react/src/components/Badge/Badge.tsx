import { forwardRef, type HTMLAttributes } from 'react';
import './Badge.css';

export type BadgeVariant = 'neutral' | 'primary' | 'info' | 'success' | 'warning' | 'danger';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic color role. @default 'neutral' */
  variant?: BadgeVariant;
  /** Compact size for dense UIs. @default 'md' */
  size?: 'sm' | 'md';
  /** Show a leading status dot. */
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'neutral', size = 'md', dot = false, className = '', children, ...rest },
  ref,
) {
  const classes = ['mx-badge', `mx-badge--${variant}`, `mx-badge--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span ref={ref} className={classes} {...rest}>
      {dot && <span className="mx-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
});
