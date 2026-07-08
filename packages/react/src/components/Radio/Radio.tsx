import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import './Radio.css';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Visible label rendered next to the control. */
  label?: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
  /** Marks invalid (danger border + aria-invalid). */
  invalid?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, description, invalid = false, className = '', ...rest },
  ref,
) {
  return (
    <label className={`mx-radio ${invalid ? 'mx-radio--invalid' : ''} ${className}`.trim()}>
      <input
        ref={ref}
        type="radio"
        className="mx-radio__input"
        aria-invalid={invalid || undefined}
        {...rest}
      />
      <span className="mx-radio__circle" aria-hidden="true" />
      {(label || description) && (
        <span className="mx-radio__text">
          {label && <span className="mx-radio__label">{label}</span>}
          {description && <span className="mx-radio__description">{description}</span>}
        </span>
      )}
    </label>
  );
});

export interface RadioGroupProps {
  /** Accessible group label. */
  label?: string;
  /** Layout direction. @default 'vertical' */
  direction?: 'vertical' | 'horizontal';
  className?: string;
  children: ReactNode;
}

export function RadioGroup({
  label,
  direction = 'vertical',
  className = '',
  children,
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`mx-radio-group mx-radio-group--${direction} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
