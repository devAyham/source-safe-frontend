import { CrudLayout, ICrudLayoutProps } from "components/organisms/CrudLayout";
import { GenericOmit } from "types/GenericOmit.type";
import { ServiceName } from "../../constant/ServiceName";
import ICreate from "../../interfaces/Create.interface";
import IGetAllResponse from "../../interfaces/GetAllResponse.interface";
import IGetResponse from "../../interfaces/GetResponse.interface";
import IRequestParams from "../../interfaces/RequestParams.interface";
import IUpdate from "../../interfaces/Update.interface";
import GetTableColumns from "./columns";
import { FolderCard } from "components/molecules/cards/FolderCard";
import { useNavigate } from "react-router-dom";
import { PagesRotes } from "router/constants/pagesRoutes";
import { dateFormatter } from "helpers/dateFormatter";

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
        viewType="cards"
        tableProps={{
          columns: GetTableColumns(),
        }}
        cardRender={({ id, logo, name, created_at, members }) => {
          return (
            <FolderCard
              icon={logo}
              folderName={name}
              members={
                members ?? [
                  {
                    user: { name: "ayham" },
                    role: "admin",
                  },
                  {
                    user: { name: "ayham" },
                    role: "user",
                  },
                  {
                    user: { name: "ayham" },
                    role: "user",
                  },
                ]
              }
              createdAt={dateFormatter(created_at ?? "")}
              onClick={() => {
                navigate(PagesRotes.DashboardRoutes.MyFolders.show(id));
              }}
            />
          );
        }}
        cardLayoutMargin="0px"
        cardLayoutRowGutter={[45, 20]}
        {...props}
        serviceName={ServiceName}
      />
    </>
  );
};
export default LayoutContainer;
