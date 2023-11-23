import { Form, FormItemProps, Input, InputNumber, Space } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { FormInstance } from "antd/lib/form/Form";
import { isNumber } from "lodash";
import { Button } from "components";
/** */
interface NumberInputProps extends FormItemProps {
  /** */
  name: string | any[];
  /** */
  relativeName?: any;
  /** */
  initialValue?: string;
  /** */
  placeholder?: string;
  /** */
  controls?: boolean;
  /** */
  form?: FormInstance;
  /** */
  nagativeValues?: boolean;
  /** */
  disabled?: boolean;
}
/**
 *
 * @param {NumberInputProps} param0
 * @returns
 */
const NormalInputNumber = ({
  name,
  relativeName,
  initialValue = "0",
  placeholder,
  form,
  controls = false,
  nagativeValues = true,
  disabled = false,
  ...restProps
}: NumberInputProps) => {
  const [value, setValue] = useState<string | null | undefined>(initialValue);

  useEffect(() => {
    setValue(initialValue);
    form?.setFieldValue(name, initialValue);
  }, [initialValue]);

  return (
    <>
      <Form.Item initialValue={initialValue} name={name} {...restProps}>
        <Space>
          <InputNumber
            type={"number"}
            style={{ width: "100%" }}
            placeholder={placeholder}
            controls={controls}
            value={value}
            onChange={(val) => {
              setValue(val);
              form?.setFieldValue(name, val);
            }}
            min={!nagativeValues ? "0" : undefined}
            className={styles.numberInput}
          />
          {!disabled && (
            <>
              <Button
                className={styles.icon}
                icon={<PlusOutlined />}
                onClick={() => {
                  setValue(value ? `${+value + 1}` : `${1}`);
                  form?.setFieldValue(
                    relativeName ?? name,
                    value ? `${+value + 1}` : `${1}`
                  );
                  form?.validateFields([relativeName ?? name]);
                }}
              ></Button>
              <Button
                type="primary"
                className={styles.icon}
                danger
                icon={<MinusOutlined />}
                disabled={!nagativeValues && (Number(value) <= 0 || !value)}
                onClick={() => {
                  setValue(value ? `${+value - 1}` : `${-1}`);
                  form?.setFieldValue(
                    relativeName ?? name,
                    value ? `${+value - 1}` : `${-1}`
                  );
                  form?.validateFields([relativeName ?? name]);
                }}
              ></Button>
            </>
          )}
        </Space>
      </Form.Item>
    </>
  );
};

export default NormalInputNumber;
