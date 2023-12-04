import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Badge, Divider } from "antd";
import { Typography } from "components/atoms";
import variables from "styles/variables/_main_colors_vars.module.scss";
import { Props } from "./Props";
import styles from "./styles.module.scss";

function Component(props: Props) {
  return (
    <>
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
    </>
  );
}

export default Component;
