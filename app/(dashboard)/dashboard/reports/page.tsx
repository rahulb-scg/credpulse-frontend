"use client"
import GenericDataListing from "@/components/GenericDataListing/genericDataListing"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Plus, RotateCw } from "lucide-react"
import Link from "next/link"
import { reportColumns } from "./columns"
import { useRouter } from "next/navigation"
import { useState } from "react"

const NewReport = ({ className }: { className?: string }) => {
  return (
    <Link href={"/dashboard/reports/c"} className={cn(buttonVariants({ variant: "outline", className, size: "sm" }))}>
      <Plus className="mr-2 h-4 w-4" /> Add New
    </Link>
  )
}

const ReportsPage = () => {
  const router = useRouter()
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = async () => {
    try {
      // Invalidate the current cache by triggering a new API call
      await fetch("/api/listreports", {
        method: "GET",
        cache: "no-store" // Ensures we don't use cached data
      })

      // Update the key to force a re-render of GenericDataListing
      setRefreshKey((prev) => prev + 1)

      // Also refresh the router to ensure any route-based caching is cleared
      router.refresh()
    } catch (error) {
      console.error("Error refreshing reports:", error)
    }
  }

  return (
    <GenericDataListing
      key={refreshKey}
      title="Reports"
      description="Job Run Status Report"
      breadCrumbs={[{ title: "Reports", link: "/dashboard/reports" }]}
      rightComponent={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RotateCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <NewReport />
        </div>
      }
      table={{
        columns: reportColumns,
        searchKey: "report_name",
        noDataFound: {
          title: "No Reports found !!",
          description: "Please create a new report.",
          customAction: <NewReport className="mt-4" />
        },
        endPoint: "listreports",
        onClickRow: (data) => {
          router.push(`/dashboard/reports/d/${data._id}`)
        },
        filters: [
          {
            key: "status",
            type: "select",
            options: [
              {
                label: "Completed",
                value: "Success"
              },
              {
                label: "Failed",
                value: "failed"
              },
              {
                label: "Processing",
                value: "processing"
              }
            ],
            placeholder: "Select Status"
          },
          {
            key: "type",
            type: "select",
            options: [
              {
                label: "TMM1",
                value: "TMM1"
              }
            ],
            placeholder: "Select Model Type"
          }
        ]
      }}
    />
  )
}

export default ReportsPage
