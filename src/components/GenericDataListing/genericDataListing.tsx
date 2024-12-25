"use client"
import { useState } from "react"
import useQueryList from "@/hooks/core/useQueryList.hook"
import { DictionaryType } from "@/types/common.type"
import { SelectInputOptions } from "@/types/select-input.type"
import { DataTable, DataTableProps } from "../dataTable/data-table"
import DashboardContainer from "../layout/dashboard-container"
import SelectInput from "../selectInput/select.input"
import { Pagination } from "../ui/pagination"
import { ColumnDef } from "@tanstack/react-table"

interface FilterProps {
  key: string
  type: "select"
  options: SelectInputOptions[]
  placeholder: string
}

interface GenericTableProps extends Omit<DataTableProps<any, any>, "data"> {
  endPoint: string
  method?: "getAll" | "post"
  queryString?: string
  filters?: FilterProps[]
}

interface GenericDataListingProps {
  title: string
  description: string
  breadCrumbs: { title: string; link: string }[]
  rightComponent: React.ReactElement
  table: {
    columns: ColumnDef<any>[]
    searchKey: string
    noDataFound: {
      title: string
      description: string
      customAction: React.ReactElement
    }
    endPoint: string
    onClickRow: (data: any) => void
    filters: {
      key: string
      type: string
      options: { label: string; value: string }[]
      placeholder: string
    }[]
  }
}

const GenericDataListing = ({ title, description, breadCrumbs, rightComponent, table }: GenericDataListingProps) => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [filterData, setFilterData] = useState<DictionaryType>({})

  const { data, isLoading } = useQueryList({
    endPoint: table.endPoint,
    searchParams: {
      page,
      page_size: pageSize,
      ...filterData
    }
  })

  const handleChangeFilter = (key: string, value: any) => {
    if (!value) {
      const newFilterData = { ...filterData }
      delete newFilterData[key]
      setFilterData(newFilterData)
    } else {
      setFilterData((prev) => ({
        ...prev,
        [key]: value
      }))
    }
    setPage(1) // Reset to first page when filter changes
  }

  return (
    <DashboardContainer
      title={title}
      description={description}
      breadCrumbs={breadCrumbs}
      rightComponent={rightComponent}
    >
      <DataTable
        {...table}
        data={data?.reports || []}
        isLoading={isLoading}
        rightComponent={
          <div className="flex items-center gap-2">
            {table?.filters?.map((filter) => (
              <SelectInput
                key={filter?.key}
                options={filter?.options}
                onChange={(value) => handleChangeFilter(filter.key, value)}
                placeholder={filter?.placeholder}
                className="w-[150px]"
              />
            ))}
          </div>
        }
      />
      {data?.pagination && (
        <div className="mt-4 flex justify-end">
          <Pagination
            currentPage={data.pagination.page}
            totalPages={data.pagination.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </DashboardContainer>
  )
}

export default GenericDataListing
