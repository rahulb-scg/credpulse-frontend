"use client";

import { roundToTwoDecimals } from "@/utils/number.utils";
import EChartsWrapper from "@components/echarts/EChartsWrapper";
import * as echarts from "echarts";
import React from "react";

interface AnimatedHistogramProps {
  title: string;
  datasetNames: string[];
  datasets: number[][];
  xAxisData: string[];
  delay: number;
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
}) => {
  const chartOption: echarts.EChartsOption = {
    title: {
      text: title,
    },
    legend: {
      data: datasetNames,
    },
    toolbox: {
      feature: {
        magicType: {
          type: ["stack"],
        },
        dataView: {},
        saveAsImage: {
          pixelRatio: 2,
        },
      },
    },
    tooltip: {},
    xAxis: {
      data: xAxisData,
      splitLine: {
        show: false,
      },
    },
    yAxis: {},
    series: datasets.map((dataset, index) => {
      if (dataset.length === 0) {
        throw new Error(`Dataset at index ${index} is empty.`);
      }
      return {
        name: datasetNames[index],
        type: "bar",
        data: dataset.map((value) => roundToTwoDecimals(value)),
        emphasis: {
          focus: "series",
        },
        animationDelay: function (idx) {
          return idx * delay;
        },
        animationDelayUpdate: function (idx) {
          return idx * delay;
        },
      };
    }),
    animationEasing: "elasticOut",
  };

  return <EChartsWrapper option={chartOption} />;
};
