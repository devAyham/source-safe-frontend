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
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
      },
    },
  });

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
