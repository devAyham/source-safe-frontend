import { message } from "antd";
import { ReactComponent as DownloadIcon } from "assets/svgs/download_icon.svg";
import styles from "./styles.module.scss";
import { ReactNode } from "react";
import { request } from "libs/axios";
import { Button } from "components";
import { ButtonType } from "types/Button.type";
import { useLanguage } from "features/common/hooks/useLanguage";
/** */
interface DownloadButtonProps {
  /** */
  url: string;
  /** */
  icon?: ReactNode;
  /** */
  children?: any;
  /** */
  type?: ButtonType;
}
/**
 *  @description a button for downlaod a given url
 * @param {DownloadButtonProps} param0
 * @returns
 */
const DownloadButton = ({
  url,
  icon = <DownloadIcon />,
  children,
  type = "primary",
}: DownloadButtonProps) => {
  const { language } = useLanguage();
  return (
    <Button
      className={styles.downloadButton}
      type={type}
      icon={icon}
      onClick={() => {
        return request({
          url: `${process.env.REACT_APP_BASE_API_URL}${url}`,
          method: "GET",
          headers: {
            "Accept-Language": language,
            "current-page": window.location.href,
          },
        })
          .then((res) => {
            const link = document.createElement("a");
            link.setAttribute("download", "");
            link.href = res.request?.responseURL;
            // link.setAttribute("target", "_blank");
            link.click();
          })
          .catch((error: any) => {
            message.error(error.message);
          });
      }}
      children={children}
    />
  );
};

export default DownloadButton;
