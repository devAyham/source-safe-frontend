import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

import { MobileTwoTone } from "@ant-design/icons";
import { ReactNode } from "react";
import { FormItemProps } from "antd/lib/form/FormItem";
/** */
interface PhoneInputProps extends FormItemProps {
  /** */
  placeholder?: string;
  /** */
  prefix?: ReactNode;
  /** */
  className?: string;
}
/**
 *
 * @param {PhoneInputProps} param0
 * @returns
 */
const PhoneInput = ({
  placeholder,
  prefix,
  className,
  ...restProps
}: PhoneInputProps) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      name="phone"
      rules={[
        {
          required: true,
          message: `${t("form_login_page.form.messages.phone.required")}`,
        },
        {
          pattern: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
          message: `${t("form_login_page.form.messages.phone.pattern")}`,
        },
      ]}
      {...restProps}
    >
      <Input
        type={"tel"}
        size="large"
        placeholder={placeholder}
        prefix={prefix}
        className={className}
      />
    </Form.Item>
  );
};

export default PhoneInput;
