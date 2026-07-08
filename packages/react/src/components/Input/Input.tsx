import { forwardRef, type InputHTMLAttributes } from 'react';
import { Icon, type IconName } from '../Icon';
import './Input.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Control height, mapped to size.control tokens. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Marks the field invalid (danger border + aria-invalid). */
  invalid?: boolean;
  /** Leading icon inside the field. */
  iconStart?: IconName;
  /** Trailing icon inside the field. */
  iconEnd?: IconName;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'md', invalid = false, iconStart, iconEnd, className = '', disabled, ...rest },
  ref,
) {
  const classes = [
    'mx-input',
    `mx-input--${size}`,
    invalid && 'mx-input--invalid',
    iconStart && 'mx-input--icon-start',
    iconEnd && 'mx-input--icon-end',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className="mx-input-wrap" data-disabled={disabled || undefined}>
      {iconStart && <Icon name={iconStart} size="sm" className="mx-input__icon mx-input__icon--start" />}
      <input
        ref={ref}
        className={classes}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        {...rest}
      />
      {iconEnd && <Icon name={iconEnd} size="sm" className="mx-input__icon mx-input__icon--end" />}
    </span>
  );
});
