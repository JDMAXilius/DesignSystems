import { forwardRef, type SVGAttributes } from 'react';
import { iconPaths, type IconName } from './icons';
import './Icon.css';

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  /** Icon glyph name. */
  name: IconName;
  /** Visual size, mapped to size.icon tokens. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label. Omit for decorative icons (default: aria-hidden). */
  label?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { name, size = 'md', label, className = '', ...rest },
  ref,
) {
  return (
    <svg
      ref={ref}
      className={`mx-icon mx-icon--${size} ${className}`.trim()}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      {iconPaths[name]}
    </svg>
  );
});
