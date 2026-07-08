import { forwardRef, type HTMLAttributes } from 'react';
import './Divider.css';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /** @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** Optional centered label (horizontal only). */
  label?: string;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(function Divider(
  { orientation = 'horizontal', label, className = '', ...rest },
  ref,
) {
  const classes = ['mx-divider', `mx-divider--${orientation}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={classes}
      {...rest}
    >
      {label && orientation === 'horizontal' && (
        <span className="mx-divider__label">{label}</span>
      )}
    </div>
  );
});
