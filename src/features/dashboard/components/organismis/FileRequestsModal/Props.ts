import { ModalProps } from "components";
import { IFileEntity, IFileFormProps } from "services/filesService";
import { IUserEntity } from "services/userService";

export interface Props {
  modalProps: ModalProps;
  fileRequests: {
    file: IFileEntity;
    // user: IUserEntity;
  }[];
}
