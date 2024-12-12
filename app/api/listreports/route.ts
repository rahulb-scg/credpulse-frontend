import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("page_size") || "10";
    const status = searchParams.get("status");

    // Construct Flask API URL with query parameters
    const queryParams = new URLSearchParams({
      page,
      page_size: pageSize,
      ...(status && { status })
    });

    const response = await fetch(
      `http://localhost:5000/listreports?${queryParams}`,
      {
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch reports from Flask server");
    }

    const data = await response.json();

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
} 