import {Column, ColumnConfig} from "@ant-design/plots";

/** */
interface ColumnsChartProps {
  /** */
  config: ColumnConfig;
}
/**
 *
 * @param {ColumnsChartProps} param0
 * @returns
 */
const ColumnsChart = ({ config }: ColumnsChartProps) => {
  const handleClick = (event: Event) => {
    // your logic here
  };
  return (
    <Column
      onEvent={(chart, event) => {
        if (event.type === "click") {
        }
      }}
      {...config}
    />
  );
};
export default ColumnsChart;
