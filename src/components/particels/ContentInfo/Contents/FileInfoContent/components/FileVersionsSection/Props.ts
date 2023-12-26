import { IFileEntity } from "services/filesService";

export interface Props {
  versions?: IFileEntity["file_versions"];
}
