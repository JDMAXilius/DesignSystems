import { forwardRef, useEffect, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import './Checkbox.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Visible label rendered next to the box. */
  label?: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
  /** Mixed state (visual + aria). */
  indeterminate?: boolean;
  /** Marks invalid (danger border + aria-invalid). */
  invalid?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, indeterminate = false, invalid = false, className = '', ...rest },
  ref,
) {
  const innerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const setRefs = (node: HTMLInputElement | null) => {
    innerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  return (
    <label className={`mx-checkbox ${invalid ? 'mx-checkbox--invalid' : ''} ${className}`.trim()}>
      <input
        ref={setRefs}
        type="checkbox"
        className="mx-checkbox__input"
        aria-invalid={invalid || undefined}
        {...rest}
      />
      <span className="mx-checkbox__box" aria-hidden="true">
        <svg className="mx-checkbox__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        <svg className="mx-checkbox__dash" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M6 12h12" />
        </svg>
      </span>
      {(label || description) && (
        <span className="mx-checkbox__text">
          {label && <span className="mx-checkbox__label">{label}</span>}
          {description && <span className="mx-checkbox__description">{description}</span>}
        </span>
      )}
    </label>
  );
});
