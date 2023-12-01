import { Avatar, Badge, Divider } from "antd";
import styles from "./styels.module.scss";
import { Typography } from "components/atoms";
import variables from "styles/variables/_main_colors_vars.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
function Component() {
  return (
    <div className={styles.contentInfo}>
      <div className={styles.user_info_container}>
        <div className={styles.notifications}>
          <Badge color={variables.primary_color_one} dot={true}>
            <FontAwesomeIcon icon={faBell} size="xl" />
          </Badge>
        </div>
        <Divider type="vertical" className={styles.divider} />
        <Typography.SubTitle className={styles.text}>
          Hi, User
        </Typography.SubTitle>
        <Avatar className={styles.avatar} size={40}>
          U
        </Avatar>
      </div>
    </div>
  );
}

export default Component;
