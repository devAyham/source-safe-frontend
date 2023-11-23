import {AES, enc} from "crypto-js";

/**
 * @description a helper function that used to decrypt the given string if it is a valid one by the aes algorthim and a secret code from the env
 * @param {string} cipherText
 * @returns {false | JSON} - the false if the cipherText is not valid
 */
const decryptData = (cipherText: string) => {
  // let bytes: any;/
  try {
    let bytes = AES.decrypt(
      cipherText,
      process.env.REACT_APP_SECRET_CODE as string
    );
    return JSON.parse(bytes.toString(enc.Utf8));
  } catch (err) {
    // ("cant decrypt data", err);
    return false;
  }
};

export default decryptData;
