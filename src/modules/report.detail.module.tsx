"use client";
import { DataTabs, DataTabsProps } from "@/components/dataTabs/data-tabs";
import { getFileIcon } from "@/components/fileUploader/uploaded-file-item";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import APR from "@/modules/components/apr";
import FICO from "@/modules/components/fico";
import { DictionaryType } from "@/types/common.type";
import { DateUtils } from "@/utils/date.utils";
import { Separator } from "@radix-ui/react-select";
import { Link } from "lucide-react";
import { ReactNode } from "react";
import GenerateReport from "./components/generate.report";
import LoanPurposeSummary from "./components/loan-purpose-summary";
import PerformanceAnalysis from "./components/performance-analysis";
import UnivariateReport from "./components/univariate-report";

const ReportDetailModule = ({
  data,
  isLoading,
}: {
  data: DictionaryType;
  isLoading: boolean;
}) => {
  console.log("data:", data);

  if (isLoading && !data?.id)
    return (
      <div className="flex w-full flex-1 items-center justify-center">
        <Icons.spinner />
      </div>
    );
  if (!data?.report?.processed_at && !data?.report?.rejected_at)
    return (
      <Alert>
        <Icons.loaderCircle className="h-6 w-6 animate-spin " />
        <AlertTitle>Please Wait.</AlertTitle>
        <AlertDescription>
          Please Wait for a while data is processing...
        </AlertDescription>
      </Alert>
    );
  if (!!data?.report?.rejected_at)
    return (
      <Alert variant={"destructive"}>
        <Icons.alertIcon className="h-6 w-6  " />
        <AlertTitle>Oops !! this report is unable to process.</AlertTitle>
        <AlertDescription>{data?.report?.rejected_reason}</AlertDescription>
      </Alert>
    );
  const isUniVariateType = data?.report?.type === "univariates";
  const tabProps: DataTabsProps = {
    className: "w-full container",
    tabs: [
      // {
      //   title: "Loan Purpose Summary",
      //   key: "loan-purpose-summary",
      //   component: (
      //     <LoanPurposeSummary
      //       {...{
      //         loan_purpose_summary: data?.processedReport?.term_purpose_summary,
      //       }}
      //     />
      //   ),
      //   isVisible: !isUniVariateType,
      // },
      // {
      //   title: "Performance Analysis",
      //   key: "performance-analysis",
      //   component: (
      //     <PerformanceAnalysis
      //       {...{
      //         performance_analysis_summary:
      //           data?.processedReport?.performance_analysis_summary,
      //       }}
      //     />
      //   ),
      //   isVisible: !isUniVariateType,
      // },

      // {
      //   title: "APR",
      //   key: "apr",
      //   component: (
      //     <div className="min-h-72 min-w-64">
      //       <APR title="APR" data={data} isLoading={isLoading} />
      //     </div>
      //   ),
      // },
      // {
      //   title: "FICO",
      //   key: "fico",
      //   component: (
      //     <div className="min-h-72 min-w-64">
      //       <FICO title="FICO" data={data} isLoading={isLoading} />
      //     </div>
      //   ),
      // },
      {
        title: "Generated Report",
        key: "generate-report",
        component: (
          <GenerateReport
            type={data?.report?.type}
            modal={data?.report}
            overview={data}
          />
        ),
        isVisible: data?.report?.type !== "univariates",
      },
      // {
      //   title: "Univariate Report",
      //   key: "univariate-report",
      //   component: <UnivariateReport modal={data?.processedReport?.modal} />,
      // },
    ],
  };

  return (
    <div className="flex w-full gap-4">
      {/* <ReportDetail report={data?.report} /> */}

      <DataTabs {...tabProps} />
    </div>
  );
};

const ReportDetail = ({ report }: { report: DictionaryType }) => {
  const informations: InfoItemProps[] = [
    {
      title: "Model Type",
      value: report?.type,
    },
    {
      title: "Processed At",
      value: DateUtils.displayDate(report?.processed_at),
      isVisible: !!report?.processed_at,
    },
    {
      title: "Rejected At",
      value: DateUtils.displayDate(report?.rejected_at),
      isVisible: !!report?.rejected_at,
    },
    {
      title: "Rejected Message",
      value: report?.rejected_message,
      isVisible: !!report?.rejected_at,
    },
    {
      title: "Create at",
      value: DateUtils.displayDate(report?.created_at),
    },
  ];
  return (
    <div className="flex  h-auto w-1/4  flex-col  rounded border  shadow">
      <div
        className={cn(
          "relative m-4 flex items-center gap-4 rounded border p-4  text-xs text-muted-foreground  ",
        )}
      >
        {getFileIcon(report.file)}
        <Link
          className={cn(
            "absolute bottom-1 right-1 h-5 w-5 cursor-pointer text-blue-500",
          )}
          href={report?.file?.url}
        >
          <Icons.arrowDropdown />
        </Link>
        <div className="flex flex-col">
          <div className="font-medium">{report?.file?.name}</div>
          <div className="flex items-center gap-4 text-xs text-primary">
            <span>{`size: ${(report?.file.size / (1024 * 1024)).toFixed(
              2,
            )} MB`}</span>
          </div>
        </div>
      </div>

      <Separator />
      <div className="mt-4 flex flex-col  text-xs">
        {informations?.map((info) => <InfoItem key={info?.title} {...info} />)}
      </div>
    </div>
  );
};
interface InfoItemProps {
  title: string;
  value: ReactNode;
  isVisible?: boolean;
}

const InfoItem = ({ title, value, isVisible }: InfoItemProps) => {
  if (isVisible === false) return <></>;
  return (
    <div className="flex  justify-between  px-4  py-2 hover:bg-muted ">
      <div className="text-muted-foreground">{title}</div>
      <div className="text-primary">{value}</div>
    </div>
  );
};

export default ReportDetailModule;
