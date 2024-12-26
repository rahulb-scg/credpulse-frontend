import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import PolyChart, { PolyChartDataSet } from "@components/echarts/PolyChart"
import React, { useEffect } from "react"

export interface FICOProps {
  title: string
  data: any
  isLoading: boolean
}

export interface Row {
  asOfDate: string
  fico: number
  loanId: string
}

const getUniqueIds = (data: Row[]) => {
  return Array.from(new Set(data.map((row) => row.loanId)))
}

const getAllUniqueDates = (data: Row[]) => {
  return Array.from(new Set(data.map((row) => row.asOfDate)))
}

const getParseData = (data: any): Row[] => {
  const table: Row[] = []
  const jsonData = JSON.parse(data.processedReport.table)
  jsonData.data.forEach((row: any) => {
    table.push({
      asOfDate: row.asofdate,
      fico: row.fico,
      loanId: row.loanid
    })
  })

  return table
}

const tableToDataset = (table: Row[], filterDate: Date): PolyChartDataSet => {
  const filteredTable = table.filter((item) => {
    const date = new Date(item.asOfDate)
    return date.toISOString() === filterDate.toISOString()
  })

  const dataset: PolyChartDataSet = {
    name: "FICO Scores",
    type: "bar",
    data: filteredTable.map((item) => ({
      name: item.loanId,
      value: item.fico
    }))
  }
  return dataset
}

const FICO: React.FC<FICOProps> = ({ title, data, isLoading }) => {
  const [uniqueIds, setUniqueIds] = React.useState<string[]>([])
  const [asOfDate, setAsOfDate] = React.useState<Date>(new Date())
  const [table, setTable] = React.useState<Row[]>([])
  const [datasets, setDatasets] = React.useState<PolyChartDataSet[]>([])

  useEffect(() => {
    if (!data || isLoading) return

    setTable(getParseData(data))
  }, [data, isLoading])

  useEffect(() => {
    if (table.length === 0) return

    setUniqueIds(getUniqueIds(table))

    const lastDate = new Date(getAllUniqueDates(table).sort().reverse()[0])
    setAsOfDate(lastDate)
  }, [table])

  useEffect(() => {
    if (table.length === 0) return

    setDatasets([tableToDataset(table, asOfDate)])
  }, [asOfDate, table])

  if (isLoading || !table) {
    return (
      <div>
        <div className="text-center text-xl font-medium text-muted-foreground">{title}</div>
        <div className="text-center text-xl font-medium text-muted-foreground">
          Please Wait for a while data is processing...
        </div>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-xl font-medium text-muted-foreground">
          {title} on {asOfDate.toDateString()}
        </div>
        <div>
          <Select onValueChange={(value) => setAsOfDate(new Date(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Select as of date" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select as of date</SelectLabel>
                {getAllUniqueDates(table).map((date) => (
                  <SelectItem key={date} value={date}>
                    {new Date(date).toDateString()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <PolyChart title="Normalized" xLabels={uniqueIds} datasets={datasets} />
    </>
  )
}

export default FICO
