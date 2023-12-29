import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Badge, Divider, Space } from "antd";
import { Typography } from "components/atoms";
import variables from "styles/variables/_main_colors_vars.module.scss";
import { Props } from "./Props";
import styles from "./styles.module.scss";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { FullScreenButton, RefreshPageButton } from "components/molecules";

function Component(props: Props) {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
      <div className={styles.notifications}>
        <Space size={0}>
          <RefreshPageButton />
          <FullScreenButton />
        </Space>
      </div>
      <Divider type="vertical" className={styles.divider} />
      <Typography.SubTitle className={styles.text}>
        Hi, {user?.name}
      </Typography.SubTitle>
      <Avatar className={styles.avatar} size={30}>
        {user?.name.charAt(0).toUpperCase()}
      </Avatar>
    </>
  );
}

export default Component;
