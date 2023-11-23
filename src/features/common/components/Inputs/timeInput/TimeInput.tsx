import { Form, FormItemProps, TimePicker } from "antd";
import dayjs from "dayjs";
import type { DisabledTimes } from "rc-picker/lib/interface";
/** */
interface TimeInputProps extends FormItemProps {
  /** */
  name: string;
  /** */
  label: string;
  /** */
  initialValue?: string;
  /** */
  disabledTime?: (date: dayjs.Dayjs) => DisabledTimes;
}
/**
 *
 * @param {TimeInputProps} param0
 * @returns
 */
const TimeInput = ({
  name,
  label,
  initialValue,
  disabledTime,
  ...restProps
}: TimeInputProps) => {
  return (
    <>
      <Form.Item
        label={<div className="label">{label}</div>}
        name={name}
        initialValue={initialValue}
        {...restProps}
      >
        <TimePicker
          style={{ margin: 5 }}
          disabledTime={disabledTime}
          format={"h:mm A"}
          suffixIcon
        />
      </Form.Item>
    </>
  );
};

export default TimeInput;
