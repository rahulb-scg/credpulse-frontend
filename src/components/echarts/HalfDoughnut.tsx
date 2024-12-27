"use client"

import React from "react"
import EChartsWrapper from "./EChartsWrapper"
import type { EChartsOption, PieSeriesOption } from "echarts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getBaseChartConfig } from "@/utils/chart.utils"
import { logger } from "@/lib/logger"

interface HalfDoughnutProps {
  data: Array<{ name: string; value: number }>
  title: string
  periods?: string[]
  selectedPeriod?: string
  onPeriodChange?: (period: string) => void
}

const HalfDoughnut: React.FC<HalfDoughnutProps> = ({
  data,
  title,
  periods,
  selectedPeriod,
  onPeriodChange
}) => {
  // Validate data
  if (!data || data.length === 0) {
    logger.warn("HalfDoughnut: No data provided", { title })
    return <div className="p-4 text-center">No data available for visualization</div>
  }

  logger.info("HalfDoughnut: Rendering with data", {
    title,
    dataLength: data.length,
    firstItem: data[0],
    hasPeriods: !!periods,
    selectedPeriod
  })

  // Format data for better display
  const formattedData = data.map((item) => ({
    ...item,
    value: Number(item.value.toFixed(2))
  }))

  const baseOptions = getBaseChartConfig("", "", true, false) // Disable axis for pie chart

  const series: PieSeriesOption = {
    type: 'pie',
    radius: ['40%', '70%'],
    center: ['50%', '70%'],
    startAngle: 180,
    endAngle: 360,
    avoidLabelOverlap: true,
    itemStyle: {
      borderRadius: 4,
      borderColor: '#fff',
      borderWidth: 2
    },
    label: {
      show: true,
      position: 'outside',
      formatter: '{b}: {d}%'
    },
    labelLine: {
      show: true,
      length: 15,
      length2: 0
    },
    data: formattedData,
    emphasis: {
      scale: true,
      scaleSize: 10
    }
  }

  const chartOption: EChartsOption = {
    ...baseOptions,
    tooltip: {
      trigger: "item",
      formatter: '{b}: {c} ({d}%)'
    },
    series: [series]
  }

  logger.debug("HalfDoughnut: Chart options", {
    dataLength: formattedData.length,
    chartConfig: {
      type: series.type,
      radius: series.radius,
      startAngle: series.startAngle
    }
  })

  const selector = periods && selectedPeriod && onPeriodChange ? (
    <Select value={selectedPeriod} onValueChange={onPeriodChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select period" />
      </SelectTrigger>
      <SelectContent>
        {periods.map((period) => (
          <SelectItem key={period} value={period}>
            {period}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ) : undefined

  return (
    <EChartsWrapper 
      option={chartOption} 
      title={title}
      selector={selector}
    />
  )
}

export default HalfDoughnut
