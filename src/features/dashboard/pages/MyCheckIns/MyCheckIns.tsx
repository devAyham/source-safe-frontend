import { Col, Row } from "antd";
import { CustomEndPoints } from "api/constants/customEndPoints";
import { Button, Typography } from "components";
import SearchInput from "features/common/components/Inputs/searchInput/SearchInput";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { ShearedDataSliceActions } from "features/common/redux/slices/shearedDataSlices";
import { CheckOutFile } from "features/dashboard/components/molecules/CheckoutFile";
import { dashboardSliceActions } from "features/dashboard/redux/slices/dashboardSlice";
import { DashboardPagesType } from "features/dashboard/types/dashboardPages.type";
import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
import { AuthServiceName } from "services/authService";
import {
  FileLayout,
  FileServiceName,
  GetCheclInFileTableColumns,
} from "services/filesService";
import { FileStatusEnum } from "services/filesService/interfaces/Entity.interface";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { FadeInEffect } from "components/templates/FadeInEffect";

function MyCheckIns() {
  const navigate = useNavigate();
  const resource: DashboardPagesType = "checkIns";
  const {
    checkIns: { pagnation, search },
  } = useAppSelector((state) => state.dashboard);
  const { SetPage, SetPerPage, SetSearch } = dashboardSliceActions;
  const dispatch = useAppDispatch();
  const {
    contentInfo: { activeFolderId, activeFileId },
  } = useAppSelector((state) => state.sharedData);
  const setSearchTerm = debounce((value: string) => {
    dispatch(SetSearch({ resource, value }));
    dispatch(SetPage({ resource, value: 1 }));
  }, 1500);
  const setPerPage = useCallback(
    (value: number) => dispatch(SetPerPage({ resource, value })),
    [dispatch]
  );
  const setPage = useCallback(
    (value: number) => dispatch(SetPage({ resource, value })),
    [dispatch]
  );
  const { Reset, SetFileId } = ShearedDataSliceActions;

  useEffect(() => {
    return () => {
      dispatch(Reset());
    };
  }, []);

  return (
    <FadeInEffect>
      <Row className={styles.page}>
        <Col span={24}>
          <Typography.Title level={1}>My Checked In Files</Typography.Title>
        </Col>
        <Col span={24}>
          <SearchInput
            setSearchTerm={setSearchTerm}
            isLoading={false}
            defaultValue={search}
          />
        </Col>
        <Col span={24} className={styles.foldersContainer}>
          <FileLayout
            tableProps={{
              columns: GetCheclInFileTableColumns(),
              onRow: (record) => {
                return {
                  className:
                    record.id === activeFileId ? styles.avtiveRow : undefined,
                };
              },
            }}
            actions={{
              mode: "menu",
              extraAction(record) {
                return (
                  <Row>
                    <Col span={24}>
                      <Button
                        style={{ height: 40 }}
                        type="text"
                        block
                        disabled={record.id === activeFileId}
                        onClick={() => {
                          dispatch(SetFileId(record.id));
                        }}
                      >
                        Show Info
                      </Button>
                    </Col>
                    <Col span={24}>
                      <CheckOutFile
                        file_id={record.id}
                        disabled={record.status !== FileStatusEnum.CHECKED_IN}
                      />
                    </Col>
                  </Row>
                );
              },
            }}
            serviceName={`${FileServiceName}/${AuthServiceName}/${CustomEndPoints.CheckIn}`}
            apiCrudConfig={{
              getAllConfig: {
                params: {
                  page: pagnation.page,
                  items_per_page: pagnation.perPage,
                  search: search !== "" ? search : undefined,
                },
              },
            }}
            pagination={{
              // showSizeChanger: false,
              onChange(page, pageSize) {
                setPage(page);
                setPerPage(pageSize);
              },
            }}
          />
        </Col>
      </Row>
    </FadeInEffect>
  );
}

export default MyCheckIns;
