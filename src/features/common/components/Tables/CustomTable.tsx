import type { ColumnsType, TableProps } from "antd/es/table";
import "styles/shared/antTableHeaderStyles.scss";
import HeaderLoading from "features/common/components/Loading/HeaderLoading/Loading";
import { Translation, useTranslation } from "react-i18next";
import React from "react";
import { Pagination, Table } from "components";
import styles from "./styles.module.scss";
// import { Pagination } from "antd";
/** */
interface CustomTableProps<T = any> extends TableProps<T> {
  /**
   * the data source
   */
  data: T[];
  /**
   * the layout columns
   */
  columns: ColumnsType<T>;
  //   resource: ;
  /** */
  isLoading: boolean;
  /** */
  isRefetching: boolean;
  /** */
  SetPage: any;
  /** */
  SetPerPage: any;
  /** */
  page: any;
  /** */
  perPage: any;
  /**
   * the api mate (other info)
   */
  meta: any;
  /**
   * an event that fires when click on row
   */
  onRow?: any;
  /**
   * the records name default 'Rows'
   */
  name?: React.ReactNode;
  /** */
  x?: number;
  /** */
  y?: number;
  /**
   * default [10, 25, 50, 100]
   */
  pageSizeOptions?: number[];
}
/**
 * @description an ant design layout with custom props and pagenation logic and many other props
 *  that make the layout full customizable and have a header loading that fires on refetching the api
 * @param {CustomTableProps} param0
 *
 */
const CustomTable = ({
  data,
  columns,
  isLoading,
  isRefetching,
  SetPage,
  SetPerPage,
  meta,
  page,
  perPage,
  onRow,
  name = <Translation>{(t) => t("ROWS")}</Translation>,
  x = 1100,
  y = 490,
  pageSizeOptions = [10, 25, 50, 100],
  ...props
}: CustomTableProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.tableContainer}>
      <HeaderLoading top={-40} loading={isRefetching} />
      <Table
        scroll={{ y, x }}
        bordered
        size="middle"
        loading={isLoading}
        style={{ marginTop: 10 }}
        columns={columns}
        dataSource={data}
        onRow={onRow}
        {...props}
      />
      <Pagination
        className={styles.pagination}
        current={page}
        pageSize={perPage}
        total={meta?.total}
        onChange={(page, pageSize) => {
          SetPage(page);
          SetPerPage(pageSize);
        }}
        showTotal={(number: any) => {
          return (
            <>
              {t("TOTAL")} {name} : {number}
            </>
          );
        }}
      />
    </div>
  );
};

export default CustomTable;
