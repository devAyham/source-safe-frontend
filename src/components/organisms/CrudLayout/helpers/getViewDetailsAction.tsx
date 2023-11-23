import {Menu} from "antd";
import {ErrorResponse} from "api/apiHooks/useHandleResponse";
import {ICrudResponse} from "api/services/apiCrud";
import {Button} from "components/atoms";
import React, {ReactNode} from "react";
import {UseQueryResult} from "react-query";

interface getViewDetailsActionProps<T> {
    record: T;
    mode?: "menu" | "icon"
    viewDetailsAction:
        | {
        label?: ReactNode;
        onClick?:
            | ((
            record: T,
            getDetailsApiInstance?:
                | UseQueryResult<ICrudResponse<any>, ErrorResponse>
                | undefined
        ) => void)
            | undefined;
    }
        | undefined;
}

function getViewDetailsAction<T>({
                                     viewDetailsAction,
                                     record,
                                     mode
                                 }: getViewDetailsActionProps<T>) {
    return (
        viewDetailsAction ? mode === "icon" ? (
            <Button
                type="link"
                onClick={() =>
                    viewDetailsAction.onClick && viewDetailsAction.onClick(record)
                }
            >
                {viewDetailsAction.label}
            </Button>
        ) : <Menu.Item
            onClick={() =>
                viewDetailsAction.onClick && viewDetailsAction.onClick(record)
            }>{viewDetailsAction.label}</Menu.Item> : ""
    );
}

export default getViewDetailsAction;
