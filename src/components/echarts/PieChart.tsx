import { roundToTwoDecimals } from "@/utils/number.utils";
import { getChartColors } from "@/utils/color.utils";
import EChartsWrapper from "@components/echarts/EChartsWrapper";
import * as echarts from "echarts";
import React from "react";
import { getBaseChartConfig } from "@/utils/chart.utils";

type LabelType = {
  formatter?: string;
};

export interface PieChartDataItem {
  value: number;
  name: string;
}

interface PieChartProps {
  title: string;
  selector?: React.ReactNode;
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

const PieChart: React.FC<PieChartProps> = ({ data, title, selector, label = {} }) => {
  const colors = getChartColors(data.length);
  const baseOptions = getBaseChartConfig();

  const chartOption: echarts.EChartsOption = {
    ...baseOptions,
    tooltip: {
      trigger: "item",
      formatter: '{b}: {c} ({d}%)'
    },
    series: [
      {
        name: title,
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "60%"],
        avoidLabelOverlap: true,
        padAngle: 2,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          ...label,
          show: true,
          position: "outside",
          formatter: "{b}: {c} ({d}%)",
          alignTo: 'edge',
          minMargin: 5,
          edgeDistance: 10,
          lineHeight: 15,
          rich: {
            time: {
              fontSize: 10,
              color: '#999'
            }
          }
        },
        labelLine: {
          length: 15,
          length2: 0,
          maxSurfaceAngle: 80
        },
        labelLayout: function (params: any) {
          const isLeft = params.labelRect.x < params.rect.width / 2
          return {
            hideOverlap: true,
            moveOverlap: 'shiftY',
            x: isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width,
            align: isLeft ? 'left' : 'right'
          }
        },
        data: data.map((item) => ({
          value: roundToTwoDecimals(item.value),
          name: item.name
        }))
      }
    ]
  }

  return <EChartsWrapper option={chartOption} title={title} selector={selector} />
}

export default PieChart
