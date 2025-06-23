import "./DataTable.scss";
import { bem } from "../../utils/bem";
import { useTranslation } from "react-i18next";
import { translationNs } from "../../i18n/ns";
import { Column, TableCell } from "../TableCell";
import { ISortKey, TableHeader } from "../TableHeader";
import { TableRow } from "../TableRow";
import clsx from "clsx";
import { CheckBox } from "../CheckBox";
import { ChangeEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import { NoData } from "../NoData";

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
  data: T[] | null;
  columns: Column<T>[];
  className?: string;
  selectable?: boolean;
  pageSize?: number;
  noPaging?: boolean;
  onSelectionChange?: (selectedItems: T[]) => void;
};

const b = bem("data-table");
export function DataTable<T extends { id?: string | number }>({ 
  data, columns, className, selectable=false, onSelectionChange, pageSize = 10, noPaging = false }: DataTableProps<T>) {
  const { t } = useTranslation(translationNs);
  const [selectedItems, setSelectedItems] = useState<(string | number)[]>([]);
  const [sortKey, setSortKey] = useState<ISortKey<T> | null>(null);

  const sortedItems = useMemo(() => {
    if (!data) return [];
    if (sortKey?.key) {
      return sortData(data, sortKey?.key, sortKey?.isAscending);
    }
    return data;
  }, [data, sortKey]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useMemo(() => (data ? Math.ceil(data.length / pageSize) : 1), [data, pageSize]);
  const paginatedData = useMemo<T[]>(() => (noPaging ? sortedItems : sortedItems.slice((currentPage - 1) * pageSize, currentPage * pageSize)), 
    [sortedItems, currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const triggerSelectionChange = (selectedItems: (string | number)[]) => {
    if (!data) return;
    onSelectionChange?.(data.filter((item) => item.id && selectedItems.includes(item.id)));
  }
  useEffect(() => {
    // remove selection from elements outside of the current page
    setSelectedItems((prev) => prev.filter((id) => paginatedData.find(item => item.id === id)));
  }, [paginatedData]);
  useEffect(() => {
    triggerSelectionChange(selectedItems);
  }, [selectedItems]);

  const allSelected = useMemo(() => (selectedItems.length === paginatedData.length), [selectedItems, paginatedData])

  const toggleSelection = (id?: (string | number)) => {
    if(!id) return;
    setSelectedItems((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };

  const handleSelectAll = (doSelect: boolean) => {
    if(doSelect) {
      setSelectedItems(paginatedData.map((item, i) => item.id || i));
    } else {
      setSelectedItems([]);
    }
  }
  const handleSort = (key: keyof T) => {
    setSortKey(prev => prev?.key === key ? {key, isAscending: !prev.isAscending} : {key, isAscending: true});
  }
  const handleCurrentPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPage = parseInt(event.target.value, 10);
    if (!isNaN(newPage) && newPage > 0 && newPage <= totalPages) {
      handlePageChange(newPage);
    }
  };
  
  return (
    <div className={clsx(b(), className)}>
      <table className={b("table")}>
        <TableHeader selectable={selectable} columns={columns} onSort={handleSort} allSelected={allSelected} onSelectAll={handleSelectAll} sortKey={sortKey} />
        <tbody>
          {paginatedData?.length > 0 
          ? paginatedData.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {selectable && <TableCell>
                <CheckBox name={`select-${item.id}`} checked={!!item.id && selectedItems.includes(item.id)} onChange={() => toggleSelection(item.id)}/>
              </TableCell>}
              {columns.map((column) => (
                <TableCell align={column.align} key={String(column.key)}>
                  {column.render ? column.render(item) : (item[column.key] as ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))
          : <NoData columnCount={columns.length}/>
        }
        </tbody>
      </table>
      {!noPaging && <div className={b("pagination")}>
        <button className={b("page-next-button")} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>{"<"}</button>
        <span className={b("page-of-text")}>{t("page")} <input type="number" className={b("page-input")} value={currentPage} onChange={handleCurrentPageChange} min={1} max={totalPages} /> {t("of")} {totalPages}</span>
        <button className={b("page-next-button")} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>{">"}</button>
      </div>}
    </div>
  )
}
