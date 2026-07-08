import {
  createContext,
  useContext,
  useId,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { Icon } from '../Icon';
import './Accordion.css';

interface AccordionContextValue {
  open: Set<string>;
  toggle: (v: string) => void;
  baseId: string;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /** Allow multiple items open at once. @default false */
  multiple?: boolean;
  /** Item values open initially. */
  defaultOpen?: string[];
  children: ReactNode;
}

export function Accordion({
  multiple = false,
  defaultOpen = [],
  className = '',
  children,
  ...rest
}: AccordionProps) {
  const [open, setOpen] = useState(() => new Set(defaultOpen));
  const baseId = useId();

  const toggle = (v: string) =>
    setOpen((prev) => {
      const next = new Set(multiple ? prev : ([] as string[]));
      if (prev.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });

  return (
    <AccordionContext.Provider value={{ open, toggle, baseId }}>
      <div className={`mx-accordion ${className}`.trim()} {...rest}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Unique value identifying this item. */
  value: string;
  /** Header content. */
  title: ReactNode;
  disabled?: boolean;
  children: ReactNode;
}

export function AccordionItem({
  value,
  title,
  disabled = false,
  className = '',
  children,
  ...rest
}: AccordionItemProps) {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionItem must be used inside <Accordion>');
  const { open, toggle, baseId } = ctx;
  const isOpen = open.has(value);

  return (
    <div
      className={`mx-accordion__item ${isOpen ? 'mx-accordion__item--open' : ''} ${className}`.trim()}
      {...rest}
    >
      <h3 className="mx-accordion__heading">
        <button
          type="button"
          className="mx-accordion__trigger"
          id={`${baseId}-trigger-${value}`}
          aria-expanded={isOpen}
          aria-controls={`${baseId}-panel-${value}`}
          disabled={disabled}
          onClick={() => toggle(value)}
        >
          <span className="mx-accordion__title">{title}</span>
          <Icon name="chevron-down" size="sm" className="mx-accordion__chevron" />
        </button>
      </h3>
      <div
        role="region"
        id={`${baseId}-panel-${value}`}
        aria-labelledby={`${baseId}-trigger-${value}`}
        className="mx-accordion__panel"
        hidden={!isOpen}
      >
        <div className="mx-accordion__content">{children}</div>
      </div>
    </div>
  );
}
