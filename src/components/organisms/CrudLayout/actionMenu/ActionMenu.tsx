import { Button, Dropdown, Menu } from "antd";
import getEditAction from "../helpers/getEditAction";
import getViewDetailsAction from "../helpers/getViewDetailsAction";
import getDeleteAction from "../helpers/getDeleteAction";
import { IActionButtonsProps } from "../actionButtons";
import { ReactComponent as OptionIcon } from "assets/svgs/option_icon.svg";

export default function ActionMenu<
  requestParams,
  createRequest,
  updateRequest,
  patchRequest,
  getResponse,
  getAllResponse
>({
  record,
  actions,
}: IActionButtonsProps<
  requestParams,
  createRequest,
  updateRequest,
  patchRequest,
  getResponse,
  getAllResponse
>) {
  const { editAction, viewDetailsAction, deleteAction } = actions;
  const menu = (
    <Menu>
      {getEditAction<getAllResponse>({
        record,
        editAction,
        mode: "menu",
      })}
      {getViewDetailsAction<getAllResponse>({
        viewDetailsAction,
        record,
        mode: "menu",
      })}
      {getDeleteAction<getAllResponse>({
        deleteAction,
        record,
        mode: "menu",
      })}
      {actions.extraAction && actions.extraAction(record)}
    </Menu>
  );
  return (
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      overlayStyle={{
        width: 150,
      }}
    >
      <Button type={"text"} icon={<OptionIcon />} />
    </Dropdown>
  );
}
