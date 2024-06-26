import { authOptions } from "@/constants/auth.option";
import { publicEnv } from "@/env/client";
import { getServerSession } from "next-auth";

export default async function getJobRuns() {
  const session = await getServerSession(authOptions);
  const token = session?.access_token;

  const params = new URLSearchParams({ domain: "genese" });
  const jobRunURL = `${publicEnv.NEXT_PUBLIC_API_BASE_URL}/home?${params}`;

  const tableData = await fetch(jobRunURL, {
    method: "get",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });

  if (tableData.status != 200) {
    console.log(`API response: ${tableData.statusText} ${tableData.status}`);
    return [];
  }

  const data = await tableData.json();
  return data;
}
