import { FileTypesType } from "types/FilesTypes.type";

export interface IFileTypeStatistics {
  fileType: FileTypesType;
  filesCount: number;
  size: number;
}
