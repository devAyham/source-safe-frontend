import { ConfigProvider } from "antd";
import AuthContainer from "features/auth/components/AuthContainer/AuthContainer";
import RegisterForm from "features/auth/components/RegisterForm/RegisterForm";
import styles from "./styles.module.scss";
import Atropos from "atropos/react";
import { AtroposOptions } from "atropos/.";
const RegisterPage = () => {
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
      <div className={styles.register_page}>
        <Atropos {...atroposProps}>
          <AuthContainer>
            <ConfigProvider direction="ltr">
              <RegisterForm />
            </ConfigProvider>
          </AuthContainer>
        </Atropos>
      </div>
    </>
  );
};

export default RegisterPage;
