import React from "react";
import { Icons } from "../ui/icons";
import { cn } from "@/lib/utils";

export const UploadedFileItem = ({
  file,
  onDelete,
  className,
  disabled,
}: {
  file: File;
  onDelete: () => void;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative flex items-center gap-4 rounded border p-4 text-xs text-muted-foreground shadow ",
        className,
      )}
    >
      <Icons.trash
        onClick={onDelete}
        className={cn(
          "absolute bottom-1 right-1 h-5 w-5 cursor-pointer text-destructive",
          {
            "cursor-not-allowed": disabled,
          },
        )}
      />
      {getFileIcon(file)}

      <div className="flex flex-col">
        <div className="font-medium">{file?.name}</div>
        <div className="flex items-center gap-4 text-xs text-primary">
          <span>{`size: ${(file.size / (1024 * 1024)).toFixed(2)} MB`}</span>
        </div>
      </div>
    </div>
  );
};

export const getFileIcon = (file: File) => {
  switch (file?.type) {
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return <Icons.excelFile className="h-8 w-8" />;
    case "text/csv":
      return <Icons.csvFile className="h-8 w-8" />;

    default:
      return <Icons.file className="h-4 w-4" />;
  }
};

export default UploadedFileItem;
