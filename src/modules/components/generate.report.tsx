import React from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DictionaryType } from "@/types/common.type"
import ReportTableWrapper from "./report-table-wrapper"
import Regression from "@/components/echarts/Regression"
import { logger } from "@/lib/logger"
import { DateUtils } from "@/utils/date.utils"
import { Separator } from "@/components/ui/separator"

interface ModelMetrics {
  origination_amount: number
  opening_balance: number
  ending_balance: number
  forecasted_months: number
  wal: number
  alll: number
  cecl_factor: number
  cecl_amount: number
  snapshot_date: string
  forecasted_period_from: string
  forecasted_period_to: string
}

interface CGLCurveData {
  data: number[][]
  columns: string[]
  index: string[]
}

interface TransitionMatrixData {
  data: number[][]
  columns: string[]
  index: string[]
}

interface ModelOutputs {
  cgl_curve: {
    data: CGLCurveData
  }
  transition_matrix: {
    data: TransitionMatrixData
  }
  metrics: ModelMetrics
}

interface Metadata {
  modelName: string
  status: string
  createdAt: string
}

type Props = {
  type: string
  modal: ModelOutputs
  overview: DictionaryType
  metadata: Metadata
}

interface SummaryItem {
  label: string
  value: string
}

const GenerateReport = ({ type, modal, overview, metadata }: Props) => {
  logger.info("Rendering GenerateReport", { type })

  if (!modal) {
    logger.error("No model data provided")
    return null
  }

  // Extract data from the model outputs
  const cglCurveData = modal.cgl_curve?.data
  const transitionMatrix = modal.transition_matrix?.data
  const metrics = modal.metrics

  if (!cglCurveData || !transitionMatrix || !metrics) {
    logger.error("Missing required data in model outputs", {
      hasCGLCurve: !!cglCurveData,
      hasTransitionMatrix: !!transitionMatrix,
      hasMetrics: !!metrics
    })
    return null
  }

  // Transform CGL curve data for table display
  const { data: cglData, columns: cglColumns, index: cglPeriods } = cglCurveData

  // Format data for graphs
  const formatGraphData = (data: number[][], periodIndex: number, valueIndex: number): string[][] => {
    return data.map((row, index) => {
      const period = index.toString() // Use numeric index for x-axis
      const value = row[valueIndex]?.toString() || "0"
      return [period, value]
    })
  }

  // Prepare graph data
  const cglGraphData = formatGraphData(cglData, 0, cglColumns.indexOf("Charged Off"))
  const monthlyDefaultRateData = formatGraphData(cglData, 0, cglColumns.indexOf("MONTHLY_DEFAULT_RATE"))

  logger.info("Graph data prepared", {
    cglDataPoints: cglGraphData.length,
    monthlyDefaultDataPoints: monthlyDefaultRateData.length,
    columns: cglColumns
  })

  // Summary data for the overview table
  const reportDetails: SummaryItem[][] = [
    [
      {
        label: "Report Name",
        value: overview.report_name || "-"
      },
      {
        label: "Description",
        value: overview.description || "-"
      }
    ],
    [
      {
        label: "Model Type",
        value: metadata.modelName
      },
      {
        label: "Status",
        value: metadata.status
      }
    ],
    [
      {
        label: "Created At",
        value: DateUtils.displayDate(metadata.createdAt)
      },
      {
        label: "Snapshot Date",
        value: metrics.snapshot_date || "-"
      }
    ]
  ]

  const metricsData: SummaryItem[][] = [
    [
      {
        label: "Origination Amount",
        value: metrics.origination_amount ? `$${metrics.origination_amount.toLocaleString()}` : "-"
      },
      {
        label: "Opening Balance",
        value: metrics.opening_balance ? `$${metrics.opening_balance.toLocaleString()}` : "-"
      }
    ],
    [
      {
        label: "Ending Balance",
        value: metrics.ending_balance ? `$${metrics.ending_balance.toLocaleString()}` : "-"
      },
      {
        label: "Forecasted Months",
        value: metrics.forecasted_months?.toString() || "-"
      }
    ],
    [
      {
        label: "Forecast Period",
        value: `${metrics.forecasted_period_from} to ${metrics.forecasted_period_to}`
      },
      {
        label: "WAL",
        value: metrics.wal ? `${metrics.wal.toFixed(1)} Years` : "-"
      }
    ],
    [
      {
        label: "ALLL",
        value: metrics.alll ? `${(metrics.alll * 100).toFixed(3)}%` : "-"
      },
      {
        label: "CECL Factor",
        value: metrics.cecl_factor ? `${(metrics.cecl_factor * 100).toFixed(3)}%` : "-"
      }
    ],
    [
      {
        label: "CECL Amount",
        value: metrics.cecl_amount ? `$${metrics.cecl_amount.toLocaleString()}` : "-"
      }
    ]
  ]

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1200px] mx-auto">
      {/* Summary Table */}
      <ReportTableWrapper title="Report Summary">
        <ScrollArea className="flex-1 rounded-md border">
          <Table>
            <TableBody>
              {/* Report Details Section */}
              <TableRow>
                <TableCell colSpan={4} className="bg-muted/50 font-semibold text-primary">
                  Report Details
                </TableCell>
              </TableRow>
              {reportDetails.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <React.Fragment key={`${rowIndex}-${cellIndex}`}>
                      <TableCell className="bg-muted/20 font-medium w-[200px]">{cell.label}</TableCell>
                      <TableCell className="w-[300px]">{cell.value}</TableCell>
                    </React.Fragment>
                  ))}
                </TableRow>
              ))}

              {/* Metrics Section */}
              <TableRow>
                <TableCell colSpan={4} className="bg-muted/50 font-semibold text-primary">
                  Model Metrics
                </TableCell>
              </TableRow>
              {metricsData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <React.Fragment key={`${rowIndex}-${cellIndex}`}>
                      <TableCell className="bg-muted/20 font-medium w-[200px]">{cell.label}</TableCell>
                      <TableCell className="w-[300px]">{cell.value}</TableCell>
                    </React.Fragment>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </ReportTableWrapper>

      {/* Transition Matrix Table */}
      <ReportTableWrapper title="Transition Matrix">
        <ScrollArea className="flex-1 rounded-md border">
          <Table className="relative w-full">
            <TableHeader className="border-b bg-muted sticky top-0 z-10">
              <TableRow>
                <TableHead className="bg-muted text-primary min-w-[120px]">Bucket</TableHead>
                {transitionMatrix.columns.map((header) => (
                  <TableHead className="border-l text-primary min-w-[100px]" key={header}>
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {transitionMatrix.data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell className="w-auto bg-muted font-medium text-primary">
                    {transitionMatrix.index[rowIndex]}
                  </TableCell>
                  {row.map((value, colIndex) => (
                    <TableCell className="border-l" key={colIndex}>
                      {value.toFixed(5)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </ReportTableWrapper>

      {/* CGL Curve Analysis Section */}
      <ReportTableWrapper title="CGL Curve Analysis">
        {/* Graphs Row */}
        <div className="flex flex-row gap-4 mb-6">
          {/* CGL Graph */}
          <div className="flex-1">
            <Regression
              title="Cumulative Gross Loss"
              data={cglGraphData}
              order={2}
              xAxisLabel="Period"
              yAxisLabel="Cumulative Loss (%)"
            />
          </div>

          {/* Monthly Default Rate Graph */}
          <div className="flex-1">
            <Regression
              title="Monthly Default Rate"
              data={monthlyDefaultRateData}
              order={2}
              xAxisLabel="Period"
              yAxisLabel="Default Rate (%)"
            />
          </div>
        </div>

        {/* CGL Curve Data Table */}
        <div className="text-center text-lg font-medium text-muted-foreground mb-4">CGL Curve Data</div>
        <ScrollArea className="flex-1 rounded-md border">
          <Table className="relative w-full">
            <TableHeader className="border-b bg-muted sticky top-0 z-10">
              <TableRow>
                <TableHead className="bg-muted text-primary min-w-[120px]">Period</TableHead>
                {cglColumns.map((column) => (
                  <TableHead className="border-l text-primary min-w-[100px]" key={column}>
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {cglData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell className="w-auto bg-muted font-medium text-primary">{cglPeriods[rowIndex]}</TableCell>
                  {row.map((value, colIndex) => (
                    <TableCell className="border-l" key={colIndex}>
                      {value?.toFixed(5) || "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </ReportTableWrapper>
    </div>
  )
}

export default GenerateReport
