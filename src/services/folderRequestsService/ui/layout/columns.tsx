import { Image } from "components";
import { GenericColumnsType } from "interfaces/GenericColumnType";
import IGetAllResponse from "../../interfaces/GetAllResponse.interface";
import { Avatar } from "antd";
import { dateFormatter } from "helpers/dateFormatter";
import { EntityWithAvatarInfo } from "components/molecules/EntityWithAvatarInf";

function GetTableColumns(): GenericColumnsType<IGetAllResponse> {
  return [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Folder",
      dataIndex: ["folder"],
      key: "Folder",
      align: "center",
      render(value, record) {
        return (
          <EntityWithAvatarInfo
            avatarSrc={record.folder.logo}
            title={record.folder.name}
          />
        );
      },
    },
    {
      title: "Created At",
      dataIndex: ["folder", "created_at"],
      key: "folder",
      align: "center",
      render(value, record, index) {
        return dateFormatter(value);
      },
    },
    {
      title: "Files Count",
      dataIndex: ["folder", "files_counts"],
      key: "files_count",
      align: "center",
      render(value, record) {
        return `${record.folder.file_counts} files`;
      },
    },
    {
      title: "Members",
      dataIndex: ["members"],
      key: "members",
      align: "center",
      render(value, record, index) {
        return (
          <Avatar.Group
            maxCount={4}
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            {record.folder.members?.map((member) => {
              return (
                <Avatar style={{ backgroundColor: "#f56a00" }}>
                  {member.user.name}
                </Avatar>
              );
            })}
          </Avatar.Group>
        );
      },
    },
  ];
}

export default GetTableColumns;
