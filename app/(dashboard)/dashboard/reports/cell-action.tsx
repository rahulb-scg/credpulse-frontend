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
          <Button size={"sm"} variant={"outline"} className="w-full">
            <div className="flex items-center justify-center gap-1">
              <Icons.arrowDropdown className="h-4 w-4 text-blue-500" />
            </div>
          </Button>
        </CustomTooltip>
      )}
    </div>
  )
}

export default CellAction
