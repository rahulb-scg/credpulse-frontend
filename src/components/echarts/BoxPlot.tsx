"use client"

import EChartsWrapper from "@components/echarts/EChartsWrapper"
import * as echarts from "echarts"
import React from "react"
import { getChartColor } from "@/utils/color.utils"
import { getBaseChartConfig } from "@/utils/chart.utils"

interface BoxPlotProps {
  data: number[]
  title: string
  label: string
  xAxisLabel?: string
  yAxisLabel?: string
  selector?: React.ReactNode
}

const BoxPlot: React.FC<BoxPlotProps> = ({ data, title, label, xAxisLabel, yAxisLabel, selector }) => {
  // Calculate box plot data
  const sortedData = [...data].sort((a, b) => a - b)
  const q1Index = Math.floor(sortedData.length * 0.25)
  const q3Index = Math.floor(sortedData.length * 0.75)
  const q1 = sortedData[q1Index]
  const median = sortedData[Math.floor(sortedData.length * 0.5)]
  const q3 = sortedData[q3Index]
  const iqr = q3 - q1
  const lowerWhisker = Math.max(...sortedData.filter((d) => d >= q1 - 1.5 * iqr))
  const upperWhisker = Math.min(...sortedData.filter((d) => d <= q3 + 1.5 * iqr))

  // Find outliers
  const outliers = sortedData.filter((d) => d < lowerWhisker || d > upperWhisker).map((value) => [0, value])
  const boxData = [[lowerWhisker, q1, median, q3, upperWhisker]]

  const baseOptions = getBaseChartConfig(xAxisLabel, yAxisLabel, false)

  const chartOption: echarts.EChartsOption = {
    ...baseOptions,
    xAxis: {
      type: "category",
      data: [label],
      name: xAxisLabel,
      nameLocation: 'middle',
      nameGap: 35,
      boundaryGap: true,
      splitLine: {
        show: false
      },
      axisLabel: {
        hideOverlap: true
      }
    },
    yAxis: {
      type: "value",
      name: yAxisLabel || "Value",
      nameLocation: 'middle',
      nameGap: 50,
      splitArea: {
        show: true
      }
    },
    series: [
      {
        name: "BoxPlot",
        type: "boxplot",
        data: boxData,
        itemStyle: {
          color: getChartColor(0),
          borderColor: getChartColor(1)
        },
        tooltip: {
          formatter: function (param: any) {
            return [
              `${param.name}: `,
              `Upper Whisker: ${param.data[4].toFixed(2)}`,
              `Q3: ${param.data[3].toFixed(2)}`,
              `Median: ${param.data[2].toFixed(2)}`,
              `Q1: ${param.data[1].toFixed(2)}`,
              `Lower Whisker: ${param.data[0].toFixed(2)}`
            ].join("<br/>")
          }
        }
      },
      {
        name: "Outliers",
        type: "scatter",
        data: outliers,
        itemStyle: {
          color: getChartColor(2)
        },
        tooltip: {
          formatter: function (param: any) {
            return `Outlier: ${param.data[1].toFixed(2)}`
          }
        }
      }
    ]
  }

  return <EChartsWrapper option={chartOption} title={title} selector={selector} />
}

export default BoxPlot
