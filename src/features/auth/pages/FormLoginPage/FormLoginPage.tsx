import LoginForm from "features/auth/components/LoginForm/LoginForm";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import AuthContainer from "features/auth/components/AuthContainer/AuthContainer";
import { NavLink } from "react-router-dom";
import { ConfigProvider } from "antd";
import Atropos from "atropos/react";
import { AtroposOptions } from "atropos/.";
const FormLoginPage = () => {
  const { t } = useTranslation();
  const atroposProps: AtroposOptions = {
    shadow: false,
    activeOffset: 100,
    rotateXMax: 1,
    rotateYMax: 1,
    stretchX: 1,
    stretchY: 1,
  };
  return (
    <>
      <div className={styles.form_login_page}>
        <Atropos {...atroposProps}>
          <AuthContainer>
            <ConfigProvider direction="ltr">
              <LoginForm />
            </ConfigProvider>
          </AuthContainer>
        </Atropos>
      </div>
    </>
  );
};

export default FormLoginPage;
