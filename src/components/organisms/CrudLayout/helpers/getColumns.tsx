import {ColumnsType} from "antd/es/table";
import {isObjectUndefined} from "helpers/isObjectUndefined";
import {Translation} from "react-i18next";
import {ActionButtons} from "../actionButtons";
import {TableActionColumnProps} from "../actionButtons";
import {ActionMenu} from "../actionMenu";

export default function getColumns<
    requestParams = {},
    createRequest = {},
    updateRequest = {},
    patchRequest = {},
    getResponse = {},
    getAllResponse = {}
>(
    data: readonly getAllResponse[],
    actions: TableActionColumnProps<
        requestParams,
        createRequest,
        updateRequest,
        patchRequest,
        getResponse,
        getAllResponse
    >
): ColumnsType<getAllResponse> {
    const mode = actions.mode ?? "icon";

    return !isObjectUndefined(actions)
        ? [
            {
                title: <Translation>{(t) => t("ACTIONS")}</Translation>,
                key: "actions",
                fixed: true,
                align: "center",
                render: (text: string, record: getAllResponse) =>
                    mode === "icon" ? (
                        <ActionButtons<
                                requestParams,
                                createRequest,
                                updateRequest,
                                patchRequest,
                                getResponse,
                                getAllResponse
                            >
                            record={record}
                            actions={actions}
                        />
                    ) : (
                        <ActionMenu<
                                requestParams,
                                createRequest,
                                updateRequest,
                                patchRequest,
                                getResponse,
                                getAllResponse
                            >
                            record={record}
                            actions={actions}
                        />
                    ),
            },
        ]
        : [];
}
