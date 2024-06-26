import React, { useState } from "react";
import { FileUploader } from "./file-uploader";
import { FileUploadInterface } from "./file-uploader.types";
import { Icons } from "../ui/icons";
import UploadedFileItem from "./uploaded-file-item";
import { cn } from "@/lib/utils";

interface SingleFileUploader
  extends Omit<FileUploadInterface, "is_multiple" | "onDropFile"> {
  value?: File;
  onChange: (file?: File) => void;
  disabled?: boolean;
}

const SingleFileUploader = ({
  onChange,
  disabled,
  ...rest
}: SingleFileUploader) => {
  const [file, setFile] = useState<File | null>();
  if (file)
    return (
      <UploadedFileItem
        file={file}
        onDelete={() => {
          if (disabled) return;
          onChange();
          setFile(null);
        }}
        className={cn({
          "cursor-not-allowed opacity-50": disabled,
        })}
        disabled={disabled}
      />
    );
  return (
    <FileUploader
      onDropFile={(files) => {
        onChange(files[0]);
        setFile(files[0]);
      }}
      {...rest}
    />
  );
};

export default SingleFileUploader;
