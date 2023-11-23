import { message } from "antd";
import { request } from "libs/axios";
import i18n from "libs/i18n";
/**
 * @description a helper fuction that used to download the given url
 * @param {string} url
 * @returns {string}
 */
export const downloadFile = (url: string): string => {
  const downloadURL = `${process.env.REACT_APP_BASE_API_URL}download?url=`;
  return `${downloadURL}${url}`;
};

/**
 * @description make request api to download file using its url
 * @param {string} url
 * @returns {Promise<void>}
 */
const downloadURL = async (url: string): Promise<void> => {
  const language = i18n.language;

  return request({
    // url: `${url}`,
    url: `${process.env.REACT_APP_BASE_API_URL}download?url=${url}`,
    method: "GET",
    headers: {
      "Accept-Language": language,
      "current-page": window.location.href,
    },
  })
    .then((res) => {
      console.log(res.request?.responseURL);
      const link = document.createElement("a");
      link.setAttribute("download", "");
      link.href = res.request?.responseURL;
      // link.setAttribute("target", "_blank");
      link.click();
    })
    .catch((error: any) => {
      message.error(error.message);
    });
};
export default downloadURL;
