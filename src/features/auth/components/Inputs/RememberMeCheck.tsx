import { Checkbox, Form } from "antd";
import { useTranslation } from "react-i18next";

const RememberMeCheck = () => {
  return (
    <>
      <Form.Item name="rememberMe" valuePropName="checked" initialValue={true}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
    </>
  );
};

export default RememberMeCheck;
