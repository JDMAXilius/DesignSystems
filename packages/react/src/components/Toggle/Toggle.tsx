import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import './Toggle.css';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Visible label rendered next to the switch. */
  label?: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
  /** @default 'md' */
  size?: 'sm' | 'md';
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { label, description, size = 'md', className = '', ...rest },
  ref,
) {
  return (
    <label className={`mx-toggle mx-toggle--${size} ${className}`.trim()}>
      <input ref={ref} type="checkbox" role="switch" className="mx-toggle__input" {...rest} />
      <span className="mx-toggle__track" aria-hidden="true">
        <span className="mx-toggle__thumb" />
      </span>
      {(label || description) && (
        <span className="mx-toggle__text">
          {label && <span className="mx-toggle__label">{label}</span>}
          {description && <span className="mx-toggle__description">{description}</span>}
        </span>
      )}
    </label>
  );
});
