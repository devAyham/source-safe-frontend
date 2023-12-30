import { useMemo } from "react";
import useApiCRUD from "api/apiHooks/useApiCrud";
import { Table } from "components";
import { ICrudLayoutProps } from "./interfaces";
import HeaderLoading from "features/common/components/Loading/HeaderLoading/Loading";
import { Button, DeleteOutLinedIcon, Pagination } from "components/atoms";
import { Col, Empty } from "antd";
import CardsLayout from "features/common/components/Cards/CardsLayout/CardLayout";
import styles from "./styles.module.scss";
import StructuredCard from "components/molecules/cards/StructuredCard/StructuredCard";
import EditOutLinedIcon from "components/atoms/icons/EditOutLineIcon/EditOutLineIcon";
import getDeleteAction from "./helpers/getDeleteAction";
import getEditAction from "./helpers/getEditAction";
import { getColumns } from "./helpers";
import { EyeOutlined } from "@ant-design/icons";
import noDataIcon from "assets/svgs/empty_data_list.svg";
import { Spin } from "components/molecules/Spin";
import { useTranslation } from "react-i18next";

function CrudLayout<
  requestParams = {},
  createRequest = {},
  updateRequest = {},
  patchRequest = {},
  getResponse = {},
  getAllResponse extends Object = {}
