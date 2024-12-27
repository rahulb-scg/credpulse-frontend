import React from "react"
import EChartsWrapper from "./EChartsWrapper"
import type { EChartsOption } from "echarts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  // Sort data by value in descending order and limit to top 6 items
  const sortedData = [...data]
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Combine remaining items as "Others" if any
  const othersValue = data.length > 6 
    ? data
        .sort((a, b) => b.value - a.value)
        .slice(6)
        .reduce((sum, item) => sum + item.value, 0)
    : 0;

  // Add "Others" category if there are remaining items
  const finalData = othersValue > 0
    ? [...sortedData, { name: 'Others', value: othersValue }]
    : sortedData;

  // Format values to 2 decimal places
  const formattedData = finalData.map(item => ({
    ...item,
    value: Number(item.value.toFixed(2))
  }));

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
              trigger: "item",
              formatter: '{b}: {c} ({d}%)'
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
            series: [
              {
                name: title || "Distribution",
                type: "pie",
                radius: ["40%", "70%"],
                center: ["50%", "60%"],
                startAngle: 180,
                endAngle: 360,
                avoidLabelOverlap: true,
                itemStyle: {
                  borderRadius: 4,
                  borderColor: "#fff",
                  borderWidth: 2
                },
                label: {
                  show: true,
                  position: "outside",
                  formatter: "{b}: {c} ({d}%)",
                  alignTo: 'edge',
                  minMargin: 5,
                  edgeDistance: 10,
                  lineHeight: 15,
                  rich: {
                    time: {
                      fontSize: 10,
                      color: '#999'
                    }
                  }
                },
                labelLine: {
                  length: 15,
                  length2: 0,
                  maxSurfaceAngle: 80
                },
                labelLayout: function (params: any) {
                  const isLeft = params.labelRect.x < params.rect.width / 2;
                  return {
                    hideOverlap: true,
                    moveOverlap: 'shiftY',
                    x: isLeft ? params.labelRect.x : params.labelRect.x + params.labelRect.width,
                    align: isLeft ? 'left' : 'right'
                  };
                },
                data: formattedData
              }
            ]
          }}
        />
      </div>
    </div>
  )
}

export default HalfDoughnut
