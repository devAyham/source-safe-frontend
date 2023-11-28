import { ThemeConfig } from "antd/es/config-provider/context";
import variables from "styles/variables/_main_colors_vars.module.scss";

export const defaultTheme: ThemeConfig = {
  token: {
    colorPrimary: variables.primary_color_one,
    colorError: variables.errors_color_one,
  },
};
