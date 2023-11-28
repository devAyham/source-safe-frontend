import { UnlockFilled } from "@ant-design/icons";
import { Form, Input } from "antd";
import variables from "styles/variables/_main_colors_vars.module.scss";
/**
 *
 * @param param0
 * @returns
 */
const PasswordInput = ({ className }: { className?: string }) => {
  return (
    <Form.Item
      name="password"
      rules={[
        {
          required: true,
        },
        {
          min: 8,
        },
      ]}
    >
      <Input.Password
        size="large"
        placeholder={"Passowrd"}
        prefix={
          <UnlockFilled
            style={{
              color: variables.primary_color_one,
            }}
          />
        }
        className={className}
      />
    </Form.Item>
  );
};

export default PasswordInput;
