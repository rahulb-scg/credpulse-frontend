import { roundToTwoDecimals } from "@/utils/number.utils";
import EChartsWrapper from "@components/echarts/EChartsWrapper";
import * as echarts from "echarts";
import React from "react";

type LabelType = {
  formatter?: string;
};

export interface PieChartDataItem {
  value: number;
  name: string;
}
interface PieChartProps {
  title: string;
  data: PieChartDataItem[];
  className?: string;
  label?: LabelType;
}

export function getFakePieChartData(count: number) {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      value: Math.random() * 100,
      name: `Label ${i}`,
    });
  }
  return data;
}

const PieChart: React.FC<PieChartProps> = ({ data, title, label = {} }) => {
  const chartOption: echarts.EChartsOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },

    series: [
      {
        name: title,
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: true,
        padAngle: 2,
        itemStyle: {
          borderRadius: 10,
        },

        label: {
          ...label,
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "auto",
            fontWeight: "bolder",
          },
        },
        labelLine: {
          show: false,
        },
        data: data.map((item) => ({
          value: roundToTwoDecimals(item.value),
          name: item.name,
        })),
      },
    ],
  };

  return <EChartsWrapper option={chartOption} />;
};

export default PieChart;
