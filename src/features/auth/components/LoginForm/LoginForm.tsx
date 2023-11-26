import { MobileFilled } from "@ant-design/icons";
import { Col, Form, Input, Row } from "antd";
import { ReactComponent as Logo } from "assets/svg/generalSvgs/logo.svg";
import { Button } from "components";
import { useNewLogin } from "features/auth/apis/useLogin";
import { AuthSliceActions } from "features/auth/redux/slices/authSlice";
import { useAppDispatch } from "features/common/hooks/useReduxHooks";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import PasswordInput from "../Inputs/PasswordInput";
import RememberMeCheck from "../Inputs/RememberMeCheck";
import { ISubmittedValues } from "./SubmittedValues";
import styles from "./styles.module.scss";

/**
 *
 * @returns
 */
const LoginForm = () => {
  const { t } = useTranslation();
  const { mutateAsync, isLoading } = useNewLogin();
  const dispatch = useAppDispatch();

  const onFinish = ({ email, password, rememberMe }: ISubmittedValues) => {
    dispatch(AuthSliceActions.SetRememberMe(rememberMe));
    setTimeout(() => {
      mutateAsync({ password, email });
    }, 0);
  };

  return (
    <>
      <Row className={styles.login_form}>
        <Col span={24} className={styles.login_modal}>
          <div className={styles.avatar}>
            <Logo className={styles.avatar_icon} />
          </div>

          <Form
            className={styles.form}
            name="login"
            style={{ width: "100%" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name={"email"}
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input
                type="email"
                className={styles.login_input}
                prefix={<MobileFilled color="" />}
                placeholder="Email"
              />
            </Form.Item>
            <PasswordInput className={styles.login_input} />
            <RememberMeCheck />
            <Form.Item
              wrapperCol={{
                xs: { offset: 0, span: 16 },
                sm: { offset: 4, span: 16 },
              }}
            >
              <Button
                loading={isLoading}
                disabled={isLoading}
                style={{ width: "100%", marginTop: 20 }}
                type="primary"
                htmlType="submit"
                size="large"
              >
                {t("SUBMIT")}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default memo(LoginForm);
