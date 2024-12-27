import LineStackChart from "@/components/echarts/lineStackChart";
import React from "react";

const PerformanceAnalysis = ({
  performance_analysis_summary,
}: {
  performance_analysis_summary: any;
}) => {
  if (!performance_analysis_summary) return <></>;
  const { date, ...restData } = JSON.parse(performance_analysis_summary) || {};

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="text-center text-xl font-medium text-muted-foreground">
        Loan Performance Analytics
      </div>
      <div className="min-h-72 min-w-64">
        <LineStackChart
          title="Loan Performance Over Time"
          categoryData={date}
          legends={Object.keys(restData || {}).map(
            (key: string) => key?.split("_").join(" ").toUpperCase(),
          )}
          data={Object.entries(restData).map(([key, value]: any) => {
            return {
              name: key?.split("_").join(" ").toUpperCase(),
              data: value,
            };
          })}
        />
      </div>
    </div>
  );
};

export default PerformanceAnalysis;
