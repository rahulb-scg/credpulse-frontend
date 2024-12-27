import { roundToTwoDecimals } from "@/utils/number.utils";
import { getChartColor } from "@/utils/color.utils";
import EChartsWrapper from "@components/echarts/EChartsWrapper";
import * as echarts from "echarts";
import React from "react";
import { getBaseChartConfig } from "@/utils/chart.utils";

interface ThreeAxisBarChartProps {
  title: ThreeAxisBarTitle;
  data: ThreeAxIsBarGraphDataItem[];
  orientation: "horizontal" | "vertical";
  lowValText: string;
  highValText: string;
  selector?: string;
}

export interface ThreeAxIsBarGraphDataItem {
  xValue: number;
  yValue: number;
  Label: string;
}

export interface ThreeAxisBarTitle {
  xColumnName: string;
  yColumnName: string;
  labelColumnName: string;
}

export function getFakeThreeAxisBarGraphData(count: number) {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push({
      xValue: Math.random() * 100,
      yValue: Math.random() * 100,
      Label: "A " + i,
    });
  }
  return data;
}

export const ThreeAxisBarChart: React.FC<ThreeAxisBarChartProps> = ({
  title,
  data,
  orientation,
  lowValText,
  highValText,
  selector,
}) => {
  const baseOptions = getBaseChartConfig();

  const chartOption: echarts.EChartsOption = {
    ...baseOptions,
    dataset: {
      source: [
        [title.xColumnName, title.yColumnName, title.labelColumnName],
        ...data.map((d) => [
          roundToTwoDecimals(d.xValue),
          roundToTwoDecimals(d.yValue),
          d.Label,
        ]),
      ],
    },
    grid: {
      containLabel: true,
      left: '15%'
    },
    visualMap: {
      orient: orientation,
      left: "center",
      min: Math.min(...data.map((d) => d.xValue)),
      max: Math.max(...data.map((d) => d.xValue)),
      text: [highValText, lowValText],
      dimension: 0,
      inRange: {
        color: [getChartColor(0), getChartColor(1), getChartColor(2)],
      },
    },
    series: [
      {
        type: "bar",
        encode: {
          x: title.yColumnName,
          y: title.labelColumnName,
        },
      },
    ],
  };

  return <EChartsWrapper 
    option={chartOption} 
    title={title.labelColumnName}
    selector={selector}
  />;
};

export default ThreeAxisBarChart;
