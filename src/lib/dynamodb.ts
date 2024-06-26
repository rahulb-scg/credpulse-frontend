import { publicEnv } from "@/env/client";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { region } from "./aws";

const dbClient = new DynamoDBClient({
  region: region,
  credentials: {
    accessKeyId: publicEnv.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: publicEnv.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

export const docClient = DynamoDBDocumentClient.from(dbClient);
