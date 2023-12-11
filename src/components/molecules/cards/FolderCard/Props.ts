import { ReactElement, ReactNode } from "react";

export interface Props {
  // active: boolean;
  icon: string;
  // actions?: ReactNode[];
  // badge?: ReactElement;
  folderName: ReactNode;
  // fileCount: number;
  // size: number;
  // membersImages: string[];
  createdAt: string;
  onClick?: (event: any) => void;
}
