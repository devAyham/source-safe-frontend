import { ServiceType } from "../../../api/constants/servicesName";
import { SelectProps } from "antd";
import { ReactNode } from "react";
import { IRequestParams } from "api/interfaces/requestParams";

export interface EntitySelectProps<T, S = {}>
  extends Omit<SelectProps, "options"> {
  entityType: ServiceType | string;
  labelKey: keyof T;
  valueKey: keyof T;
  optionRender?: (record: T) => ReactNode;
  params?: IRequestParams<T & S>;
  options?: (data: T[]) => EntityOption[];
}

export interface EntityOption {
  label: any;
  value: any;
}
