import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
  const reportId = params?.id;

  try {
    const response = await fetch(
      `http://localhost:5000/viewreport/${reportId}`,
      {
        next: { revalidate: 60 }, // Cache for 60 seconds
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch report");
    }

    const data = await response.json();

    // Return response with cache headers
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    console.error("Error fetching report:", error);
    return NextResponse.json(
      { message: "Failed to fetch report" },
      { status: 500 },
    );
  }
};

export const DELETE = async (req: NextRequest, { params }: any) => {
  const reportId = params?.id;

  try {
    const response = await fetch(
      `http://localhost:5000/deletereport/${reportId}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { message: "Report not found" },
          { status: 404 },
        );
      }
      throw new Error("Failed to delete report from Flask backend");
    }

    return NextResponse.json({ message: "Successfully deleted" });
  } catch (error) {
    console.error("Error deleting report:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
