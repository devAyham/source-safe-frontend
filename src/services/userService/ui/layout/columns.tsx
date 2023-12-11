import { GenericColumnsType } from "interfaces/GenericColumnType";
import IGetAllResponse from "../../interfaces/GetAllResponse.interface";

function GetTableColumns(): GenericColumnsType<IGetAllResponse> {
  return [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: ["name"],
      key: "name",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: ["email"],
      key: "email",
      align: "center",
    },
  ];
}

export default GetTableColumns;
