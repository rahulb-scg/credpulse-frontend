"use client"

import { roundToTwoDecimals } from "@/utils/number.utils"
import EChartsWrapper from "@components/echarts/EChartsWrapper"
import * as echarts from "echarts"
import React from "react"

interface AreaChartProps {
  data: AreaChartDataItem[]
  title: string
  label: string
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

const AreaChart: React.FC<AreaChartProps> = ({ data, title, label }) => {
  const chartOption: echarts.EChartsOption = {
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "10%"]
      }
    },
    title: {
      left: "center",
      text: title
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none"
        },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.map((item) => item.date)
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"]
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 10
      },
      {
        start: 0,
        end: 10
      }
    ],
    series: [
      {
        name: label,
        type: "line",
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: "rgb(255, 70, 131)"
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 158, 68)"
            },
            {
              offset: 1,
              color: "rgb(255, 70, 131)"
            }
          ])
        },
        data: data.map((item) => roundToTwoDecimals(item.data))
      }
    ]
  }
  return <EChartsWrapper option={chartOption} />
}

export default AreaChart
