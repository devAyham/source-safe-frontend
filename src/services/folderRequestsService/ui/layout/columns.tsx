import { Image } from "components";
import { GenericColumnsType } from "interfaces/GenericColumnType";
import IGetAllResponse from "../../interfaces/GetAllResponse.interface";
import { Avatar } from "antd";
import { dateFormatter } from "helpers/dateFormatter";

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
      dataIndex: ["folder", "name"],
      key: "name",
      align: "center",
    },
    {
      title: "Created At",
      dataIndex: ["folder", "create_At"],
      key: "folder",
      align: "center",
      render(value, record, index) {
        return dateFormatter(value);
      },
    },
    {
      title: "Files Count",
      dataIndex: ["files_count"],
      key: "files_count",
      align: "center",
      render(value) {
        return `${value} files`;
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
            {record.members.map((member) => {
              return (
                <Avatar style={{ backgroundColor: "#f56a00" }}>
                  {member.name}
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
