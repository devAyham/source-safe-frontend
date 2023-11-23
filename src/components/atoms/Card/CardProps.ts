import { CardProps as AntCardProps } from "antd";
import {
  CardMetaProps as AntCardMetaProps,
  CardGridProps as AntCardGridProps,
} from "antd/es/card";

export interface CardProps extends Omit<AntCardProps , 'content'> {}

export interface CardMetaProps extends AntCardMetaProps {}

export interface CardGridProps extends AntCardGridProps {}
