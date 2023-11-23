import { Checkbox, Form } from "antd";
import { useTranslation } from "react-i18next";

const RememberMeCheck = () => {
  const { t } = useTranslation();

  return (
    <>
      <Form.Item name="rememberMe" valuePropName="checked" initialValue={true}>
        <Checkbox>{t("REMEMBER")}</Checkbox>
      </Form.Item>
    </>
  );
};

export default RememberMeCheck;
