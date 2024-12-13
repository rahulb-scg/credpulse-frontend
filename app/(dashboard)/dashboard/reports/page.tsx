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
  const [key, setKey] = useState(0)

  const handleRefresh = () => {
    setKey((prev) => prev + 1)
    router.refresh()
  }

  return (
    <GenericDataListing
      key={key}
      title="Reports"
      description="Job Run Status Report"
      breadCrumbs={[{ title: "Reports", link: "/dashboard/reports" }]}
      rightComponent={
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
          >
            <RotateCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <NewReport />
        </div>
      }
      table={{
        columns: reportColumns,
        searchKey: "title",
        noDataFound: {
          title: "No Reports found !!",
          description: "Please create a new report.",
          customAction: <NewReport className="mt-4" />
        },
        endPoint: "listreports",
        onClickRow: (data) => {
          router.push(`/dashboard/reports/d/${data.id}`)
        },
        filters: [
          {
            key: "status",
            type: "select",
            options: [
              {
                label: "Approved",
                value: "approved"
              },
              {
                label: "Rejected",
                value: "rejected"
              },
              {
                label: "Processing",
                value: "processing"
              }
            ],
            placeholder: "Select Status"
          },
          {
            key: "model",
            type: "select",
            options: [
              {
                label: "Univariate Analysis",
                value: "univariates"
              },
              {
                label: "TMAS",
                value: "tmas"
              }
            ],
            placeholder: "Select Model"
          }
        ]
      }}
    />
  )
}

export default ReportsPage
