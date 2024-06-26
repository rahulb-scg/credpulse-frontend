"use client";
import React, { ReactNode } from "react";
import BreadCrumb, { BreadCrumbType } from "../pager/breadcrumb";
import { PagerHeader } from "../pager/pager-header";
import DashboardWrapper from "./dashboard-wrapper";
import { Separator } from "@/components/ui/separator";

export interface DashboardContainerProps {
  title: string;
  description: string;
  breadCrumbs: BreadCrumbType[];
  children: ReactNode;
  rightComponent?: ReactNode;
}
const DashboardContainer = ({
  title,
  description,
  breadCrumbs,
  children,
  rightComponent,
}: DashboardContainerProps) => {
  return (
    <DashboardWrapper>
      <div className="flex flex-col">
        <BreadCrumb items={breadCrumbs} />
        <div className="flex items-center justify-between">
          <PagerHeader title={title} description={description} />
          {rightComponent}
        </div>
      </div>
      <Separator />
      {children}
    </DashboardWrapper>
  );
};

export default DashboardContainer;
