import { CrudLayout, ICrudLayoutProps } from "components/organisms/CrudLayout";
import { useNavigate } from "react-router-dom";
import { GenericOmit } from "types/GenericOmit.type";
import { ServiceName } from "../../constant/ServiceName";
import ICreate from "../../interfaces/Create.interface";
import IGetAllResponse from "../../interfaces/GetAllResponse.interface";
import IGetResponse from "../../interfaces/GetResponse.interface";
import IRequestParams from "../../interfaces/RequestParams.interface";
import IUpdate from "../../interfaces/Update.interface";
import GetTableColumns from "./columns";

export interface Props
  extends GenericOmit<
    ICrudLayoutProps<
      IRequestParams,
      ICreate,
      IUpdate,
      IUpdate,
      IGetResponse,
      IGetAllResponse
    >,
    "serviceName"
  > {}

const LayoutContainer = (props: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <CrudLayout<
        IRequestParams,
        ICreate,
        IUpdate,
        IUpdate,
        IGetResponse,
        IGetAllResponse
      >
        viewType="list"
        tableProps={{
          columns: GetTableColumns(),
        }}
        // cardRender={(record) => {
        //   return (
        // <></>
        //   );
        // }}
        cardLayoutMargin="0px"
        cardLayoutRowGutter={[45, 20]}
        {...props}
        serviceName={ServiceName}
      />
    </>
  );
};
export default LayoutContainer;
