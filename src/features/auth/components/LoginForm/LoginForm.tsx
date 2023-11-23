import { Col, Form, Row } from "antd";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import PhoneInput from "features/common/components/Inputs/numberInputs/PhoneInput";
import PasswordInput from "../Inputs/PasswordInput";
import RememberMeCheck from "../Inputs/RememberMeCheck";
import { memo } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "features/common/hooks/useReduxHooks";
import { MobileFilled } from "@ant-design/icons";
import variables from "styles/_colors.module.scss";
import ImportSvg from "features/common/helpers/importSvg";
import { Button } from "components";
import { useNewLogin } from "features/auth/apis/useLogin";
import { ISubmittedValues } from "./SubmittedValues";
import { AuthSliceActions } from "features/auth/redux/slices/authSlice";
import { ReactComponent as Logo } from "assets/svg/generalSvgs/logo.svg";

/**
 *
 * @returns
 */
const LoginForm = () => {
  const { t } = useTranslation();
  const { mutateAsync, isLoading } = useNewLogin();
  const { theme } = useAppSelector((state) => state.ui);
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
            <PhoneInput
              placeholder={`${t("PHONE_NUMBER")}`}
              rules={[
                {
                  validator(rule, value, callback) {
                    if (!value) {
                      return Promise.reject(
                        new Error(`${t("THIS_FIELD_IS_REQUIRED")}`)
                      );
                    }
                    if (value && value.match(/^[0]/g)) {
                      return Promise.reject(
                        new Error(`${t("SHOULD_NOT_START_WITH_ZERO")}`)
                      );
                    }
                    if (value && !value.match(/^[0-9]{9}$/g)) {
                      return Promise.reject(
                        new Error(`${t("THIS_VALUE_IS_INVALID")}`)
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              prefix={
                <>
                  <MobileFilled
                    style={{
                      color:
                        theme === "green"
                          ? variables.primary_color_one_green
                          : variables.primary_color_one,
                    }}
                  />{" "}
                  +963
                </>
              }
              className={styles.login_input}
            />
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
