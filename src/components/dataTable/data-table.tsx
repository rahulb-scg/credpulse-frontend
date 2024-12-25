"use client"

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { CommonUtils } from "@/utils/common.utils"
import React, { ReactNode } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import NoDataFound, { NoDataFoundProps } from "../ui/noDataFound"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { DataTableLoading } from "./data-table-loading"

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey: string
  enableSerialNumber?: boolean
  rightComponent?: ReactNode
  onClickRow?: (row: TData, index: number) => void
  isLoading?: boolean
  noDataFound?: NoDataFoundProps
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  enableSerialNumber = true,
  rightComponent,
  onClickRow,
  isLoading,
  noDataFound
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>(() => {
    const savedSort = localStorage.getItem("tableSortingState")
    return savedSort ? JSON.parse(savedSort) : [{ id: "created_at", desc: true }]
  })

  React.useEffect(() => {
    localStorage.setItem("tableSortingState", JSON.stringify(sorting))
  }, [sorting])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    state: {
      sorting
    }
  })
  /* this can be used to get the selectedrows 
  console.log("value", table.getFilteredSelectedRowModel()); */

  return (
    <>
      <div className="flex-items-center flex justify-between">
        <Input
          placeholder={`Search ${searchKey}...`}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
          className="min-w-[200px] lg:max-w-sm"
        />
        {rightComponent}
      </div>
      {isLoading && <DataTableLoading columnCount={columns?.length} />}
      {!isLoading && (
        <>
          <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
            <Table className="relative">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {enableSerialNumber && <TableHead key={"#"}>#Sn.</TableHead>}
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="text-xs uppercase">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => onClickRow?.(row?.original, index)}
                      className={cn({
                        "cursor-pointer": CommonUtils.isFunction(onClickRow)
                      })}
                    >
                      {enableSerialNumber && <TableCell>{index + 1}.</TableCell>}
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} className=" flex-1 items-center justify-center">
                      <NoDataFound className="pt-8" {...noDataFound} />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
              selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  )
}
