import { ServiceType } from "../../../../api/constants/servicesName";
import { EntityIdType } from "../../../../types/EntityId.type";
import { MutationOptions } from "react-query";
import { ErrorResponse } from "../../../../api/apiHooks/useHandleResponse";
import { EntityFormProps } from "./EntityForm.props";
import { GenericOmit } from "types/GenericOmit.type";
import { ICrudResponse } from "api/services/apiCrud";
import { EntityIdInterface } from "../../../../interfaces/EntityId.interface";
import { IRequestParams } from "../../../../api/interfaces/requestParams";

export interface EntityFormContainerProps<
  SubmittedValues,
  createRequest,
  patchRequest,
  getResponse,
  extraData
> extends GenericOmit<
    EntityFormProps<
      SubmittedValues,
      createRequest,
      patchRequest,
      getResponse,
      extraData
    >,
    "onSubmit" | "initialValues"
  > {
  handleSubmit?: (
    values: SubmittedValues & extraData,
    extraData?: extraData
  ) => any;
  entityId?: EntityIdType;
  serviceName: ServiceType;
  extraData?: extraData;
  apiOptions?: {
    // Configuration for the createEntity request
    createConfig?: MutationOptions<
      ICrudResponse<getResponse>,
      ErrorResponse,
      createRequest | SubmittedValues
    > & {
      withOutFeedBackMessage?: boolean;
    };
    // Configuration for the patchEntity request
    patchConfig?: MutationOptions<
      ICrudResponse<getResponse>,
      ErrorResponse,
      Partial<patchRequest | SubmittedValues>
    > & {
      withOutFeedBackMessage?: boolean;
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
    };
  };
  mappers?: {
    mapCreateEntity?: (
      data: SubmittedValues & extraData
    ) => createRequest | false;
    mapPatchEntity?: (
      data: SubmittedValues & extraData & { id: EntityIdType }
    ) => patchRequest | false;
    mapGetDetailsEntity?: (
      data: getResponse
    ) => Partial<Record<keyof (SubmittedValues & extraData), any>>;
  };
}
