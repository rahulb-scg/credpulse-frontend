import { roundToTwoDecimals } from "@/utils/number.utils"
import EChartsWrapper from "@components/echarts/EChartsWrapper"
import * as echarts from "echarts"
// @ts-ignore
import { transform } from "echarts-stat"
import React from "react"

interface RegressChartProps {
  title: string
  data: string[][]
  order?: number
  xAxisLabel?: string
  yAxisLabel?: string
}

export enum RegressionPattern {
  LINEAR = "linear",
  POLYNOMIAL = "polynomial"
}

export function getFakeRegressionData(pointCount: number, pattern: string, order?: number): number[][] {
  const data = []

  switch (pattern) {
    case RegressionPattern.LINEAR:
      for (let i = 0; i < pointCount; i++) {
        const x = Math.random() * 100
        const y = 2 * x + Math.random() * 10
        data.push([x, y])
      }
      break
    case RegressionPattern.POLYNOMIAL:
      for (let i = 0; i < pointCount; i++) {
        const x = Math.random() * 100
        const y = Math.pow(x, 2) + Math.random() * 10
        data.push([x, y])
      }
      break
    default:
      for (let i = 0; i < pointCount; i++) {
        const x = Math.random() * 100
        const y = 2 * x + Math.random() * 10
        data.push([x, y])
      }
      break
  }
  return data
}

const Regression: React.FC<RegressChartProps> = ({ title, data, order, xAxisLabel, yAxisLabel }) => {
  echarts.registerTransform(transform.regression)
  console.log(data)

  let chartOption: echarts.EChartsOption = {
    dataset: [
      {
        source: data.map((d) => [parseFloat(d[0]).toFixed(5), parseFloat(d[1]).toFixed(5)])
      },
      {
        transform: {
          type: "ecStat:regression",
          config: {
            method: "polynomial",
            order: order ?? 2
          }
        }
      }
    ],
    title: {
      text: title,
      left: "center",
      padding: 16
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross"
      }
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      },
      name: xAxisLabel,
      nameLocation: "middle",
      nameGap: 40,
      nameTextStyle: {
        fontSize: 16
      }
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      },
      name: yAxisLabel,
      nameLocation: "middle",
      nameGap: 70,
      nameTextStyle: {
        fontSize: 16
      }
    },
    series: [
      {
        name: "scatter",
        type: "scatter",
        datasetIndex: 0
      },
      {
        name: "line",
        type: "line",
        smooth: true,
        datasetIndex: 1,
        symbolSize: 0.1,
        symbol: "circle",
        label: { show: false },
        labelLayout: { dx: -20 },
        encode: { label: 2, tooltip: 1 }
      }
    ]
  }

  return <EChartsWrapper option={chartOption} />
}

export default Regression
