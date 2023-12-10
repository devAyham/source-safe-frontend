import { Avatar, Tag, Tooltip } from "antd";
import { Props } from "./Props";
import styles from "./styels.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/atoms";
import vars from "styles/variables/_main_colors_vars.module.scss";
function Component({ role, user }: Props) {
  return (
    <div className={styles.container}>
      <Avatar size={40}>{user.name.charAt(0).toUpperCase()}</Avatar>
      <div className={styles.personalInfo}>
        <Tooltip
          title={
            <>
              <div className={styles.name}>{user.name}</div>
              <div className={styles.email}>{user.email}</div>
            </>
          }
        >
          <div className={styles.name}>{user.name}</div>
          <div className={styles.email}>{user.email}</div>
        </Tooltip>
      </div>
      <Tag
        className={styles.tag}
        color={role === "admin" ? vars.secondary_color_one : vars.warninig_dark}
      >
        {role}
      </Tag>
      {role !== "admin" && (
        <Button
          className={styles.delete}
          danger
          shape="circle"
          type="text"
          icon={<FontAwesomeIcon icon={faTrash} />}
        />
      )}
    </div>
  );
}

export default Component;
