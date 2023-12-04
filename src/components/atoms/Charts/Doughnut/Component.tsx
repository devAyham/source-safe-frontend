import { Pie } from "@ant-design/charts";
import { ComponentProps } from "react";
import { Props } from "./Props";
import styles from "./styles.module.scss";
const DoughnutChart = <T extends Record<string, any>>({
  data,
  angleField,
  colorField,
  colors,
  loading,
}: Props<T>) => {
  const config: ComponentProps<typeof Pie> = {
    loading,
    data,
    angleField: angleField as string,
    colorField: colorField as string,
    color: colors ?? undefined,
    appendPadding: 10,
    radius: 1,
    innerRadius: 0.6,
    label: false,
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
      {
        type: "pie-statistic-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        formatter(datum: any, data) {
          const total = data?.reduce(
            (sum, item: any) => sum + item[angleField],
            0
          );
          const free = data?.reduce(
            (sum, item: any) =>
              item[colorField] !== "free" ? sum + item[angleField] : sum,
            0
          );
          return datum
            ? `<span><div class=${styles.type}>${datum[colorField]}</div><div class=${styles.content}>${datum[angleField]} GB </div></span>`
            : `<span><div class=${styles.type}>${free} GB</div><div class=${styles.content}> of ${total} GB </div></span>`;
        },
        style() {
          return {
            width: "28%",
            whiteSpace: "wrap",
            textAlign: "center",
          };
        },
      },
    },
    legend: false,
  };
  return <Pie {...config} />;
};

export default DoughnutChart;
