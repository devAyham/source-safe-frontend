import {IUseMutationOptions} from "./baseResponse";

export interface IApiCrudOptions<T> {
    serviceName: string;
    getAllOptions?: IUseMutationOptions;
    getDetailsOptions?: IUseMutationOptions;
    createOptions?: IUseMutationOptions;
    updateOptions?: IUseMutationOptions;
    deleteOptions?: IUseMutationOptions;
    patchOptions?: IUseMutationOptions;
}