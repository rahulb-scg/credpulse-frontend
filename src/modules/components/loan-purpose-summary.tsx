import PieChart from "@/components/echarts/PieChart";
import { DictionaryType } from "@/types/common.type";
import { ReactNode } from "react";

const LoanPurposeSummary = ({
  loan_purpose_summary,
}: {
  loan_purpose_summary: DictionaryType;
}) => {
  if (!loan_purpose_summary) return <></>;
  const purposeSummary = JSON.parse(
    loan_purpose_summary?.loan_purpose_summary,
  ).map((el: DictionaryType) => ({
    name: el?.loanpurpose,
    value: Number(el?.percentage?.toFixed(2)),
  }));
  const termSummary = JSON.parse(loan_purpose_summary?.term_summary)?.map(
    (el: DictionaryType) => ({
      name: `${el?.term_years} years`,
      value: Number(el?.percentage?.toFixed(2)),
    }),
  );

  return (
    <div className="mt-4 grid w-full grid-cols-2  gap-4">
      <SummaryDistributionWrapper title="Term Summary Distribution">
        <div className="min-h-full min-w-full">
          <PieChart
            title="Term Summary"
            data={termSummary}
            label={{ formatter: "{b}: {d}%" }}
          />
        </div>
      </SummaryDistributionWrapper>
      <SummaryDistributionWrapper title="Purpose  Summary Distribution">
        <div className="min-h-full min-w-full">
          <PieChart
            label={{ formatter: "{b}: {d}%" }}
            title="Purpose Summary"
            data={purposeSummary}
          />
        </div>
      </SummaryDistributionWrapper>
    </div>
  );
};

const SummaryDistributionWrapper = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex w-full flex-col gap-2  ">
      <div className="text-center  text-xl font-medium text-muted-foreground">
        {title}
      </div>

      <div className="flex flex-1 items-center gap-4 rounded bg-muted p-4">
        {children}
      </div>
    </div>
  );
};

export default LoanPurposeSummary;
