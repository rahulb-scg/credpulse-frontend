import { DictionaryType } from "@/types/common.type";
import { createReportFormSchema, RepDataType } from "@/types/report.type";
import { useSession } from "next-auth/react";
import { useFileUpload } from "./core/use-file-upload.hook";
import useCustomMutation from "./core/useCustomMutation.hook";
import { CommonUtils } from "@/utils/common.utils";
import { toast } from "./core/use-toast";
import { useRouter } from "next/navigation";

export const useReportUpload = () => {
  const { isUploading, onUpload: onUploadFile } = useFileUpload();
  const router = useRouter();
  const {
    isPending,
    asyncOnSubmit: onSubmitReport,
    service,
  } = useCustomMutation({
    endPoint: "reports",
    method: "post",
    schema: createReportFormSchema,
    onSuccess: (data: any) => {
      toast({
        title: "Report Added",
        description: "Report has been added successfully",
      });
      return router.push(`/dashboard/reports/d/${data?.id}`);
    },
  });

  const onSubmit = async (data: DictionaryType) => {
    const files = await onUploadFile([data.file]);
    await onSubmitReport({
      file: files[0],
      type: data?.model,
      columns: data?.columns,
    });
  };
  return {
    onSubmit,
    isLoading: isPending || isUploading,
  };
};
