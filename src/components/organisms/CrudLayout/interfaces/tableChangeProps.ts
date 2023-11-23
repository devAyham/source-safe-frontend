import {FilterValue, SorterResult, TableCurrentDataSource} from "antd/es/table/interface";
import {TablePaginationConfig} from "antd/lib";

export interface TableChangeProps<T>{
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
    extra: TableCurrentDataSource<T>
}