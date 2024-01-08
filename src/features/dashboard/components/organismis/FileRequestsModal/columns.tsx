import { Space } from "antd";
import { EntityWithAvatarInfo } from "components/molecules/EntityWithAvatarInf";
import { fileCategory } from "data/FileCategory";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
import { AcceptJoinRequest } from "features/foldersRequests/components/AcceptJoinRequest";
import { RejectJoinRequest } from "features/foldersRequests/components/RejectJoinRequest";
import { convertFileSize } from "helpers/convertFileSize";
import { dateFormatter } from "helpers/dateFormatter";
import { transformExtentionToFileType } from "helpers/transfromExtentionToFileType";
import { GenericColumnsType } from "interfaces/GenericColumnType";
import { IFileEntity } from "services/filesService";
import { IUserEntity } from "services/userService";
import { AcceptFileAddRequest } from "../../molecules/AcceptFileAddRequest";
import { RejectFileAddRequest } from "../../molecules/RejectFileAddRequest";

function GetFileRequestTableColumns(): GenericColumnsType<{
  file: IFileEntity;
  // user: IUserEntity;
}> {
  const { filesSizeType } = useAppSelector((state) => state.sharedData);
  return [
    {
      title: "#",
      dataIndex: ["file", "id"],
      key: "id",
      width: 60,
    },
    {
      title: "Name",
      dataIndex: ["file", "name"],
      key: "name",
      align: "left",
      render(value, record, index) {
        const fileType =
          fileCategory[transformExtentionToFileType(record.file.extension)];
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
    //   title: "Created By",
    //   dataIndex: ["user", "name"],
    //   key: "created_by",
    //   align: "center",
    //   render(value, record, index) {
    //     return <>{value}</>;
    //   },
    // },
    {
      title: "Estension",
      dataIndex: ["file", "extension"],
      key: "extension",
      align: "center",
    },
    {
      title: "Size",
      dataIndex: ["file", "latest_size"],
      key: "size",
      align: "center",
      render(value, record) {
        return convertFileSize(
          (record.file as any).FileVersion[0].size,
          filesSizeType
        );
      },
    },
    {
      title: "Created At",
      dataIndex: ["file", "created_at"],
      key: "created_at",
      align: "center",
      render(value) {
        return dateFormatter(value);
      },
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render(value, record) {
        return (
          <>
            <Space>
              <AcceptFileAddRequest request_id={record.file.id} />
              <RejectFileAddRequest request_id={record.file.id} />
            </Space>
          </>
        );
      },
    },
  ];
}

export default GetFileRequestTableColumns;
