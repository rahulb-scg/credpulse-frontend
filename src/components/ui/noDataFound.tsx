import { ReactNode } from "react";
import { Button } from "./button";
import { Icons, IconTypes } from "./icons";
import { cn } from "@/lib/utils";

export interface NoDataFoundProps {
  icon?: IconTypes;
  action?: {
    label: string;
    onClick: () => void;
  };
  customAction?: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

const NoDataFound = ({
  icon = "rabbit",
  title,
  description,
  action,
  customAction,
  className,
}: NoDataFoundProps) => {
  const Icon = Icons[icon];
  return (
    <div className={cn("grid items-center justify-center", className)}>
      <Icon className=" h-44 w-44 text-muted-foreground" />
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-lg font-bold">{title ?? "No Data Found"}</h1>
        <p className="text-sm text-muted-foreground">
          {description ?? "There is no data found"}
        </p>
      </div>
      {!!action?.label && (
        <Button onClick={action?.onClick}>{action?.label}</Button>
      )}
      {customAction}
    </div>
  );
};

export default NoDataFound;
