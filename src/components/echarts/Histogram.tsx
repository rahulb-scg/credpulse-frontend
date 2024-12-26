"use client"

import EChartsWrapper from "@components/echarts/EChartsWrapper"
import * as echarts from "echarts"
import React from "react"

interface HistogramProps {
  data: number[]
  title: string
  label: string
  bins?: number
}

const Histogram: React.FC<HistogramProps> = ({ data, title, label, bins = 10 }) => {
  const prepareHistogramData = (rawData: number[]) => {
    const min = Math.min(...rawData)
    const max = Math.max(...rawData)
    const binWidth = (max - min) / bins

    // Initialize bins
    const histogramBins = Array(bins).fill(0)
    const binRanges = Array(bins)
      .fill(0)
      .map((_, i) => min + i * binWidth)

    // Count values in each bin
    rawData.forEach((value) => {
      const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1)
      histogramBins[binIndex]++
    })

    return {
      binCounts: histogramBins,
      binRanges: binRanges.map((start) => start.toFixed(2))
    }
  }

  const { binCounts, binRanges } = prepareHistogramData(data)

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
      data: binRanges,
      name: label,
      nameLocation: "middle",
      nameGap: 30,
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: "value",
      name: "Frequency"
    },
    series: [
      {
        name: "Frequency",
        type: "bar",
        data: binCounts,
        barWidth: "99%",
        tooltip: {
          formatter: function (param: any) {
            const binStart = parseFloat(binRanges[param.dataIndex])
            const binEnd = parseFloat(binRanges[param.dataIndex + 1] || (binStart + (max - min) / bins).toFixed(2))
            return [`Range: [${binStart}, ${binEnd})`, `Count: ${param.value}`].join("<br/>")
          }
        }
      }
    ]
  }

  return <EChartsWrapper option={chartOption} />
}

export default Histogram
