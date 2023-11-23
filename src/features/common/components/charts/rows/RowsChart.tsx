import { Bar, BarConfig } from "@ant-design/plots";
import { theme } from "antd";
/** */
interface RowsChartProps {
  /** */
  config: BarConfig;
}
/**
 *
 * @param {RowsChartProps} param0
 * @returns
 */
const RowsChart = ({ config }: RowsChartProps) => {
  const { token } = theme.useToken();

  return (
    <Bar
      {...config}
      color={({ type }: any) => {
        return token.colorPrimary;
      }}
    />
  );
};
export default RowsChart;
