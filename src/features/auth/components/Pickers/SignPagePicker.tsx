import React, { memo } from "react";
import { Divider } from "antd";
import { useLanguage } from "features/common/hooks/useLanguage";
import styles from "./styles.module.scss";
import { LanguageTypes } from "features/common/types/LanguageTypes.d";
import { useLocation, useNavigate } from "react-router-dom";
import { PagesRotes } from "router/constants/pagesRoutes";
/**
 *
 * @description a custom langauge picker
 */
const SignPagePicker = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.lang_buttons}>
      <span
        className={`${styles.lang_name} ${
          location.pathname === PagesRotes.AuthRoutes.login && styles.active
        } `}
        onClick={() => {
          navigate(PagesRotes.AuthRoutes.login);
        }}
      >
        Login
      </span>
      <Divider type="vertical" className={styles.divider} />
      <span
        className={`${styles.lang_name} ${
          location.pathname === PagesRotes.AuthRoutes.register && styles.active
        }`}
        onClick={() => {
          navigate(PagesRotes.AuthRoutes.register);
          // setLanguage("ar");
        }}
      >
        Register
      </span>
    </div>
  );
};
export default memo(SignPagePicker);
