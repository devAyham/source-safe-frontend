import { Image } from "components";
import { GenericColumnsType } from "interfaces/GenericColumnType";
import IGetAllResponse from "../../interfaces/GetAllResponse.interface";
import { Tag } from "antd";
import { FileStatusEnum } from "services/filesService/interfaces/Entity.interface";
import variables from "styles/variables/_main_colors_vars.module.scss";

function GetTableColumns(): GenericColumnsType<IGetAllResponse> {
  return [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Name",
      dataIndex: ["name"],
      key: "name",
      align: "center",
    },
    {
      title: "Estension",
      dataIndex: ["extension"],
      key: "extension",
      align: "center",
    },
    {
      title: "Created At",
      dataIndex: ["created_at"],
      key: "created_at",
      align: "center",
    },
    {
      title: "Last Modified",
      dataIndex: ["last_modified"],
      key: "last_modified",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: ["status"],
      key: "status",
      align: "center",
      render(value) {
        return (
          <Tag
            color={
              value === FileStatusEnum.CHECKED_IN
                ? variables.secondary_color_one
                : variables.success_dark
            }
          >
            {value === FileStatusEnum.CHECKED_IN ? "Checked-in" : "Free"}
          </Tag>
        );
      },
    },
  ];
}

export default GetTableColumns;
