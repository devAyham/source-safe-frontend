import { Typography as AntTypography } from "antd";
import {
  ParagraphProps,
  TextProps,
  TitleProps,
  TypographyProps,
} from "./TypographyProps";
import styles from "./styles.module.scss";
const { title, paragraph, text } = styles;
const Typography: React.FC<TypographyProps> & {
  Title: React.FC<TitleProps>;
  SubTitle: React.FC<TitleProps>;
  Text: React.FC<TextProps>;
  Paragraph: React.FC<ParagraphProps>;
} = ({ className, ...restProps }) => {
  return <AntTypography {...restProps} />;
};

const Title: React.FC<TitleProps> = ({ className, ...restProps }) => {
  className = `${title} ${className}`;
  return <AntTypography.Title {...restProps} className={className} />;
};
const SubTitle: React.FC<TitleProps> = ({ className, ...restProps }) => {
  className = `${title} ${className}`;
  return <AntTypography.Title level={2} {...restProps} className={className} />;
};
const Text: React.FC<TextProps> = ({ className, ...restProps }) => {
  className = `${text} ${className}`;
  return <AntTypography.Text {...restProps} className={className} />;
};
const Paragraph: React.FC<ParagraphProps> = ({ className, ...restProps }) => {
  className = `${paragraph} ${className}`;
  return <AntTypography.Paragraph {...restProps} className={className} />;
};

Typography.Title = Title;
Typography.Text = Text;
Typography.Paragraph = Paragraph;
Typography.SubTitle = SubTitle;

export default Typography;
