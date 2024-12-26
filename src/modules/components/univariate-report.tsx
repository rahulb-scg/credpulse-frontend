"use client"

import { ScrollBar } from "@/components/ui/scroll-area"
import { TableHeader, TableHead, TableBody, TableRow, TableCell, Table } from "@/components/ui/table"
import { DictionaryType } from "@/types/common.type"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BoxPlot from "@/components/echarts/BoxPlot"
import Histogram from "@/components/echarts/Histogram"
import PieChart from "@/components/echarts/PieChart"
import React from "react"
import ReportTableWrapper from "./report-table-wrapper"

interface UnivariateReportProps {
  modal: DictionaryType
}

const UnivariateReport: React.FC<UnivariateReportProps> = ({ modal }) => {
  if (!modal?.univariates) return <></>

  const jsonData = JSON.parse(modal?.univariates)
  const horizontalColumn = Object.keys(jsonData)
  const data: DictionaryType[] = Object.values(jsonData)
  const columns = Object.keys(data[0])

  // Function to extract numerical data for a specific column
  const getColumnData = (columnName: string): number[] => {
    return data
      .map((row) => {
        const value = row[columnName]
        return typeof value === "number" ? value : NaN
      })
      .filter((val) => !isNaN(val))
  }

  // Function to calculate basic statistics
  const calculateStats = (columnName: string) => {
    const numericData = getColumnData(columnName)
    if (numericData.length === 0) return null

    const sum = numericData.reduce((a, b) => a + b, 0)
    const mean = sum / numericData.length
    const sortedData = [...numericData].sort((a, b) => a - b)
    const median = sortedData[Math.floor(sortedData.length / 2)]
    const min = Math.min(...numericData)
    const max = Math.max(...numericData)

    return {
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      min: min.toFixed(2),
      max: max.toFixed(2),
      count: numericData.length
    }
  }

  return (
    <ReportTableWrapper title="Univariates Analysis Report">
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="boxplot">Box Plot</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <ScrollArea className="relative h-[calc(80vh-220px)] rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 border-b bg-muted">
                <TableHead className="bg-muted text-primary"></TableHead>
                {columns?.map((column: string) => (
                  <TableHead className="border-l text-primary" key={column}>
                    {column}
                  </TableHead>
                ))}
              </TableHeader>
              <TableBody>
                {data?.map((row: DictionaryType, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="w-auto bg-muted font-medium text-primary">
                      {horizontalColumn[index]}
                    </TableCell>
                    {columns?.map((column: string) => {
                      let value = row[column]
                      if (typeof value === "number") value = value.toFixed(2)
                      return (
                        <TableCell className="border-l" key={column}>
                          {value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {columns.map((column: string) => {
              const numericData = getColumnData(column)
              if (numericData.length === 0) return null
              return (
                <div key={column} className="rounded-lg border p-4">
                  <Histogram data={numericData} title={`Distribution of ${column}`} label={column} bins={15} />
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="boxplot" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {columns.map((column: string) => {
              const numericData = getColumnData(column)
              if (numericData.length === 0) return null
              return (
                <div key={column} className="rounded-lg border p-4">
                  <BoxPlot data={numericData} title={`Box Plot of ${column}`} label={column} />
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {columns.map((column: string) => {
              const stats = calculateStats(column)
              if (!stats) return null

              const pieData = [
                { value: parseFloat(stats.mean), name: "Mean" },
                { value: parseFloat(stats.median), name: "Median" },
                { value: parseFloat(stats.min), name: "Min" },
                { value: parseFloat(stats.max), name: "Max" }
              ]

              return (
                <div key={column} className="rounded-lg border p-4">
                  <h3 className="mb-2 text-lg font-semibold">{column}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt>Mean:</dt>
                          <dd>{stats.mean}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt>Median:</dt>
                          <dd>{stats.median}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt>Min:</dt>
                          <dd>{stats.min}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt>Max:</dt>
                          <dd>{stats.max}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt>Count:</dt>
                          <dd>{stats.count}</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <PieChart data={pieData} title={`Summary of ${column}`} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </ReportTableWrapper>
  )
}

export default UnivariateReport
