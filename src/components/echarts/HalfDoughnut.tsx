import React from "react"
import EChartsWrapper from "./EChartsWrapper"
import type { EChartsOption } from "echarts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getChartColors } from "@/utils/color.utils"

interface HalfDoughnutProps {
  data: Array<{ name: string; value: number }>
  title?: string
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
  const colors = getChartColors(data.length);
  const finalData = data.map((item) => ({
    ...item,
    value: Number(item.value.toFixed(2))
  }))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        {title && <h3 className="text-lg font-semibold">{title}</h3>}
        {periods && periods.length > 0 && (
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
