import { Col, Row } from "antd";
import { CustomEndPoints } from "api/constants/customEndPoints";
import { Spin, Typography } from "components";
import { FadeInEffect } from "components/templates/FadeInEffect";
import SearchInput from "features/common/components/Inputs/searchInput/SearchInput";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { RecentActivityRow } from "features/dashboard/components/molecules/RecentActivityRow";
import { dashboardSliceActions } from "features/dashboard/redux/slices/dashboardSlice";
import { DashboardPagesType } from "features/dashboard/types/dashboardPages.type";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import {
  FileServiceName,
  IFileEntity,
  useFileApi,
} from "services/filesService";
import styles from "./styles.module.scss";

function MyFolders() {
  const navigate = useNavigate();
  const resource: DashboardPagesType = "recentActivities";
  const {
    recentActivities: { pagnation, search },
  } = useAppSelector((state) => state.dashboard);
  const { SetPage, SetPerPage, SetSearch } = dashboardSliceActions;
  const dispatch = useAppDispatch();

  const setSearchTerm = debounce((value: string) => {
    dispatch(SetSearch({ resource, value }));
    dispatch(SetPage({ resource, value: 1 }));
  }, 1500);

  const {
    getAllEntities: { isLoading, data },
  } = useFileApi(
    {
      getAllConfig: {
        enabled: true,
        params: {
          hide: false,
        },
      },
    },
    {
      getAllEndpoint: `${FileServiceName}/${CustomEndPoints.RecentActivies}`,
    }
  );

  return (
    <FadeInEffect>
      <Row className={styles.page}>
        <Col span={24}>
          <Typography.Title level={1}>Recent Activities</Typography.Title>
        </Col>
        <Col span={24}>
          <SearchInput
            setSearchTerm={setSearchTerm}
            isLoading={false}
            defaultValue={search}
          />
        </Col>
        <Col span={24} className={styles.listContainer}>
          {/* <div className={styles.listTitles}>
            <span className={styles.listTitle}>File</span>
            <span className={styles.listTitle}>Folder</span>
            <span className={styles.listTitle}>Owner</span>
            <span className={styles.listTitle}>Size</span>
            <span className={styles.listTitle}>Modified at</span>
            <span className={styles.listTitle}>Modified by</span>
          </div> */}
          <Spin
            spinning={isLoading}
            style={{
              width: "100%",
            }}
          >
            <div className={styles.list}>
              {(data?.data as any)?.map((row: IFileEntity) => {
                return <RecentActivityRow {...row} />;
              })}
            </div>
          </Spin>
        </Col>
      </Row>
    </FadeInEffect>
  );
}

export default MyFolders;
