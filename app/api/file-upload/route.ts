import { client, S3bucket } from "@/lib/aws"
import { genId } from "@/lib/utils"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  console.log("[POST] /api/file-upload - Processing file upload request")
  const data = await req.formData()
  const file = data.getAll("files")[0] as File

  const arrBuff = await file.arrayBuffer()
  const buffer = Buffer.from(arrBuff)

  // generate unique name
  const time = Date.now()
  const uuid = genId()
  const key = `${time}-${uuid}-${file.name}`
  const input_key = `input/${key}`

  console.log(`[POST] /api/file-upload - Uploading file: ${file.name} to S3`)

  // save file to s3
  const command = new PutObjectCommand({
    Bucket: S3bucket,
    Key: input_key,
    Body: buffer
  })

  try {
    const s3Response = await client.send(command)
    console.log(`[POST] /api/file-upload - Successfully uploaded file to S3: ${input_key}`)

    return NextResponse.json({
      files: [
        {
          name: file?.name,
          size: file?.size,
          type: file?.type,
          url: `https://${S3bucket}.s3.amazonaws.com/${input_key}`
        }
      ],
      status: 200
    })
  } catch (error) {
    console.error("[POST] /api/file-upload - Error uploading file:", error)
    return NextResponse.json(
      {
        message: "Failed to upload file"
      },
      { status: 400 }
    )
  }
}
