import { Menu, Popconfirm, PopconfirmProps } from "antd";
import { Button } from "components/atoms";
import React, { ReactNode } from "react";
import { DeleteApiRef } from "../actionButtons";
import { QuestionCircleOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
interface getDeleteActionProps<T> {
  mode: "menu" | "icon";
  record: T;
  deleteAction:
    | true
    | {
        label?: ReactNode;
        withConfirm?: PopconfirmProps | undefined;
        onClick?:
          | ((record: T, deleteApiInstance?: DeleteApiRef | undefined) => void)
          | undefined;
      }
    | undefined;
}

function getDeleteAction<T>({
  deleteAction,
  record,
  mode,
}: getDeleteActionProps<T>) {
  return typeof deleteAction === "object" ? (
    mode === "icon" ? (
      deleteAction.withConfirm ? (
        <Popconfirm
          {...deleteAction.withConfirm}
          okType={"danger"}
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          okButtonProps={{ type: "primary", danger: true }}
          cancelButtonProps={{ type: "default", danger: true }}
          onConfirm={() => deleteAction.onClick && deleteAction.onClick(record)}
        >
          <Button type="link" danger style={{ margin: 0, padding: 0 }}>
            {deleteAction.label}
          </Button>
        </Popconfirm>
      ) : (
        <Button
          style={{ margin: 0, padding: 0 }}
          type="link"
          danger
          onClick={() => deleteAction.onClick && deleteAction.onClick(record)}
        >
          {deleteAction.label}
        </Button>
      )
    ) : deleteAction.withConfirm ? (
      <Popconfirm
        {...deleteAction.withConfirm}
        okType={"danger"}
        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        okButtonProps={{ type: "primary", danger: true }}
        cancelButtonProps={{ type: "default", danger: true }}
        onConfirm={() => deleteAction.onClick && deleteAction.onClick(record)}
        showArrow={false}
        className={styles.menu}
        // placement="topLeft"
      >
        <Menu.Item danger>
          {/* <Button danger block> */}
          {deleteAction.label}
          {/* </Button> */}
        </Menu.Item>
      </Popconfirm>
    ) : (
      <Menu.Item
        danger
        onClick={() => deleteAction.onClick && deleteAction.onClick(record)}
      >
        {deleteAction.label}
      </Menu.Item>
    )
  ) : (
    ""
  );
}

export default getDeleteAction;
