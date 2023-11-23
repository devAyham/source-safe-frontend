import {useMutation, useQuery} from "react-query";
import {ICrudResponse} from "../services/apiCrud";
import {ErrorResponse} from "../apiHooks/useHandleResponse";

export interface ApiCRUDResult<
    getAllResponse = any,
    getResponse = any,
    createResponse = any,
    updateResponse = any,
    patchResponse = any,
    deleteResponse = any
> {
    getAllEntities: ReturnType<typeof useQuery>;
    getDetailsEntity: ReturnType<typeof useQuery>;
    createEntity: ReturnType<typeof useMutation<ICrudResponse<getResponse>, ErrorResponse, createResponse, unknown>>;
    updateEntity: ReturnType<typeof useMutation<ICrudResponse<getResponse>, ErrorResponse, updateResponse, () => void>>
    patchEntity: ReturnType<typeof useMutation<ICrudResponse<getResponse>, ErrorResponse, patchResponse, () => void>>
    deleteEntity: ReturnType<typeof useMutation<ICrudResponse<getResponse>, ErrorResponse, string | number, unknown>>
}