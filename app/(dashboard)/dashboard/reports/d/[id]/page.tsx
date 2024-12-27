"use client";
import React from "react";
import DashboardContainer from "@/components/layout/dashboard-container";
import ReportDetailModule from "@/modules/report.detail.module";
import { useReportDetail } from "@/hooks/use-report-detail.hook";

const ReportDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = React.use(params);
  const { report, isLoading, error } = useReportDetail(resolvedParams.id);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!report) {
    return <div>No report found.</div>;
  }

  return <ReportDetailModule data={report} isLoading={false} />;
};

export default ReportDetailPage;
