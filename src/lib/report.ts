import { publicEnv } from "@/env/client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { client } from "./aws";
import { genId } from "./utils";

type Model = "univariates" | "tmas";

type RepData = {
  report_name: string;
  user_id: string;
  report_type: string;
  report_link: string;
};

export async function getReports(
  token: string,
  user_id: string,
): Promise<RepData[]> {
  // api call to get report url list
  const params = new URLSearchParams({
    user_id: user_id,
  });
  const url = `${publicEnv.NEXT_PUBLIC_API_BASE_URL}/report?${params}`;

  const response = await fetch(url, {
    method: "get",
    headers: {
      Authorization: token,
    },
  });

  const reports = await response.json();
  return reports;
}

export async function runReport(
  token: string,
  user_id: string,
  file: File,
  type: Model,
) {
  const arrBuff = await file.arrayBuffer();
  const buffer = Buffer.from(arrBuff);

  // generate unique name
  const time = Date.now();
  // const uuid = randomUUID().split("-")[0];P
  const uuid = genId();

  const bucket = "credpulse-reports-bucket";
  const key = `${file.name}-${time}-${uuid}`;
  const input_key = `input/${key}`;

  // save file to s3
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: input_key,
    Body: buffer,
  });

  try {
    const s3Response = await client.send(command);
    const status = s3Response.$metadata.httpStatusCode;
    console.log("S3 PutObjectCommand status code:", status);
    console.log("File saved in S3. Now calling api for report generation");
  } catch (e) {
    console.log("error saving to s3");
    console.log(e);

    return {
      ok: false,
      message: "Error uploading file. Please try again.",
    };
  }

  const data = new FormData();
  data.set("filename", key);
  const url = publicEnv.NEXT_PUBLIC_API_BASE_URL;
  const params = new URLSearchParams({ type: type, user_id: user_id });

  console.log(`url: ${url}/report?${params}`);
  const response = await fetch(`${url}/report?${params}`, {
    method: "POST",
    body: data,
    headers: {
      Authorization: token,
    },
  });

  const body = await response.json();
  return { ok: response.ok, message: body.message };
}

export async function delReport(token: string, filename: string, type: Model) {
  const data = new FormData();
  data.set("filename", filename);

  const url = publicEnv.NEXT_PUBLIC_API_BASE_URL;
  const params = new URLSearchParams({
    type: type,
  });

  const response = await fetch(`${url}/report?${params}`, {
    method: "delete",
    body: data,
    headers: {
      Authorization: token,
    },
  });

  const body = await response.json();
  return { ok: response.ok, message: body.message };
}
