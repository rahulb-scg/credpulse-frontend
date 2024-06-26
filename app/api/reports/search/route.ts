import { authOptions } from "@/constants/auth.option";
import { docClient } from "@/lib/dynamodb";
import { ArrayUtils } from "@/utils/array.utils";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session?.user_id)
    return NextResponse.json({ message: "Not logged in" }, { status: 403 });
  const filterData = await req.json();
  const date = {
    start_date: new Date(filterData?.date?.start_date).valueOf(),
    end_date: new Date(filterData?.date?.end_date).valueOf(),
  };

  const params = {
    TableName: "Reports",
    // FilterExpression:
    //   "#user_id = :userId AND #createdAt between :start_date and :end_date",
    FilterExpression: "user_id = :userId ",

    ExpressionAttributeValues: {
      ":userId": { S: session?.user_id },
      // start_date: { S: date?.start_date },
      // end_date: { S: date?.end_date },
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

    const getFilterItems = () => {
      const filterByDate = items?.filter((item) => {
        const createdAt = new Date(item?.created_at)?.valueOf();

        return createdAt >= date?.start_date && createdAt <= date?.end_date;
      });
      if (filterData?.status)
        return filterByDate?.filter((item) => {
          if (filterData?.status === "approved") return !!item?.processed_at;
          if (filterData?.status === "rejected") return !!item?.rejected_at;
          if (filterData?.status === "processing")
            return !item?.processed_at && !item?.rejected_at;
          return false;
        });
      return filterByDate;
    };
    const filterItems = getFilterItems();
    const sortedItems = ArrayUtils.sortByKey({
      array: filterItems,
      key: "created_at",
      order: "desc",
      type: "date",
    });
    return NextResponse.json(sortedItems, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
