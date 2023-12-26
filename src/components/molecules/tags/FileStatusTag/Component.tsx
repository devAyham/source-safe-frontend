import { Tag } from "antd";
import { FileStatusEnum } from "services/filesService/interfaces/Entity.interface";
import variables from "styles/variables/_main_colors_vars.module.scss";
import Props from "./Props";

function Component({ status, ...restProps }: Props) {
  return (
    <Tag
      color={
        status === FileStatusEnum.CHECKED_IN
          ? variables.secondary_color_one
          : status === FileStatusEnum.CHECKED_OUT
          ? variables.success_dark
          : variables.warninig_dark
      }
      {...restProps}
    >
      {status === FileStatusEnum.CHECKED_IN
        ? "Checked-in"
        : status === FileStatusEnum.CHECKED_OUT
        ? "Free"
        : "Processing"}
    </Tag>
  );
}

export default Component;
