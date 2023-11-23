import { ButtonProps as AntButtonProps } from "antd";
import { ButtonType } from "types/Button.type";

export interface ButtonProps extends Omit<AntButtonProps, "type"> {
  type?: ButtonType;
  clickable?: boolean;
}
