import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DictionaryType } from "@/types/common.type";
import ReportTableWrapper from "./report-table-wrapper";
import Regression from "@/components/echarts/Regression";
import { Separator } from "@radix-ui/react-select";
import { TableUtils } from "@/utils/table.utils";

const GenerateReport = ({
  type,
  modal,
  overview,
}: {
  modal: DictionaryType;
  type: string;
  overview: DictionaryType;
}) => {
  const baseData = modal?.result?.data;
  console.log(baseData);
  if (!modal) return <></>;
  if (type === "tmas") {
    // const jsonDataTM = JSON.parse(modal?.tmas1);
    // const columnsTM = Object.keys(jsonDataTM);
    // const dataTM = Object.values(jsonDataTM);
    const jsonDataCGLCurve = baseData?.CGL_Curve;

    const {
      columns: CGLCurveColumns,
      rows: dataCGL_Curve,
      rowHeaders: CGLCurveRows,
    } = TableUtils.transformToTableData(jsonDataCGLCurve, {
      rowKeyPrefix: "Period_",
      sortRows: true,
      formatValue: (value) => {
        if (typeof value === "number") {
          return value.toFixed(5);
        }
        return value;
      },
    });

    return (
      <>
        <ReportTableWrapper title="Transitional Matrix Analysis (with weighted average) Report">
          <div>
            <div className="flex cursor-default items-center gap-4">
              <h2 className="font-bold">ALLL(%): </h2>
              {modal?.result?.data?.ALLL.toFixed(3)}
            </div>
            {/* <div className="flex cursor-default items-center gap-4">
              <h2 className="font-bold">Base Month:</h2>
              {overview?.as_of_date}
            </div> */}
            {/* <div className="flex cursor-default items-center gap-4">
              <h2 className="font-bold">Weighted Average Age (Months):</h2>
              {overview?.weighted_avg_age}
            </div> */}
            {/* <div className="flex cursor-default items-center gap-4">
              <h2 className="font-bold">Forecast Period:</h2>
              <div className="flex gap-8">
                From: {overview?.forecast_period?.from} <Separator></Separator>
                To: {overview?.forecast_period?.to}
              </div>
            </div> */}
            {/* <div className="flex cursor-default items-center gap-4">
              <h2 className="font-bold">Forecast Duration (Months):</h2>
              {overview?.forecast_duration}
            </div> */}
            <div className="flex cursor-default items-center gap-4">
              <h2 className="font-bold">CECL Factor (%):</h2>
              {modal?.result?.data?.CECL.toFixed(3)}
            </div>
            {/* <div className="flex cursor-default items-center gap-4">
              <h2 className="font-bold">CECL Amount ($):</h2>
              {overview?.CECL_amount} (for forecasted period)
            </div> */}
          </div>
          {/* <ScrollArea className="flex-1 rounded-md border">
            <Table className="relative">
              <TableHeader className="border-b bg-muted ">
                <TableHead className="bg-muted text-primary">
                  New Loan Status
                </TableHead>
                {columnsTM?.map((column) => {
                  return (
                    <TableHead className="border-l text-primary" key={column}>
                      {column}
                    </TableHead>
                  );
                })}
              </TableHeader>
              <TableBody>
                {dataTM?.map((row, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="w-auto bg-muted font-medium text-primary">
                        {columnsTM[index]}
                      </TableCell>
                      {columnsTM?.map((column) => {
                        return (
                          <TableCell className="border-l" key={column}>
                            {(row as DictionaryType)?.[column]?.toFixed(2)}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea> */}
        </ReportTableWrapper>
        <div className="flex w-full justify-center">
          <Regression
            title="CGL Curve Graph"
            data={dataCGL_Curve.map((row, index) => [
              index.toString(),
              (row as DictionaryType)["Charged Off"].toString(),
            ])}
            order={2}
          />
        </div>

        <ReportTableWrapper title="CGL Curve Data">
          <ScrollArea className="flex-1 rounded-md border">
            <Table className="relative">
              <TableHeader className="border-b bg-muted ">
                <TableHead className="bg-muted text-primary">Month</TableHead>
                {CGLCurveColumns?.map((column) => {
                  return (
                    <TableHead className="border-l text-primary" key={column}>
                      {column}
                    </TableHead>
                  );
                })}
              </TableHeader>
              <TableBody>
                {dataCGL_Curve?.map((row, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="w-auto bg-muted font-medium text-primary">
                        {CGLCurveRows[index]}
                      </TableCell>
                      {CGLCurveColumns?.map((column) => {
                        let value = (row as DictionaryType)?.[column];
                        if (typeof value === "number") {
                          value = value.toFixed(5);
                        }
                        return (
                          <TableCell className="border-l" key={column}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </ReportTableWrapper>
      </>
    );
  }
  return <></>;
};

export default GenerateReport;
