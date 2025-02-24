import "./TableCell.scss";
import type { ReactNode } from "react";
import { bem } from "../../utils/bem";
import clsx from "clsx";

export type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (item: T) => ReactNode;
  sortDirection?: "asc" | "desc" | null;
  align?: "left" | "center" | "right";
};

export type TableCellProps = {
  align?: "left" | "center" | "right";
  children: ReactNode;
};

const b = bem("table-cell");
export function TableCell({ children, align }: TableCellProps) {
  return <td className={clsx(b(align || "center"))}>{children}</td>;
}
