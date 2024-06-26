"use client";
import DashboardContainer from "@/components/layout/dashboard-container";
import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import usePooling from "@/hooks/core/use-polling.hook";
import { toast } from "@/hooks/core/use-toast";
import ReportDetailModule from "@/modules/report.detail.module";
import { ApiService } from "@/utils/api-service.utils";
import { DateUtils } from "@/utils/date.utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const ReportDetailPage = ({ params }: { params: any }) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const reportId = params?.id;
  const router = useRouter();
  const { data, isLoading, onStopFetching } = usePooling({
    queryKey: ["report-detail", reportId],
    queryFn: async () => {
      const service = new ApiService<any>(`reports/${reportId}`);

      const response = await service.getOne();
      return response.data;
    },
  });

  useEffect(() => {
    if (isLoading) return;

    if (data?.report?.processed_at ?? data?.report?.rejected_at)
      onStopFetching();
  }, [
    data?.report?.rejected_at,
    data?.report?.processed_at,
    onStopFetching,
    isLoading,
  ]);
  const onDelete = async () => {
    setIsDeleting(true);
    try {
      const service = new ApiService("/reports");
      await service.delete(params?.id);
      toast({
        title: "Delete Reports",
        description: "Report has been deleted successfully",
      });
      setIsDeleting(false);
      router.push("/dashboard/reports");
    } catch (error) {
      toast({
        title: "Unable to delete Reports",
        description: JSON.stringify(error),
        variant: "destructive",
      });
      setIsDeleting(false);
    }
  };
  const report = data?.report;
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
      value: DateUtils.displayDate(report?.created_at, true),
    },
  ];

  return (
    <DashboardContainer
      title="Report Details"
      description="Upload Your Report"
      breadCrumbs={[
        { title: "Reports", link: "/dashboard/reports" },
        { title: "Report Details", link: `/dashboard/reports/d/${params?.id}` },
      ]}
      rightComponent={
        !!report?.id && (
          <div className="flex items-center gap-4">
            <div className="flex flex-1 flex-wrap items-center  ">
              {informations?.map((info) => (
                <InfoItem key={info?.title} {...info} />
              ))}
            </div>

            {!!report?.processed_url && (
              <Link
                className={buttonVariants({
                  variant: "outline",
                  size: "icon",
                  className: "text-primary",
                })}
                href={report?.processed_url}
              >
                <Icons.arrowDropdown className="h-4 w-4" />
              </Link>
            )}
            <Button
              disabled={isDeleting}
              onClick={onDelete}
              variant={"destructive"}
              size={"icon"}
            >
              <Icons.trash className="h-5 w-5" />
            </Button>
          </div>
        )
      }
    >
      <ReportDetailModule {...{ data, isLoading }} />
    </DashboardContainer>
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
    <div className="flex flex-col  border-r  px-4 text-start text-sm last:border-r-0 ">
      <div className="text-muted-foreground">{title}</div>
      <div className="text-primary">{value}</div>
    </div>
  );
};

export default ReportDetailPage;
