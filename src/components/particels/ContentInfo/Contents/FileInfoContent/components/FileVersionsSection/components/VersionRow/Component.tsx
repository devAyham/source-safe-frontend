import { Avatar, Tooltip } from "antd";
import { Props } from "./Props";
import styles from "./styels.module.scss";
import { transformExtentionToFileType } from "helpers/transfromExtentionToFileType";
import { fileCategory } from "data/FileCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import downloadURL from "helpers/downloadUrl";
import { convertFileSize } from "helpers/convertFileSize";
import moment from "moment";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { useState } from "react";

function Component({
  latest,
  extension,
  name,
  path,
  size,
  user,
  created_at,
  version_name,
}: Props) {
  const navigate = useNavigate();
  const fileType = fileCategory[transformExtentionToFileType(extension)];
  const [loading, setLoading] = useState(false);
  const { filesSizeType } = useAppSelector((state) => state.sharedData);
  const makeLoaderAnimate = () => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  };
  return (
    <div className={styles.container}>
      <div className={`${styles.titleRow} ${latest && styles.latest}`}>
        <div className={styles.title}>{user.name} upload new file</div>
        <div className={styles.date}>
          <Tooltip title={moment("2023-12-29T12:34:21").fromNow()}>
            {moment(created_at).fromNow()}
          </Tooltip>
        </div>
      </div>
      <div className={`${styles.detailsRow} ${latest && styles.latest}`}>
        <div className={styles.subTitle}>Version Name : {version_name}</div>
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
            {convertFileSize(size, filesSizeType)}
          </Avatar>
          <Avatar
            size={40}
            shape="square"
            icon={
              <FontAwesomeIcon
                icon={loading ? faSpinner : faDownload}
                spin={loading}
              />
            }
            style={{
              background: "whitesmoke",
              color: fileType.color,
            }}
            className={styles.download}
            onClick={() => {
              if (!loading) {
                downloadURL(path, makeLoaderAnimate);
                setLoading(true);
              }
            }}
          ></Avatar>
        </div>
      </div>
    </div>
  );
}

export default Component;
