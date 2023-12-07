import { Input, Upload, Form as AntForm } from "antd";
import FormItem from "antd/es/form/FormItem";
import { ServiceType } from "api/constants/servicesName";
import { Button, EntityForm } from "components";
import { useContext } from "react";
import LoadingContext from "../../../../providers/IsLoadingProvider/LoadingContext";
import ICreate from "../../interfaces/Create.interface";
import IGetResponse from "../../interfaces/GetResponse.interface";
import IUpdate from "../../interfaces/Update.interface";
import { IExtraData } from "./interfaces/ExtraData.interface";
import { IFormProps } from "./interfaces/FormProps.interface";
import { ISubmittedValues } from "./interfaces/SubmittedValues.interface";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { useForm } from "antd/es/form/Form";
import { useFolderApi } from "services/folderService/api";

function Form({ formName, entityId, onSuccess, onError }: IFormProps) {
  const { setIsEntityLoading } = useContext(LoadingContext);
  const {
    createEntity: { mutateAsync: createFolder },
    updateEntity: { mutateAsync: updateolder },
  } = useFolderApi();
  const onFinish = (values: ISubmittedValues) => {
    const formData = new FormData();
    formData.append("logo", values.logo.file);
    formData.append("name", values.name);
    entityId
      ? updateolder(formData).then(onSuccess).catch(onError)
      : createFolder(formData).then(onSuccess).catch(onError);
  };

  return (
    <>
      <EntityForm<ISubmittedValues, ICreate, IUpdate, IGetResponse, IExtraData>
        handleSubmit={onFinish}
        serviceName={ServiceType.Folder}
        formName={formName}
        entityId={entityId}
        formProps={{
          layout: "vertical",
        }}
        mappers={{
          mapPatchEntity: ({ id, logo, name }) => {
            setIsEntityLoading(true);
            return {
              id,
              logo,
              name,
            };
          },
          mapGetDetailsEntity: (data) => {
            return {
              logo: data.logo,
              name: data?.name,
            };
          },
          mapCreateEntity: ({ logo, name }) => {
            console.log(logo);
            setIsEntityLoading(true);
            return {
              logo,
              name,
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
            name: "logo",
            label: <div className="label">Logo</div>,
            labelCol: { span: 24 },
            render(value) {
              return (
                <FormItem
                  name={"logo"}
                  label={"folder logo"}
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
            label: <div className="label">Folder Name</div>,
            labelCol: { span: 24 },
          },
        ]}
      />
    </>
  );
}

export default Form;

{
  /* <AntForm
onFinish={onFinish}
form={form}
className={styles.form}
name={formName}
>
<FormItem
  name={"logo"}
  label={"folder logo"}
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
<FormItem
  name={"name"}
  label={"folder name"}
  labelCol={{ span: 24 }}
  required
  rules={[
    {
      required: true,
    },
  ]}
>
  <Input />
</FormItem>
</AntForm>
</> */
}
