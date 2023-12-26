import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import FormItem from "antd/es/form/FormItem";
import { ServiceType } from "api/constants/servicesName";
import { Button, EntityForm } from "components";
import { useContext } from "react";
import { useFolderApi } from "services/folderService/api";
import LoadingContext from "../../../../providers/IsLoadingProvider/LoadingContext";
import ICreate from "../../interfaces/Create.interface";
import IGetResponse from "../../interfaces/GetResponse.interface";
import IUpdate from "../../interfaces/Update.interface";
import { IExtraData } from "./interfaces/ExtraData.interface";
import { IFormProps } from "./interfaces/FormProps.interface";
import { ISubmittedValues } from "./interfaces/SubmittedValues.interface";
import { useFileApi } from "services/filesService/api";

function Form({
  formName,
  entityId,
  onSuccess,
  onError,
  folder_id,
}: IFormProps) {
  const { setIsEntityLoading } = useContext(LoadingContext);
  const {
    createEntity: { mutateAsync: createFolder },
    updateEntity: { mutateAsync: updateolder },
  } = useFileApi();
  const onFinish = (values: ISubmittedValues) => {
    const formData = new FormData();
    formData.append("file", values.file.file);
    formData.append("folder_id", String(folder_id));
    formData.append("name", values.name);
    entityId
      ? updateolder(formData).then(onSuccess).catch(onError)
      : createFolder(formData).then(onSuccess).catch(onError);
  };

  return (
    <>
      <EntityForm<ISubmittedValues, ICreate, IUpdate, IGetResponse, IExtraData>
        handleSubmit={onFinish}
        serviceName={ServiceType.File}
        formName={formName}
        entityId={entityId}
        formProps={{
          layout: "vertical",
        }}
        mappers={{
          mapPatchEntity: ({ id, file, name }) => {
            setIsEntityLoading(true);
            return {
              id,
              file,
              name,
            };
          },
          // mapGetDetailsEntity: (data) => {
          //   return {
          //     file :data?.f
          //     name: data?.name,
          //   };
          // },
          mapCreateEntity: ({ file, name }) => {
            setIsEntityLoading(true);
            return {
              file,
              name,
              folder_id,
            };
          },
        }}
        apiOptions={{
          createConfig: {
            onSuccess: onSuccess,
            onError: onError,
          },
          patchConfig: {
            onSuccess: onSuccess,
            onError: onError,
          },
        }}
        rowProps={{
          gutter: [16, 16],
        }}
        schema={[
          {
            grid: {
              sm: 24,
            },
            required: true,
            name: "file",
            label: <div className="label">File</div>,
            labelCol: { span: 24 },
            render() {
              return (
                <FormItem
                  name={"file"}
                  label={"File logo"}
                  labelCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Upload.Dragger
                    beforeUpload={(file) => {
                      return false;
                    }}
                    multiple={false}
                    listType="picture"
                    height={100}
                  >
                    <Button type="primary" icon={<UploadOutlined />}>
                      Click to Upload
                    </Button>
                  </Upload.Dragger>
                </FormItem>
              );
            },
          },
          {
            grid: {
              sm: 24,
            },
            required: true,
            name: "name",
            label: <div className="label">File Name</div>,
            labelCol: { span: 24 },
          },
        ]}
      />
    </>
  );
}

export default Form;
