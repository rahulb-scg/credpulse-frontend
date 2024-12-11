import { useState, useEffect } from "react";

export const useReportDetail = (reportId: string) => {
  const [report, setReport] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportDetail = async () => {
      try {
        const response = await fetch(`/api/reports/${reportId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch report");
        }

        setReport(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReportDetail();
  }, [reportId]);

  return { report, isLoading, error };
};
