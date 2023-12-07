import { Avatar, Checkbox, Col, Row, Space, Tooltip } from "antd";
import { Card, Typography } from "components/atoms";
import React, { ReactNode, useMemo } from "react";
import { Item } from "types/Content.type";
import { Props } from "./Props";
import styles from "./styles.module.scss";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faFile,
  faFileLines,
  faFolderClosed,
} from "@fortawesome/free-solid-svg-icons";

function StructuredCard({}: // createdAt,
// fileCount,
// folderName,
// icon,
// membersImages,
// size,
// actions,
// badge,
// onClick,
Props) {
  // const onDeflautClick = (e: any) => {
  //   onClick?.(e);
  // };

  return (
    <Row className={styles.cardContainer}>
      <Col span={24} className={styles.logoAndMembersContainer}>
        <div className={styles.logoContainer}>
          <FontAwesomeIcon icon={faFolderClosed} className={styles.logo} />
        </div>
        <div className={styles.membersContainer}>
          <Avatar.Group
            maxCount={2}
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
            <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
            <Avatar
              style={{ backgroundColor: "#1677ff" }}
              icon={<AntDesignOutlined />}
            />
          </Avatar.Group>
        </div>
      </Col>
      <Col span={24} className={styles.contentContainer}>
        <Typography.SubTitle level={3} className={styles.name}>
          terst
        </Typography.SubTitle>
        <div className={styles.sizeInfo}>
          <Space className={styles.fileCountContainer}>
            <FontAwesomeIcon icon={faFileLines} />
            <Typography.Text className={styles.fileCount}>
              83 file
            </Typography.Text>
          </Space>
          <Typography.SubTitle level={5} className={styles.size}>
            24 GB
          </Typography.SubTitle>
        </div>
        <div className={styles.createAtContainer}>
          <Space>
            <FontAwesomeIcon icon={faClock} />
            <Typography.Text className={styles.createAtText}>
              Created on 2023-20-20
            </Typography.Text>
          </Space>
        </div>
      </Col>
    </Row>
  );
}

export default StructuredCard;
