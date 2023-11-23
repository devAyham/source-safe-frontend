import { PaginationProps as AntPaginationProps } from "antd";

export interface PaginationProps extends AntPaginationProps {
  rowsName?: string;
  currentPageLength?: number;
}
