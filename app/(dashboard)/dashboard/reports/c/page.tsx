import CreateReportForm from "@/components/forms/reports/create-report.form";
import DashboardContainer from "@/components/layout/dashboard-container";
import { Separator } from "@/components/ui/separator";
import React from "react";

const ReportCreatePage = () => {
  return (
    <DashboardContainer
      title="Create Reports"
      description="Upload Your Report"
      breadCrumbs={[
        { title: "Reports", link: "/dashboard/reports" },
        { title: "Create Reports", link: "/dashboard/reports/c" },
      ]}
    >
      <CreateReportForm />
    </DashboardContainer>
  );
};

export default ReportCreatePage;
