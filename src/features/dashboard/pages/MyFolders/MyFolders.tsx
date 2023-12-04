import { Col, Row } from "antd";
import SearchInput from "features/common/components/Inputs/searchInput/SearchInput";
import styles from "./styles.module.scss";
import { Typography } from "components";
import { FolderLayout } from "services/folderService";

function MyFolders() {
  return (
    <Row className={styles.page}>
      <Col span={24}>
        <Typography.Title level={1}>My Folders</Typography.Title>
      </Col>
      <Col span={24}>
        <SearchInput
          setSearchTerm={() => {}}
          isLoading={false}
          defaultValue={""}
        />
      </Col>
      <Col span={24} className={styles.foldersContainer}>
        <FolderLayout />
      </Col>
    </Row>
  );
}

export default MyFolders;
