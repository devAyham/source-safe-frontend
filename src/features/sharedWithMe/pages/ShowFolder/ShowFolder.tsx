import { RollbackOutlined } from "@ant-design/icons";
import { Col, Row, message } from "antd";
import { Button, PageHeader, Typography } from "components";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { ShearedDataSliceActions } from "features/common/redux/slices/shearedDataSlices";
import { CheckinFile } from "features/dashboard/components/molecules/CheckInFile";
import { CheckOutFile } from "features/dashboard/components/molecules/CheckoutFile";
import { SharedWithMeSliceActions } from "features/sharedWithMe/redux";
import { SharedWithMePagesType } from "features/sharedWithMe/types/sharedWithMePages.type";
import downloadURL from "helpers/downloadUrl";
import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { PagesRotes } from "router/constants/pagesRoutes";
import { FileLayout, FileServiceName } from "services/filesService";
import { FileStatusEnum } from "services/filesService/interfaces/Entity.interface";
import styles from "./styles.module.scss";
import { MultiCheckinFile } from "features/dashboard/components/molecules/MultiCheckInFiles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FadeInEffect } from "components/templates/FadeInEffect";
import { generateEntityCollectionQueryKey } from "api/helpers/queryKeysFactory";
import { AddFileModal } from "features/dashboard/components/organismis";

function ShowFolder() {
  const resource: SharedWithMePagesType = "showFolder";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [multiCheckInOpen, setMultiCheckInOpen] = useState(false);
  const [open, setOpen] = useState(false);
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
  } = useAppSelector((state) => state.sharedWithMe);

  const { Reset, SetFolderId, SetFileId } = ShearedDataSliceActions;
  const { SetPage, SetPerPage, SetSelectedRows, SetSelectionMode } =
    SharedWithMeSliceActions;

  useEffect(() => {
    if (Number(id) > 0) {
      dispatch(SetFolderId(Number(id)));
    } else {
      navigate(PagesRotes.SharedWithMeRoutes.index);
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
            <>
              <RollbackOutlined
                onClick={() => {
                  navigate(PagesRotes.SharedWithMeRoutes.index);
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
