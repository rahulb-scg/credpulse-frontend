import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface DashboardWrapperProps {
  children: ReactNode;
  className?: string;
}

const DashboardWrapper = ({ children, className }: DashboardWrapperProps) => {
  return (
    <div className={cn("flex-1 space-y-4  p-4 pt-6 md:p-8", className)}>
      {children}
    </div>
  );
};

export default DashboardWrapper;
