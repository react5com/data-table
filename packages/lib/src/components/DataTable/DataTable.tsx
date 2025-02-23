import "./DataTable.scss";
import { bem } from "../../utils/bem";
import { useTranslation } from "react-i18next";
import { translationNs } from "../../i18n/ns";
import { Column, TableCell } from "../TableCell";
import { ISortKey, TableHeader } from "../TableHeader";
import { TableRow } from "../TableRow";
import clsx from "clsx";
import { CheckBox } from "../CheckBox";
import { type ReactNode, useEffect, useMemo, useState } from "react";

function sortData<T>(data: T[], key: keyof T, isAscending: boolean): T[] {
  return [...data].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    if (aValue === bValue) {
      return 0;
    }
    if (isAscending) {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
}

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  className?: string;
  selectable?: boolean;
  onSelectionChange?: (selectedItems: T[]) => void;
};

const b = bem("data-table");
export function DataTable<T extends { id?: string | number }>({ data, columns, className, selectable=false, onSelectionChange }: DataTableProps<T>) {
  const { t } = useTranslation(translationNs);
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);
  const [sortKey, setSortKey] = useState<ISortKey<T> | null>(null);

  const sortedItems = useMemo(() => {
    if(sortKey?.key) {
      return sortData(data, sortKey?.key, sortKey?.isAscending);
    }
    return data;
  }, [data, sortKey]);

  const triggerSelectionChange = (selectedItems: (string | number)[]) => {
    onSelectionChange?.(data.filter((item) => item.id && selectedItems.includes(item.id)));
  }
  useEffect(() => {
    triggerSelectionChange(selectedItems);
  }, [selectedItems]);

  const toggleSelection = (id?: (string | number)) => {
    if(!id) return;
    setSelectedItems((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };

  const handleSelectAll = (doSelect: boolean) => {
    if(doSelect) {
      setSelectedItems(data.map((item, i) => item.id || i));
    } else {
      setSelectedItems([]);
    }
  }
  const handleSort = (key: keyof T) => {
    setSortKey(prev => prev?.key === key ? {key, isAscending: !prev.isAscending} : {key, isAscending: true});
  }
  return (
    <div className={clsx(b(), className)}>
      <table className={b("table")}>
        <TableHeader selectable={selectable} columns={columns} onSort={handleSort} onSelectAll={handleSelectAll} sortKey={sortKey} />
        <tbody>
          {sortedItems.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {selectable && <TableCell>
                <CheckBox name={`select-${item.id}`} checked={!!item.id && selectedItems.includes(item.id)} onChange={() => toggleSelection(item.id)}/>
              </TableCell>}
              {columns.map((column) => (
                <TableCell key={String(column.key)}>
                  {column.render ? column.render(item) : (item[column.key] as ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  )
}
