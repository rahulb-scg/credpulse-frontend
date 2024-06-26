"use client";
import { useState } from "react";

import useQueryList from "@/hooks/core/useQueryList.hook";
import { DictionaryType } from "@/types/common.type";
import { SelectInputOptions } from "@/types/select-input.type";
import { subDays } from "date-fns";
import { DataTable, DataTableProps } from "../dataTable/data-table";
import DashboardContainer, {
  DashboardContainerProps,
} from "../layout/dashboard-container";
import SelectInput from "../selectInput/select.input";
import { DateRangePicker } from "../ui/date-range-picker";

interface FilterProps {
  key: string;
  type: "select";
  options: SelectInputOptions[];
  placeholder: string;
}
interface GenericTableProps extends Omit<DataTableProps<any, any>, "data"> {
  endPoint: string;
  method?: "getAll" | "post";
  queryString?: string;
  filters?: FilterProps[];
}

interface GenericDataListingProps
  extends Omit<DashboardContainerProps, "children"> {
  table: GenericTableProps;
}
const GenericDataListing = ({
  table,
  ...restProps
}: GenericDataListingProps) => {
  const [filterData, setFilterData] = useState<DictionaryType>({
    date: {
      start_date: subDays(new Date(), 365),
      end_date: new Date(),
    },
  });
  const { data, isLoading } = useQueryList({
    endPoint: `${table?.endPoint}${
      table?.queryString ? "?" + table?.queryString : ""
    }`,
    searchParams: {
      ...filterData,
      date: {
        start_date: filterData?.date?.start_date?.toISOString(),
        end_date: filterData?.date?.end_date?.toISOString(),
      },
    },
    method: "search",
  });

  const handleChangeFilter = (key: string, value: any) => {
    setFilterData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  return (
    <DashboardContainer {...restProps}>
      <DataTable
        {...table}
        data={Array.isArray(data) ? (data as any) : []}
        {...{ isLoading }}
        rightComponent={
          <div className="flex items-center gap-2">
            {table?.filters?.map((filter) => {
              return (
                <SelectInput
                  options={filter?.options}
                  key={filter?.key}
                  onChange={(value) => handleChangeFilter("status", value)}
                  placeholder={filter?.placeholder}
                  className="w-[150px]"
                />
              );
            })}
            <DateRangePicker
              value={{
                from: filterData?.date?.start_date,
                to: filterData?.date?.end_date,
              }}
              onChange={(value) => {
                handleChangeFilter("date", {
                  start_date: value?.from,
                  end_date: value?.to,
                });
              }}
            />
          </div>
        }
      />
    </DashboardContainer>
  );
};

export default GenericDataListing;
