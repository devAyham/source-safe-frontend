import { message, Upload } from "antd";
import { UploadFile, UploadProps } from "antd/lib/upload/interface";
import { ReactComponent as PapersIcon } from "assets/svg/generalSvgs/papers_icon.svg";
import { ReactComponent as UploadIcon } from "assets/svg/generalSvgs/upload_icon.svg";
import { Button } from "components";
import { useLanguage } from "features/common/hooks/useLanguage";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GenericOmit } from "types/GenericOmit.type";
import { ImagesUploderProps } from "../ImagesUploader/ImagesUplader";
import styles from "./styles.module.scss";

/** */
interface FilesUploderProps
  extends GenericOmit<
    ImagesUploderProps,
    "imagesUploaded" | "height" | "width"
  > {
  /** */
  filesUploaded?: string[];
  /** */
  editable?: boolean;
  /** */
  setDeletedFiles?: Dispatch<SetStateAction<string[]>>;
  /** */
  deletedFiles?: string[];
  /** */
  url: string;
  /** */
  label?: any;
}
/**
 * @description a component that used to upload files (pdf and can change it) to server session
 * using the ant design upload component and
 * session and setSession state to keep the session id that we uploaded on
 * @param {FilesUploderProps} param0
 *
 */
const FilesUploder = ({
  maxCount,
  seesionId,
  setSessionId,
  filesUploaded,
  multiple = false,
  editable = false,
  setDeletedFiles,
  deletedFiles,
  url,
  setIsUploading,
  label,
  disabled = false,
}: FilesUploderProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { tokens } = useAppSelector((state) => state.auth);
  const { language } = useLanguage();
  const authHeader = {
    Authorization: `Bearer ${tokens.accessToken}`,
    "Accept-Language": language,
    "current-page": window.location.href,
  };

  useEffect(() => {
    if (filesUploaded && fileList.length === 0) {
      let arr: UploadFile[] = [];
      filesUploaded.forEach((file: string, index) => {
        arr.push({
          uid: index.toString(),
          name: file.split("/")[file.split("/").length - 1],
          url: file,
        });
      });
      setFileList(arr);
    }
  }, [filesUploaded]);

  const beforeUpload = (file: File) => {
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      message.error(`${file.name} is not a pdf file`);
    }
    return isPDF || Upload.LIST_IGNORE;
  };
  const onChange: UploadProps["onChange"] = (info) => {
    const { status } = info.file;
    setIsUploading?.(status);
    setFileList(info.fileList);
    if (status === "done") {
      message.success(`${info.file.response.message}`);
      setSessionId(info.file.response.data.session_id);
    } else if (status === "error") {
    }
  };

  const onRemove: UploadProps["onRemove"] = (info) => {
    if (deletedFiles && setDeletedFiles) {
      let delArr = [...deletedFiles];
      delArr.push(info.url!);
      setDeletedFiles(delArr);
    }
  };

  return (
    <div className={styles.fileUploader}>
      <div className={styles.upload}>
        <div className={styles.uploadContent}>
          <PapersIcon />
          {fileList.length === 0 ? (
            <div className={styles.uploadText}>{label}</div>
          ) : null}
        </div>
        <Upload
          disabled={disabled}
          name="file"
          multiple={multiple}
          maxCount={maxCount}
          action={`${process.env.REACT_APP_BASE_API_URL}${url}`}
          data={{
            session_id: seesionId,
          }}
          accept=".pdf"
          headers={authHeader}
          listType={"picture"}
          fileList={fileList}
          showUploadList={
            !editable
              ? {
                  removeIcon: false,
                  showRemoveIcon: false,
                }
              : undefined
          }
          onChange={onChange}
          onRemove={onRemove}
          beforeUpload={beforeUpload}
          className={styles.uploadContanier}
        >
          <Button
            className={styles.uploadButton}
            type="primary"
            icon={<UploadIcon />}
            disabled={disabled}
          />
        </Upload>
      </div>
    </div>
  );
};

export default FilesUploder;
