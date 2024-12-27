"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { CustomTooltip } from "@/components/ui/tooltip"
import { DictionaryType } from "@/types/common.type"
import Link from "next/link"

const CellAction = ({ data }: { data: DictionaryType }) => {
  return (
    <div className="flex items-center gap-2">
      <CustomTooltip message="Go to Detail">
        <Link
          className={buttonVariants({
            variant: "outline",
            size: "sm"
          })}
          href={`/dashboard/reports/d/${data?._id}`}
        >
          <Icons.pill className="h-4 w-4" />
        </Link>
      </CustomTooltip>
      {data.status === "completed" && (
        <CustomTooltip asChild={false} message="Download">
          <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 cursor-pointer">
            <div className="flex items-center justify-center gap-1">
              <Icons.arrowDropdown className="h-4 w-4 text-blue-500" />
            </div>
          </div>
        </CustomTooltip>
      )}
    </div>
  )
}

export default CellAction
