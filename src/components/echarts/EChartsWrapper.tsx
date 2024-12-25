"use client"

import * as echarts from "echarts"
import { useTheme } from "next-themes"
import React, { useEffect, useRef, useState } from "react"

export interface EChartsWrapperProps {
  option: echarts.EChartsOption
  className?: string
  isLoading?: boolean
}

const EChartsWrapper: React.FC<EChartsWrapperProps> = ({ option, className, isLoading = false }) => {
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
      // Set chart options
      chart.setOption(option, true)
    } catch (error) {
      console.error("Error setting chart options:", error)
    }
  }, [chart, option, isLoading])

  return (
    <div
      ref={chartRef}
      className={className}
      style={{
        width: "100%",
        height: "50vh"
      }}
    />
  )
}

export default EChartsWrapper
