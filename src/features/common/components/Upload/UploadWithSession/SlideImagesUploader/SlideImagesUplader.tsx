import { message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { RcFile, UploadFile, UploadProps } from "antd/lib/upload/interface";
import { ReactComponent as ImageIcon } from "assets/svg/generalSvgs/add_image_icon.svg";
import { useDeleteImage } from "features/common/apis/useDeleteImage";
import { useLanguage } from "features/common/hooks/useLanguage";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ImagesUploderProps } from "../ImagesUploader/ImagesUplader";
import styles from "./styles.module.scss";
/** */
interface SlideImagesUploderProps extends ImagesUploderProps {
  /** */
  editable?: boolean;
  /** */
  setDeletedImgs?: Dispatch<SetStateAction<string[]>>;
  /** */
  deletedImgs?: string[];
  /** */
  aspect?: number;
}
/**
 * @description a component that used to upload images to server session
 * using the ant design Upload.Dragger and image crop components and
 * session and setSession state to keep the session id that we uploaded on
 * and have an addition feature that have the uplaoded images like silder inside it with the
 * ability of removing them from session by the hook useDeleteImage
 * @param {SlideImagesUploderProps} param0
 *
 */
const SlideImagesUploder = ({
  maxCount,
  seesionId,
  setSessionId,
  imagesUploaded,
  multiple = false,
  editable = false,
  setDeletedImgs,
  deletedImgs,
  setIsUploading,
  aspect,
  disabled = false,
}: SlideImagesUploderProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { t } = useTranslation();
  const { token } = useAppSelector((state) => state.auth);
  const { mutateAsync } = useDeleteImage();
  const { language } = useLanguage();

  const authHeader = {
    Authorization: `Bearer ${token}`,
    "Accept-Language": language,
    "current-page": window.location.href,
  };

  useEffect(() => {
    if (imagesUploaded && fileList.length === 0) {
      let arr: UploadFile[] = [];
      imagesUploaded.forEach((image: string, index) => {
        arr.push({
          uid: index.toString(),
          name: image.split("/")[image.split("/").length - 1],
          thumbUrl: image,
          url: image,
        });
      });
      setFileList(arr);
    }
  }, [imagesUploaded]);

  const beforeUpload = (file: File) => {
    const isValidIImage =
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg" ||
      file.type === "image/jfif" ||
      file.type === "image/svg" ||
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
      setSessionId(info.file.response.data.session_id);
    } else if (status === "error") {
    }
  };

  const onRemove: UploadProps["onRemove"] = (info) => {
    return new Promise((resolve, reject) => {
      if (!info.response) {
        if (deletedImgs && setDeletedImgs) {
          let delArr = [...deletedImgs];
          delArr.push(info.url!);
          setDeletedImgs(delArr);
          resolve();
        }
        reject();
      } else {
        mutateAsync({ path: info.response?.data?.path, session_id: seesionId })
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      }
    });
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
      fillColor="transparent"
      rotationSlider
      showReset
      aspect={aspect}
      modalTitle={`${t("PREVIEW_IMAGE")}`}
    >
      <Upload
        name="image"
        multiple={multiple}
        maxCount={maxCount}
        disabled={disabled}
        action={`${process.env.REACT_APP_BASE_API_URL}upload-${
          multiple ? "images" : "image"
        }`}
        data={{
          session_id: seesionId,
        }}
        accept="image/*"
        headers={authHeader}
        listType="picture-card"
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
        onPreview={onPreview}
        beforeUpload={beforeUpload}
        className={styles.uploadContanier}
      >
        <div className={styles.upload}>
          {fileList.length > 0 ? (
            <div style={{ minHeight: "5rem" }} />
          ) : (
            <ImageIcon />
          )}
          <div className={styles.uploadText}>{t("CLICK_TO_ADD_IMAGES")}</div>
        </div>
      </Upload>
    </ImgCrop>
  );
};

export default SlideImagesUploder;
