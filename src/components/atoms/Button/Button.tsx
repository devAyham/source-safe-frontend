import { Button as AntButton } from "antd";
import { ButtonType } from "types/Button.type";
import { ButtonProps } from "./ButtonProps";
import styles from "./styles.module.scss";

function Button({
  type = "basic",
  className,
  clickable = true,
  ...restProps
}: ButtonProps) {
  const { primary, secondry, notClickable, link, text, ghost, dashed } = styles;

  if (!clickable) className = `${className} ${notClickable}`;

  const Buttons: {
    [key in ButtonType]: React.ReactNode;
  } = {
    basic: <AntButton className={className} {...restProps} />,
    primary: (
      <AntButton
        {...restProps}
        className={`${className} ${primary}`}
        type="primary"
      />
    ),
    secondary: (
      <AntButton
        {...restProps}
        className={`${className} ${secondry}`}
        type="default"
      />
    ),
    link: (
      <AntButton
        {...restProps}
        className={`${className} ${link}`}
        type="link"
      />
    ),
    text: (
      <AntButton
        {...restProps}
        className={`${className} ${text}`}
        type="text"
      />
    ),
    ghost: (
      <AntButton
        {...restProps}
        className={`${className} ${ghost}`}
        type="ghost"
      />
    ),
    dashed: (
      <AntButton
        {...restProps}
        className={`${className} ${dashed}`}
        type="dashed"
      />
    ),
  };

  return <>{Buttons[type]}</>;
}

export default Button;
