import { Modal as AntModal } from "antd";
import { ModalProps } from "./ModalProps";
import styles from "./styles.module.scss";
import { Button } from "components/atoms";
import variables from "styles/variables/_main_colors_vars.module.scss";
import React from "react";
import { Translation } from "react-i18next";

const {
  cancelStyles,
  okStyles,
  footerStyles,
  modal,
  modalLogo,
  largeModalLogo,
  xlModalLogo,
} = styles;
function Modal({
  okButtonProps,
  cancelButtonProps,
  okText = <Translation>{(t) => t("OK")}</Translation>,
  onOk,
  cancelText = <Translation>{(t) => t("CANCEL")}</Translation>,
  confirmLoading,
  title,
  titleIcon,
  ...restProps
}: ModalProps) {
  let marginTop = 0;
  if (titleIcon) {
    const size = titleIcon.size;
    const margin = {
      md: 30,
      lg: 40,
      xl: 60,
    };
    marginTop = margin[size];
    let logoSize =
      size === "md" ? modalLogo : size === "lg" ? largeModalLogo : xlModalLogo;
    title = React.cloneElement(titleIcon?.Component, {
      className: logoSize,
    });
  }
  return (
    <AntModal
      centered
      footer={
        <>
          <Button
            danger
            type="text"
            className={`${cancelStyles} ${cancelButtonProps?.className}`}
            onClick={(e: any) => {
              restProps.onCancel?.(e);
            }}
            {...cancelButtonProps}
          >
            {cancelText}
          </Button>
          <Button
            type="text"
            className={`${okStyles} ${okButtonProps?.className}`}
            style={{ color: variables.primary_color_one }}
            {...okButtonProps}
            onClick={(e: any) => {
              okButtonProps?.onClick?.(e);
              onOk?.(e);
            }}
            loading={confirmLoading || okButtonProps?.loading}
          >
            {okText}
          </Button>
        </>
      }
      {...restProps}
      title={title}
      className={`${modal} ${restProps.className}`}
      bodyStyle={{
        marginTop,
      }}
    />
  );
}

export default Modal;
