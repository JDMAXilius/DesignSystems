import { forwardRef, type SelectHTMLAttributes } from 'react';
import { Icon } from '../Icon';
import './Select.css';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Control height, mapped to size.control tokens. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Marks the field invalid (danger border + aria-invalid). */
  invalid?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { size = 'md', invalid = false, className = '', disabled, children, ...rest },
  ref,
) {
  const classes = ['mx-select', `mx-select--${size}`, invalid && 'mx-select--invalid', className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className="mx-select-wrap" data-disabled={disabled || undefined}>
      <select
        ref={ref}
        className={classes}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        {...rest}
      >
        {children}
      </select>
      <Icon name="chevron-down" size="sm" className="mx-select__chevron" />
    </span>
  );
});
