import { forwardRef, type LabelHTMLAttributes } from 'react';
import './Label.css';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /** Mark the associated field as required (adds a warm-colored asterisk). */
  required?: boolean;
  /** Muted secondary treatment. */
  muted?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { required = false, muted = false, className = '', children, ...rest },
  ref,
) {
  const classes = ['mx-label', muted && 'mx-label--muted', className].filter(Boolean).join(' ');

  return (
    <label ref={ref} className={classes} {...rest}>
      {children}
      {required && (
        <span className="mx-label__required" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
});
