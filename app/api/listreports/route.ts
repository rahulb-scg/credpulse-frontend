import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const response = await fetch(`http://localhost:5000/listreports`, {
      next: { revalidate: 60 } // Cache for 60 seconds
    })

    if (!response.ok) {
      throw new Error("Failed to fetch reports from Flask server")
    }

    const data = await response.json()

    if (data.status !== "success") {
      throw new Error(data.message || "Failed to fetch reports")
    }

    // Map the reports to ensure all required fields are present
    const mappedReports = data.data.reports.map((report: any) => ({
      _id: report._id,
      report_name: report.report_name || "Untitled Report",
      type: report.type || "N/A",
      created_at: report.created_at,
      status: report.status || "processing",
      description: report.description || ""
    }))

    // Return the mapped data in the format expected by the frontend
    return NextResponse.json({
      reports: mappedReports,
      pagination: {
        total: data.data.pagination.total_reports,
        totalPages: data.data.pagination.total_pages,
        page: data.data.pagination.current_page,
        pageSize: data.data.pagination.page_size,
        hasNext: data.data.pagination.has_next,
        hasPrev: data.data.pagination.has_prev
      }
    })
  } catch (error) {
    console.error("Error fetching reports:", error)
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Internal Server Error"
      },
      { status: 500 }
    )
  }
}
