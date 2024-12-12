"use client";
import { Icons } from "@/components/ui/icons";
import { reportModelEnum } from "@/constants/preference.constant";
import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import { DateUtils } from "@/utils/date.utils";
import { DataTableColumnHeader } from "@/components/dataTable/data-table-column-header";
// import { CellAction } from "./cell-action";

export const reportColumns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: "Report Name",
    cell: ({ row }) => row.getValue("title"),
    enableSorting: true,
  },
  {
    accessorKey: "model",
    header: "Model Type",
    cell: ({ row }) => {
      const value: keyof typeof reportModelEnum = row.getValue("model");
      return reportModelEnum[value];
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      if (status === "rejected")
        return (
          <div className="flex items-center gap-2 text-destructive">
            <Icons.alertIcon className="h-4 w-4" />
            Rejected
          </div>
        );
      if (status === "completed")
        return (
          <div className="flex items-center gap-2 text-green-500">
            <Icons.shieldCheck className="h-4 w-4" />
            Completed
          </div>
        );

      return (
        <div className="flex items-center gap-2 text-yellow-500">
          <Icons.processing className="h-4 w-4" />
          Processing
        </div>
      );
    },
  },
  {
    accessorKey: "created_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    enableSorting: true,
    sortingFn: "datetime",
    cell: ({ row }) => {
      return DateUtils.displayDate(row.getValue("created_date"), true);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Actions",
  },
];