>(
  props: ICrudLayoutProps<
    requestParams,
    createRequest,
    updateRequest,
    patchRequest,
    getResponse,
    getAllResponse
  >
) {
  const {
    viewType = "list",
    selection,
    serviceName,
    containerProps,
    tableProps,
    apiCRUDResult,
    apiCrudConfig,
    actions,
    pagination,
    cardConfig,
    cardRender,
    cardLayoutRowGutter,
    viewCardGrid,
    cardLayoutMargin,
    showRefetchingHeader = true,
  } = props;
  // const gridProps = viewCardGrid;
  const _defaultCardColProps = viewCardGrid ?? {
    xs: 24,
    lg: 12,
    xl: 8,
  };

  const { getAllConfig } = apiCrudConfig ?? {};

  const {
    getAllEntityCallback,
    getDetailsEntityCallback,
    deleteEntityCallback,
    patchEntityCallback,
  } = apiCRUDResult ?? {};

  const { getAllEntities, getDetailsEntity, patchEntity, deleteEntity } =
    useApiCRUD<
      requestParams,
      createRequest,
      updateRequest,
      patchRequest,
      getResponse,
      getAllResponse
    >(serviceName, {
      ...apiCrudConfig,
      getAllConfig: {
        onSuccess: (data, params, meta, extra) => {
          getAllConfig?.onSuccess &&
            getAllConfig?.onSuccess(data, params, meta, extra);
        },
        params: {
          ...(getAllConfig?.params as any),
        },
        enabled: getAllConfig ? getAllConfig.enabled : true,
      },
    });

  const { deleteAction, editAction, viewDetailsAction, extraAction } =
    actions ?? {};

  const _data: readonly getAllResponse[] = getAllEntityCallback
    ? tableProps?.dataSource ?? []
    : getAllEntities.data?.data.data ?? [];

  const ActionMode = actions?.mode ?? "icon";
  const _defaultDeleteButton =
    ActionMode === "icon" ? (
      <Button
        danger
        type="link"
        size="large"
        icon={<DeleteOutLinedIcon size={20} />}
      />
    ) : (
      <Button block danger type={"link"}>
        Delete
      </Button>
    );

  const _delfautEditButton =
    ActionMode === "icon" ? (
      <Button type="link" size="large" icon={<EditOutLinedIcon size={20} />} />
    ) : (
      <Button block type={"link"}>
        Edit
      </Button>
    );
  const _defaultViewButton =
    ActionMode === "icon" ? (
      <Button type="link" size="large" icon={<EyeOutlined size={20} />} />
    ) : (
      <Button block type={"link"}>
        View
      </Button>
    );

  const globalDeleteAction =
    typeof deleteAction === "object"
      ? {
          label: deleteAction.label ?? _defaultDeleteButton,
          withConfirm: deleteAction.withConfirm,
          onClick: (record: getAllResponse) => {
            deleteAction.onClick
              ? deleteAction.onClick(record, deleteEntity)
              : deleteEntity.mutate({
                  id: (record as any).id,
                });
          },
        }
      : deleteAction === true
      ? {
          label: _defaultDeleteButton,
          withConfirm: { title: "Are you sure you want to delete this item ?" },
          onClick: (record: getAllResponse) => {
            deleteEntity.mutate({
              id: (record as any).id,
            });
          },
        }
      : undefined;

  const globalEditAction: typeof editAction = editAction && {
    label: editAction.label ?? _delfautEditButton,
    onClick: (record) => {
      editAction.onClick && editAction.onClick(record, patchEntity);
      patchEntityCallback && patchEntityCallback(patchEntity, record);
    },
  };

  const globalviewDetailsAction: typeof viewDetailsAction =
    viewDetailsAction && {
      label: viewDetailsAction.label ?? _defaultViewButton,
      onClick: (record) => {
        viewDetailsAction.onClick &&
          viewDetailsAction.onClick(record, getDetailsEntity);
        getDetailsEntityCallback &&
          getDetailsEntityCallback(getDetailsEntity, record);
      },
    };

  const mergedColumns = useMemo(
    () => [
      ...(tableProps?.columns ?? []),
      ...getColumns<
        requestParams,
        createRequest,
        updateRequest,
        patchRequest,
        getResponse,
        getAllResponse
      >(_data, {
        deleteAction: globalDeleteAction,
        editAction: globalEditAction,
        viewDetailsAction: globalviewDetailsAction,
        mode: actions?.mode,
        extraAction: extraAction,
      }),
    ],
    [
      tableProps?.columns,
      _data,
      globalDeleteAction,
      globalEditAction,
      globalviewDetailsAction,
      actions?.mode,
      extraAction,
    ]
  );

  // useEffect(() => {
  //   if (!selectionMode) {
  // setSelectedRows([]);
  // }
  // }, [selectionMode]);

  return (
    <>
      <div {...containerProps}>
        {showRefetchingHeader && (
          <HeaderLoading top={-20} loading={getAllEntities.isRefetching} />
        )}
        {viewType === "list" ? (
          <div>
            <Table<getAllResponse>
              className={styles.Stable}
              scroll={{ x: 800, y: 400 }}
              {...tableProps}
              columns={mergedColumns}
              dataSource={_data.map((record, index) => {
                return {
                  key: (record as any).id ?? `row-${index}`,
                  ...record,
                };
              })}
              loading={
                getAllEntities.isLoading ||
                deleteEntity.isLoading ||
                patchEntity.isLoading ||
                Boolean(tableProps?.loading)
              }
            />
          </div>
        ) : (
          <>
            {_data.length > 0 ? (
              <CardsLayout
                key={"CardsLayout"}
                cardLayoutGutter={cardLayoutRowGutter}
                selection={selection}
                isLoading={
                  getAllEntities.isLoading ||
                  deleteEntity.isLoading ||
                  patchEntity.isLoading
                }
                cardLayoutMargin={cardLayoutMargin}
              >
                {_data.map((item, index) => {
                  return (
                    <>
                      <Col key={index} {..._defaultCardColProps}>
                        {cardRender ? (
                          cardRender(item, _data, {
                            deleteAction: deleteEntity,
                            editAction: patchEntity,
                          })
                        ) : cardConfig ? (
                          <StructuredCard
                            key={`card-${index}`}
                            actions={[
                              getEditAction<getAllResponse>({
                                editAction: globalEditAction,
                                record: item,
                                mode: "icon",
                              }),
                              getDeleteAction<getAllResponse>({
                                deleteAction: globalDeleteAction,
                                record: item,
                                mode: "icon",
                              }),
                              extraAction ? extraAction(item) : undefined,
                            ]}
                            {...cardConfig(item, _data)}
                          />
                        ) : (
                          item.toString()
                        )}
                      </Col>
                    </>
                  );
                })}
              </CardsLayout>
            ) : (
              <div className={styles["not-data-placeholder"]}>
                <Spin
                  spinning={
                    getAllEntities.isLoading || Boolean(tableProps?.loading)
                  }
                >
                  <Empty image={noDataIcon} />
                </Spin>
              </div>
            )}
          </>
        )}
        <div className={styles.flex}>
          {pagination && _data?.length > 0 && (
            <Pagination
              className={styles.pagination}
              current={getAllConfig?.params?.page}
              pageSize={getAllConfig?.params?.items_per_page}
              // total={getAllEntities?.data?.data?.pagination?.total}
              total={Number(getAllEntities?.data?.data?.pagination.totalItems)}
              currentPageLength={_data?.length ?? 0}
              {...pagination}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default CrudLayout;
