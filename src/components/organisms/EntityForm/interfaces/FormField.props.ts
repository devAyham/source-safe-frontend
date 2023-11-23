import { FormItemProps } from "antd";
import { ColProps } from "antd/lib";

export interface Field<S> extends Omit<FormItemProps<S>, "name"> {
  name: keyof S;
  grid?: ColProps; // Optional property for the grid layout configurations
}

export interface CustomFiled<T, S, X> extends Omit<FormItemProps<S>, "name"> {
  name?: keyof S;
  withControlRender?: (
    value: Partial<Record<keyof S, any>> & Partial<Record<keyof X, any>>
  ) => React.ReactNode;
  render?: (
    value: Partial<Record<keyof S, any>> & Partial<Record<keyof X, any>>
  ) => React.ReactNode;
  grid?: ColProps; // Optional property for the grid layout configuration
}

type FieldProps<T, S, X> = Field<S> | CustomFiled<T, S, X>;
export default FieldProps;
