import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Radio } from "antd";
import { Typography } from "components/atoms";
import { FileStatusTag, Spin } from "components/molecules";
import { fileCategory } from "data/FileCategory";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { ShearedDataSliceActions } from "features/common/redux/slices/shearedDataSlices";
import { convertFileSize } from "helpers/convertFileSize";
import { transformExtentionToFileType } from "helpers/transfromExtentionToFileType";
import { ReactNode, useState } from "react";
import { useFileApi } from "services/filesService";
import { FileStatusEnum } from "services/filesService/interfaces/Entity.interface";
import { FileTypesType } from "types/FilesTypes.type";
import { FileVersionsSection } from "./components/FileVersionsSection";
import { InfoDetailsSection } from "./components/InfoDetailsSection";
import styles from "./styels.module.scss";

type fileInfoRadioType = "Info details" | "File versions";
const fileInfoRadio: fileInfoRadioType[] = ["Info details", "File versions"];

function Component() {
  const [state, setState] = useState<fileInfoRadioType>(fileInfoRadio[0]);
  const dispatch = useAppDispatch();
  const { SetFileId } = ShearedDataSliceActions;
  const [fileType, setFileType] = useState<FileTypesType>("other");
  const {
    contentInfo: { activeFileId },
  } = useAppSelector((state) => state.sharedData);
  const {
    getDetailsEntity: { data, isLoading },
  } = useFileApi({
    getDetailsConfig: {
      id: activeFileId ?? 0,
      enabled: !!activeFileId,
      onSuccess(data) {
        setFileType(transformExtentionToFileType(data?.data?.extension));
      },
    },
  });
  const fileInfoContent: {
    [key in fileInfoRadioType]: ReactNode;
  } = {
    "Info details": (
      <InfoDetailsSection
        created_at={String(data?.data?.created_at)}
        extention={String(data?.data?.extension)}
        last_modified={String(data?.data?.last_modified)}
        lastAction={data?.data?.last_action_on_file}
      />
    ),
    "File versions": (
      <FileVersionsSection versions={data?.data?.file_versions} />
    ),
  };

  return (
    <div className={styles.container}>
      <Spin spinning={isLoading}>
        <div className={styles.folderGeneralInfo}>
          <div className={styles.actionRow}>
            <FontAwesomeIcon
              icon={faClose}
              className={styles.colseIcon}
              onClick={() => {
                dispatch(SetFileId(null));
              }}
            />
          </div>
          <div className={styles.imageContainer}>
            <div
              className={styles.icon}
              style={{
                background: fileCategory[fileType].color,
              }}
            >
              {fileCategory[fileType].icon}
            </div>
          </div>
          <Typography.SubTitle level={3} className={styles.folderName}>
            {data?.data.name}
          </Typography.SubTitle>
          {/* <Typography.Text className={styles.folderInfo}>
            {dateFormatter(data?.data.created_at ?? "")}
          </Typography.Text> */}
          <Typography.Text className={styles.folderInfo}>
            <FileStatusTag status={data?.data?.status as FileStatusEnum} />
            {convertFileSize(Number(data?.data?.latest_size), "MB")}
          </Typography.Text>
        </div>
        <div className={styles.divider} />
        <Radio.Group
          defaultValue={fileInfoRadio[0]}
          buttonStyle="solid"
          className={styles.buttons}
          onChange={(e) => {
            setState(e.target.value);
          }}
        >
          {fileInfoRadio.map((value) => {
            return <Radio.Button value={value}>{value}</Radio.Button>;
          })}
        </Radio.Group>
        {fileInfoContent[state]}
      </Spin>
    </div>
  );
}

export default Component;
