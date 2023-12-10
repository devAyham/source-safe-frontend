type filterOperation =
  | "="
  | ">"
  | "<"
  | "<="
  | ">="
  | "!="
  | "has"
  | "hasNot"
  | "between";
type filterOption<T> = {
  base?: "and" | "or" | "has" | "in" | "notIn" | "hasNot"; // relational logic operation with previews key in filters
  op: filterOperation;
  value: T;
};

export interface IRequestParams<T> {
  filter?: Partial<{
    [K in keyof T]: string; // filterOption<T[K]> |
    // filterOption<T[K]>[];
  }>;
  //   Record<keyof T, filterOption<T[keyof T]> | filterOption<T[keyof T]>[]>
  sort?: string;
  search?: string;
  page?: number;
  items_per_page?: number;
  [key: string]: any;
}
