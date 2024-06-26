import EChartsWrapper from "./EChartsWrapper";

interface LineStackChartDataItemProps {
  name: string;
  data: number[];
}
interface LineStackChartProps {
  data: LineStackChartDataItemProps[];
  title?: string;
  legends: string[];
  categoryData: string[];
}

const LineStackChart = ({
  data,
  title,
  legends,
  categoryData,
}: LineStackChartProps) => {
  const chartOption: echarts.EChartsOption = {
    title: {
      text: title,
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: legends,
      top: "5%",
    },
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
  return <EChartsWrapper option={chartOption} />;
};

export default LineStackChart;
