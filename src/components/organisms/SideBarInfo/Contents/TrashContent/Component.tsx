import { Space } from "antd";
import { Button } from "components/atoms";
import { fileCategory } from "data/FileCategory";
import styles from "./styles.module.scss";

function Component() {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
      size={15}
    >
      <Button
        block
        type="primary"
        icon={fileCategory.image.icon}
        style={{
          background: fileCategory.image.color,
          color: "white",
        }}
        className={styles.button}
      >
        Images
      </Button>
      <Button
        block
        type="primary"
        icon={fileCategory.audio.icon}
        style={{
          background: fileCategory.audio.color,
          color: "white",
        }}
        className={styles.button}
      >
        Audios
      </Button>
      <Button
        block
        type="primary"
        icon={fileCategory.document.icon}
        style={{
          background: fileCategory.document.color,
          color: "white",
        }}
        className={styles.button}
      >
        Document
      </Button>
      <Button
        block
        type="primary"
        icon={fileCategory.video.icon}
        style={{
          background: fileCategory.video.color,
          color: "white",
        }}
        className={styles.button}
      >
        Videos
      </Button>
      <Button
        block
        type="primary"
        icon={fileCategory.other.icon}
        style={{
          background: fileCategory.other.color,
          color: "white",
        }}
        className={styles.button}
      >
        Others
      </Button>
    </Space>
  );
}

export default Component;
