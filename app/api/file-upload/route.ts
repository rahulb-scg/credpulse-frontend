import { client, S3bucket } from "@/lib/aws";
import { genId } from "@/lib/utils";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.formData();
  const file = data.getAll("files")[0] as File;

  const arrBuff = await file.arrayBuffer();
  const buffer = Buffer.from(arrBuff);

  // generate unique name
  const time = Date.now();
  // const uuid = randomUUID().split("-")[0];
  const uuid = genId();

  const key = `${time}-${uuid}-${file.name}`;
  const input_key = `input/${key}`;

  // save file to s3
  const command = new PutObjectCommand({
    Bucket: S3bucket,
    Key: input_key,
    Body: buffer,
  });
  // https://csv-visualizer.s3.amazonaws.com/b.csv
  try {
    const s3Response = await client.send(command);

    return NextResponse.json({
      files: [
        {
          name: file?.name,
          size: file?.size,
          type: file?.type,
          url: `https://${S3bucket}.s3.amazonaws.com/${input_key}`,
        },
      ],
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "something went wrong",
      },
      { status: 400 },
    );
  }
};
