import React, { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ChartContainerProps {
  title: string
  children: ReactNode
  selector?: ReactNode
  className?: string
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  children,
  selector,
  className
}) => {
  return (
    <div className={cn("bg-muted/30 p-4 rounded-lg", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {selector && <div>{selector}</div>}
      </div>
      <div className="w-full h-[400px]">
        {children}
      </div>
    </div>
  )
}

export default ChartContainer 