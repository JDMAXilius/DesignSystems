import { forwardRef, useState, type HTMLAttributes } from 'react';
import { Icon } from '../Icon';
import './Avatar.css';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image source; falls back to initials, then a user glyph. */
  src?: string;
  /** Person's name — used for initials and alt text. */
  name?: string;
  /** @default 'md' */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** @default 'circle' */
  shape?: 'circle' | 'square';
  /** Presence indicator. */
  status?: 'online' | 'away' | 'busy' | 'offline';
}

const initialsOf = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((w) => w[0] ?? '')
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, name, size = 'md', shape = 'circle', status, className = '', ...rest },
  ref,
) {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;

  const classes = ['mx-avatar', `mx-avatar--${size}`, `mx-avatar--${shape}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span ref={ref} className={classes} {...rest}>
      {showImage ? (
        <img className="mx-avatar__img" src={src} alt={name ?? ''} onError={() => setErrored(true)} />
      ) : name ? (
        <span className="mx-avatar__initials" aria-hidden="true">
          {initialsOf(name)}
        </span>
      ) : (
        <Icon name="user" className="mx-avatar__fallback" />
      )}
      {!showImage && name && <span className="mx-sr-only">{name}</span>}
      {status && <span className={`mx-avatar__status mx-avatar__status--${status}`} />}
    </span>
  );
});
