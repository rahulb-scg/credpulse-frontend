import { authOptions } from "@/constants/auth.option"
import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ScanCommand } from "@aws-sdk/client-dynamodb"
import { docClient } from "@/lib/dynamodb"

export async function POST(req: NextRequest) {
  console.log("[POST] /api/reports - Processing new report creation")
  const session = await getServerSession(authOptions)
  if (!session?.user_id) return NextResponse.json({ message: "Not logged in" }, { status: 403 })

  try {
    const formData = await req.formData()
    const config_file = formData.get("config_file") as File
    const data_file = formData.get("data_file") as File
    const report_name = formData.get("report_name") as string
    const description = formData.get("description") as string

    console.log(`[POST] /api/reports - Creating report: ${report_name}`)

    const client = await clientPromise
    const db = client.db("reports_db")

    const reportData = {
      report_name,
      description,
      config_file: {
        name: config_file.name,
        type: config_file.type,
        size: config_file.size
      },
      data_file: {
        name: data_file.name,
        type: data_file.type,
        size: data_file.size
      },
      created_at: new Date().toISOString(),
      user_id: session.user_id,
      status: "processing"
    }

    const result = await db.collection("reports").insertOne(reportData)
    console.log(`[POST] /api/reports - Successfully created report with ID: ${result.insertedId}`)

    return NextResponse.json(
      {
        _id: result.insertedId.toString()
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("[POST] /api/reports - Error creating report:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  console.log("[GET] /api/reports - Fetching reports list")
  const session = await getServerSession(authOptions)
  if (!session?.user_id) return NextResponse.json({ message: "Not logged in" }, { status: 403 })

  const params = {
    TableName: "Reports",
    FilterExpression: "user_id = :userId",
    ExpressionAttributeValues: {
      ":userId": { S: session?.user_id }
    }
  }

  const command = new ScanCommand(params)

  try {
    console.log("[GET] /api/reports - Executing DynamoDB scan")
    const data = await docClient.send(command)
    const items = data?.Items?.map((item) =>
      Object.fromEntries(
        Object.entries(item).map(([key, value]: any) => {
          if (["file"].includes(key)) {
            return [
              key,
              Object.fromEntries(
                Object.entries(value?.M).map(([key, value]: any) => [key, value.S || value.N || value.B])
              )
            ]
          }
          return [key, value.S || value.N || value.B]
        })
      )
    )
    console.log("[GET] /api/reports - Successfully fetched reports")
    return NextResponse.json(items, { status: 200 })
  } catch (error) {
    console.error("[GET] /api/reports - Error:", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
