import { Col, Row } from "antd";
import SearchInput from "features/common/components/Inputs/searchInput/SearchInput";
import styles from "./styles.module.scss";
import { Typography } from "components";
import { FolderLayout } from "services/folderService";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { dashboardSliceActions } from "features/dashboard/redux/slices/dashboardSlice";
import { useCallback } from "react";
import { DashboardPagesType } from "features/dashboard/types/dashboardPages.type";
import { debounce } from "lodash";
import { FolderCard } from "components/molecules/cards/FolderCard";
import { dateFormatter } from "helpers/dateFormatter";
import { PagesRotes } from "router/constants/pagesRoutes";
import { useNavigate } from "react-router-dom";

function MyFolders() {
  const navigate = useNavigate();

  const resource: DashboardPagesType = "myFolders";
  const {
    myFolders: { pagnation, search },
  } = useAppSelector((state) => state.dashboard);
  const { SetPage, SetPerPage, SetSearch } = dashboardSliceActions;
  const dispatch = useAppDispatch();

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

  return (
    <Row className={styles.page}>
      <Col span={24}>
        <Typography.Title level={1}>My Folders</Typography.Title>
      </Col>
      <Col span={24}>
        <SearchInput
          setSearchTerm={setSearchTerm}
          isLoading={false}
          defaultValue={search}
        />
      </Col>
      <Col span={24} className={styles.foldersContainer}>
        <FolderLayout
          apiCrudConfig={{
            getAllConfig: {
              params: {
                page: pagnation.page,
                items_per_page: pagnation.perPage,
                search: search !== "" ? search : undefined,
                filter: {
                  myFolders: 1,
                },
              },
            },
          }}
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

export default MyFolders;
