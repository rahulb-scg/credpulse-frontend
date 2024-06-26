import { publicEnv } from "@/env/client";
import { S3Client } from "@aws-sdk/client-s3";

const region = "us-east-1";
export const S3bucket = "credpulse-reports-bucket";
const client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: publicEnv.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: publicEnv.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

export { region, client };
