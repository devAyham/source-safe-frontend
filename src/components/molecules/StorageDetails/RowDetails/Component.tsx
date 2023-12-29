import { Avatar, Space } from "antd";
import { hexToRGB } from "helpers/hexToRGB";
import { Props } from "./Props";
import styles from "./styles.module.scss";
import { fileCategory } from "data/FileCategory";
import { convertFileSize } from "helpers/convertFileSize";

function Component({ fileType, filesCount, size }: Props) {
  const backgroundOpacity = 0.2;
  return (
    <div className={styles.row}>
      <Avatar
        shape="square"
        size={40}
        icon={fileCategory[fileType].icon}
        style={{
          backgroundColor: hexToRGB(
            fileCategory[fileType].color,
            backgroundOpacity
          ),
          color: fileCategory[fileType].color,
        }}
      />
      <Space direction="vertical" className={styles.details}>
        <div
          className={styles.title}
          style={{
            color: fileCategory[fileType].color,
          }}
        >
          {fileCategory[fileType].text}
        </div>
        <div className={styles.filesNumber}>{filesCount} files</div>
      </Space>
      <div className={styles.storage}>{convertFileSize(size, "MB")}</div>
    </div>
  );
}

export default Component;
