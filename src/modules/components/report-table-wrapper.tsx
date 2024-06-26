import { ReactNode } from "react";

const ReportTableWrapper = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex  flex-col gap-4  pt-4">
      <div className="text-center  text-xl font-medium text-muted-foreground">
        {title}
      </div>
      {children}
    </div>
  );
};
export default ReportTableWrapper;
