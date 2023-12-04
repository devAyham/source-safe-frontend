import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
import { Typography } from "components";
import SearchInput from "features/common/components/Inputs/searchInput/SearchInput";
import { useNavigate } from "react-router-dom";
import { PagesRotes } from "router/constants/pagesRoutes";
import { FolderLayout } from "services/folderService";
import styles from "./styles.module.scss";
function Dashbaord() {
  const navigate = useNavigate();
  return (
    <Row className={styles.page}>
      <Col span={24}>
        <SearchInput
          setSearchTerm={() => {}}
          isLoading={false}
          defaultValue={""}
        />
      </Col>
      <Col span={24} className={styles.foldersContainer}>
        <div className={styles.titleRow}>
          <Typography.SubTitle level={3}>My Folders</Typography.SubTitle>
          <FontAwesomeIcon
            icon={faArrowRight}
            className={styles.icon}
            onClick={() => {
              navigate(PagesRotes.DashboardRoutes.MyFolders.index);
            }}
          />
        </div>
        <FolderLayout />
      </Col>
    </Row>
  );
}

export default Dashbaord;
