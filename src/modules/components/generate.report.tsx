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

type Props = {
  type: string;
  modal: DictionaryType;
  overview: DictionaryType;
};

const GenerateReport = ({
  type,
  modal,
  overview,
}: Props) => {
  const baseData = modal?.result?.data;
  console.log(baseData);
  if (!modal) return <></>;
  if (type === "tmas") {
    // Transform raw data into table-friendly format
    const jsonDataCGLCurve = baseData?.CGL_Curve;
    const transitionalMatrix = baseData?.Transition_Matrix;

    const {
      columns: CGLCurveColumns,
      rows: dataCGL_Curve,
      rowHeaders: CGLCurveRows,
    } = TableUtils.transformToTableData(jsonDataCGLCurve, {
      rowKeyPrefix: "Period_",
      sortRows: true,
      formatValue: (value) => typeof value === "number" ? value.toFixed(5) : value,
    });

    // Summary data for the overview table
    const summaryData = [
      { label: "ALLL", value: modal?.result?.data?.ALLL.toFixed(3) },
      { label: "CECL Factor", value: modal?.result?.data?.CECL.toFixed(3) },
    ];

    // Helper function to get matrix column headers
    const getMatrixHeaders = () => ['Current', ...Object.keys(transitionalMatrix || {}).filter(key => key !== 'Current')];

    return (
      <div className="flex flex-col gap-8 w-full max-w-[1200px] mx-auto">
        {/* Summary Table */}
        <ReportTableWrapper title="Transition Matrix Analysis (with weighted average) Report">
          <ScrollArea className="flex-1 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Summary</TableHead>
                  <TableHead>Value (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summaryData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.label}</TableCell>
                    <TableCell>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </ReportTableWrapper>

        {/* Transition Matrix Table */}
        <ReportTableWrapper title="Transition Matrix">
          <ScrollArea className="flex-1 rounded-md border">
            <Table className="relative w-full">
              <TableHeader className="border-b bg-muted sticky top-0 z-10">
                <TableRow>
                  <TableHead className="bg-muted text-primary min-w-[120px]">Month</TableHead>
                  {getMatrixHeaders().map((label) => (
                    <TableHead className="border-l text-primary min-w-[100px]" key={label}>
                      {label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {getMatrixHeaders().map((rowLabel) => (
                  <TableRow key={rowLabel}>
                    <TableCell className="w-auto bg-muted font-medium text-primary">
                      {rowLabel}
                    </TableCell>
                    {getMatrixHeaders().map((columnLabel) => {
                      let value = transitionalMatrix[columnLabel][rowLabel];
                      if (typeof value === "number") {
                        value = value.toFixed(5);
                      }
                      return (
                        <TableCell className="border-l" key={columnLabel}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </ReportTableWrapper>

        {/* CGL Curve Analysis Section */}
        <ReportTableWrapper title="CGL Curve Analysis">
          {/* Regression Graph */}
          <div className="flex justify-center w-full mb-6">
            <Regression
              title="CGL Curve Graph"
              data={dataCGL_Curve.map((row, index) => [
                index.toString(),
                (row as DictionaryType)["Charged Off"].toString(),
              ])}
              order={2}
            />
          </div>

          {/* CGL Curve Data Table */}
          <ScrollArea className="flex-1 rounded-md border">
            <Table className="relative w-full">
              <TableHeader className="border-b bg-muted sticky top-0 z-10">
                <TableHead className="bg-muted text-primary min-w-[120px]">Month</TableHead>
                {CGLCurveColumns?.map((column) => (
                  <TableHead className="border-l text-primary min-w-[100px]" key={column}>
                    {column}
                  </TableHead>
                ))}
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
      </div>
    );
  }
  return <></>;
};

export default GenerateReport;
