import { z } from "zod";

export const createReportFormSchema = z.object({
  config_file: z.instanceof(File),
  data_file: z.instanceof(File),
  report_name: z.string(),
  description: z.string(),
});
export type RepDataType = {
  report_name: string;
  user_id: string;
  report_type: string;
  report_link: string;
};
