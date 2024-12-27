"use client"

import EChartsWrapper from "@components/echarts/EChartsWrapper"
import * as echarts from "echarts"
import React from "react"
import { getChartColor } from "@/utils/color.utils"

interface HistogramProps {
  data: number[]
  title: string
  label: string
  bins?: number
}

const Histogram: React.FC<HistogramProps> = ({ data, title, label, bins = 10 }) => {
  // Calculate histogram data
  const min = Math.min(...data)
  const max = Math.max(...data)
  const binWidth = (max - min) / bins
  const binData = Array(bins).fill(0)
  
  data.forEach((value) => {
    const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1)
    binData[binIndex]++
  })

  const binBoundaries = Array(bins).fill(0).map((_, i) => min + i * binWidth)

  const chartOption: echarts.EChartsOption = {
    title: {
      text: title,
      left: "center"
    },
    tooltip: {
      trigger: "axis",
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
      data: binBoundaries.map((boundary) => boundary.toFixed(2)),
      name: label,
      nameLocation: "middle",
      nameGap: 30
    },
    yAxis: {
      type: "value",
      name: "Frequency"
    },
    series: [
      {
        name: "Frequency",
        type: "bar",
        data: binData,
        itemStyle: {
          color: getChartColor(0)
        },
        emphasis: {
          itemStyle: {
            color: getChartColor(1)
          }
        }
      }
    ]
  }

  return <EChartsWrapper option={chartOption} />
}

export default Histogram
