import { FontColorsOutlined, MobileFilled } from "@ant-design/icons";
import { Col, Form, Input, Row } from "antd";
import { Button, Image } from "components";
import { useNewLogin } from "features/auth/apis/useLogin";
import { AuthSliceActions } from "features/auth/redux/slices/authSlice";
import { useAppDispatch } from "features/common/hooks/useReduxHooks";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import PasswordInput from "../Inputs/PasswordInput";
import RememberMeCheck from "../Inputs/RememberMeCheck";
import { ISubmittedValues } from "./SubmittedValues";
import styles from "./styles.module.scss";
import logo from "assets/logo.png";
import variables from "styles/_colors.module.scss";
import { useRegister } from "features/auth/apis/useRegister";

/**
 *
 * @returns
 */
const RegisterForm = () => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useRegister();
  const dispatch = useAppDispatch();

  const onFinish = ({
    email,
    password,
    rememberMe,
    name,
  }: ISubmittedValues) => {
    dispatch(AuthSliceActions.SetRememberMe(rememberMe));
    setTimeout(() => {
      mutate({ password, email, name });
    }, 0);
  };

  return (
    <>
      <Row className={styles.login_form}>
        <Col span={24} className={styles.login_modal}>
          <div className={styles.avatar}>
            <Image src={logo} className={styles.avatar_icon} />
          </div>
          <Form
            className={styles.form}
            name="register"
            style={{ width: "100%" }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name={"name"}
              rules={[
                {
                  required: true,
                  type: "string",
                },
              ]}
            >
              <Input
                type="name"
                className={styles.login_input}
                prefix={
                  <FontColorsOutlined
                    style={{
                      color: variables.primary_color_one,
                    }}
                  />
                }
                placeholder="Full Name"
              />
            </Form.Item>
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
                prefix={
                  <MobileFilled
                    style={{
                      color: variables.primary_color_one,
                    }}
                  />
                }
                placeholder="Email"
              />
            </Form.Item>
            <PasswordInput className={styles.login_input} />
            <RememberMeCheck />
            <Form.Item>
              <Button
                loading={isLoading}
                disabled={isLoading}
                style={{ width: "100%", marginTop: 20 }}
                type="primary"
                htmlType="submit"
                size="large"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default memo(RegisterForm);
