import { roundToTwoDecimals } from "@/utils/number.utils"
import EChartsWrapper from "@components/echarts/EChartsWrapper"
import * as echarts from "echarts"
// @ts-ignore
import { transform } from "echarts-stat"
import React, { useEffect } from "react"
import { logger } from "@/lib/logger"

export enum RegressionPattern {
  LINEAR = "linear",
  POLYNOMIAL = "polynomial",
  EXPONENTIAL = "exponential",
  LOGARITHMIC = "logarithmic"
}

export function getFakeRegressionData(
  count: number,
  pattern: RegressionPattern = RegressionPattern.LINEAR
): string[][] {
  const data: string[][] = []
  for (let i = 0; i < count; i++) {
    const x = i
    let y: number
    switch (pattern) {
      case RegressionPattern.POLYNOMIAL:
        y = 0.5 * Math.pow(x, 2) + 2 * x + Math.random() * 10
        break
      case RegressionPattern.EXPONENTIAL:
        y = Math.exp(0.1 * x) + Math.random() * 5
        break
      case RegressionPattern.LOGARITHMIC:
        y = 10 * Math.log(x + 1) + Math.random() * 5
        break
      case RegressionPattern.LINEAR:
      default:
        y = 2 * x + Math.random() * 10
    }
    data.push([x.toString(), y.toString()])
  }
  return data
}

interface RegressChartProps {
  title: string
  data: string[][]
  order?: number
  xAxisLabel?: string
  yAxisLabel?: string
}

const Regression: React.FC<RegressChartProps> = ({ title, data, order, xAxisLabel, yAxisLabel }) => {
  useEffect(() => {
    echarts.registerTransform(transform.regression)
  }, [])

  // Validate and transform data
  const validData = data.filter((point) => {
    const [x, y] = point
    return !isNaN(parseFloat(x)) && !isNaN(parseFloat(y))
  })

  if (validData.length < 2) {
    logger.error("Insufficient valid data points for regression", {
      totalPoints: data.length,
      validPoints: validData.length
    })
    return <div>Insufficient data for regression analysis</div>
  }

  logger.info("Preparing regression chart", {
    title,
    dataPoints: validData.length,
    order
  })

  const chartOption: echarts.EChartsOption = {
    dataset: [
      {
        source: validData.map(([x, y]) => [parseFloat(x), parseFloat(y)])
      },
      {
        transform: {
          type: "ecStat:regression",
          config: {
            method: "polynomial",
            order: order ?? 2
          }
        }
      }
    ],
    title: {
      text: title,
      left: "center",
      padding: 16
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross"
      },
      formatter: function (params: any) {
        const point = params[0]
        return `${xAxisLabel || "X"}: ${point.data[0]}<br/>${yAxisLabel || "Y"}: ${roundToTwoDecimals(point.data[1])}%`
      }
    },
    grid: {
      left: "10%",
      right: "10%",
      bottom: "15%"
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      },
      name: xAxisLabel,
      nameLocation: "middle",
      nameGap: 40,
      nameTextStyle: {
        fontSize: 14
      }
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      },
      name: yAxisLabel,
      nameLocation: "middle",
      nameGap: 70,
      nameTextStyle: {
        fontSize: 14
      },
      axisLabel: {
        formatter: "{value}%"
      }
    },
    series: [
      {
        name: "Actual",
        type: "scatter",
        datasetIndex: 0,
        symbolSize: 6,
        itemStyle: {
          color: "#5470c6"
        }
      },
      {
        name: "Regression",
        type: "line",
        smooth: true,
        datasetIndex: 1,
        symbolSize: 0.1,
        symbol: "circle",
        lineStyle: {
          color: "#91cc75",
          width: 2
        },
        label: { show: false },
        labelLayout: { dx: -20 },
        encode: { label: 2, tooltip: 1 }
      }
    ]
  }

  return (
    <div className="w-full h-[400px]">
      <EChartsWrapper option={chartOption} />
    </div>
  )
}

export default Regression
