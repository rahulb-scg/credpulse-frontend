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
    accessorKey: "type",
    header: "Model",
    cell: ({ row }) => {
      const value: keyof typeof reportModelEnum = row.getValue("type");
      return reportModelEnum[value];
    },
    enableSorting: true,
  },
  {
    accessorKey: "file.name",
    header: "Input File",
    // cell: ({ row }) => {
    //   const value: string = row.getValue("report_name");
    //   const [type, key] = value?.split("/");
    //   const [filename] = key.split("-");
    //   return filename;
    // },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const rejectedAt = row?.original?.rejected_at;
      const processedAt = row?.original?.processed_at;
      if (rejectedAt)
        return (
          <div className="flex items-center gap-2 text-destructive">
            <Icons.alertIcon className="h-4 w-4" />
            Rejected
          </div>
        );
      if (processedAt)
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
    accessorKey: "created_at",
    // header: "Added At",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ADDED AT" />
    ),
    enableSorting: true,
    sortingFn: "datetime",

    cell: ({ row }) => {
      return DateUtils.displayDate(row?.original.created_at, true);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Actions",
  },
];
