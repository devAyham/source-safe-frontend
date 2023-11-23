import { Image as AntImage } from "antd";
import { useTranslation } from "react-i18next";
import { ImageProps } from "./ImageProps";

function Image({ preview = false, ...restProps }: ImageProps) {
  const { t } = useTranslation();
  return (
    <AntImage
      {...restProps}
      preview={
        preview
          ? {
              mask: t("PREVIEW"),
            }
          : false
      }
    />
  );
}

export default Image;
