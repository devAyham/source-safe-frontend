import { ColumnGroupType, ColumnType } from "rc-table/lib/interface";

export type GenericColumnsType<RecordType = unknown> = (
  | ColumnGroupType<RecordType>
  | GenericColumnType<RecordType>
)[];

type GenericColumnType<RecordType> = ColumnType<RecordType> & {
  dataIndex?:
    | keyof RecordType
    | [keyof RecordType, keyof RecordType[keyof RecordType]]
    | any[];
};
