import {DatePicker as Date, Form, FormItemProps} from "antd";
import {useTranslation} from "react-i18next";


const {RangePicker} = Date;

/** */
interface DataPickerProps extends FormItemProps {
    /** */
    initialValue?: [any, any];
    /** */
    showTime?: boolean;
}

/**
 *
 * @param {DataPickerProps} param0
 * @returns
 */
const CustomDatePicker = ({
                              showTime = true,
                              initialValue,
                              ...props
                          }: DataPickerProps) => {
    const {t} = useTranslation();
    return (
        <Form.Item
            label={<div className="label">{t("RANGE_DATE")}</div>}
            initialValue={initialValue}
            {...props}
        >
            <RangePicker
                allowClear
                defaultValue={initialValue}
                hideDisabledOptions={true}
                showTime={true}
                // showTime={showTime ? { format: "HH:mm" } : false}
                format={"YYYY-MM-DD HH:mm:ss"}
            />
        </Form.Item>
    );
};

export default CustomDatePicker;
