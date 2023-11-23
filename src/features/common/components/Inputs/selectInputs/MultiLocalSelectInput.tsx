import { Form, FormItemProps, TreeSelect } from "antd";
import { CompoundedComponent } from "antd/es/float-button/interface";
import { FilterType } from "../../../interfaces/FilterInterface.d";
import { useTranslation } from "react-i18next";
/** */
interface MultiLocalSelectInputProps extends FormItemProps {
  //  extends CompoundedComponent
  /** */
  name: string | any[]; // NOTE: Change from FilterType to string
  /** */
  data: any[];
  /** */
  maxTagCount?: number;
  // props : {...props}
}
/**
 *
 * @param {MultiLocalSelectInputProps} param0
 * @returns
 */
const MultiLocalSelectInput = ({
  name,
  maxTagCount = 1,
  data,
  ...props
}: MultiLocalSelectInputProps) => {
  const { t } = useTranslation();
  return (
    <Form.Item name={name} {...props}>
      <TreeSelect
        allowClear
        // onSearch={}
        bordered={false}
        showArrow
        style={{ minWidth: "160px", paddingLeft: 0 }}
        placeholder={t("PLEASE_SELECT")}
        maxTagCount={maxTagCount}
        treeCheckable={true}
        treeData={data.map((item: any, index: any) => {
          return { title: item, value: item, key: item };
        })}
      />
    </Form.Item>
  );
};

export default MultiLocalSelectInput;
