import { message } from "antd";
import { request } from "libs/axios";
import { FileServiceName } from "services/filesService";
/**
 * @description a helper fuction that used to download the given url
 * @param {string} url
 * @returns {string}
 */
export const downloadFile = (url: string): string => {
  const downloadURL = `${process.env.REACT_APP_BASE_API_URL}${FileServiceName}/download?link=`;
  return `${downloadURL}${url}`;
};

/**
 * @description make request api to download file using its url
 * @param {string} url
 * @returns {Promise<void>}
 */
const downloadURL = async (
  url: string,
  callBackFun?: () => void
): Promise<void> => {
  return request({
    url: downloadFile(url),
    method: "GET",
  })
    .then((res) => {
      console.log(res);
      callBackFun?.();
      const link = document.createElement("a");
      link.setAttribute("download", "");
      link.href = res.data;
      // link.setAttribute("target", "_blank");
      link.click();
    })
    .catch((error: any) => {
      message.error(error.message);
    });
};
export default downloadURL;
