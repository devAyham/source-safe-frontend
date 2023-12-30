import { useQueryClient } from "react-query";
import { Props } from "./Props";
import styles from "./styles.module.scss";
import { transformExtentionToFileType } from "helpers/transfromExtentionToFileType";
import { fileCategory } from "data/FileCategory";
import { EntityWithAvatarInfo } from "components/molecules/EntityWithAvatarInf";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { convertFileSize } from "helpers/convertFileSize";
import { size } from "lodash";
import { dateFormatter } from "helpers/dateFormatter";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDown,
  faCloudDownload,
  faInfo,
  faInfoCircle,
  faLocationArrow,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { ShearedDataSliceActions } from "features/common/redux/slices/shearedDataSlices";
import downloadURL from "helpers/downloadUrl";
function Component({
  extension,
  last_modified,
  latest_path,
  name,
  folder,
  file_versions,
  id,
}: Props) {
  const dispatch = useAppDispatch();
  const fileType = fileCategory[transformExtentionToFileType(extension)];
  const {
    filesSizeType,
    contentInfo: { activeFileId },
  } = useAppSelector((state) => state.sharedData);
  const { SetFileId } = ShearedDataSliceActions;

  return (
    <div
      className={`${styles.rowContainer} ${
        id === activeFileId && styles.active
      }`}
    >
      <div className={styles.item}>
        <EntityWithAvatarInfo
          title={name}
          avatarProps={{
            size: 30,
            shape: "square",
            icon: fileType.icon,
            style: {
              background: fileType.color,
            },
          }}
        />
      </div>
      <div className={styles.item}>
        <span>{folder?.name}</span>
      </div>
      <div className={styles.item}>{moment(last_modified).fromNow()}</div>
      <div className={styles.item}>
        {convertFileSize(file_versions[0].size, filesSizeType)}
      </div>
      <div className={styles.item}>By {file_versions[0].user.name}</div>
      <div className={styles.icons}>
        <FontAwesomeIcon
          icon={faInfoCircle}
          className={styles.icon}
          onClick={() => {
            dispatch(SetFileId(id));
          }}
        />
        <FontAwesomeIcon
          icon={faCircleDown}
          className={styles.icon}
          onClick={() => {
            downloadURL(latest_path);
          }}
        />
      </div>
    </div>
  );
}

export default Component;
