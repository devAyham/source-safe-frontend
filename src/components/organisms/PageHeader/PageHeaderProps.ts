import {ColProps} from "antd/lib";
import {ButtonProps} from "components/atoms";
import {FilterProps} from "features/common/components/Filter/Filter";
import {SearchInputProps} from "features/common/components/Inputs/searchInput/SearchInput";
import {SorterProps} from "features/common/components/Sorter/Sorter";
import {HtmlHTMLAttributes, ReactElement, ReactNode} from "react";

export type TagConfigProps = HtmlHTMLAttributes<HTMLDivElement> & {
  icon: ReactElement;
  name: ReactNode;
};

export type TagProps = TagConfigProps | ReactNode;

export type ColConfig = Omit<
  ColProps,
  keyof React.HTMLAttributes<HTMLDivElement>
>;

export type ActionConfigProps = ButtonProps | ReactNode;

export type ActionWithGridProps = {
  action: ActionConfigProps;
  grid?: ColConfig;
};

export type MainActionConfigProps = {
  primaryAction?: ActionWithGridProps   ;
  secondaryAction?: ActionWithGridProps  ;
  customActions?: ActionWithGridProps   ;
};

export type MainActionProps = MainActionConfigProps | ReactNode;

export type ControlActionConfigProps = {
  sorter?: ReactNode | SorterProps;
  filter?: ReactNode | FilterProps;
  search?: ReactNode | SearchInputProps;
  extraAction?: ReactNode | ReactNode[];
};

export type ControlActionProps = ControlActionConfigProps | ReactNode;


export interface PageHeaderProps {
  title: ReactNode;
  tags?: TagProps[];
  mainActions?: MainActionProps;
  controlActions?: ControlActionProps;
}
