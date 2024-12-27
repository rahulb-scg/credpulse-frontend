import React from "react"
import EChartsWrapper from "./EChartsWrapper"
import type { EChartsOption } from "echarts"
import { getBaseChartConfig } from "@/utils/chart.utils"

interface StackedAreaChartProps {
  data: {
    categories: string[]
    series: Array<{
      name: string
      data: number[]
    }>
  }
  title: string
  selector?: React.ReactNode
  xAxisLabel?: string
  yAxisLabel?: string
}

const StackedAreaChart: React.FC<StackedAreaChartProps> = ({ 
  data, 
  title, 
  selector,
  xAxisLabel, 
  yAxisLabel 
}) => {
  const baseOptions = getBaseChartConfig(xAxisLabel, yAxisLabel, true)

  const chartOption: EChartsOption = {
    ...baseOptions,
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.categories,
      name: xAxisLabel,
      nameLocation: 'middle',
      nameGap: 35,
      axisLabel: {
        hideOverlap: true
      }
    },
    series: data.series.map((item) => ({
      name: item.name,
      type: "line",
      stack: "Total",
      smooth: true,
      areaStyle: {},
      emphasis: {
        focus: "series"
      },
      data: item.data.map((value) => 
        Number(value.toFixed(2))
      )
    }))
  }

  return (
    <EChartsWrapper 
      option={chartOption} 
      title={title}
      selector={selector}
    />
  )
}

export default StackedAreaChart
