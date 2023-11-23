import {ErrorResponse} from "api/apiHooks/useHandleResponse";
import {ICrudResponse} from "api/services/apiCrud";
import {ReactNode} from "react";
import {UseMutationResult, UseQueryResult} from "react-query";
import {PopconfirmProps} from "antd";

export type DeleteApiRef = UseMutationResult<
    {
        id: string | number;
    },
    ErrorResponse,
    {
        id: string | number;
    },
    unknown
>;
export type UpdateApiRef<T, K> = UseMutationResult<
    ICrudResponse<K>,
    ErrorResponse,
    T,
    () => void
>;

export interface TableActionColumnProps<
    requestParams,
    createRequest,
    updateRequest,
    patchRequest,
    getResponse,
    getAllResponse
> {
    mode?: "menu"|"icon",
    editAction?: {
        label?: ReactNode;
        onClick?: (
            record: getAllResponse,
            patchApiInstance?: UpdateApiRef<patchRequest, getResponse>
        ) => void;
    };
    viewDetailsAction?: {
        label?: ReactNode;
        onClick?: (
            record: getAllResponse,
            getDetailsApiInstance?: UseQueryResult<
                ICrudResponse<getResponse>,
                ErrorResponse
            >
        ) => void;
    };
    deleteAction?:
        | true
        | {
        label?: ReactNode;
        withConfirm?: PopconfirmProps;
        onClick?: (
            record: getAllResponse,
            deleteApiInstance?: DeleteApiRef
        ) => void;
    };
    extraAction?: (record: getAllResponse) => any;
}

export interface IActionButtonsProps<
    requestParams,
    createRequest,
    updateRequest,
    patchRequest,
    getResponse,
    getAllResponse
> {
    record: getAllResponse;
    actions: TableActionColumnProps<
        requestParams,
        createRequest,
        updateRequest,
        patchRequest,
        getResponse,
        getAllResponse
    >;
}
