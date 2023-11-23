import { AvatarProps } from "antd";
import { ReactNode } from "react";

export interface Props {
  avatarProps?: AvatarProps;
  title?: ReactNode;
  avatarSrc?: string;
  fallbackSrc?: string;
}
