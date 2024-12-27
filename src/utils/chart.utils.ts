import type { EChartsOption } from "echarts"

export const getBaseChartConfig = (
  xAxisLabel?: string,
  yAxisLabel?: string,
  showLegend = true,
  showAxis = true
): EChartsOption => {
  const config: EChartsOption = {
    grid: showAxis ? {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    } : undefined,
    legend: {
      show: showLegend,
      top: "5%",
      itemWidth: 20,
      itemHeight: 10,
      textStyle: {
        fontSize: 12
      }
    },
    tooltip: {
      trigger: showAxis ? "axis" : "item",
      axisPointer: showAxis ? {
        type: "cross",
        label: {
          backgroundColor: "#6a7985"
        }
      } : undefined
    }
  }

  if (showAxis) {
    config.yAxis = {
      type: "value",
      name: yAxisLabel,
      nameLocation: "middle",
      nameGap: 50,
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      }
    }
  }

  return config
} 