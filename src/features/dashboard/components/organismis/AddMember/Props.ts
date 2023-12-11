import { ModalProps } from "components";
import { IFileFormProps } from "services/filesService";

export interface Props {
  modalProps: ModalProps;
  formProps: Omit<IFileFormProps, "folder_id">;
}
