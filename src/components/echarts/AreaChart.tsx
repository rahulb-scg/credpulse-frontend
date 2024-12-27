"use client"

import { roundToTwoDecimals } from "@/utils/number.utils"
import { getChartColor } from "@/utils/color.utils"
import EChartsWrapper from "@components/echarts/EChartsWrapper"
import * as echarts from "echarts"
import React from "react"
import { getBaseChartConfig } from "@/utils/chart.utils"

interface AreaChartProps {
  data: AreaChartDataItem[]
  title: string
  label: string
  xAxisLabel?: string
  yAxisLabel?: string
  selector?: React.ReactNode
}

export interface AreaChartDataItem {
  data: number
  date: string
}

export function getFakeAreaChartData(startDate: string, count: number): AreaChartDataItem[] {
  let base = +new Date(startDate)
  let oneDay = 24 * 3600 * 1000
  let date = []

  let data = [Math.random() * 300]

  for (let i = 1; i < count; i++) {
    let now = new Date((base += oneDay))
    date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"))
    data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
  }

  return date.map((item, index) => ({
    date: item,
    data: data[index]
  }))
}

const AreaChart: React.FC<AreaChartProps> = ({ 
  data, 
  title, 
  label, 
  xAxisLabel, 
  yAxisLabel,
  selector 
}) => {
  const baseOptions = getBaseChartConfig(xAxisLabel, yAxisLabel)
  
  const chartOption: echarts.EChartsOption = {
    ...baseOptions,
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.map((item) => item.date),
      name: xAxisLabel,
      nameLocation: 'middle',
      nameGap: 35,
      axisLabel: {
        hideOverlap: true
      }
    },
    series: [
      {
        name: label,
        type: "line",
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: getChartColor(0)
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: getChartColor(1)
            },
            {
              offset: 1,
              color: getChartColor(0)
            }
          ])
        },
        data: data.map((item) => item.data)
      }
    ]
  }

  return (
    <EChartsWrapper 
      option={chartOption}
      title={title}
      selector={selector}
    />
  )
}

export default AreaChart
