import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import './Tabs.css';

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabs = (component: string) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`${component} must be used inside <Tabs>`);
  return ctx;
};

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Controlled active tab value. */
  value?: string;
  /** Initial tab for uncontrolled usage. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
}

export function Tabs({ value, defaultValue = '', onChange, children, className = '', ...rest }: TabsProps) {
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;
  const baseId = useId();

  const setValue = (v: string) => {
    if (value === undefined) setInner(v);
    onChange?.(v);
  };

  return (
    <TabsContext.Provider value={{ value: current, setValue, baseId }}>
      <div className={`mx-tabs ${className}`.trim()} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible name for the tab list. */
  label?: string;
}

export function TabList({ label, className = '', children, ...rest }: TabListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  // roving focus with arrow keys
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)') ?? [],
    );
    const i = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (i === -1) return;
    let next: number | undefined;
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      e.preventDefault();
      tabs[next]?.focus();
      tabs[next]?.click();
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={label}
      className={`mx-tabs__list ${className}`.trim()}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface TabProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value, disabled, className = '', children, ...rest },
  ref,
) {
  const { value: active, setValue, baseId } = useTabs('Tab');
  const selected = active === value;

  return (
    <button
      ref={ref}
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      className={`mx-tabs__tab ${selected ? 'mx-tabs__tab--active' : ''} ${className}`.trim()}
      onClick={() => setValue(value)}
      {...rest}
    >
      {children}
    </button>
  );
});

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabPanel({ value, className = '', children, ...rest }: TabPanelProps) {
  const { value: active, baseId } = useTabs('TabPanel');
  if (active !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className={`mx-tabs__panel ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}
