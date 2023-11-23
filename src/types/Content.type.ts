import { ReactNode } from "react";

export type Item = {
  key: ReactNode;
  value?: ReactNode;
};

export type ContentType = Item[] | ReactNode;
