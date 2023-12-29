import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
import { Typography } from "components";
import SearchInput from "features/common/components/Inputs/searchInput/SearchInput";
import { useNavigate } from "react-router-dom";
import { PagesRotes } from "router/constants/pagesRoutes";
import { FolderLayout } from "services/folderService";
import styles from "./styles.module.scss";
import { DashboardPagesType } from "features/dashboard/types/dashboardPages.type";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { dashboardSliceActions } from "features/dashboard/redux/slices/dashboardSlice";
import { debounce } from "lodash";
import { FolderCard } from "components/molecules/cards/FolderCard";
import { dateFormatter } from "helpers/dateFormatter";
import {
  FileLayout,
  FileServiceName,
  GetCheclInFileTableColumns,
} from "services/filesService";
import { AuthServiceName } from "services/authService";
import { CustomEndPoints } from "api/constants/customEndPoints";
import { FileStatusEnum } from "services/filesService/interfaces/Entity.interface";

function DashbaordIndexPage() {
  const navigate = useNavigate();
  const resource: DashboardPagesType = "index";
  const {
    index: { search },
  } = useAppSelector((state) => state.dashboard);
  const { SetSearch } = dashboardSliceActions;
  const dispatch = useAppDispatch();

  const setSearchTerm = debounce((value: string) => {
    dispatch(SetSearch({ resource, value }));
  }, 1500);
  return (
    <Row className={styles.page}>
      <Col span={24}>
        <SearchInput
          setSearchTerm={setSearchTerm}
          isLoading={false}
          defaultValue={search}
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
        <FolderLayout
          cardRender={({
            id,
            logo,
            name,
            created_at,
            members,
            files_count,
            folder_size,
          }) => {
            return (
              <FolderCard
                fileCount={files_count}
                size={folder_size}
                icon={logo}
                folderName={name}
                members={members}
                createdAt={dateFormatter(created_at ?? "")}
                onClick={() => {
                  navigate(PagesRotes.DashboardRoutes.MyFolders.show(id));
                }}
              />
            );
          }}
          apiCrudConfig={{
            getAllConfig: {
              params: {
                page: 1,
                items_per_page: 3,
                search: search !== "" ? search : undefined,
                filter: {
                  myFolders: 1,
                },
              },
            },
          }}
        />
      </Col>
      <Col span={24} className={styles.myCheckInContainer}>
        <div className={styles.titleRow}>
          <Typography.SubTitle level={3}>
            My Checked in files
          </Typography.SubTitle>
          <FontAwesomeIcon
            icon={faArrowRight}
            className={styles.icon}
            onClick={() => {
              navigate(PagesRotes.DashboardRoutes.MyCheckIns);
            }}
          />
        </div>
        <div className={styles.layoutContainer}>
          <FileLayout
            tableProps={{
              columns: GetCheclInFileTableColumns(),
            }}
            serviceName={`${FileServiceName}/${AuthServiceName}/${CustomEndPoints.CheckIn}`}
            apiCrudConfig={{
              getAllConfig: {
                params: {
                  page: 1,
                  items_per_page: 2,
                  search: search !== "" ? search : undefined,
                },
              },
            }}
            pagination={false}
          />
        </div>
      </Col>
      <Col span={24} className={styles.recentContainer}>
        <div className={styles.titleRow}>
          <Typography.SubTitle level={3}>Recent Activities</Typography.SubTitle>
          <FontAwesomeIcon
            icon={faArrowRight}
            className={styles.icon}
            onClick={() => {
              navigate(PagesRotes.DashboardRoutes.RecentActivities);
            }}
          />
        </div>
        <div className={styles.layoutContainer}></div>
      </Col>
    </Row>
  );
}

export default DashbaordIndexPage;
