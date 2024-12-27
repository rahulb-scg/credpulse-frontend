"use client"
import AutoForm, { AutoFormSubmit } from "@/components/autoForm/auto-form"
import { createReportFormSchema } from "@/types/report.type"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/core/use-toast"
import { useState } from "react"
import { DependencyType, FieldConfig, ValueDependency } from "@/components/autoForm/types"
import { ChangeEvent } from "react"
import { SelectInputOptions } from "@/types/select-input.type"

type FormValues = z.infer<typeof createReportFormSchema>;

const CreateReportForm = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dataSourceType, setDataSourceType] = useState<FormValues["data_source_type"]>("file")

  const handleSubmit = async (values: FormValues) => {
    if (isSubmitting) return

    setIsSubmitting(true)
    toast({
      title: "Submitting Report",
      description: "Your report is being processed..."
    })

    try {
      const formData = new FormData()
      formData.append("report_name", values.report_name)
      formData.append("description", values.description)
      formData.append("data_source_type", values.data_source_type)
      formData.append("config_file", values.config_file)
      
      if (values.data_source_type === "file" && values.data_file) {
        formData.append("data_file", values.data_file)
      }

      const response = await fetch("http://localhost:5000/newreport", {
        method: "POST",
        body: formData
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      toast({
        title: "Success",
        description: "Report created successfully"
      })
      router.push(`/dashboard/reports/d/${data.report_id}`)
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "Failed to create report. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldConfig: FieldConfig<FormValues> = {
    data_source_type: {
      fieldType: "select",
      inputProps: {
        className: "w-full",
        placeholder: "Select Data Source Type",
        options: [
          { label: "Database", value: "db" },
          { label: "CSV File", value: "file" }
        ] as SelectInputOptions[],
        disabled: isSubmitting,
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          const value = event.target.value as FormValues["data_source_type"]
          setDataSourceType(value)
        }
      }
    },
    config_file: {
      fieldType: "file",
      inputProps: {
        disabled: isSubmitting,
        required: true
      }
    },
    data_file: {
      fieldType: "file",
      inputProps: {
        disabled: isSubmitting,
        required: dataSourceType === "file"
      }
    },
    report_name: {
      fieldType: "textarea",
      inputProps: {
        placeholder: "Report Name",
        disabled: isSubmitting
      }
    },
    description: {
      fieldType: "textarea",
      inputProps: {
        placeholder: "Description",
        disabled: isSubmitting
      }
    }
  }

  const dependencies: ValueDependency<FormValues>[] = [
    {
      sourceField: "data_source_type",
      type: DependencyType.HIDES,
      targetField: "data_file",
      when: (sourceValue: FormValues["data_source_type"], targetValue: File | undefined) => sourceValue === "db"
    }
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4 p-4">
        <div className="text-xl font-medium">Report Information</div>
        <AutoForm
          formSchema={createReportFormSchema}
          onSubmit={handleSubmit}
          values={{
            data_source_type: dataSourceType,
            config_file: undefined,
            data_file: undefined,
            report_name: "",
            description: ""
          }}
          fieldConfig={fieldConfig}
          dependencies={dependencies}
        >
          <AutoFormSubmit isLoading={isSubmitting}>Submit</AutoFormSubmit>
        </AutoForm>
      </div>
    </div>
  )
}

export default CreateReportForm
