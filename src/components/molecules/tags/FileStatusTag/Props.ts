import { TagProps } from "antd";
import { FileStatusEnum } from "services/filesService/interfaces/Entity.interface";

export default interface Props extends TagProps {
  status: FileStatusEnum;
}
