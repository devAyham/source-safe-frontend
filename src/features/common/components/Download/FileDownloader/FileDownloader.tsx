import styles from "./styles.module.scss";
import { ReactComponent as FileIcon } from "assets/svgs/file_icon.svg";
import { ReactComponent as DownloadIcon } from "assets/svgs/download_icon.svg";
import downloadURL from "features/common/helpers/downloadFile";
import { Button } from "components";
/** */
interface FilesDownloaderProps {
  /** */
  description: string;
  /** */
  url: string;
}
/**
 * @description a component that used to downlaod a files with a help from a helper function (@function downloadURL() )
 * @param {FilesDownloaderProps} param0
 * @returns
 */
const FilesDownloader = ({ description, url }: FilesDownloaderProps) => {
  return (
    <div className="fileUploader">
      <div className={styles.upload}>
        <div className={styles.uploadContent}>
          <FileIcon />
          <div className={styles.uploadText}>{description}</div>
        </div>
        <div className={styles.uploadContanier}>
          <Button
            className={styles.uploadButton}
            type="primary"
            icon={<DownloadIcon />}
            onClick={() => {
              console.log(url);
              // window.open(url, "_blank");
              // downloadURL(url);
              const link = document.createElement("a");
              link.setAttribute("download", "");
              link.href = `${process.env.REACT_APP_BASE_API_URL}download?url=${url}`;
              link.setAttribute("target", "_blank");
              link.click();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilesDownloader;
