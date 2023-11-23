import { Form, FormItemProps, Input } from "antd";
/** */
interface RandomInputProps extends FormItemProps {
  /** */
  name: string;
  /** */
  initialValue?: string | number;
  /** */
  placeholder?: string;
  /** */
  type?: string;
}
/**
 *
 * @param {RandomInputProps} param0
 * @returns
 */
const RandomInput = ({
  name,
  initialValue,
  placeholder,
  type = "text",
  ...restProps
}: RandomInputProps) => {
  return (
    <>
      <Form.Item
        initialValue={initialValue}
        name={name}
        rules={[
          {
            required: true,
            type: "string",
          },
          { whitespace: true },
          // { min: 3, max: 75, message: "must be between 5 and 25" },
        ]}
        {...restProps}
      >
        <Input
          // style={{ margin: 5 }}
          type={type}
          placeholder={placeholder}
        />
      </Form.Item>
    </>
  );
};

export default RandomInput;
