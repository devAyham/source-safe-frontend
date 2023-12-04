import { Image } from "components";
import { GenericColumnsType } from "interfaces/GenericColumnType";
import { useTranslation } from "react-i18next";
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
      title: "Logo",
      dataIndex: ["logo"],
      key: "image",
      align: "center",
      render(value) {
        return <Image src={value} width={50} height={50} />;
      },
    },
    {
      title: "Name",
      dataIndex: ["name"],
      key: "name",
      align: "center",
    },
  ];
}

export default GetTableColumns;
