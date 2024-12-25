"use client"
import { Icons } from "@/components/ui/icons"
import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import { DateUtils } from "@/utils/date.utils"
import { DataTableColumnHeader } from "@/components/dataTable/data-table-column-header"

export const reportColumns: ColumnDef<any>[] = [
  {
    accessorKey: "report_name",
    header: "Report Name",
    cell: ({ row }) => row.getValue("report_name") || "Untitled Report",
    enableSorting: true
  },
  {
    accessorKey: "type",
    header: "Model Type",
    cell: ({ row }) => {
      const value: string = row.getValue("type")
      return value || "N/A"
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      if (status === "failed")
        return (
          <div className="flex items-center gap-2 text-destructive">
            <Icons.alertIcon className="h-4 w-4" />
            Failed
          </div>
        )
      if (status === "completed")
        return (
          <div className="flex items-center gap-2 text-green-500">
            <Icons.shieldCheck className="h-4 w-4" />
            Completed
          </div>
        )

      return (
        <div className="flex items-center gap-2 text-yellow-500">
          <Icons.processing className="h-4 w-4" />
          Processing
        </div>
      )
    }
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    enableSorting: true,
    sortingFn: "datetime",
    cell: ({ row }) => {
      return DateUtils.displayDate(row.getValue("created_at"), true)
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "Actions"
  }
]
