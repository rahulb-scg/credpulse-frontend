import { roundToTwoDecimals } from "@/utils/number.utils";
import EChartsWrapper from "@components/echarts/EChartsWrapper";
import * as echarts from "echarts";
import React from "react";

export interface PolyChartDataItem {
  name: string;
  value: number;
}

export interface PolyChartDataSet {
  name: string;
  type: "bar" | "line";
  data: PolyChartDataItem[];
}

interface PolyChartProps {
  title: string;
  xLabels: string[];
  datasets: PolyChartDataSet[];
}

export const generatePolyChartDataset = (
  count: number,
  itemsPerSet: number,
  type: "bar" | "line",
  min = 0,
  max = 1000,
): PolyChartDataSet[] => {
  const dataset: PolyChartDataSet[] = [];
  for (let i = 0; i < count; i++) {
    const data: PolyChartDataItem[] = [];
    for (let j = 0; j < itemsPerSet; j++) {
      data.push({
        name: `Item ${j}`,
        value: Math.floor(Math.random() * (max - min + 1) + min),
      });
    }
    dataset.push({
      name: `Dataset ${i}`,
      type,
      data,
    });
  }
  return dataset;
};

const PolyChart: React.FC<PolyChartProps> = ({ title, datasets, xLabels }) => {
  const chartOption: echarts.EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
        label: {
          show: true,
        },
      },
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    calculable: true,
    legend: {
      data: datasets.map((d) => d.name),
      itemGap: 5,
    },
    grid: {
      top: "12%",
      left: "1%",
      right: "10%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: xLabels,
      },
    ],
    yAxis: [
      {
        type: "value",
        name: title,
        axisLabel: {
          formatter: function (a: number) {
            a = +a;
            return isFinite(a) ? echarts.format.addCommas(+a / 1000) : "";
          },
        },
      },
    ],
    dataZoom: [
      {
        show: true,
        start: 1,
        end: 100,
      },
      {
        type: "inside",
        start: 94,
        end: 100,
      },
      {
        show: true,
        yAxisIndex: 0,
        filterMode: "empty",
        width: 30,
        height: "80%",
        showDataShadow: false,
        left: "93%",
      },
    ],
    series: datasets.map((d) => ({
      name: d.name,
      type: d.type,
      data: d.data.map((item) => roundToTwoDecimals(item.value)),
    })),
  };

  return <EChartsWrapper option={chartOption} />;
};

export default PolyChart;
