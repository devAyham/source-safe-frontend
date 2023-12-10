import { Table as AntTable } from "antd";
import { TabelProps } from "./TableProps";
import styles from "./styles.module.scss";
import { Pagination } from "components/atoms";

const { tableContainer } = styles;
const { antTableHeaderStyles } = styles;
const Table = <T extends object>({
  className,
  pagination,
  ...restProps
}: TabelProps<T>) => {
  className = `${antTableHeaderStyles} ${className}`;
  return (
    <>
      <div className={tableContainer}>
        <AntTable<T>
          bordered={false}
          {...restProps}
          pagination={false}
          className={` ${styles.table} ${className}  `}
        />
        {pagination && (
          <Pagination {...pagination} className={`${pagination}`} />
        )}
      </div>
    </>
  );
};

export default Table;
