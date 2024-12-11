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
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/core/use-toast";

const CreateReportForm = () => {
  const { isLoading } = useReportUpload();
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    const typedValues = values as z.infer<typeof createReportFormSchema>;

    formData.append("report_name", typedValues.report_name);
    formData.append("config_file", typedValues.config_file);
    formData.append("data_file", typedValues.data_file);
    formData.append("description", typedValues.description);

    try {
      console.log("Sending request to Flask server");
      const response = await fetch("http://localhost:5000/newreport", {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response from Flask:", data);

      // Assuming Flask returns an ID in the response
      router.push(`/dashboard/reports/d/${data.report_id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to create report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4 p-4">
        <div className="text-xl font-medium">Report Information</div>
        <AutoForm
          formSchema={createReportFormSchema}
          onSubmit={handleSubmit}
          values={{
            config_file: undefined,
            data_file: undefined,
            report_name: "",
            description: "",
          }}
          fieldConfig={{
            config_file: {
              fieldType: "file",
              inputProps: {
                disabled: isLoading,
              },
            },
            data_file: {
              fieldType: "file",
              inputProps: {
                disabled: isLoading,
              },
            },
            report_name: {
              fieldType: "textarea",
              inputProps: {
                placeholder: "Report Name",
                disabled: isLoading,
              },
            },
            description: {
              fieldType: "textarea",
              inputProps: {
                placeholder: "Description",
                disabled: isLoading,
              },
            },
          }}
        >
          <AutoFormSubmit {...{ isLoading }}>Submit</AutoFormSubmit>
        </AutoForm>
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
