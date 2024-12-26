"use client"

import React, { useState } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DictionaryType } from "@/types/common.type"
import ReportTableWrapper from "./report-table-wrapper"
import HalfDoughnut from "@/components/echarts/HalfDoughnut"
import StackedAreaChart from "@/components/echarts/StackedAreaChart"

// Logger function for consistent logging format
const logger = {
  info: (message: string, data?: any) => {
    console.log(`[DataInsights] INFO: ${message}`, data || "")
  },
  error: (message: string, error?: any) => {
    console.error(`[DataInsights] ERROR: ${message}`, error || "")
  },
  warn: (message: string, data?: any) => {
    console.warn(`[DataInsights] WARN: ${message}`, data || "")
  }
}

interface DataInsightsProps {
  analysis_extensions: DictionaryType[]
}

interface PeriodData {
  [key: string]: number
}

interface DistributionData {
  [period: string]: PeriodData
}

const DataInsights: React.FC<DataInsightsProps> = ({ analysis_extensions }) => {
  logger.info("Component rendering started")

  if (!analysis_extensions?.[0]?.period_distributions || !analysis_extensions?.[0]?.summary) {
    logger.warn("No data found in analysis_extensions")
    return null
  }

  try {
    const { period_distributions, summary } = analysis_extensions[0]
    const distributionData = period_distributions as DistributionData
    logger.info("Data extraction successful", { summary, periodsCount: Object.keys(distributionData).length })

    // Get sorted periods for the select dropdown
    const periods = Object.keys(distributionData).sort()
    const [selectedPeriod, setSelectedPeriod] = useState(periods[periods.length - 1])

    // Prepare data for the doughnut chart
    const chartData = Object.entries(distributionData[selectedPeriod]).map(([status, count]) => ({
      name: status === "99" ? "Unknown" : `${status} days`,
      value: count
    }))

    // Prepare data for the stacked area chart
    // Get top 6 delinquency statuses by total volume
    const statusTotals = Object.values(distributionData).reduce((acc: PeriodData, periodData) => {
      Object.entries(periodData).forEach(([status, count]) => {
        acc[status] = (acc[status] || 0) + count
      })
      return acc
    }, {})

    const top6Statuses = Object.entries(statusTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([status]) => status)

    const areaChartData = {
      categories: periods,
      series: top6Statuses.map((status) => ({
        name: status === "99" ? "Unknown" : `${status} days`,
        data: periods.map((period) => distributionData[period][status] || 0)
      }))
    }

    return (
      <ReportTableWrapper title="Delinquency Distribution Analysis">
        <div className="space-y-8">
          <div className="w-1/2">
            <ScrollArea className="flex-1 rounded-md border">
              <Table>
                <TableBody>
                  {/* Summary Section */}
                  <TableRow>
                    <TableCell colSpan={2} className="bg-muted/50 font-semibold text-primary">
                      Summary Statistics
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-muted/20 font-medium w-[200px]">Total Loans</TableCell>
                    <TableCell className="w-[300px]">{summary.total_loans.toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-muted/20 font-medium w-[200px]">Total Periods</TableCell>
                    <TableCell className="w-[300px]">{summary.total_periods}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-muted/20 font-medium w-[200px]">Start Period</TableCell>
                    <TableCell className="w-[300px]">{summary.start_period}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-muted/20 font-medium w-[200px]">End Period</TableCell>
                    <TableCell className="w-[300px]">{summary.end_period}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-muted/20 font-medium w-[200px]">Delinquency Statuses</TableCell>
                    <TableCell className="w-[300px]">
                      {summary.unique_delinquency_statuses
                        .sort((a: number, b: number) => a - b)
                        .map((status: number) => (status === 99 ? "Unknown" : status))
                        .join(", ")}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="min-h-[500px]">
              <HalfDoughnut
                data={chartData}
                title="Delinquency Distribution"
                periods={periods}
                selectedPeriod={selectedPeriod}
                onPeriodChange={setSelectedPeriod}
              />
            </div>
            <div className="min-h-[500px]">
              <StackedAreaChart data={areaChartData} title="Delinquency Trends Over Time" />
            </div>
          </div>
        </div>
      </ReportTableWrapper>
    )
  } catch (error) {
    logger.error("Fatal error rendering DataInsights", error)
    return (
      <ReportTableWrapper title="Delinquency Distribution Analysis">
        <div className="p-4 text-destructive">Error loading delinquency distribution data</div>
      </ReportTableWrapper>
    )
  }
}

export default DataInsights
