import { Form, FormItemProps, Input } from "antd";
import { NamePath } from "antd/es/form/interface";
import { useTranslation } from "react-i18next";
/** */
interface EnglishInputProps extends FormItemProps {
  /** */
  name: NamePath;
  /** */
  initialValue?: string;
  /** */
  placeholder?: string;
  /** */
  disabled?: boolean;
}
/**
 *
 * @param {EnglishInputProps} param0
 * @returns
 */
const EnglishInput = ({
  name,
  initialValue,
  placeholder,
  disabled,
  ...restProps
}: EnglishInputProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Form.Item
        // label={<div className="label">English Name</div>}
        initialValue={initialValue}
        name={name}
        rules={
          !disabled
            ? [
                {
                  required: true,
                  type: "string",
                },
                {
                  pattern: /^[a-zA-Z0-9\- .!@#$%^&*()]+$/g,
                  message: `${t("ENTER_ENGLISH_PLEASE")}`,
                  warningOnly: true,
                },
                { whitespace: true },
                {
                  min: 1,
                  max: 100,
                  message: `${t("FIELD_MUST_BE_BETWEEN")} 1 & 100`,
                },
              ]
            : []
        }
        {...restProps}
      >
        <Input
          // style={{ margin: 5 }}
          placeholder={placeholder}
          disabled={disabled}
        />
      </Form.Item>
    </>
  );
};

export default EnglishInput;
