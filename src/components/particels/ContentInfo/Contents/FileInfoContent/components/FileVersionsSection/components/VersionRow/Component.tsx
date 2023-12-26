import { Avatar, Tooltip } from "antd";
import { Props } from "./Props";
import styles from "./styels.module.scss";
import { transformExtentionToFileType } from "helpers/transfromExtentionToFileType";
import { fileCategory } from "data/FileCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import downloadURL from "helpers/downloadUrl";
import { convertFileSize } from "helpers/convertFileSize";

function Component({ latest, extension, name, path, size, user }: Props) {
  const navigate = useNavigate();
  const fileType = fileCategory[transformExtentionToFileType(extension)];
  return (
    <div className={styles.container}>
      <div className={`${styles.titleRow} ${latest && styles.latest}`}>
        <div className={styles.title}>{user.name} upload new file</div>
        <div className={styles.date}>2 day ago</div>
      </div>
      <div className={`${styles.detailsRow} ${latest && styles.latest}`}>
        <div className={styles.subTitle}>Version Name : {name}</div>
        <div className={styles.avatarGroup}>
          <Avatar
            size={40}
            shape="square"
            icon={fileType.icon}
            style={{
              background: fileType.color,
              color: "white",
            }}
          />
          <Avatar size={40} shape="square">
            {convertFileSize(size, "MB")}
          </Avatar>
          <Avatar
            size={40}
            shape="square"
            icon={<FontAwesomeIcon icon={faDownload} />}
            style={{
              background: "whitesmoke",
              color: fileType.color,
            }}
            className={styles.download}
            onClick={() => {
              downloadURL(path);
            }}
          ></Avatar>
        </div>
      </div>
    </div>
  );
}

export default Component;
