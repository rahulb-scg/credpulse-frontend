"use client"

import * as echarts from "echarts"
import { useTheme } from "next-themes"
import React, { useEffect, useRef, useState } from "react"
import ChartContainer from "./ChartContainer"

export interface EChartsWrapperProps {
  option: echarts.EChartsOption
  title: string
  selector?: React.ReactNode
  className?: string
  isLoading?: boolean
}

const EChartsWrapper: React.FC<EChartsWrapperProps> = ({ 
  option, 
  title,
  selector,
  className, 
  isLoading = false 
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const [chart, setChart] = useState<echarts.ECharts>()
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    // Initialize chart
    if (!chartRef.current) return

    const newChart = echarts.init(chartRef.current, resolvedTheme ?? "light")
    setChart(newChart)

    // Handle resize
    const handleResize = () => {
      newChart?.resize()
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      newChart.dispose()
    }
  }, [resolvedTheme])

  useEffect(() => {
    if (!chart) return

    // Set loading state
    if (isLoading) {
      chart.showLoading()
    } else {
      chart.hideLoading()
    }

    try {
      // Remove title from options as it's handled by ChartContainer
      const chartOptions = { ...option }
      if (chartOptions.title) {
        delete chartOptions.title
      }
      
      // Set chart options
      chart.setOption(chartOptions, true)
    } catch (error) {
      console.error("Error setting chart options:", error)
    }
  }, [chart, option, isLoading])

  return (
    <ChartContainer title={title} selector={selector} className={className}>
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "100%"
        }}
      />
    </ChartContainer>
  )
}

export default EChartsWrapper
