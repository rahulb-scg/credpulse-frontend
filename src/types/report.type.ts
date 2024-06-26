import { z } from "zod";

export const createReportFormSchema = z.object({
  model: z.string(),
  file: z.instanceof(File).describe("Select File"),
});
export type RepDataType = {
  report_name: string;
  user_id: string;
  report_type: string;
  report_link: string;
};
