import { cloneElement, useId, type ReactElement, type ReactNode } from 'react';
import './Tooltip.css';

export interface TooltipProps {
  /** Tooltip text. */
  content: ReactNode;
  /** Placement relative to the trigger. @default 'top' */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** A single focusable element that triggers the tooltip. */
  children: ReactElement;
}

/**
 * CSS-driven tooltip: shows on hover and keyboard focus, announced via
 * aria-describedby. Keep content short — tooltips are for hints, not prose.
 */
export function Tooltip({ content, placement = 'top', children }: TooltipProps) {
  const id = useId();

  return (
    <span className={`mx-tooltip mx-tooltip--${placement}`}>
      {cloneElement(children, { 'aria-describedby': id } as Record<string, unknown>)}
      <span role="tooltip" id={id} className="mx-tooltip__bubble">
        {content}
      </span>
    </span>
  );
}
