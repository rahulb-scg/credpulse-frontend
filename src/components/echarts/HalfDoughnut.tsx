import React from "react"
import EChartsWrapper from "./EChartsWrapper"
import type { EChartsOption } from "echarts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface HalfDoughnutProps {
  data: Array<{ name: string; value: number }>
  title?: string
  colors?: string[]
  periods?: string[]
  selectedPeriod?: string
  onPeriodChange?: (period: string) => void
}

const HalfDoughnut: React.FC<HalfDoughnutProps> = ({
  data,
  title,
  periods,
  selectedPeriod,
  onPeriodChange,
  colors = [
    "#2563eb", // blue-600
    "#7c3aed", // violet-600
    "#db2777", // pink-600
    "#ea580c", // orange-600
    "#16a34a", // green-600
    "#ca8a04", // yellow-600
    "#64748b" // slate-500 (for "Others")
  ]
}) => {
  // Process data to show top 6 and combine rest as "Others"
  const sortedData = [...data].sort((a, b) => b.value - a.value)
  const top6 = sortedData.slice(0, 6)
  const others = sortedData.slice(6).reduce(
    (acc, curr) => ({
      name: "Others",
      value: acc.value + curr.value
    }),
    { name: "Others", value: 0 }
  )

  const finalData = others.value > 0 ? [...top6, others] : top6

  // Calculate total for percentages
  const total = finalData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="rounded-lg border bg-card p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        {periods && selectedPeriod && onPeriodChange && (
          <div className="flex items-center space-x-4">
            <Select value={selectedPeriod} onValueChange={onPeriodChange}>
              <SelectTrigger className="w-[200px]">
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
          </div>
        )}
      </div>
      <div className="w-full">
        <EChartsWrapper
          option={{
            tooltip: {
              trigger: "item"
            },
            toolbox: {
              top: 0,
              right: "1%",
              feature: {
                restore: {},
                saveAsImage: {}
              }
            },
            legend: {
              top: 25,
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
            grid: {
              top: "20%",
              containLabel: true
            },
            series: [
              {
                name: title || "Distribution",
                type: "pie",
                radius: ["40%", "70%"],
                center: ["50%", "60%"],
                startAngle: 180,
                endAngle: 360,
                data: finalData,
                label: {
                  show: true,
                  position: "outside",
                  formatter: "{b}: {c} ({d}%)"
                },
                labelLine: {
                  show: true
                },
                itemStyle: {
                  borderRadius: 4,
                  borderColor: "#fff",
                  borderWidth: 2
                },
                color: colors
              }
            ]
          }}
        />
      </div>
    </div>
  )
}

export default HalfDoughnut
