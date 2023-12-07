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

function Dashbaord() {
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
          apiCrudConfig={{
            getAllConfig: {
              params: {
                page: 1,
                items_per_page: 3,
                search: search !== "" ? search : undefined,
              },
            },
          }}
        />
      </Col>
    </Row>
  );
}

export default Dashbaord;
