import { HttpStatus } from "api/constants/httpStatusCodes";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { ShearedDataSliceActions } from "features/common/redux/slices/shearedDataSlices";
import { useFolderApi } from "services/folderService";
import styles from "./styels.module.scss";
import { Image, Typography } from "components/atoms";
import { Radio } from "antd";
import { ReactNode, useState } from "react";
import { MembersSection } from "./components/MembersSection";
import { StatisticsSection } from "./components/StatisticsSection";
import { convertFileSize } from "helpers/convertFileSize";

type folderInfoRadioType = "members" | "statistics";
const folderInfoRadio: folderInfoRadioType[] = ["members", "statistics"];

function Component() {
  const [state, setState] = useState<folderInfoRadioType>(folderInfoRadio[0]);
  const { activeFolderId } = useAppSelector(
    (state) => state.sharedData.contentInfo
  );
  const dispatch = useAppDispatch();
  const { SetFolderId } = ShearedDataSliceActions;
  const {
    getDetailsEntity: { data, isLoading },
  } = useFolderApi({
    getDetailsConfig: {
      id: activeFolderId ? activeFolderId : 0,
      enabled: !!activeFolderId,
      onError(error: any) {
        if (error.response?.status === HttpStatus.NotFound) {
          dispatch(SetFolderId(null));
        }
      },
    },
  });
  const folderInfoContent: {
    [key in folderInfoRadioType]: ReactNode;
  } = {
    members: <MembersSection members={data?.data.members ?? []} />,
    statistics: <StatisticsSection />,
  };
  return (
    <div className={styles.container}>
      <div className={styles.folderGeneralInfo}>
        <div className={styles.imageContainer}>
          <Image className={styles.image} src={data?.data.logo} />
        </div>
        <Typography.SubTitle level={3} className={styles.folderName}>
          {data?.data.name}
        </Typography.SubTitle>
        <Typography.Text className={styles.folderInfo}>
          Files count {data?.data.files_count} -{" "}
          {convertFileSize(data?.data?.folder_size ?? 0, "MB")}
        </Typography.Text>
      </div>
      <div className={styles.divider}></div>
      <Radio.Group
        defaultValue={folderInfoRadio[0]}
        buttonStyle="solid"
        className={styles.buttons}
        onChange={(e) => {
          setState(e.target.value);
        }}
      >
        {folderInfoRadio.map((value) => {
          return <Radio.Button value={value}>{value}</Radio.Button>;
        })}
      </Radio.Group>
      {folderInfoContent[state]}
    </div>
  );
}

export default Component;
