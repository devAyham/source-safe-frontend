import { ConfigProvider } from "antd";
import AuthContainer from "features/auth/components/AuthContainer/AuthContainer";
import RegisterForm from "features/auth/components/RegisterForm/RegisterForm";
import styles from "./styles.module.scss";
const RegisterPage = () => {
  return (
    <>
      <div className={styles.register_page}>
        <AuthContainer>
          <ConfigProvider direction="ltr">
            <RegisterForm />
          </ConfigProvider>
        </AuthContainer>
      </div>
    </>
  );
};

export default RegisterPage;
