"use client"
import { DataTabs, DataTabsProps } from "@/components/dataTabs/data-tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icons } from "@/components/ui/icons"
import { DictionaryType } from "@/types/common.type"
import { DateUtils } from "@/utils/date.utils"
import { ReactNode } from "react"
import GenerateReport from "./components/generate.report"
import { logger } from "@/lib/logger"
import DataInsights from "./components/data-insights"

const ReportDetailModule = ({ data, isLoading }: { data: DictionaryType; isLoading: boolean }) => {
  logger.info("Rendering ReportDetailModule", { reportId: data?._id })

  if (isLoading && !data?._id) {
    logger.info("Report is loading")
    return (
      <div className="flex w-full flex-1 items-center justify-center">
        <Icons.spinner />
      </div>
    )
  }

  if (!data?.status || data.status !== "success") {
    logger.error("Report processing failed or invalid status", { status: data?.status })
    return (
      <Alert variant="destructive">
        <Icons.alertIcon className="h-6 w-6" />
        <AlertTitle>Error Processing Report</AlertTitle>
        <AlertDescription>The report could not be processed successfully. Please try again.</AlertDescription>
      </Alert>
    )
  }

  const modelOutputs = data?.model_outputs
  if (!modelOutputs) {
    logger.error("No model outputs found in report data")
    return (
      <Alert variant="destructive">
        <Icons.alertIcon className="h-6 w-6" />
        <AlertTitle>Invalid Report Data</AlertTitle>
        <AlertDescription>The report data is missing required information.</AlertDescription>
      </Alert>
    )
  }

  if (!data?.analysis_extensions) {
    logger.error("No analysis extensions found in report data")
    return (
      <Alert variant="destructive">
        <Icons.alertIcon className="h-6 w-6" />
        <AlertTitle>Invalid Report Data</AlertTitle>
        <AlertDescription>The report data is missing required information.</AlertDescription>
      </Alert>
    )
  } else {
    logger.info("Analysis extensions found in report data", { reportId: data._id })
  }

  logger.info("Processing report data", {
    reportId: data._id,
    modelName: data.model_name,
    status: data.status
  })

  const tabProps: DataTabsProps = {
    className: "w-full container",
    tabs: [
      {
        title: "Data Insights",
        key: "data-insights",
        component: <DataInsights response={data} />,
        isVisible: true
      },
      {
        title: "Report Overview",
        key: "report-overview",
        component: (
          <GenerateReport
            type={data.model_name}
            modal={modelOutputs}
            overview={data}
            metadata={{
              modelName: data.model_name,
              status: data.status,
              createdAt: data.created_at
            }}
          />
        ),
        isVisible: true
      }
    ]
  }

  return <DataTabs {...tabProps} />
}

export default ReportDetailModule
