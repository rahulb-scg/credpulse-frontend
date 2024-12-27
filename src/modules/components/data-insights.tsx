"use client"

import React, { useState } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DictionaryType } from "@/types/common.type"
import ReportTableWrapper from "./report-table-wrapper"
import HalfDoughnut from "@/components/echarts/HalfDoughnut"
import StackedAreaChart from "@/components/echarts/StackedAreaChart"
import LineChart from "@/components/echarts/LineChart"

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

interface PeriodStatistics {
  loan_count: number
  max_balance: number
  mean_balance: number
  median_balance: number
  min_balance: number
  std_balance: number
  total_balance: number
}

interface BalanceTrendsSummary {
  average_balance: number
  end_period: string
  start_period: string
  total_balance: number
  total_loans: number
  total_periods: number
}

interface BalanceTrends {
  analysis_type: string
  period_over_period_changes: {
    [period: string]: number
  }
  period_statistics: {
    [period: string]: PeriodStatistics
  }
  summary: BalanceTrendsSummary
}

interface DelinquencyDistributionSummary {
  end_period: string
  start_period: string
  total_loans: number
  total_periods: number
  unique_delinquency_statuses: number[]
}

interface DelinquencyDistribution {
  analysis_type: string
  period_distributions: {
    [period: string]: {
      [status: string]: number
    }
  }
  summary: DelinquencyDistributionSummary
}

interface AnalysisExtensions {
  [key: string]: BalanceTrends | DelinquencyDistribution
}

interface BackendResponse {
  _id: string
  analysis_extensions: AnalysisExtensions
}

interface DataInsightsProps {
  response: BackendResponse
}

const DataInsights: React.FC<DataInsightsProps> = ({ response }) => {
  logger.info("Initializing DataInsights component")
  const { analysis_extensions } = response

  // State for delinquency distribution
  const delinquencyDist = analysis_extensions["delinquency_distribution"] as DelinquencyDistribution
  const periods = delinquencyDist ? Object.keys(delinquencyDist.period_distributions).sort() : []
  const [selectedPeriod, setSelectedPeriod] = useState(periods.length > 0 ? periods[periods.length - 1] : "")

  const renderBalanceTrends = (balanceTrends: BalanceTrends) => {
    logger.info("Rendering balance trends analysis")
    const periods = Object.keys(balanceTrends.period_statistics).sort()

    // Prepare data for line chart
    const balanceData = {
      categories: periods,
      series: [
        {
          name: "Mean Balance",
          data: periods.map((period) => balanceTrends.period_statistics[period].mean_balance)
        },
        {
          name: "Median Balance",
          data: periods.map((period) => balanceTrends.period_statistics[period].median_balance)
        }
      ]
    }

    // Prepare data for period over period changes
    const popData = {
      categories: periods,
      series: [
        {
          name: "Period over Period Change (%)",
          data: periods.map((period) => balanceTrends.period_over_period_changes[period] || 0)
        }
      ]
    }

    return (
      <ReportTableWrapper title="Balance Trends Analysis">
        <div className="space-y-8">
          <div className="w-1/2">
            <ScrollArea className="flex-1 rounded-md border">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={2} className="bg-muted/50 font-semibold text-primary">
                      Summary Statistics
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-muted/20 font-medium w-[200px]">Average Balance</TableCell>
                    <TableCell className="w-[300px]">
                      $
                      {balanceTrends.summary.average_balance.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-muted/20 font-medium">Total Balance</TableCell>
                    <TableCell>
                      $
                      {balanceTrends.summary.total_balance.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-muted/20 font-medium">Total Loans</TableCell>
                    <TableCell>{balanceTrends.summary.total_loans.toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-muted/20 font-medium">Total Periods</TableCell>
                    <TableCell>{balanceTrends.summary.total_periods}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-muted/20 font-medium">Date Range</TableCell>
                    <TableCell>
                      {balanceTrends.summary.start_period} to {balanceTrends.summary.end_period}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="min-h-[500px]">
              <LineChart data={balanceData} title="Balance Trends Over Time" yAxisLabel="Balance ($)" />
            </div>
            <div className="min-h-[500px]">
              <LineChart data={popData} title="Period over Period Changes" yAxisLabel="Change (%)" />
            </div>
          </div>
        </div>
      </ReportTableWrapper>
    )
  }

  const renderDelinquencyDistribution = (delinquencyDist: DelinquencyDistribution, currentPeriod: string, onPeriodChange: (period: string) => void) => {
    logger.info("Rendering delinquency distribution analysis")
    const { period_distributions, summary } = delinquencyDist
    const distributionData = period_distributions

    // Define delinquency bucket labels
    logger.info("Setting up delinquency bucket labels")
    const delinquencyLabels: { [key: string]: string } = {
      "0": "Current",
      "1": "30dpd",
      "2": "60dpd",
      "3": "90dpd",
      "4": "Charged Off",
      "99": "Unknown"
    }

    // Prepare data for the doughnut chart
    logger.info(`Preparing doughnut chart data for period: ${currentPeriod}`)
    const chartData = Object.entries(distributionData[currentPeriod]).map(([status, count]) => ({
      name: delinquencyLabels[status] || `Bucket ${status}`,
      value: count
    }))

    // Prepare data for the stacked area chart
    logger.info("Preparing stacked area chart data")
    const statusTotals = Object.values(distributionData).reduce((acc: { [key: string]: number }, periodData) => {
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
        name: delinquencyLabels[status] || `Bucket ${status}`,
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
                    <TableCell className="bg-muted/20 font-medium">Total Periods</TableCell>
                    <TableCell>{summary.total_periods}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-muted/20 font-medium">Start Period</TableCell>
                    <TableCell>{summary.start_period}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-muted/20 font-medium">End Period</TableCell>
                    <TableCell>{summary.end_period}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="bg-muted/20 font-medium">Delinquency Statuses</TableCell>
                    <TableCell>
                      {summary.unique_delinquency_statuses
                        .sort((a, b) => a - b)
                        .map((status) => delinquencyLabels[status] || `Bucket ${status}`)
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
                selectedPeriod={currentPeriod}
                onPeriodChange={onPeriodChange}
              />
            </div>
            <div className="min-h-[500px]">
              <StackedAreaChart data={areaChartData} title="Delinquency Trends Over Time" />
            </div>
          </div>
        </div>
      </ReportTableWrapper>
    )
  }

  try {
    return (
      <div className="space-y-4">
        {analysis_extensions["balance_trends"] && renderBalanceTrends(analysis_extensions["balance_trends"] as BalanceTrends)}
        {analysis_extensions["delinquency_distribution"] && renderDelinquencyDistribution(
          analysis_extensions["delinquency_distribution"] as DelinquencyDistribution,
          selectedPeriod,
          setSelectedPeriod
        )}
      </div>
    )
  } catch (error) {
    logger.error("Fatal error rendering DataInsights", error)
    return <div className="p-4 text-destructive">Error loading analysis data</div>
  }
}

export default DataInsights
