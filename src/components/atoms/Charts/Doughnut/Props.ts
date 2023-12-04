export interface Props<T> {
  loading: boolean;
  data: T[];
  angleField: keyof T;
  colorField: keyof T;
  colors?: string[];
}
