import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params
  const reportId = params.id
  console.log(`[GET] /api/reports/${reportId} - Fetching report`)

  try {
    const response = await fetch(`http://localhost:5000/viewreport/${reportId}`, {
      next: { revalidate: 60 } // Cache for 60 seconds
    })

    if (!response.ok) {
      console.error(`[GET] /api/reports/${reportId} - Failed to fetch report`)
      throw new Error("Failed to fetch report")
    }

    const data = await response.json()
    console.log(`[GET] /api/reports/${reportId} - Successfully fetched report`)

    // Return response with cache headers
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30"
      }
    })
  } catch (error) {
    console.error(`[GET] /api/reports/${reportId} - Error:`, error)
    return NextResponse.json({ message: "Failed to fetch report" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params
  const reportId = params.id
  console.log(`[DELETE] /api/reports/${reportId} - Deleting report`)

  try {
    const response = await fetch(`http://localhost:5000/deletereport/${reportId}`, {
      method: "DELETE"
    })

    if (!response.ok) {
      if (response.status === 404) {
        console.log(`[DELETE] /api/reports/${reportId} - Report not found`)
        return NextResponse.json({ message: "Report not found" }, { status: 404 })
      }
      console.error(`[DELETE] /api/reports/${reportId} - Failed to delete report`)
      throw new Error("Failed to delete report from Flask backend")
    }

    console.log(`[DELETE] /api/reports/${reportId} - Successfully deleted report`)
    return NextResponse.json({ message: "Successfully deleted" })
  } catch (error) {
    console.error(`[DELETE] /api/reports/${reportId} - Error:`, error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
