import { roundToTwoDecimals } from "@/utils/number.utils";
import EChartsWrapper from "@components/echarts/EChartsWrapper";
import * as echarts from "echarts";

// @ts-ignore
import { transform } from "echarts-stat";
import React from "react";
import { getBaseChartConfig } from "@/utils/chart.utils";

interface ClusteringProps {
  title: string;
  selector?: React.ReactNode;
  data: number[][];
  clusterCount: number;
  colors: string[];
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export function getFakeClusteringData(pointCount: number): number[][] {
  const data = [];
  for (let i = 0; i < pointCount; i++) {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    data.push([x, y]);
  }
  return data;
}

const Clustering: React.FC<ClusteringProps> = ({
  clusterCount,
  data,
  colors,
  title,
  selector,
  xAxisLabel,
  yAxisLabel
}) => {
  echarts.registerTransform(transform.clustering);

  const pieces = [];
  for (let i = 0; i < clusterCount; i++) {
    pieces.push({
      value: i,
      label: "cluster " + i,
      color: colors[i]
    });
  }

  const baseOptions = getBaseChartConfig(xAxisLabel, yAxisLabel, false);

  const chartOption: echarts.EChartsOption = {
    ...baseOptions,
    dataset: [
      {
        source: data.map((item) => [
          roundToTwoDecimals(item[0]),
          roundToTwoDecimals(item[1])
        ])
      },
      {
        transform: {
          type: "ecStat:clustering",
          config: {
            clusterCount: clusterCount,
            outputType: "single",
            outputClusterIndexDimension: 2
          }
        }
      }
    ],
    visualMap: {
      type: "piecewise",
      top: "middle",
      min: 0,
      max: clusterCount - 1,
      left: 10,
      splitNumber: clusterCount,
      dimension: 2,
      pieces: pieces
    },
    grid: {
      left: 120
    },
    series: {
      type: "scatter",
      encode: { tooltip: [0, 1] },
      symbolSize: 15,
      itemStyle: {
        borderColor: "#555"
      },
      datasetIndex: 1
    }
  };

  return <EChartsWrapper option={chartOption} title={title} selector={selector} />;
};

export default Clustering;
