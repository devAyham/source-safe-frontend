import {IActionButtonsProps} from "./interfaces";
import {Space} from "antd";
import getEditAction from "../helpers/getEditAction";
import getViewDetailsAction from "../helpers/getViewDetailsAction";
import getDeleteAction from "../helpers/getDeleteAction";

export function ActionButtons<
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
    const {editAction, viewDetailsAction, deleteAction} = actions;
    return (
        <>
            <Space>
                {getEditAction<getAllResponse>({
                    editAction,
                    record,
                    mode: "icon"
                })}
                {getViewDetailsAction<getAllResponse>({
                    viewDetailsAction,
                    record,
                    mode:"icon"
                })}
                {getDeleteAction<getAllResponse>({
                    deleteAction,
                    record,
                    mode: "icon"
                })}
                {actions.extraAction && actions.extraAction(record)}
            </Space>
        </>
    );
}
