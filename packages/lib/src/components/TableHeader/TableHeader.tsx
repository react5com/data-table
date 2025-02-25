import "./TableHeader.scss";
import { bem } from "../../utils/bem";
import { Column } from "../TableCell";
import clsx from "clsx";
import { CheckBox } from "../CheckBox";
import { ColumnSortIndicator } from "../ColumnSortIndicator";

export interface ISortKey<T> {
  key: keyof T;
  isAscending: boolean;
}

function getSortDirection<T>(key: keyof T, sortKey?: ISortKey<T> | null): "asc" | "desc" | null {
  if (sortKey?.key === key) {
    return sortKey.isAscending ? "asc" : "desc";
  }
  return null;
}

type TableHeaderProps<T> = {
  columns: Column<T>[];
  onSort?: (key: keyof T) => void;
  onSelectAll?: (doSelect: boolean) => void;
  sortKey?: ISortKey<T> | null;
  selectable?: boolean;
  allSelected?: boolean;
};

const b = bem("table-header");
export function TableHeader<T>({ columns, onSort, onSelectAll, sortKey, selectable, allSelected }: TableHeaderProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectAll?.(e.target.checked);
  }
  return (
    <thead>
      <tr className={b()}>
        {selectable && <th className={b("checkbox-cell")}>
          <CheckBox checked={allSelected} name="select-all" onChange={handleChange} />
        </th>}
        {columns.map((column) => (
          <th
            key={String(column.key)}
            className={clsx(b("header-cell"), column.sortable && b("header-cell", "sortable"))}
            onClick={() => column.sortable && onSort?.(column.key)}
          >
            {column.label}
            <ColumnSortIndicator sortDirection={getSortDirection(column.key, sortKey)} />
          </th>
        ))}
      </tr>
    </thead>
  );
}
