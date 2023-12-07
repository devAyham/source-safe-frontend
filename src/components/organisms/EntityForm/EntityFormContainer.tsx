import useApiCRUD from "../../../api/apiHooks/useApiCrud";
import { EntityFormContainerProps } from "./interfaces/CrudEntityForm.props";
import { EntityForm } from "./EntityForm";
import { Form } from "antd";
import { Spin } from "components/molecules/Spin";

export default function EntityFormContainer<
  SubmittedValues = {},
  createRequest = {},
  patchRequest = {},
  getResponse = {},
  extraData = {}
>({
  entityId,
  serviceName,
  schema,
  extraData: extra_data,
  mappers,
  formName,
  rowProps,
  formProps,
  actionName,
  actionButtonProps,
  getFormInstance,
  apiOptions,
  handleSubmit: onCustomSubmit,
}: EntityFormContainerProps<
  SubmittedValues,
  createRequest,
  patchRequest,
  getResponse,
  extraData
>) {
  const [form] = Form.useForm<(SubmittedValues & extraData) | getResponse>();
  const { mapGetDetailsEntity, mapPatchEntity, mapCreateEntity } =
    mappers ?? {};
  const { createEntity, patchEntity, getDetailsEntity } = useApiCRUD<
    {},
    createRequest | SubmittedValues,
    {},
    Partial<patchRequest | SubmittedValues>,
    getResponse,
    {}
  >(serviceName, {
    getAllConfig: {
      enabled: false,
    },
    getDetailsConfig: {
      id: entityId ?? "",
      enabled: !!entityId,
      onSuccess: (data) => {
        form.setFieldsValue(
          mapGetDetailsEntity
            ? mapGetDetailsEntity(data.data as any)
            : (data.data as any)
        );
        apiOptions?.getDetailsConfig?.onSuccess &&
          apiOptions?.getDetailsConfig?.onSuccess(data, "", "", "");
      },
    },
    createConfig: apiOptions?.createConfig,
    patchConfig: apiOptions?.patchConfig,
  });

  const handleSubmit = async (values: SubmittedValues & extraData) => {
    if (entityId) {
      const patchedData = mapPatchEntity
        ? mapPatchEntity({
            ...values,
            ...extra_data,
            id: entityId,
          })
        : {
            ...values,
            ...extra_data,
            id: entityId,
          };

      patchedData && patchEntity.mutate(patchedData);
    } else {
      const createdData = mapCreateEntity
        ? mapCreateEntity({
            ...values,
            ...extra_data,
          })
        : {
            ...values,
            ...extra_data,
          };
      createdData && createEntity.mutate(createdData);
    }
  };
  // console.log(mapGetDetailsEntity && entityId ? mapGetDetailsEntity(getDetailsEntity.data?.data as getResponse) : getDetailsEntity.data?.data as SubmittedValues)

  return (
    <Spin spinning={getDetailsEntity.isFetching}>
      <EntityForm<
        SubmittedValues,
        createRequest,
        patchRequest,
        getResponse,
        extraData
      >
        formProps={{
          form,
          ...formProps,
        }}
        getFormInstance={getFormInstance}
        actionName={actionName}
        actionButtonProps={actionButtonProps}
        formName={formName}
        initialValues={
          mapGetDetailsEntity && entityId && getDetailsEntity.isSuccess
            ? mapGetDetailsEntity(getDetailsEntity.data?.data as getResponse)
            : (getDetailsEntity.data?.data as SubmittedValues)
        }
        schema={schema}
        rowProps={rowProps}
        onSubmit={onCustomSubmit ?? handleSubmit}
      />
    </Spin>
  );
}
