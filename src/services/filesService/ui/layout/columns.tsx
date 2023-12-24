import { Tag } from "antd";
import { EntityWithAvatarInfo } from "components/molecules/EntityWithAvatarInf";
import { fileCategory } from "data/FileCategory";
import { dateFormatter } from "helpers/dateFormatter";
import { transformExtentionToFileType } from "helpers/transfromExtentionToFileType";
import { GenericColumnsType } from "interfaces/GenericColumnType";
import { FileStatusEnum } from "services/filesService/interfaces/Entity.interface";
import variables from "styles/variables/_main_colors_vars.module.scss";
import IGetAllResponse from "../../interfaces/GetAllResponse.interface";

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
      align: "left",
      render(value, record, index) {
        const fileType =
          fileCategory[transformExtentionToFileType(record.extension)];
        return (
          <EntityWithAvatarInfo
            title={value}
            avatarProps={{
              size: 30,
              shape: "square",
              icon: fileType.icon,
              style: {
                background: fileType.color,
              },
            }}
          />
        );
      },
    },
    // {
    //   title: "Estension",
    //   dataIndex: ["extension"],
    //   key: "extension",
    //   align: "center",
    // },
    {
      title: "Size",
      dataIndex: ["size"],
      key: "size",
      align: "center",
      render(value, record, index) {
        return "1.7 MB";
      },
    },
    {
      title: "Created At",
      dataIndex: ["created_at"],
      key: "created_at",
      align: "center",
      render(value, record, index) {
        return dateFormatter(value);
      },
    },
    // {
    //   title: "Last Modified",
    //   dataIndex: ["last_modified"],
    //   key: "last_modified",
    //   align: "center",
    //   render(value, record, index) {
    //     return dateFormatter(value);
    //   },
    // },
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
