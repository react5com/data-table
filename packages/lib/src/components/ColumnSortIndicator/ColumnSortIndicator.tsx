import { clsx } from "clsx";
import { bem } from "../../utils/bem";
import "./ColumnSortIndicator.scss";
import ChevronUp from "../../assets/chevron-up.svg";

const b = bem("column-sort-indicator");

interface ColumnSortIndicatorProps {
  sortDirection: "asc" | "desc" | null;
  className?: string;
}

export function ColumnSortIndicator({
  sortDirection,
  className,
}: ColumnSortIndicatorProps) {
  return (
    <>
      {sortDirection && (
        <span className={clsx(b(), className)}>
          <ChevronUp className={b("icon", sortDirection)} />
        </span>
    )}
    </>
  );
};

export default ColumnSortIndicator;
