import { ErrorResponse, useHandle } from "./useHandleResponse";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CRUDService, ICrudResponse } from "../services/apiCrud";
import { IApiCrudConfig } from "../interfaces/apiCrudConfig";
import { ServiceType } from "../constants/servicesName";
import {
  generateEntityCollectionQueryKey,
  generateEntityQueryKey,
} from "../helpers/queryKeysFactory";
import { IBaseApiResponse } from "../interfaces/baseResponse";
import { ICustomEndpoints } from "api/interfaces/customEndPoints";
import { useAppSelector } from "../../features/common/hooks/useReduxHooks";

export default function useApiCRUD<
  requestParams = {},
  createRequest = {},
  updateRequest = {},
  patchRequest = {},
  getResponse = {},
  getAllResponse = {}
>(
  serviceName: ServiceType,
  options?: IApiCrudConfig<
    requestParams,
    createRequest,
    updateRequest,
    patchRequest,
    getResponse,
    getAllResponse
  >,
  customEndPoint?: ICustomEndpoints
) {
  //Options
  const {
    getAllConfig,
    getDetailsConfig,
    deleteConfig,
    patchConfig,
    updateConfig,
    createConfig,
  } = options ?? {};

  const queryClient = useQueryClient();
  const { handleError, handleSuccess } = useHandle();

  const { tokens } = useAppSelector((state) => state.auth);
  const { create, deleteItem, getAll, getDetails, update, patchItem } =
    new CRUDService<
      requestParams,
      createRequest,
      updateRequest,
      patchRequest,
      getResponse,
      getAllResponse
    >(serviceName, customEndPoint, {
      token: tokens.accessToken,
    });

  // get All entities
  const getAllEntities = useQuery<
    any,
    ErrorResponse,
    IBaseApiResponse<getAllResponse>
  >(
    generateEntityCollectionQueryKey({
      entityType: serviceName,
      params: getAllConfig?.params,
    }),
    () => getAll(getAllConfig?.params),
    {
      enabled: false,
      retry: 3,
      ...getAllConfig,
      onSuccess: (data: IBaseApiResponse<getAllResponse>) => {
        getAllConfig?.onSuccess &&
          getAllConfig.onSuccess(
            {
              ...data.data,
            },
            undefined,
            undefined,
            {
              ...data?.extra,
            }
          );
      },
      onError: (error: ErrorResponse) => {
        !getAllConfig?.withOutFeedBackMessage && handleError(error);
        getAllConfig?.onError && getAllConfig.onError(error);
      },
    }
  );

  //get Details Entity
  const getDetailsEntity = useQuery<
    any,
    ErrorResponse,
    ICrudResponse<getResponse>
  >(
    generateEntityQueryKey({
      entityType: serviceName,
      entityId: getDetailsConfig?.id,
    }),
    () =>
      getDetails({
        id: getDetailsConfig?.id ?? "",
        params: getDetailsConfig?.params,
      }),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      retry: 3,

      ...getDetailsConfig,

      onSuccess: (data) => {
        getDetailsConfig?.onSuccess &&
          getDetailsConfig.onSuccess(
            {
              data: data.data,
            },
            {},
            {},
            {
              ...data.extra,
            }
          );
      },
      onError: (error: ErrorResponse) => {
        !getDetailsConfig?.withOutFeedBackMessage && handleError(error);
        getDetailsConfig?.onError && getDetailsConfig.onError(error, {}, {});
      },
    }
  );

  // create entity
  const createEntity = useMutation(create, {
    ...createConfig,
    onSuccess: (data, variables, context) => {
      // Invalidate and refetch
      queryClient.invalidateQueries([serviceName]);
      createConfig?.onSuccess &&
        createConfig.onSuccess(data, variables, context);
      !createConfig?.withOutFeedBackMessage &&
        handleSuccess(data, data.message);
    },
    onError: (error, variables, context) => {
      createConfig?.onError && createConfig.onError(error, variables, context);
      !createConfig?.withOutFeedBackMessage && handleError(error);
      createEntity.reset();
    },
    onMutate: (data) => {
      return data;
      // // Optimistically update the cache
      // const oldData = queryClient.getQueryData([serviceName]);
      // queryClient.setQueryData([serviceName], (prev: any) => [
      //     ...(prev ?? []),
      //     {
      //         ...data,
      //         id: Date.now(), // add a temporary ID to the new entity
      //     },
      // ]);
      // return () => {
      //     // Revert the optimistic update if the mutation fails
      //     queryClient.setQueryData([serviceName], oldData);
      // };
    },
  });

  // update Entity
  const updateEntity = useMutation(update, {
    ...updateConfig,
    onSuccess: (data, variables, context) => {
      updateConfig?.onSuccess &&
        updateConfig.onSuccess(data, variables, context);
      // Invalidate and refetch
      queryClient.invalidateQueries([serviceName]);
      !updateConfig?.withOutFeedBackMessage &&
        handleSuccess(data, data.message);
    },
    onError: (error, variables, context) => {
      !updateConfig?.withOutFeedBackMessage && handleError(error);
      updateConfig?.onError && updateConfig.onError(error, variables, context);
    },
    onMutate: (data: any) => {
      return data;
      // Optimistically update the cache
      // const oldData: any = queryClient.getQueryData([serviceName]);
      // const newData = (oldData ?? []).map((item: any) => {
      //     if (item.id === data.id) {
      //         return {
      //             ...item,
      //             ...data,
      //         };
      //     }
      //     return item;
      // });
      // queryClient.setQueryData([serviceName], newData);
      // return () => {
      //     // Revert the optimistic update if the mutation fails
      //     queryClient.setQueryData([serviceName], oldData);
      // };
    },
  });

  // patch Entity
  const patchEntity = useMutation(patchItem, {
    ...patchConfig,
    onSuccess: (data, variables, context) => {
      patchConfig?.onSuccess && patchConfig.onSuccess(data, variables, context);
      // Invalidate and refetch
      queryClient.invalidateQueries([serviceName]);
      !patchConfig?.withOutFeedBackMessage && handleSuccess(data, data.message);
    },
    onError: (error, variables, context) => {
      !patchConfig?.withOutFeedBackMessage && handleError(error);
      patchConfig?.onError && patchConfig.onError(error, variables, context);
    },
    onMutate: (data: any) => {
      return data;
      // Optimistically update the cache
      // const oldData: any = queryClient.getQueryData([serviceName]);
      // const newData = (oldData ?? []).map((item: any) => {
      //     if (item.id === data.id) {
      //         return {
      //             ...item,
      //             ...data,
      //         };
      //     }
      //     return item;
      // });
      // queryClient.setQueryData([serviceName], newData);
      // return () => {
      //     // Revert the optimistic update if the mutation fails
      //     queryClient.setQueryData([serviceName], oldData);
      // };
    },
  });

  // delete entity
  const deleteEntity = useMutation(deleteItem, {
    ...deleteConfig,
    onSuccess: (data, variables, context) => {
      deleteConfig?.onSuccess &&
        deleteConfig.onSuccess(data, variables, context);
      // Invalidate and refetch
      queryClient.invalidateQueries([serviceName]);
      !deleteConfig?.withOutFeedBackMessage &&
        handleSuccess(data, data.message);
    },
    onError: (error, variables, context) => {
      const contextCallback = context as any;
      contextCallback();

      deleteConfig?.onError && deleteConfig.onError(error, variables, context);
      !deleteConfig?.withOutFeedBackMessage && handleError(error);
    },
    onMutate: ({ id }) => {
      // Optimistically update the cache
      const oldData: any = queryClient.getQueryData(
        generateEntityCollectionQueryKey({
          entityType: serviceName,
          params: getAllConfig?.params,
        })
      );
      const oldItems = oldData?.data?.items;
      const newData = (oldItems ?? []).filter((item: any) => item.id !== id);
      queryClient.setQueryData(
        generateEntityCollectionQueryKey({
          entityType: serviceName,
          params: getAllConfig?.params,
        }),
        { ...oldData, data: { ...oldData?.data, items: newData } }
      );
      return () => {
        // Revert the optimistic update if the mutation fails
        queryClient.setQueryData(
          generateEntityCollectionQueryKey({
            entityType: serviceName,
            params: getAllConfig?.params,
          }),
          { ...oldData }
        );
      };
    },
  });

  // return =>
  return {
    getAllEntities,
    getDetailsEntity,
    createEntity,
    updateEntity,
    deleteEntity,
    patchEntity,
  };
}
