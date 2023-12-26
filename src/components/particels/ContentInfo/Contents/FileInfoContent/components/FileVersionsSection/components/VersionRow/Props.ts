import { ReactNode } from "react";
import { FileVersionType } from "services/filesService/interfaces/Entity.interface";

export interface Props extends FileVersionType {
  latest: boolean;
}
