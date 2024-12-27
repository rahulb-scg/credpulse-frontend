"use client"

import { init } from "echarts"
import type { EChartsOption } from "echarts"
import React, { useEffect, useRef } from "react"
import { getBaseChartConfig } from "@/utils/chart.utils"
import EChartsWrapper from "./EChartsWrapper"

interface LineChartProps {
  data: {
    categories: string[]
    series: Array<{
      name: string
      data: number[]
    }>
  }
  title: string
  yAxisLabel?: string
  xAxisLabel?: string
  selector?: React.ReactNode
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  title, 
  yAxisLabel, 
  xAxisLabel,
  selector 
}) => {
  // Create options
  const baseOptions = getBaseChartConfig("", xAxisLabel, yAxisLabel, true) // Empty title as it's handled by container
  const options: EChartsOption = {
    ...baseOptions,
    tooltip: {
      ...baseOptions.tooltip,
      formatter: (params: any) => {
        const date = params[0].axisValue
        let tooltipContent = `<div style="margin: 0px 0 0;line-height:1;">
          <div style="margin: 0px 0 0;line-height:1;">
            <div style="font-size:14px;color:#666;font-weight:400;line-height:1;">
              ${date}
            </div>
          </div>`
        params.forEach((param: any) => {
          tooltipContent += `<div style="margin: 10px 0 0;line-height:1;">
            <div style="margin: 0px 0 0;line-height:1;">
              <div style="margin: 0px 0 0;line-height:1;">
                <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${param.color};"></span>
                <span style="font-size:14px;color:#666;font-weight:400;margin-left:2px">
                  ${param.seriesName}:
                </span>
                <span style="float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900">
                  ${param.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>`
        })
        tooltipContent += "</div>"
        return tooltipContent
      }
    },
    xAxis: {
      type: 'category',
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
      data: item.data,
      smooth: true,
      showSymbol: false,
      emphasis: {
        focus: "series"
      }
    }))
  }

  return (
    <EChartsWrapper 
      option={options} 
      title={title}
      selector={selector}
    />
  )
}

export default LineChart
