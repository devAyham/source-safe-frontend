import { RollbackOutlined } from "@ant-design/icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "antd";
import { generateEntityCollectionQueryKey } from "api/helpers/queryKeysFactory";
import { Button, PageHeader, Typography } from "components";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { ShearedDataSliceActions } from "features/common/redux/slices/shearedDataSlices";
import { CheckinFile } from "features/dashboard/components/molecules/CheckInFile";
import { CheckOutFile } from "features/dashboard/components/molecules/CheckoutFile";
import { AddFileModal } from "features/dashboard/components/organismis";
import { dashboardSliceActions } from "features/dashboard/redux/slices/dashboardSlice";
import { DashboardPagesType } from "features/dashboard/types/dashboardPages.type";
import downloadURL from "helpers/downloadUrl";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { PagesRotes } from "router/constants/pagesRoutes";
import { FileLayout, FileServiceName } from "services/filesService";
import { FileStatusEnum } from "services/filesService/interfaces/Entity.interface";
import styles from "./styles.module.scss";
function ShowFolder() {
  const resource: DashboardPagesType = "showFolder";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const {
    contentInfo: { activeFolderId, activeFileId },
  } = useAppSelector((state) => state.sharedData);
  const {
    showFolder: {
      search,
      pagnation: { page, perPage },
    },
  } = useAppSelector((state) => state.dashboard);

  const { Reset, SetFolderId, SetFileId } = ShearedDataSliceActions;
  const { SetPage, SetPerPage } = dashboardSliceActions;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (Number(id) > 0) {
      dispatch(SetFolderId(Number(id)));
    } else {
      navigate(PagesRotes.DashboardRoutes.MyFolders.index);
    }
    return () => {
      dispatch(Reset());
    };
  }, [id]);

  const setPerPage = useCallback(
    (value: number) => dispatch(SetPerPage({ resource, value })),
    [dispatch]
  );
  const setPage = useCallback(
    (value: number) => dispatch(SetPage({ resource, value })),
    [dispatch]
  );
  return (
    <>
      <AddFileModal
        modalProps={{
          open,
          onCancel: () => {
            setOpen(false);
          },
        }}
        formProps={{
          folder_id: Number(id),
          onSuccess: () => {
            setOpen(false);
            queryClient.invalidateQueries(
              generateEntityCollectionQueryKey({
                entityType: FileServiceName,
                params: {},
              })
            );
          },
        }}
      />
      <PageHeader
        title={
          <>
            <RollbackOutlined
              onClick={() => {
                navigate(PagesRotes.DashboardRoutes.MyFolders.index);
              }}
              style={{
                marginInlineEnd: 10,
              }}
              className={styles.backIcon}
            />
            <Typography.Title level={1}>
              Folder Informations & Files
            </Typography.Title>
          </>
        }
        mainActions={{
          primaryAction: {
            action: (
              <Button
                type="primary"
                block
                shape="round"
                icon={<FontAwesomeIcon icon={faPlus} />}
                onClick={() => {
                  setOpen(true);
                }}
              >
                Add new File
              </Button>
            ),
            grid: {
              sm: 12,
              md: 10,
              lg: 6,
              xl: 4,
            },
          },
        }}
      />
      <FileLayout
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
          deleteAction: true,
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
                  <CheckinFile
                    file_id={record.id}
                    disabled={record.status !== FileStatusEnum.CHECKED_OUT}
                  />
                </Col>
                <Col span={24}>
                  <CheckOutFile
                    file_id={record.id}
                    disabled={record.status !== FileStatusEnum.CHECKED_IN}
                  />
                </Col>
                <Col span={24}>
                  <Button
                    style={{ height: 40 }}
                    type="text"
                    block
                    disabled={record.status !== FileStatusEnum.CHECKED_IN}
                  >
                    Force Check-out
                  </Button>
                </Col>
              </Row>
            );
          },
          mode: "menu",
        }}
        apiCrudConfig={{
          getAllConfig: {
            enabled: !!activeFolderId,
            params: {
              page,
              items_per_page: perPage,
              search: search !== "" ? search : undefined,
              folder_id: String(activeFolderId),
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
    </>
  );
}

export default ShowFolder;
