import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'danger' | 'neutral' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual intent. Warm variants (accent, danger) demand attention;
   * cool variants (primary, secondary) carry standard actions. @default 'primary'
   */
  variant?: ButtonVariant;
  /** Control height, mapped to size.control tokens. @default 'md' */
  size?: ButtonSize;
  /** Stretch to container width. */
  fullWidth?: boolean;
  /** Show a spinner and disable interaction. */
  loading?: boolean;
  /** Optional leading icon. */
  iconStart?: IconName;
  /** Optional trailing icon. */
  iconEnd?: IconName;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    iconStart,
    iconEnd,
    disabled,
    className = '',
    children,
    ...rest
  },
  ref,
) {
  const classes = [
    'mx-btn',
    `mx-btn--${variant}`,
    `mx-btn--${size}`,
    fullWidth && 'mx-btn--full',
    loading && 'mx-btn--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconSize = size === 'lg' ? 'md' : 'sm';

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="mx-btn__spinner" aria-hidden="true" />}
      <span className="mx-btn__content">
        {iconStart && <Icon name={iconStart} size={iconSize} />}
        {children}
        {iconEnd && <Icon name={iconEnd} size={iconSize} />}
      </span>
    </button>
  );
});
