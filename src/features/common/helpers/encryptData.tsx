import {AES} from "crypto-js";

/**
 * @description a helper function that used to encryptData the given json  by the aes algorthim and a secret code from the env
 * @param {any} data - usually json
 * @returns {false | string} - the false if the proceess not seccessed
 */
const encryptData = (data: any) => {
  let cipherText: any;
  try {
    cipherText = AES.encrypt(
      JSON.stringify(data),
      process.env.REACT_APP_SECRET_CODE as string
    );
    return cipherText;
  } catch {
    return false;
  }
};
export default encryptData;
