import DashboardHeader from "@/components/layout/dashboard-header";
import DashboardSidebar from "@/components/layout/dashboard-sidebar";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="flex  h-screen overflow-hidden">
        <DashboardSidebar />{" "}
        <div className="flex w-[calc(100vw-80px)] flex-1 flex-col gap-4 pl-20 ">
          <DashboardHeader />
          <main className="h-full w-full overflow-auto ">{children}</main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
