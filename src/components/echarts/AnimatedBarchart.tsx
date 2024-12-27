"use client";

import { roundToTwoDecimals } from "@/utils/number.utils";
import { getChartColors } from "@/utils/color.utils";
import EChartsWrapper from "@components/echarts/EChartsWrapper";
import * as echarts from "echarts";
import React from "react";
import { getBaseChartConfig } from "@/utils/chart.utils";

interface AnimatedHistogramProps {
  title: string;
  datasetNames: string[];
  datasets: number[][];
  xAxisData: string[];
  delay: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export function getFakeAnimatedHistogramData(count: number) {
  const data = [];
  const xAxisData = [];
  for (let i = 0; i < count; i++) {
    xAxisData.push("A " + i);
    data.push(Math.random() * 100);
  }
  return { data, xAxisData };
}

export const AnimatedBarchart: React.FC<AnimatedHistogramProps> = ({
  title,
  datasetNames,
  datasets,
  xAxisData,
  delay,
  xAxisLabel,
  yAxisLabel
}) => {
  const colors = getChartColors(datasets.length);
  const baseOptions = getBaseChartConfig(title, xAxisLabel, yAxisLabel, false);

  const chartOption: echarts.EChartsOption = {
    ...baseOptions,
    color: colors,
    toolbox: {
      feature: {
        magicType: {
          type: ["stack"]
        },
        dataView: {},
        saveAsImage: {
          pixelRatio: 2
        }
      }
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      name: xAxisLabel,
      nameLocation: 'middle',
      nameGap: 35,
      splitLine: {
        show: false
      },
      axisLabel: {
        hideOverlap: true
      }
    },
    series: datasets.map((dataset, index) => {
      if (dataset.length === 0) {
        throw new Error(`Dataset at index ${index} is empty.`)
      }
      return {
        name: datasetNames[index],
        type: "bar",
        data: dataset.map((value) => roundToTwoDecimals(value)),
        emphasis: {
          focus: "series"
        },
        animationDelay: function (idx) {
          return idx * delay
        },
        animationDelayUpdate: function (idx) {
          return idx * delay
        }
      }
    }),
    animationEasing: "elasticOut"
  }

  return <EChartsWrapper option={chartOption} />
}

export default AnimatedBarchart
