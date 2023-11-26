import LoginForm from "features/auth/components/LoginForm/LoginForm";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import AuthContainer from "features/auth/components/AuthContainer/AuthContainer";
import { NavLink } from "react-router-dom";
import { ConfigProvider } from "antd";
const FormLoginPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.form_login_page}>
        <AuthContainer>
          <ConfigProvider direction="ltr">
            <LoginForm />
          </ConfigProvider>
        </AuthContainer>
      </div>
    </>
  );
};

export default FormLoginPage;
