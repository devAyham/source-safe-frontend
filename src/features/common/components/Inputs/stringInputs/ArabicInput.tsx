import { Form, FormItemProps, Input } from "antd";
import { useTranslation } from "react-i18next";
/** */
interface ArabicInputProps extends FormItemProps {
  /** */
  name: string;
  /** */
  initialValue?: string;
  /** */
  placeholder?: any;
  /** */
  disabled?: boolean;
}
/**
 *
 * @param {ArabicInputProps} param0
 * @returns
 */
const ArabicInput = ({
  name,
  initialValue,
  placeholder,
  disabled,
  ...restProps
}: ArabicInputProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Form.Item
        // label={<div className="label">{t("ARABIC_NAME")}</div>}
        name={name}
        initialValue={initialValue}
        rules={
          !disabled
            ? [
                {
                  required: true,
                  type: "string",
                },
                {
                  pattern: /^[\u0621-\u064A0-9\- ]+$/g,
                  message: `${t("ENTER_ARABIC_PLEASE")}`,
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

export default ArabicInput;
