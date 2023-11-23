/**
 * @description a helper fuction that check if the given status is a [401 , 500] satuts to help with error handling - whither to retry the request after error
 * @param {number} status
 * @returns {boolean}
 */
const isRetryOnStatus = (status: number): boolean => {
  const retryOnStatus: number[] = [401, 500];
  if (retryOnStatus.includes(status)) return false;
  return true;
};

export default isRetryOnStatus;
