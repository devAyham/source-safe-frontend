import { Form, Input } from "antd";
import { FormItemProps } from "antd/lib/form/FormItem";
/** */
interface TextAreaProps extends FormItemProps {
  /** */
  initialValue?: string | any[];
  /** */
  disabled?: boolean;
  /** */
  readOnly?: boolean;
  /** */
  rows?: number;
}
/**
 *
 * @param {TextAreaProps} param0
 * @returns
 */
const CustomTextArea = ({
  initialValue,
  disabled,
  readOnly,
  rows = 2,
  ...props
}: TextAreaProps) => {
  return (
    <Form.Item {...props} initialValue={initialValue}>
      <Input.TextArea
        readOnly={readOnly}
        disabled={disabled}
        defaultValue={initialValue}
        autoSize={{ minRows: rows, maxRows: rows }}
      />
    </Form.Item>
  );
};

export default CustomTextArea;
