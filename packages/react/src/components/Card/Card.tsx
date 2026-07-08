import { forwardRef, type HTMLAttributes } from 'react';
import './Card.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Elevation treatment. @default 'raised' */
  elevation?: 'flat' | 'raised' | 'floating';
  /** Adds hover lift + pointer affordance for clickable cards. */
  interactive?: boolean;
  /** Remove built-in body padding (for edge-to-edge media). */
  flush?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { elevation = 'raised', interactive = false, flush = false, className = '', children, ...rest },
  ref,
) {
  const classes = [
    'mx-card',
    `mx-card--${elevation}`,
    interactive && 'mx-card--interactive',
    flush && 'mx-card--flush',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes} {...rest}>
      {children}
    </div>
  );
});

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className = '', ...rest }, ref) {
    return <div ref={ref} className={`mx-card__header ${className}`.trim()} {...rest} />;
  },
);

export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardBody({ className = '', ...rest }, ref) {
    return <div ref={ref} className={`mx-card__body ${className}`.trim()} {...rest} />;
  },
);

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className = '', ...rest }, ref) {
    return <div ref={ref} className={`mx-card__footer ${className}`.trim()} {...rest} />;
  },
);
