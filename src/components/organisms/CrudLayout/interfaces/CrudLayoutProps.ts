import {ColProps, TableProps} from "antd";
import {UseMutationResult, UseQueryResult} from "react-query";
import {
    DeleteApiRef,
    TableActionColumnProps,
    UpdateApiRef,
} from "../actionButtons";
import {PaginationProps} from "components";
import {IBaseApiResponse} from "api/interfaces/baseResponse";
import {ErrorResponse} from "api/apiHooks/useHandleResponse";
import {ICrudResponse} from "api/services/apiCrud";
import {ServiceType} from "api/constants/servicesName";
import {IApiCrudConfig} from "api/interfaces/apiCrudConfig";
import {viewTypeTypes} from "features/common/types/viewTypeTypes.d";
import {CSSProperties, ReactNode} from "react";
import {StructuredCardProps} from "components/molecules/cards/StructuredCard/StructuredCardProps";
import {GenericOmit} from "types/GenericOmit.type";
import {Gutter} from "antd/es/grid/row";

// IApiCrudConfig<any, any, any, any, any, any>

interface ApiCRUDResult<
    requestParams = {},
    createRequest = {},
    updateRequest = {},
    patchRequest = {},
    getResponse = {},
    getAllResponse = {}
> {
    getAllEntityCallback: (
        getAllApiInstance: UseQueryResult<
            IBaseApiResponse<requestParams>,
            ErrorResponse
        >
    ) => any;
    getDetailsEntityCallback: (
        getDetailsApiInstance: UseQueryResult<
            ICrudResponse<getResponse>,
            ErrorResponse
        >,
        record: getAllResponse
    ) => any;
    createEntityCallback: (
        createApiInstance: UseMutationResult<
            ICrudResponse<createRequest>,
            ErrorResponse,
            any,
            unknown
        >
    ) => any;
    updateEntityCallback: (
        updateApiInstance: UseMutationResult<
            ICrudResponse<updateRequest>,
            ErrorResponse,
            any,
            () => void
        >
    ) => any;
    patchEntityCallback: (
        patchApiInstance: UseMutationResult<
            ICrudResponse<getResponse>,
            ErrorResponse,
            patchRequest,
            () => void
        >,
        record: getAllResponse
    ) => any;
    deleteEntityCallback: (
        deleteApiInstance: UseMutationResult<
            {
                id: string | number;
            },
            ErrorResponse,
            {
                id: string | number;
            },
            unknown
        >,
        record: getAllResponse
    ) => any;
}

export interface ISelectionConfigProps {
    selectionMode: boolean;
    checkAllRows: boolean;
    setcheckAllRows: Function;
    setselectionMode: Function;
}

export interface ICrudLayoutProps<
    requestParams,
    createRequest,
    updateRequest,
    patchRequest,
    getResponse,
    getAllResponse
> {
    showRefetchingHeader?: boolean;
    tableProps?: TableProps<getAllResponse>;
    containerProps?: {
        className?: string;
        style?: CSSProperties;
    };
    viewType?: viewTypeTypes;
    viewCardGrid?: ColProps;
    serviceName: ServiceType;
    selection?: ISelectionConfigProps;
    cardConfig?: (
        record: getAllResponse,
        items: readonly getAllResponse[]
    ) => GenericOmit<StructuredCardProps, "actions">;
    cardRender?: (
        record: getAllResponse,
        items: readonly getAllResponse[],
        actions?: {
            deleteAction: DeleteApiRef;
            editAction: UpdateApiRef<patchRequest, getResponse>;
        }
    ) => ReactNode;
    cardLayoutRowGutter?: Gutter | [Gutter, Gutter];
    cardLayoutMargin?: string;
    pagination?: PaginationProps | false;
    actions?: TableActionColumnProps<
        requestParams,
        createRequest,
        updateRequest,
        patchRequest,
        getResponse,
        getAllResponse
    >;
    apiCRUDResult?: Partial<
        ApiCRUDResult<
            requestParams,
            createRequest,
            updateRequest,
            patchRequest,
            getResponse,
            getAllResponse
        >
    >;
    apiCrudConfig?: IApiCrudConfig<
        requestParams,
        createRequest,
        updateRequest,
        patchRequest,
        getResponse,
        getAllResponse
    >;
}
