import { Col, Row } from "antd";
import { Button, Typography } from "components";
import SearchInput from "features/common/components/Inputs/searchInput/SearchInput";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { debounce } from "lodash";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ShearedDataSliceActions } from "features/common/redux/slices/shearedDataSlices";
import { RestorFile } from "features/trash/components/molecules";
import { TrashSliceActions } from "features/trash/redux";
import { trashPagesType } from "features/trash/types/trashPages.type";
import downloadURL from "helpers/downloadUrl";
import { FileStatusEnum } from "services/filesService/interfaces/Entity.interface";
import { FilesTrashLayout } from "services/filesTrashService";
import styles from "./styles.module.scss";

function MyFolders() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const resource: trashPagesType = "index";

  const {
    index: {
      pagnation: { page, perPage },
      search,
    },
  } = useAppSelector((state) => state.trash);
  const {
    contentInfo: { activeFolderId, activeFileId },
  } = useAppSelector((state) => state.sharedData);

  const { SetPage, SetPerPage, SetSearch } = TrashSliceActions;
  const { SetFileId } = ShearedDataSliceActions;

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
        <Typography.Title level={1}>Trash</Typography.Title>
      </Col>
      <Col span={24}>
        <SearchInput
          setSearchTerm={setSearchTerm}
          isLoading={false}
          defaultValue={search}
        />
      </Col>
      <Col span={24} className={styles.foldersContainer}>
        <FilesTrashLayout
          viewType={"list"}
          tableProps={{
            onRow: (record) => {
              return {
                className:
                  record.id === activeFileId ? styles.avtiveRow : undefined,
              };
            },
          }}
          actions={{
            extraAction(record) {
              return (
                <Row>
                  <Col span={24}>
                    <Button
                      style={{ height: 40 }}
                      type="text"
                      block
                      onClick={() => {
                        downloadURL(record.latest_path);
                      }}
                      disabled={record.status === FileStatusEnum.PROCESSING}
                    >
                      Download
                    </Button>
                  </Col>
                  <Col span={24}>
                    <RestorFile file_id={record.id} />
                  </Col>
                </Row>
              );
            },
            mode: "menu",
          }}
          apiCrudConfig={{
            getAllConfig: {
              params: {
                page,
                items_per_page: perPage,
                search: search !== "" ? search : undefined,
              },
            },
          }}
          pagination={{
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
