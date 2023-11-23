import {Menu} from "antd";
import {Button} from "components/atoms";
import React, {ReactNode} from "react";
import {UpdateApiRef} from "../actionButtons";

interface getEditActionProps<T> {
    mode: "menu" | "icon"
    record: T;
    editAction:
        | {
        label?: ReactNode;
        onClick?:
            | ((
            record: T,
            patchApiInstance?: UpdateApiRef<any, any> | undefined
        ) => void)
            | undefined;
    }
        | undefined;
}

function getEditAction<T>({
                              editAction,
                              record,
                              mode
                          }: getEditActionProps<T>) {
    return (
        editAction ? mode === "icon" ? (

            <Button
                style={{margin: 0, padding: 0}}
                type="link"
                onClick={() => editAction.onClick && editAction.onClick(record)}
            >
                {editAction.label}
            </Button>
        ) : <Menu.Item
            onClick={() => editAction.onClick && editAction.onClick(record)}>{editAction.label}</Menu.Item> : ""
    );
}

export default getEditAction;
