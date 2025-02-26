import { TableRow } from "../TableRow";
import { translationNs } from "../../i18n/ns";
import { useTranslation } from "react-i18next";
import { TableCell } from "../TableCell";

interface INoDataProps {
  columnCount: number;
}
export const NoData = ({columnCount}: INoDataProps) => {
  const { t } = useTranslation(translationNs);

  return <TableRow><TableCell colSpan={columnCount}>{t("No Data")}</TableCell></TableRow>
}