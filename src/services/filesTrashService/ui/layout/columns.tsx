import { EntityWithAvatarInfo } from "components/molecules/EntityWithAvatarInf";
import { fileCategory } from "data/FileCategory";
import { dateFormatter } from "helpers/dateFormatter";
import { transformExtentionToFileType } from "helpers/transfromExtentionToFileType";
import { GenericColumnsType } from "interfaces/GenericColumnType";
import IGetAllResponse from "../../interfaces/GetAllResponse.interface";
import { FileStatusTag } from "components";
import { convertFileSize } from "helpers/convertFileSize";

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
      dataIndex: ["latest_size"],
      key: "size",
      align: "center",
      render(value) {
        return convertFileSize(value, "MB");
      },
    },
    {
      title: "Created At",
      dataIndex: ["created_at"],
      key: "created_at",
      align: "center",
      render(value) {
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
        return <FileStatusTag status={value} />;
      },
    },
  ];
}

export default GetTableColumns;
