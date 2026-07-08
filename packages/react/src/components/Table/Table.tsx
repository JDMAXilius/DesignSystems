import { forwardRef, type HTMLAttributes, type TableHTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react';
import './Table.css';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /** Zebra-stripe body rows. */
  striped?: boolean;
  /** Highlight rows on hover. */
  hoverable?: boolean;
  /** Compact row height for dense data. */
  dense?: boolean;
}

/** Scrollable wrapper + semantic table. Compose with TableHead/TableBody/Tr/Th/Td. */
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table(
  { striped = false, hoverable = false, dense = false, className = '', children, ...rest },
  ref,
) {
  const classes = [
    'mx-table',
    striped && 'mx-table--striped',
    hoverable && 'mx-table--hoverable',
    dense && 'mx-table--dense',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="mx-table-container">
      <table ref={ref} className={classes} {...rest}>
        {children}
      </table>
    </div>
  );
});

export const TableHead = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableHead({ className = '', ...rest }, ref) {
    return <thead ref={ref} className={`mx-table__head ${className}`.trim()} {...rest} />;
  },
);

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody({ className = '', ...rest }, ref) {
    return <tbody ref={ref} className={`mx-table__body ${className}`.trim()} {...rest} />;
  },
);

export const Tr = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  function Tr({ className = '', ...rest }, ref) {
    return <tr ref={ref} className={`mx-table__row ${className}`.trim()} {...rest} />;
  },
);

export interface ThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Right-align (for numeric columns). */
  numeric?: boolean;
}

export const Th = forwardRef<HTMLTableCellElement, ThProps>(function Th(
  { numeric = false, className = '', ...rest },
  ref,
) {
  return (
    <th
      ref={ref}
      scope="col"
      className={`mx-table__th ${numeric ? 'mx-table__cell--numeric' : ''} ${className}`.trim()}
      {...rest}
    />
  );
});

export interface TdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Right-align (for numeric columns). */
  numeric?: boolean;
}

export const Td = forwardRef<HTMLTableCellElement, TdProps>(function Td(
  { numeric = false, className = '', ...rest },
  ref,
) {
  return (
    <td
      ref={ref}
      className={`mx-table__td ${numeric ? 'mx-table__cell--numeric' : ''} ${className}`.trim()}
      {...rest}
    />
  );
});
