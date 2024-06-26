import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/constants/auth.option";
import { publicEnv } from "@/env/client";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const token = session?.access_token;

  if (!token) return NextResponse.json("Invalid token", { status: 400 });

  const data = await request.formData();

  const formdata = new FormData();
  data.forEach((value, key) => {
    formdata.set(key, value);
  });

  const type = request.nextUrl.searchParams.get("type");
  if (!type)
    return NextResponse.json("'type' missing form url params", {
      status: 400,
    });

  // check option values
  let endPoint:
    | "on-demand"
    | "basic-info-setup"
    | "input-source-setup"
    | undefined;

  switch (type) {
    case "on-demand":
      endPoint = "on-demand";
      break;
    case "basic":
      endPoint = "basic-info-setup";
      break;
    case "sources":
      endPoint = "input-source-setup";
      break;
  }
  if (!endPoint)
    return NextResponse.json("Invalid url param 'type'", { status: 401 });

  const uploadURL = `${publicEnv.NEXT_PUBLIC_API_BASE_URL}/${endPoint}`;

  const response = await fetch(uploadURL, {
    method: "post",
    headers: {
      Authorization: `${token}`,
    },
    body: formdata,
  });
  const body = await response.json();

  if (response.ok)
    return NextResponse.json("File upload successful", { status: 200 });

  return NextResponse.json(body.message, { status: response.status });
}
