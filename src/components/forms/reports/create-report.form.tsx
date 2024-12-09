"use client";
import AutoForm, { AutoFormSubmit } from "@/components/autoForm/auto-form";
import { Input } from "@/components/ui/input";
import {
  reportModelEnum,
  tmasColumns,
  uniVariateColumns,
} from "@/constants/preference.constant";
import { useReportUpload } from "@/hooks/use-report-upload.hook";
import { createReportFormSchema } from "@/types/report.type";
import { useMemo, useState } from "react";

const CreateReportForm = () => {
  const { onSubmit, isLoading } = useReportUpload();

  const [columns, setColumns] = useState(uniVariateColumns);
  const modelOptions = useMemo(() => {
    return Object.entries(reportModelEnum).map(([value, label]) => {
      return { value, label };
    });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4 p-4">
        <div className="text-xl font-medium">Model Information</div>
        <AutoForm
          formSchema={createReportFormSchema}
          onSubmit={async (values) => {
            await onSubmit({
              ...values,
              columns,
            });
          }}
          values={{
            model: Object.keys(reportModelEnum)[0],
          }}
          fieldConfig={{
            model: {
              fieldType: "select_input",
              inputProps: {
                options: modelOptions,
              },
            },
            file: {
              fieldType: "file",
              inputProps: {
                accept: {
                  "text/csv": [],
                  "application/vnd.ms-excel": [],
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    [],
                },
                subTitle: "Supported Files: CSV, XLSX",
                disabled: isLoading,
              },
            },
          }}
        >
          <AutoFormSubmit {...{ isLoading }}>Process</AutoFormSubmit>
        </AutoForm>
      </div>
      <div className="flex  flex-col gap-4   p-4">
        <div className="text-xl font-medium">Column Configuration</div>
        <div className="flex h-[60vh] flex-col gap-4 overflow-auto">
          {Object.entries(columns).map(([key, value]) => {
            return (
              <CsvColumnItem
                key={key}
                {...{
                  column_name: value?.column_name,
                  header: value?.header,
                  onChange: (columnName) => {
                    setColumns((prev) => {
                      return {
                        ...prev,
                        [key]: {
                          ...value,
                          column_name: columnName,
                        },
                      };
                    });
                  },
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
interface CsvColumnItemProps {
  column_name: string;
  header: string;
  onChange: (value: string) => void;
}

const CsvColumnItem = ({
  column_name,
  header,
  onChange,
}: CsvColumnItemProps) => {
  return (
    <div className="flex flex-col gap-4 shadow ">
      <div className="flex flex-col gap-2 rounded border px-4 py-2 text-sm">
        <div className="grid grid-cols-2  items-center gap-4">
          <div className="font-medium">{header}</div>
          <Input
            value={column_name}
            placeholder="Column Name"
            className="w-full"
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateReportForm;
