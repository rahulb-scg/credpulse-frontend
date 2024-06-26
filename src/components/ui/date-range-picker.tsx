"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUncontrolled } from "@/hooks/core/use-uncontrolled.hook";
import { cn } from "@/lib/utils";
import { DateUtils } from "@/utils/date.utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import * as React from "react";
import { Input } from "./input";

type DateRangeValueType<TDateValue> = {
  from: TDateValue;
  to: TDateValue;
};

interface DateRangePickerProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange" | "value" | "defaultValue"
  > {
  value?: DateRangeValueType<Date | string>;
  defaultValue?: DateRangeValueType<Date | string>;
  onChange: (range: DateRangeValueType<Date>) => void;
}
const getParseDateRange = (range?: DateRangeValueType<Date | string>) => {
  if (!range?.from || !range?.to) return undefined;
  try {
    const from = DateUtils.getValue(range?.from);
    const to = DateUtils.getValue(range?.to);
    return {
      from,
      to,
    };
  } catch (error) {
    return undefined;
  }
};
export function DateRangePicker({
  className,
  value,
  onChange,
  defaultValue,
}: DateRangePickerProps) {
  const [date, onChangeValue] = useUncontrolled({
    value: getParseDateRange(value),
    defaultValue: getParseDateRange(defaultValue),
    onChange,
  });
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(data: any) => {
              onChangeValue({
                from: data?.from ?? new Date(),
                to: data?.to ?? new Date(),
              });
            }}
            numberOfMonths={2}
          />
          <div className="grid grid-cols-2 items-center gap-4 p-4">
            <Input
              value={format(date?.from, "yyyy-MM-dd")}
              placeholder="Start Date"
              type="date"
              onChange={(e) => {
                onChangeValue({
                  from: DateUtils.getValue(e?.target?.value),
                  to: date?.to ?? new Date(),
                });
              }}
            />
            <Input
              value={format(date?.to, "yyyy-MM-dd")}
              placeholder="End Date"
              type="date"
              onChange={(e) => {
                onChangeValue({
                  to: DateUtils.getValue(e?.target?.value),
                  from: date?.from ?? new Date(),
                });
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
