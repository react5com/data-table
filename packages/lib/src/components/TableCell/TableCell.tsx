import "./TableCell.scss";
import type { ReactNode } from "react";
import { bem } from "../../utils/bem";

export type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
  sortDirection?: "asc" | "desc" | null;
};

export type TableCellProps = {
  children: ReactNode;
};

const b = bem("table-cell");
export function TableCell({ children }: TableCellProps) {
  return <td className={b()}>{children}</td>;
}
