import decryptData from "../helpers/decryptData";
import encryptData from "../helpers/encryptData";
/**
 * @description get unique id from local storage if exist else generate new id and return it
 * @returns {string}
 */
const useGetUniqueID = (): string => {
  let uid = localStorage.getItem("UUID");
  if (!uid) {
    uid = generateUID();
    localStorage.setItem("UUID", encryptData(uid));
  }
  return decryptData(uid);
};

export default useGetUniqueID;
/**
 * @description  Generate a random string of characters
 * @returns {string}
 */
function generateUID(): string {
  // Generate a random string of characters
  var randomString =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  // Add a timestamp to the end of the string
  var timestamp = new Date().getTime().toString(36);
  return randomString + timestamp;
}
