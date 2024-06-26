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

const GenerateReport = ({
  type,
  modal,
}: {
  modal: DictionaryType;
  type: string;
}) => {
  if (!modal) return <></>;
  if (type === "tmas") {
    const jsonData = JSON.parse(modal?.tmas2);
    const columns = Object.keys(jsonData);
    const data = Object.values(jsonData);

    return (
      <ReportTableWrapper title="Transitional Matrix Analysis Report">
        <ScrollArea className="flex-1 rounded-md border">
          <Table className="relative">
            <TableHeader className="border-b bg-muted ">
              <TableHead className="bg-muted text-primary">
                New Loan Status
              </TableHead>
              {columns?.map((column) => {
                return (
                  <TableHead className="border-l text-primary" key={column}>
                    {column}
                  </TableHead>
                );
              })}
            </TableHeader>
            <TableBody>
              {data?.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className="w-auto bg-muted font-medium text-primary">
                      {columns[index]}
                    </TableCell>
                    {columns?.map((column) => {
                      return (
                        <TableCell className="border-l" key={column}>
                          {(row as DictionaryType)?.[column].toFixed(2)}
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
    );
  }
  return <></>;
};

export default GenerateReport;
