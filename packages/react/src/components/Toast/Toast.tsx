import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Icon, type IconName } from '../Icon';
import './Toast.css';

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

export interface ToastOptions {
  title: ReactNode;
  description?: ReactNode;
  /** @default 'info' */
  variant?: ToastVariant;
  /** Auto-dismiss delay in ms; 0 keeps the toast until dismissed. @default 5000 */
  duration?: number;
}

interface ToastItem extends Required<Pick<ToastOptions, 'variant' | 'duration'>> {
  id: number;
  title: ReactNode;
  description?: ReactNode;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

const variantIcon: Record<ToastVariant, IconName> = {
  info: 'info',
  success: 'check-circle',
  warning: 'alert-triangle',
  danger: 'alert-circle',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description, variant = 'info', duration = 5000 }: ToastOptions) => {
      const id = nextId.current++;
      setToasts((prev) => [...prev, { id, title, description, variant, duration }]);
      if (duration > 0) setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="mx-toast-viewport" role="region" aria-label="Notifications">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            aria-live="polite"
            className={`mx-toast mx-toast--${t.variant}`}
          >
            <Icon name={variantIcon[t.variant]} size="sm" className="mx-toast__icon" />
            <div className="mx-toast__body">
              <div className="mx-toast__title">{t.title}</div>
              {t.description && <div className="mx-toast__description">{t.description}</div>}
            </div>
            <button
              type="button"
              className="mx-toast__close"
              aria-label="Dismiss notification"
              onClick={() => dismiss(t.id)}
            >
              <Icon name="x" size="sm" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
