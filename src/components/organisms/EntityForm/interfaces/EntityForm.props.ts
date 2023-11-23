import { FormInstance, FormProps, RowProps } from "antd";
import FieldProps from "./FormField.props";
import { ButtonProps } from "../../../atoms";
import { ReactNode } from "react";

export interface EntityFormProps<
  SubmittedValues,
  createRequest,
  patchRequest,
  getResponse,
  extraData
> {
  // initialValues: Partial<Record<keyof (SubmittedValues | getResponse), any>>;
  initialValues: Partial<Record<keyof SubmittedValues, any>>;
  // initialValues: SubmittedValues;
  // extraDate: extraData;
  extraData?: Partial<Record<keyof extraData, any>>;
  schema: FieldProps<getResponse, SubmittedValues, extraData>[];
  onSubmit: (values: SubmittedValues & extraData, extraData?: extraData) => any;
  formName?: string;
  formProps: FormProps;
  rowProps?: RowProps;
  actionButtonProps?: ButtonProps;
  actionName?: ReactNode;
  getFormInstance?: (form: FormInstance<SubmittedValues & extraData>) => any;
}
