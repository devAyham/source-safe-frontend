import { Col, Row, Space, Typography } from "antd";
import SearchInput from "features/common/components/Inputs/searchInput/SearchInput";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { foldersRequestsSliceActions } from "features/foldersRequests/redux";
import { debounce } from "lodash";
import { useCallback } from "react";
import {
  FolderRequestsLayout,
  useFolderRequestsApi,
} from "services/folderRequestsService";
import styles from "./styles.module.scss";
import { Button } from "components";
import { CustomEndPoints } from "api/constants/customEndPoints";
import { AcceptJoinRequest } from "features/foldersRequests/components/AcceptJoinRequest";
import { RejectJoinRequest } from "features/foldersRequests/components/RejectJoinRequest";

function IndexPage() {
  const dispatch = useAppDispatch();
  const {
    pagnation: { page, perPage },
    search,
  } = useAppSelector((state) => state.folderRequest);
  const { SetPage, SetPerPage, SetSearch } = foldersRequestsSliceActions;
  const setSearchTerm = debounce((value: string) => {
    dispatch(SetSearch(value));
    dispatch(SetPage(1));
  }, 1500);
  const setPerPage = useCallback(
    (value: number) => dispatch(SetPerPage(value)),
    [dispatch]
  );
  const setPage = useCallback(
    (value: number) => dispatch(SetPage(value)),
    [dispatch]
  );

  const { createEntity: rejectRequest } = useFolderRequestsApi({
    customEndPoint: `${CustomEndPoints.AcceptJoinFolder}/`,
  });

  return (
    <Row className={styles.page}>
      <Col span={24}>
        <Typography.Title className={styles.title} level={1}>
          Folders Requests
        </Typography.Title>
      </Col>
      <Col span={24}>
        <SearchInput
          setSearchTerm={setSearchTerm}
          isLoading={false}
          defaultValue={search}
        />
      </Col>
      <Col span={24} className={styles.foldersContainer}>
        <FolderRequestsLayout
          actions={{
            extraAction(record) {
              return (
                <>
                  <Space>
                    <AcceptJoinRequest request_id={record.id} />
                    <RejectJoinRequest request_id={record.id} />
                  </Space>
                </>
              );
            },
          }}
          apiCrudConfig={{
            getAllConfig: {
              params: {
                page: page,
                items_per_page: perPage,
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
  );
}

export default IndexPage;
