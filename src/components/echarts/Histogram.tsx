"use client"

import EChartsWrapper from "@components/echarts/EChartsWrapper"
import * as echarts from "echarts"
import React from "react"
import { getChartColor } from "@/utils/color.utils"
import { getBaseChartConfig } from "@/utils/chart.utils"

interface HistogramProps {
  data: number[]
  title: string
  label: string
  xAxisLabel?: string
  yAxisLabel?: string
  bins?: number
  selector?: React.ReactNode
}

const Histogram: React.FC<HistogramProps> = ({ 
  data, 
  title, 
  label, 
  xAxisLabel, 
  yAxisLabel, 
  bins = 10,
  selector 
}) => {
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
  const baseOptions = getBaseChartConfig(xAxisLabel || label, yAxisLabel || "Frequency", false)

  const chartOption: echarts.EChartsOption = {
    ...baseOptions,
    xAxis: {
      type: "category",
      data: binBoundaries.map((boundary) => boundary.toFixed(2)),
      name: xAxisLabel || label,
      nameLocation: 'middle',
      nameGap: 35,
      axisLabel: {
        hideOverlap: true
      }
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

  return <EChartsWrapper option={chartOption} title={title} selector={selector} />
}

export default Histogram
