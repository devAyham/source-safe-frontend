import { ServiceType } from "api/constants/servicesName";
import { EntityForm } from "components";
import { useContext } from "react";
import LoadingContext from "../../../../providers/IsLoadingProvider/LoadingContext";
import ICreate from "../../interfaces/Create.interface";
import IGetResponse from "../../interfaces/GetResponse.interface";
import IUpdate from "../../interfaces/Update.interface";
import { IExtraData } from "./interfaces/ExtraData.interface";
import { IFormProps } from "./interfaces/FormProps.interface";
import { ISubmittedValues } from "./interfaces/SubmittedValues.interface";
import { Input } from "antd";

function Form({ formName, entityId, onSuccess, onError }: IFormProps) {
  const { setIsEntityLoading } = useContext(LoadingContext);

  return (
    <EntityForm<ISubmittedValues, ICreate, IUpdate, IGetResponse, IExtraData>
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
            sm: 12,
          },
          required: true,
          name: "logo",
          label: <div className="label">Logo</div>,
          labelCol: { span: 24 },
          render(value) {
            return <Input type="file" name="logo" />;
          },
        },
        {
          grid: {
            sm: 12,
          },
          required: true,
          name: "name",
          label: <div className="label">Folder Name</div>,
          labelCol: { span: 24 },
        },
      ]}
    />
  );
}

export default Form;
