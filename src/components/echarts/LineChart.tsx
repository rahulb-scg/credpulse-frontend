"use client"

import React, { useEffect, useRef } from "react"
import { init, getInstanceByDom } from "echarts"
import type { EChartsOption } from "echarts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
}

const LineChart: React.FC<LineChartProps> = ({ data, title, yAxisLabel }) => {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize chart
    let chart: echarts.ECharts | undefined
    if (chartRef.current !== null) {
      chart = init(chartRef.current)
    }

    // Return if chart or data is not available
    if (!chart || !data) {
      return
    }

    // Create options
    const options: EChartsOption = {
      tooltip: {
        trigger: "axis",
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
      legend: {
        data: data.series.map((s) => s.name),
        bottom: "0%"
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "10%",
        top: "8%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: data.categories,
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: "value",
        name: yAxisLabel,
        nameLocation: "middle",
        nameGap: 50,
        axisLabel: {
          formatter: (value: number) => {
            return value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })
          }
        }
      },
      series: data.series.map((s) => ({
        name: s.name,
        type: "line",
        smooth: true,
        data: s.data,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: {
          width: 2
        }
      }))
    }

    // Set chart options
    chart.setOption(options)

    // Clean up
    return () => {
      chart?.dispose()
    }
  }, [data, title, yAxisLabel])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
      </CardContent>
    </Card>
  )
}

export default LineChart
