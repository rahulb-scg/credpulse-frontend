"use client"

import { getChartColors } from "@/utils/color.utils";
import { getBaseChartConfig } from "@/utils/chart.utils";
import EChartsWrapper from "@components/echarts/EChartsWrapper";
import type { EChartsOption } from "echarts";
import React from "react";

interface LineChartProps {
  title: string;
  data: number[][];
  xAxisData: string[];
  seriesNames: string[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  selector?: string;
}

export function getFakeLineChartData(count: number) {
  const data = [];
  const xAxisData = [];
  for (let i = 0; i < count; i++) {
    xAxisData.push("A " + i);
    data.push(Math.random() * 100);
  }
  return { data, xAxisData };
}

const LineChart: React.FC<LineChartProps> = ({
  title,
  data,
  xAxisData,
  seriesNames,
  xAxisLabel,
  yAxisLabel,
  selector
}) => {
  // Create options
  const baseOptions = getBaseChartConfig(xAxisLabel, yAxisLabel) // Empty title as it's handled by container
  const options: EChartsOption = {
    ...baseOptions,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxisData,
      name: xAxisLabel,
      nameLocation: "middle",
      nameGap: 35
    },
    series: data.map((series, index) => ({
      name: seriesNames[index],
      type: "line",
      data: series,
      emphasis: {
        focus: "series"
      }
    }))
  };

  return <EChartsWrapper option={options} title={title} selector={selector} />;
};

export default LineChart;
