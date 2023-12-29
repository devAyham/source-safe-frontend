import { Avatar, Divider, Space } from "antd";
import { Button, Typography } from "components/atoms";
import { FullScreenButton, RefreshPageButton } from "components/molecules";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { Props } from "./Props";
import styles from "./styles.module.scss";
import { ShearedDataSliceActions } from "features/common/redux/slices/shearedDataSlices";

function Component(props: Props) {
  const dispatch = useAppDispatch();
  const { filesSizeType } = useAppSelector((state) => state.sharedData);
  const { SetFilesSizeType } = ShearedDataSliceActions;
  return (
    <>
      <div className={styles.container}>
        <Button
          clickable={filesSizeType !== "KB"}
          size="small"
          shape="round"
          type={filesSizeType === "KB" ? "primary" : "link"}
          onClick={() => dispatch(SetFilesSizeType("KB"))}
        >
          KB
        </Button>
        <Divider type="vertical" />
        <Button
          clickable={filesSizeType !== "MB"}
          size="small"
          shape="round"
          type={filesSizeType === "MB" ? "primary" : "link"}
          onClick={() => dispatch(SetFilesSizeType("MB"))}
        >
          MB
        </Button>
        <Divider type="vertical" />
        <Button
          clickable={filesSizeType !== "GB"}
          size="small"
          shape="round"
          type={filesSizeType === "GB" ? "primary" : "link"}
          onClick={() => dispatch(SetFilesSizeType("GB"))}
        >
          GB
        </Button>
      </div>
    </>
  );
}

export default Component;
