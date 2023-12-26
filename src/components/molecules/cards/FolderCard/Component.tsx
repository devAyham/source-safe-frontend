import { faClock, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Col, Row, Space } from "antd";
import { Image, Typography } from "components/atoms";
import { Props } from "./Props";
import styles from "./styles.module.scss";
import Colors from "styles/variables/_main_colors_vars.module.scss";
import { convertFileSize } from "helpers/convertFileSize";

function StructuredCard({
  createdAt,
  fileCount,
  folderName,
  icon,
  members,
  size,
  // actions,
  // badge,
  onClick,
}: Props) {
  const onDeflautClick = (e: any) => {
    onClick?.(e);
  };

  return (
    <Row className={styles.cardContainer} onClick={onDeflautClick}>
      <Col span={24} className={styles.logoAndMembersContainer}>
        <div className={styles.logoContainer}>
          <Image src={icon} className={styles.logo} />
        </div>
        <div className={styles.membersContainer}>
          <Avatar.Group
            size={35}
            maxCount={2}
            maxStyle={{
              color: Colors.warninig_dark,
              backgroundColor: Colors.warning_two,
            }}
          >
            {members.map((member) => {
              return (
                <Avatar
                  style={
                    member.role === "admin"
                      ? { backgroundColor: Colors.secondary_color_one }
                      : { backgroundColor: Colors.warninig_dark }
                  }
                >
                  {member.user.name}
                </Avatar>
              );
            })}
          </Avatar.Group>
        </div>
      </Col>
      <Col span={24} className={styles.contentContainer}>
        <Typography.SubTitle level={3} className={styles.name}>
          {folderName}
        </Typography.SubTitle>
        <div className={styles.sizeInfo}>
          <Space className={styles.fileCountContainer}>
            <FontAwesomeIcon icon={faFileLines} />
            <Typography.Text className={styles.fileCount}>
              {fileCount} file
            </Typography.Text>
          </Space>
          <Typography.SubTitle level={5} className={styles.size}>
            {convertFileSize(size, "MB")}
          </Typography.SubTitle>
        </div>
        <div className={styles.createAtContainer}>
          <Space>
            <FontAwesomeIcon icon={faClock} />
            <Typography.Text className={styles.createAtText}>
              {createdAt}
            </Typography.Text>
          </Space>
        </div>
      </Col>
    </Row>
  );
}

export default StructuredCard;
