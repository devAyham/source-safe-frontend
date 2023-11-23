import decryptData from "features/common/helpers/decryptData";
import encryptData from "features/common/helpers/encryptData";
import { QueryClient, QueryClientProvider } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";

/**
 * @namespace CustomQueryClientProvider
 */
/**
 * @description have a default options and defalut onError handler
 * encrypt the query data and store it in the local storge for better preformance
 * @param {ReactNode} children - wrapped components
 */
const CustomQueryClientProvider = ({ children }: any) => {
  //   const dispatch = useAppDispatch();
  // useErrorHandler();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  // {
  //   defaultOptions: {
  //     queries: {
  //       // cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  //       refetchOnMount: "always",
  //           refetchOnWindowFocus: false,
  //           retry(failureCount, error: any) {
  //         const RetryCount = 3;
  //         if (
  //             failureCount < RetryCount &&
  //             isRetryOnStatus(error.response?.status)
  //         )
  //           return true;
  //         else return false;
  //       },
  //       onError(err: any) {
  //         dispatch(
  //             UiSliceActions.SetError({
  //               message: err.response?.data?.message ?? err.message,
  //               code: err.response?.status ?? err.code,
  //               navigate: err.response?.config?.method === "get",
  //             })
  //         );
  //       },
  //     },
  //     mutations: {
  //       onMutate() {
  //         dispatch(UiSliceActions.SetError(null));
  //       },
  //       onError(err: any, variables, context) {
  //         dispatch(
  //             UiSliceActions.SetError({
  //               message: err.response?.data?.message ?? err.message,
  //               code: err.response?.status ?? err.code,
  //               navigate: err.response?.config?.method === "get",
  //             })
  //         );
  //       },
  //       retry: 0,
  //     },
  //   },
  // }

  const sessionStoragePersistor = createWebStoragePersistor({
    storage: window.sessionStorage,
    deserialize: decryptData,
    serialize: encryptData,
  });

  persistQueryClient({
    queryClient,
    persistor: sessionStoragePersistor,
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default CustomQueryClientProvider;
