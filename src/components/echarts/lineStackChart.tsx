import EChartsWrapper from "./EChartsWrapper";
import * as echarts from "echarts";
import { getChartColors } from "@/utils/color.utils";

interface LineStackChartDataItemProps {
  name: string;
  data: number[];
}
interface LineStackChartProps {
  data: LineStackChartDataItemProps[];
  title: string;
  legends: string[];
  categoryData: string[];
}

const LineStackChart = ({
  data,
  title,
  legends,
  categoryData,
}: LineStackChartProps) => {
  const colors = getChartColors(data.length);

  const chartOption: echarts.EChartsOption = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: legends,
      top: "5%",
    },
    color: colors,
    xAxis: {
      type: "category",
      data: categoryData,
    },
    yAxis: {
      type: "value",
    },
    series: data?.map((el) => {
      return {
        name: el.name,
        type: "line",
        data: el.data,
      };
    }),
  };
  return <EChartsWrapper option={chartOption} title={title} />;
};

export default LineStackChart;
