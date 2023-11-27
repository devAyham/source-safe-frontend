// import { useRefreshToken } from "api/apiHooks/useRefreshToken";
// import { AuthSliceActions } from "features/auth/redux/slices/authSlice";

// /**
//  * @description a helper fuction that check if the given status is a [401 , 500] satuts to help with error handling - whither to retry the request after error
//  * @param {number} status
//  * @returns {boolean}
//  */
// const useCheckRetryStatus = () => {
//   const { getNewTokens } = useRefreshToken();
//   const isRetryOnStatus = async (status: number): Promise<boolean> => {
//     if (status === 401) {
//       return await getNewTokens();
//     }
//     const retryOnStatus: number[] = [500];
//     if (retryOnStatus.includes(status)) return false;
//     return true;
//   };
//   return { isRetryOnStatus };
// };

// export default useCheckRetryStatus;
