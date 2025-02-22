import "./TableRow.scss";
import { bem } from "../../utils/bem";
import type { ReactNode } from "react";

type TableRowProps = {
  children: ReactNode;
};

const b = bem("table-row");
export function TableRow({ children }: TableRowProps) {
  return <tr className={b()}>{children}</tr>;
}