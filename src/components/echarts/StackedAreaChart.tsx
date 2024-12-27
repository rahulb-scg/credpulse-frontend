import React from "react"
import EChartsWrapper from "./EChartsWrapper"
import type { EChartsOption } from "echarts"

interface StackedAreaChartProps {
  data: {
    categories: string[]
    series: Array<{
      name: string
      data: number[]
    }>
  }
  title?: string
}

const StackedAreaChart: React.FC<StackedAreaChartProps> = ({
  data,
  title
}) => {
  const option: EChartsOption = {
    title: title
      ? {
          text: title,
          left: "center",
          top: 0
        }
      : undefined,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      }
    },
    legend: {
      data: data.series.map((s) => s.name),
      top: title ? 25 : 5,
      selected: data.series.reduce((acc, series) => ({
        ...acc,
        [series.name]: true
      }), {})
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
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      top: title ? 80 : 60,
      containLabel: true
    },
    dataZoom: [
      {
        type: "slider",
        start: 0,
        end: 100
      },
      {
        type: "inside",
        start: 0,
        end: 100
      }
    ],
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: data.categories,
        axisLabel: {
          rotate: 45,
          margin: 15
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          formatter: (value: number) => {
            return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toString()
          }
        }
      }
    ],
    series: data.series.map((item) => ({
      name: item.name,
      type: "line",
      stack: "Total",
      smooth: true,
      symbol: "none",
      lineStyle: {
        width: 0
      },
      areaStyle: {
        opacity: 0.8
      },
      emphasis: {
        focus: "series",
        areaStyle: {
          opacity: 0.9
        }
      },
      data: item.data
    }))
  }

  return (
    <div className="rounded-lg border bg-card p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="w-full h-[calc(100%-4rem)]">
        <EChartsWrapper
          option={{
            ...option,
            grid: {
              left: "8%",
              right: "5%",
              bottom: "18%",
              top: "20%",
              containLabel: true
            },
            legend: {
              ...option.legend,
              left: "center",
              padding: [5, 10],
              icon: "roundRect",
              itemWidth: 30,
              itemHeight: 14,
              itemGap: 25,
              textStyle: {
                fontSize: 12
              }
            },
            xAxis: [{
              ...option.xAxis[0],
              name: "Period",
              nameLocation: "middle",
              nameGap: 45
            }],
            yAxis: [{
              ...option.yAxis[0],
              name: "Number of Loans",
              nameLocation: "middle",
              nameGap: 50
            }]
          }}
        />
      </div>
    </div>
  )
}

export default StackedAreaChart
