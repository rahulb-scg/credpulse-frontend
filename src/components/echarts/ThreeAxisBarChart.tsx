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
  startColor?: string;
  middleColor?: string;
  endColor?: string;
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
  startColor = getChartColor(0),
  middleColor = getChartColor(1),
  endColor = getChartColor(2)
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
        color: [startColor, middleColor, endColor],
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
