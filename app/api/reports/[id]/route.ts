import { docClient } from "@/lib/dynamodb";
import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
  const reportId = params?.id;
  const command = new GetCommand({
    TableName: "Reports",
    Key: {
      id: reportId,
    },
  });
  const processedCommand = new GetCommand({
    TableName: "ProcessedReports",
    Key: {
      id: reportId,
    },
  });
  try {
    const response = await docClient.send(command);
    const report = response?.Item;
    const processedResponse = await docClient.send(processedCommand);
    const processedReport = processedResponse?.Item;
    return NextResponse.json({
      report,
      processedReport,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 400 },
    );
  }
};

export const DELETE = async (req: NextRequest, { params }: any) => {
  const reportId = params?.id;

  try {
    const command = new DeleteItemCommand({
      TableName: "Reports",
      Key: {
        id: { S: reportId },
      },
    });
    await docClient.send(command);

    return NextResponse.json({ message: "Successfully delete " });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 400 },
    );
  }
};
