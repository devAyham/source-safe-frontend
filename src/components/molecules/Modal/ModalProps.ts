import { ModalProps as AntModalProps } from "antd";
import { ButtonProps } from "components/atoms";
import { ReactElement } from "react";

export interface ModalProps
  extends Omit<AntModalProps, "cancelButtonProps" | "okButtonProps"> {
  titleIcon?: {
    Component: ReactElement;
    size: "md" | "lg" | "xl";
  };
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}
