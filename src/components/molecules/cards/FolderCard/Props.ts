import { ReactElement, ReactNode } from "react";
import { MemberType } from "services/folderService/types/member.type";

export interface Props {
  // active: boolean;
  icon: string;
  // actions?: ReactNode[];
  // badge?: ReactElement;
  folderName: ReactNode;
  fileCount: number;
  size: number;
  members: MemberType[];
  createdAt: string;
  onClick?: (event: any) => void;
}
