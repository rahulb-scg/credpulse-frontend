import { authOptions } from "@/constants/auth.option";
import { docClient } from "@/lib/dynamodb";
import { CommonUtils } from "@/utils/common.utils";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session?.user_id)
    return NextResponse.json({ message: "Not logged in" }, { status: 403 });

  const data = await req.json();
  const currentDate = new Date();
  const identifier = new Date().valueOf();
  const reportData = {
    id: `${identifier}${CommonUtils.generateToken()}`,
    file: data.file,
    columns: data?.columns,
    type: data?.type,
    rejected_at: "",
    created_at: new Date().toISOString(),
    user_id: session?.user_id,
    processed_url: "",
    date: {
      start_date: "2020-12-31",
      end_date: "2023-12-31",
    },
  };
  const command = new PutCommand({
    TableName: "Reports",
    Item: reportData,
  });
  try {
    await docClient.send(command);
    return NextResponse.json(reportData, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 400 },
    );
  }
};

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session?.user_id)
    return NextResponse.json({ message: "Not logged in" }, { status: 403 });

  const params = {
    TableName: "Reports",
    FilterExpression: "user_id = :userId",
    ExpressionAttributeValues: {
      ":userId": { S: session?.user_id },
    },

    // KeyConditionExpression: "user_id = :user_id",
    // ExpressionAttributeValues: {
    //   ":user_id": session.user_id, // Assuming user_id is a string attribute
    // },
  };

  // Execute the query operation
  const command = new ScanCommand(params);

  try {
    const data = await docClient.send(command);
    const items = data?.Items?.map((item) =>
      Object.fromEntries(
        Object.entries(item).map(([key, value]: any) => {
          if (["file"].includes(key)) {
            return [
              key,
              Object.fromEntries(
                Object.entries(value?.M).map(([key, value]: any) => [
                  key,
                  value.S || value.N || value.B,
                ]),
              ),
            ];
          }
          return [key, value.S || value.N || value.B];
        }),
      ),
    );
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
