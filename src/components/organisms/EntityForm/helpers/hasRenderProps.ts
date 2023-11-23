import { FieldProps } from "../interfaces";

export function hasRenderProp(field: FieldProps<any, any, any>) {
  return field.hasOwnProperty("render");
}
export function hasControlRenderProp(field: FieldProps<any, any, any>) {
  return field.hasOwnProperty("withControlRender");
}
