import {ICrudResponse} from "../services/apiCrud";
import {MutationOptions} from "react-query";
import {CrudTableResponseData} from "./baseResponse";
import {ErrorResponse} from "../apiHooks/useHandleResponse";
import {IRequestParams} from "./requestParams";
import {EntityIdInterface} from "../../interfaces/EntityId.interface";

export interface IApiCrudConfig<
    requestParams,
    createRequest,
    updateRequest,
    patchRequest,
    getResponse,
    getAllResponse
> {
    // Configuration for the getAllEntities request
    getAllConfig?: {
        enabled?: boolean;
        // Optional parameters to pass to the getAll request
        params?: IRequestParams<requestParams>;
        // Optional callback function to execute on successful getAll request
        onSuccess?: (
            data: CrudTableResponseData<getAllResponse>,
            params?: requestParams,
            meta?: unknown,
            extra?: unknown
        ) => void;
        // Optional callback function to execute on error in getAll request
        onError?: (
            error: ErrorResponse,
            params?: requestParams,
            meta?: unknown
        ) => void;
        // Optional flag to disable feedback messages on error
        withOutFeedBackMessage?: boolean;
        // Other options to pass to useQuery
        [key: string]: any;
    };

    // Configuration for the getDetailsEntity request
    getDetailsConfig?: {
        enabled?: boolean;

        // Optional callback function to execute on successful getDetails request
        onSuccess?: (
            data: ICrudResponse<getResponse>,
            params: unknown,
            meta: unknown,
            extra?: unknown
        ) => void;
        // Optional callback function to execute on error in getDetails request
        onError?: (error: ErrorResponse, params: unknown, meta: unknown) => void;
        // Optional flag to disable feedback messages on error
        withOutFeedBackMessage?: boolean;
    } & EntityIdInterface & {
        params?: IRequestParams<getResponse>
    };

    // Configuration for the createEntity request
    createConfig?: MutationOptions<any, ErrorResponse, createRequest> & {
        withOutFeedBackMessage?: boolean;
    };

    // Configuration for the updateEntity request
    updateConfig?: MutationOptions<any, ErrorResponse, updateRequest> & {
        withOutFeedBackMessage?: boolean;
    };

    // Configuration for the patchEntity request
    patchConfig?: MutationOptions<any, ErrorResponse, patchRequest> & {
        withOutFeedBackMessage?: boolean;
    };

    // Configuration for the deleteEntity request
    deleteConfig?: MutationOptions<any, ErrorResponse, any> & {
        withOutFeedBackMessage?: boolean;
    };
}
