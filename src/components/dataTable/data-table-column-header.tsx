import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }
  const isSortedBy = column.getIsSorted();
  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3 h-8 data-[state=open]:bg-accent"
      onClick={() => {
        if (!isSortedBy) return column.toggleSorting(false);
        if (isSortedBy === "asc") return column.toggleSorting(true);

        column.toggleSorting(undefined);
      }}
    >
      <span>{title}</span>
      {isSortedBy === "desc" ? (
        <ArrowDownIcon className="ml-2 h-4 w-4" />
      ) : isSortedBy === "asc" ? (
        <ArrowUpIcon className="ml-2 h-4 w-4" />
      ) : (
        <CaretSortIcon className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}
