import { Col, Row } from "antd";
import { Typography } from "components";
import { FolderCard } from "components/molecules/cards/FolderCard";
import SearchInput from "features/common/components/Inputs/searchInput/SearchInput";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { dateFormatter } from "helpers/dateFormatter";
import { debounce } from "lodash";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PagesRotes } from "router/constants/pagesRoutes";
import { FolderLayout } from "services/folderService";
import { SharedWithMeSliceActions } from "../../redux";
import { SharedWithMePagesType } from "../../types/sharedWithMePages.type";
import styles from "./styles.module.scss";

function MyFolders() {
  const navigate = useNavigate();

  const resource: SharedWithMePagesType = "index";

  const {
    index: { pagnation, search },
  } = useAppSelector((state) => state.sharedWithMe);
  const { SetPage, SetPerPage, SetSearch } = SharedWithMeSliceActions;
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
        <Typography.Title level={1}>Shared With Me</Typography.Title>
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
                  navigate(PagesRotes.SharedWithMeRoutes.show(id));
                }}
              />
            );
          }}
          apiCrudConfig={{
            getAllConfig: {
              params: {
                page: pagnation.page,
                items_per_page: pagnation.perPage,
                search: search !== "" ? search : undefined,
                filter: {
                  myFolders: 0,
                },
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

export default MyFolders;
