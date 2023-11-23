import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { UnlockFilled } from "@ant-design/icons";
import variables from "styles/_colors.module.scss";
import { useAppSelector } from "features/common/hooks/useReduxHooks";
/**
 * 
 * @param param0 
 * @returns 
 */
const PasswordInput = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const { theme } = useAppSelector((state) => state.ui);
  return (
    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: `${t("THIS_FIELD_IS_REQUIRED")}`,
        },
        {
          min: 8,
          message: `${t("THIS_VALUE_IS_INVALID")}`,
        },
      ]}
    >
      <Input.Password
        size="large"
        placeholder={`${t("PASSWORD")}`}
        prefix={
          <UnlockFilled
            style={{
              color:
                theme === "green"
                  ? variables.primary_color_one_green
                  : variables.primary_color_one,
            }}
          />
        }
        className={className}
      />
    </Form.Item>
  );
};

export default PasswordInput;
