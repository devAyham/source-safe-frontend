import { Typography, Button } from "components/atoms";
import { Props } from "./Props";
import { MemberRow } from "./components";
import styles from "./styels.module.scss";
import { Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
function Component({ members }: Props) {
  return (
    <div className={styles.container}>
      <Space className={styles.totalRow}>
        <Button
          shape="round"
          type="primary"
          size="small"
          icon={<FontAwesomeIcon icon={faPlusCircle} className={styles.icon} />}
        >
          Add new
        </Button>
        <Typography.SubTitle level={5}>
          {members.length} member
        </Typography.SubTitle>
      </Space>
      <div className={styles.membersContinaer}>
        {members.map((member) => {
          return (
            <>
              <MemberRow {...member} />
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Component;
