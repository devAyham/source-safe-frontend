import { ConfigProvider } from "antd";
import CustomEmpty from "features/common/components/Empty/CustomEmpty";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { defaultTheme } from "styles/theme/defaultTheme";
import arEG from "antd/lib/locale/ar_EG";
import enUS from "antd/lib/locale/en_US";
import { useEffect } from "react";
import { UiSliceActions } from "features/common/redux/slices/uiSlices";

/**
 * @namespace AntDesignConfigProvider
 */

/**
 * @description init dirctions ,locale , theme ,and empty render component
 *   @param {any} children - wrapped components
 */
const AntDesignConfigProvider = ({ children }: any) => {
  const { theme } = useAppSelector((state) => state.ui);

  return <ConfigProvider theme={defaultTheme}>{children}</ConfigProvider>;
};
export default AntDesignConfigProvider;
