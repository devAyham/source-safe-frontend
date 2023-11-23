import { message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { RcFile, UploadFile, UploadProps } from "antd/lib/upload/interface";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "./styles.module.scss";
import { ReactComponent as ImageLogo } from "assets/svg/generalSvgs/image_icon.svg";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { useTranslation } from "react-i18next";
import { UploadFileStatus } from "antd/es/upload/interface";
import { Button } from "components";
import { useLanguage } from "features/common/hooks/useLanguage";

/** */
export interface ImagesUploderProps {
  /** */
  seesionId: any;
  /** */
  setSessionId: Dispatch<SetStateAction<any>>;
  /** */
  maxCount: number;
  /** */
  imagesUploaded?: string[];
  /** */
  multiple?: boolean;
  /** */
  setIsUploading?: Dispatch<SetStateAction<UploadFileStatus | undefined>>;
  /** */
  height?: string;
  /** */
  width?: string;
  /** */
  withDescription?: boolean;
  /** */
  disabled?: boolean;
}
/**
 * @description a component that used to upload images to server session
 * using the ant design Upload.Dragger and image crop components and
 * session and setSession state to keep the session id that we uploaded on
 * @param {ImagesUploderProps} param0
 *
 */
const ImagesUploder = ({
  maxCount,
  seesionId,
  setSessionId,
  imagesUploaded,
  multiple = false,
  setIsUploading,
  height = "300px",
  width = "100%",
  withDescription = true,
  disabled = false,
}: ImagesUploderProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { t } = useTranslation();
  const { tokens } = useAppSelector((state) => state.auth);
  const { language } = useLanguage();
  //   const [imagesUploaded, setImagesUploaded] = useState<string[]>([]);

  const authHeader = {
    Authorization: `Bearer ${tokens.accessToken}`,
    "Accept-Language": language,
    "current-page": window.location.href,
  };

  const beforeUpload = (file: File) => {
    const isValidIImage =
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg" ||
      file.type === "image/jfif" ||
      file.type === "image/svg+xml" ||
      file.type === "image/webp";
    if (!isValidIImage) {
      message.error(`${file.name} is not a valid image file`);
    }
    return isValidIImage || Upload.LIST_IGNORE;
  };
  const onChange: UploadProps["onChange"] = (info) => {
    const { status } = info.file;
    setIsUploading?.(status);
    setFileList(info.fileList);
    if (status === "done") {
      message.success(`${info.file.response.message}`);
      //   setImagesUploaded([info.fileList[0].thumbUrl as string]);
      setSessionId(info.file.response.data.session_id);
    } else if (status === "error") {
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <ImgCrop
      rotationSlider
      showReset
      fillColor="transparent"
      modalTitle={`${t("PREVIEW_IMAGE")}`}
    >
      <Upload.Dragger
        accept="image/*"
        disabled={disabled}
        name="image"
        multiple={multiple}
        maxCount={maxCount}
        action={`${process.env.REACT_APP_BASE_API_URL}upload-${
          multiple ? "images" : "image"
        }`}
        data={{
          session_id: seesionId,
        }}
        headers={authHeader}
        listType="picture-card"
        fileList={fileList}
        showUploadList={{
          removeIcon: false,
          showRemoveIcon: false,
        }}
        onChange={onChange}
        onRemove={(info) => {}}
        onPreview={onPreview}
        beforeUpload={beforeUpload}
        className={styles.uploadContanier}
      >
        <div className={styles.upload} style={{ width, height }}>
          {imagesUploaded && !seesionId ? (
            imagesUploaded.map((image) => {
              return (
                <>
                  <img src={image} className={styles.image} />
                  <Button
                    className={styles.uploadButton}
                    disabled={fileList.length >= maxCount}
                    type="primary"
                  >
                    {t("EDIT")}
                  </Button>
                </>
              );
            })
          ) : (
            <>
              <ImageLogo className={styles.logo} />
              {withDescription && (
                <>
                  <div className={styles.uploadText}>
                    {t("CLICK_TO_ADD_IMAGES")}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </Upload.Dragger>
    </ImgCrop>
  );
};

export default ImagesUploder;
