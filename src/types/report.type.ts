import { z } from "zod";

export const createReportFormSchema = z.object({
  data_source_type: z.enum(["db", "file"]),
  config_file: z.instanceof(File),
  data_file: z.instanceof(File).optional(),
  report_name: z.string().min(1, "Report name is required"),
  description: z.string().min(1, "Description is required"),
});
export type RepDataType = {
  report_name: string;
  user_id: string;
  report_type: string;
  report_link: string;
};
