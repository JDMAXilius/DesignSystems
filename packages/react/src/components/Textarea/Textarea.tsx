import { forwardRef, type TextareaHTMLAttributes } from 'react';
import './Textarea.css';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Marks the field invalid (danger border + aria-invalid). */
  invalid?: boolean;
  /** Resize behavior. @default 'vertical' */
  resize?: 'none' | 'vertical' | 'both';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid = false, resize = 'vertical', className = '', rows = 4, ...rest },
  ref,
) {
  const classes = ['mx-textarea', invalid && 'mx-textarea--invalid', className]
    .filter(Boolean)
    .join(' ');

  return (
    <textarea
      ref={ref}
      className={classes}
      style={{ resize }}
      rows={rows}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
});
