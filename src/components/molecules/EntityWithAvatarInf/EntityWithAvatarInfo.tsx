import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { Image } from "components/atoms";
import { Props } from "./EntityWithAvatarInfo.props";

function EntityWithAvatarInfo({
  avatarProps,
  avatarSrc,
  title,
  fallbackSrc,
}: Props) {
  return (
    <Space size={8}>
      <Avatar
        size={40}
        src={
          avatarSrc ? (
            <Image
              width={"100%"}
              height={"100%"}
              src={avatarSrc}
              placeholder={<UserOutlined />}
            />
          ) : undefined
        }
        {...avatarProps}
      />
      {title}
    </Space>
  );
}

export default EntityWithAvatarInfo;
