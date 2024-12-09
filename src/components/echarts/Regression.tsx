import { roundToTwoDecimals } from "@/utils/number.utils";
import EChartsWrapper from "@components/echarts/EChartsWrapper";
import * as echarts from "echarts";
// @ts-ignore
import { transform } from "echarts-stat";
import React from "react";

interface RegressChartProps {
  title: string;
  data: string[][];
  order?: number;
}

export enum RegressionPattern {
  LINEAR = "linear",
  POLYNOMIAL = "polynomial",
}

export function getFakeRegressionData(
  pointCount: number,
  pattern: string,
  order?: number,
): number[][] {
  const data = [];

  switch (pattern) {
    case RegressionPattern.LINEAR:
      for (let i = 0; i < pointCount; i++) {
        const x = Math.random() * 100;
        const y = 2 * x + Math.random() * 10;
        data.push([x, y]);
      }
      break;
    case RegressionPattern.POLYNOMIAL:
      for (let i = 0; i < pointCount; i++) {
        const x = Math.random() * 100;
        const y = Math.pow(x, 2) + Math.random() * 10;
        data.push([x, y]);
      }
      break;
    default:
      for (let i = 0; i < pointCount; i++) {
        const x = Math.random() * 100;
        const y = 2 * x + Math.random() * 10;
        data.push([x, y]);
      }
      break;
  }
  return data;
}

const Regression: React.FC<RegressChartProps> = ({ title, data, order }) => {
  echarts.registerTransform(transform.regression);
  console.log(data);

  let chartOption: echarts.EChartsOption = {
    dataset: [
      {
        source: data.map((d) => [
          roundToTwoDecimals(parseFloat(d[0])),
          roundToTwoDecimals(parseFloat(d[1])),
        ]),
      },
      {
        transform: {
          type: "ecStat:regression",
          config: {
            method: "polynomial",
            order: order ?? 2,
          },
        },
      },
    ],
    title: {
      text: title,
      left: "center",
      padding: 16,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },
    series: [
      {
        name: "scatter",
        type: "scatter",
        datasetIndex: 0,
      },
      {
        name: "line",
        type: "line",
        smooth: true,
        datasetIndex: 1,
        symbolSize: 0.1,
        symbol: "circle",
        label: { show: true, fontSize: 16 },
        labelLayout: { dx: -20 },
        encode: { label: 2, tooltip: 1 },
      },
    ],
  };

  return <EChartsWrapper option={chartOption} />;
};

export default Regression;
