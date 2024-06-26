import { ScrollBar } from "@/components/ui/scroll-area";
import {
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Table,
} from "@/components/ui/table";
import { DictionaryType } from "@/types/common.type";
import { ScrollArea } from "@/components/ui/scroll-area";

import React from "react";
import ReportTableWrapper from "./report-table-wrapper";

const UnivariateReport = ({ modal }: { modal: DictionaryType }) => {
  if (!modal?.univariates) return <></>;
  const jsonData = JSON.parse(modal?.univariates);
  const horizontalColumn = Object.keys(jsonData);
  const data: DictionaryType[] = Object.values(jsonData);
  const columns = Object.keys(data[0]);
  return (
    <ReportTableWrapper title="Univariates Analysis Report">
      <ScrollArea className="  relative h-[calc(80vh-220px)]   rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 border-b bg-muted ">
            <TableHead className="bg-muted text-primary"></TableHead>
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
                    {horizontalColumn[index]}
                  </TableCell>
                  {columns?.map((column) => {
                    let value = (row as DictionaryType)?.[column];
                    if (typeof value === "number") value = value.toFixed(2);
                    return (
                      <TableCell className="border-l" key={column}>
                        {(row as DictionaryType)?.[column]}
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
};

export default UnivariateReport;
