"use client"

import EChartsWrapper from "@components/echarts/EChartsWrapper"
import * as echarts from "echarts"
import React from "react"

interface BoxPlotProps {
  data: number[]
  title: string
  label: string
}

const BoxPlot: React.FC<BoxPlotProps> = ({ data, title, label }) => {
  const prepareBoxplotData = (rawData: number[]) => {
    const sortedData = [...rawData].sort((a, b) => a - b)
    const len = sortedData.length

    // Calculate quartiles
    const q1 = sortedData[Math.floor(len * 0.25)]
    const median = sortedData[Math.floor(len * 0.5)]
    const q3 = sortedData[Math.floor(len * 0.75)]
    const iqr = q3 - q1

    // Calculate whiskers
    const lowerWhisker = Math.max(...sortedData.filter((v) => v >= q1 - 1.5 * iqr))
    const upperWhisker = Math.min(...sortedData.filter((v) => v <= q3 + 1.5 * iqr))

    // Find outliers
    const outliers = sortedData.filter((v) => v < lowerWhisker || v > upperWhisker)

    return {
      boxData: [[lowerWhisker, q1, median, q3, upperWhisker]],
      outliers: outliers.map((value) => [0, value]) // First value is the x-axis position
    }
  }

  const { boxData, outliers } = prepareBoxplotData(data)

  const chartOption: echarts.EChartsOption = {
    title: {
      text: title,
      left: "center"
    },
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%"
    },
    xAxis: {
      type: "category",
      data: [label],
      boundaryGap: true,
      nameGap: 30,
      splitArea: {
        show: false
      },
      axisLabel: {
        formatter: "{value}"
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      name: "Value",
      splitArea: {
        show: true
      }
    },
    series: [
      {
        name: "BoxPlot",
        type: "boxplot",
        data: boxData,
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
        tooltip: {
          formatter: function (param: any) {
            return `Outlier: ${param.data[1].toFixed(2)}`
          }
        }
      }
    ]
  }

  return <EChartsWrapper option={chartOption} />
}

export default BoxPlot
