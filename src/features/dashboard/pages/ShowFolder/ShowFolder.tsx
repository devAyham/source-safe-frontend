import { RollbackOutlined } from "@ant-design/icons";
import {
  faFileCircleQuestion,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Col, Divider, Row, message } from "antd";
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
import {
  FileLayout,
  FileServiceName,
  IFileEntity,
  useFileApi,
} from "services/filesService";
import { FileStatusEnum } from "services/filesService/interfaces/Entity.interface";
import styles from "./styles.module.scss";
import { ForceCheckOut } from "features/dashboard/components/molecules/ForceCheckoutFile";
import { MultiCheckinFile } from "features/dashboard/components/molecules/MultiCheckInFiles";
import { FadeInEffect } from "components/templates/FadeInEffect";
import { FolderServiceName } from "services/folderService";
import { CustomEndPoints } from "api/constants/customEndPoints";
import { IUserEntity } from "services/userService";
import { FileRequestsModal } from "features/dashboard/components/organismis/FileRequestsModal";
function ShowFolder() {
  const resource: DashboardPagesType = "showFolder";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openRequests, setOpenRequests] = useState(false);
  const [multiCheckInOpen, setMultiCheckInOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const {
    contentInfo: { activeFolderId, activeFileId },
  } = useAppSelector((state) => state.sharedData);
  const {
    showFolder: {
      selectedRows,
      selectionMode,
      search,
      pagnation: { page, perPage },
    },
  } = useAppSelector((state) => state.dashboard);

  const { Reset, SetFolderId, SetFileId } = ShearedDataSliceActions;
  const { SetPage, SetPerPage, SetSelectedRows, SetSelectionMode } =
    dashboardSliceActions;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (Number(id) > 0) {
      dispatch(SetFolderId(Number(id)));
    } else {
      navigate(PagesRotes.DashboardRoutes.MyFolders.index);
    }
    return () => {
      dispatch(Reset());
      dispatch(setSelectedRows([]));
      dispatch(setSelectionMode(false));
    };
  }, [id]);

  const setSelectedRows = useCallback(
    (value: any[]) => dispatch(SetSelectedRows(value)),
    [dispatch]
  );
  const setSelectionMode = useCallback(
    (value: boolean) => dispatch(SetSelectionMode(value)),
    [dispatch]
  );
  const setPerPage = useCallback(
    (value: number) => dispatch(SetPerPage({ resource, value })),
    [dispatch]
  );

  const setPage = useCallback(
    (value: number) => dispatch(SetPage({ resource, value })),
    [dispatch]
  );
  const {
    getAllEntities: { data },
  } = useFileApi<
    {},
    {
      file: IFileEntity;
      // user: IUserEntity;
    }
  >(
    {
      getAllConfig: {
        enabled: true,
        params: {
          items_per_page: 1000,
          // folder_id: String(activeFolderId),
          // hide: true,
        },
      },
    },
    {
      getAllEndpoint: `${FolderServiceName}/${String(id)}/${
        CustomEndPoints.FileRequests
      }`,
    }
  );

  return (
    <>
      <FileRequestsModal
        // onSuccess={() => {
        //   queryClient.invalidateQueries(
        //     generateEntityCollectionQueryKey({
        //       entityType: `${FolderServiceName}/${String(id)}/${
        //         CustomEndPoints.FileRequests
        //       }` as any,
        //       params: {},
        //     })
        //   );
        // }}
        fileRequests={data?.data.data ?? []}
        modalProps={{
          open: openRequests,
          onCancel: () => {
            setOpenRequests(false);
          },
        }}
      />
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
      <MultiCheckinFile
        files_ids={selectedRows ?? []}
        open={multiCheckInOpen}
        setOpen={setMultiCheckInOpen}
        onSuccess={() => {
          setSelectedRows([]);
          setSelectionMode(false);
        }}
      />
      <FadeInEffect>
        <PageHeader
          title={
            <div className={styles.titleRow}>
              <span style={{ display: "flex" }}>
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
              </span>
              <Badge count={data?.data?.data?.length}>
                <FontAwesomeIcon
                  onClick={() => {
                    setOpenRequests(true);
                  }}
                  className={styles.fileRequests}
                  icon={faFileCircleQuestion}
                />
              </Badge>
            </div>
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
                  disabled={selectionMode}
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
            secondaryAction: {
              action: {
                type: selectionMode ? "primary" : "link",
                onClick: () => {
                  setSelectionMode(!selectionMode);
                  setSelectedRows([]);
                },
                children: "Select",
              },
            },
            customActions: selectionMode
              ? {
                  action: {
                    type: "ghost",
                    block: true,
                    disabled: !(selectedRows && selectedRows?.length > 0),
                    shape: "round",
                    children: "Check-in",
                    onClick: () => setMultiCheckInOpen(true),
                  },
                }
              : undefined,
          }}
        />
        <FileLayout
          viewType={"list"}
          tableProps={{
            rowSelection: selectionMode
              ? {
                  type: "checkbox",
                  defaultSelectedRowKeys: selectedRows,
                  selectedRowKeys: selectedRows,
                  preserveSelectedRowKeys: true,
                  onChange: (selectedRowKeys: React.Key[], selecteRows) => {
                    console.log(selecteRows);
                    const validSelectedRows = selecteRows?.filter((row) => {
                      return row?.status === FileStatusEnum.CHECKED_OUT;
                    });
                    if (validSelectedRows?.length !== selecteRows.length) {
                      message.warning(
                        "you can not select rows with checked-in status"
                      );
                    }
                    setSelectedRows(
                      validSelectedRows.map((row) => row.id) ?? []
                    );
                  },
                }
              : undefined,
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
                    <ForceCheckOut
                      file_id={record.id}
                      disabled={record.status !== FileStatusEnum.CHECKED_IN}
                    />
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
                hide: false,
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
      </FadeInEffect>
    </>
  );
}

export default ShowFolder;
