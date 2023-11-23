import { ParagraphProps as AntParagraphProps } from "antd/es/typography/Paragraph";
import { TextProps as AntTextProps } from "antd/es/typography/Text";
import { TitleProps as AntTitleProps } from "antd/es/typography/Title";
import { TypographyProps as AntTypographyProps } from "antd/es/typography/Typography";

export interface TypographyProps extends AntTypographyProps<any> {}

export interface TextProps extends AntTextProps, TypographyProps {}

export interface ParagraphProps extends AntParagraphProps, TypographyProps {}

export interface TitleProps extends AntTitleProps, TypographyProps {}
