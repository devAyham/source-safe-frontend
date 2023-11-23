import { Form } from "antd";
import { Button } from "components";
import { useTranslation } from "react-i18next";

const SubmitButton = () => {
  const { t } = useTranslation();

  return (
    <Form.Item
      wrapperCol={{
        xs: { offset: 0, span: 16 },
        sm: { offset: 4, span: 16 },
      }}
    >
      <Button
        loading
        style={{ width: "100%" }}
        type="primary"
        htmlType="submit"
        size="large"
      >
        {t("SUBMIT")}
      </Button>
    </Form.Item>
  );
};

export default SubmitButton;
