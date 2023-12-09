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
    members: <>members</>,
    statistics: <>statistics</>,
  };
  return (
    <div className={styles.container}>
      <div className={styles.folderGeneralInfo}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2"
          />
        </div>
        <Typography.SubTitle level={3} className={styles.folderName}>
          Folder Name
        </Typography.SubTitle>
        <Typography.Text className={styles.folderInfo}>
          Files count 23 - 2GB
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
