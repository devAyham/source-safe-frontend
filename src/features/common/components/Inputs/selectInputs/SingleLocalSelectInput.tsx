import { Form, FormItemProps, Select } from "antd";
/** */
interface SingleLocalSelectInputProps extends FormItemProps {
  /** */
  name: string | any[];
  /** */
  data: any[];
  /** */
  initialValue?: string;
  /** */
  placeholder?: string;
  /** */
  labelInValue?: boolean;
  /** */
  disabled?: boolean;
  /** */
  loading?: boolean;
}

/**
 *
 * @param {SingleLocalSelectInputProps} param0
 * @returns
 */
const SingleLocalSelectInput = ({
  name,
  data,
  initialValue,
  required,
  placeholder,
  // for showing the init value in the select input
  labelInValue = false,
  disabled = false,
  loading = false,
  ...props
}: SingleLocalSelectInputProps) => {
  return (
    <>
      <Form.Item initialValue={initialValue} name={name} {...props}>
        <Select
          loading={loading}
          disabled={disabled}
          showSearch
          labelInValue={labelInValue}
          defaultValue={initialValue}
          placeholder={placeholder}
          style={{ width: "100%" }}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label?.toLowerCase() ?? "").includes(input?.toLowerCase())
          }
          options={data?.map((item: any) => {
            if (item.value !== undefined) {
              return { label: item.name, value: item.value };
            } else {
              return { label: item, value: item };
            }
          })}
        />
      </Form.Item>
    </>
  );
};

export default SingleLocalSelectInput;
