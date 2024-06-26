import { ReactNode } from "react";
import { Accept } from "react-dropzone";

export interface FileDropRestOption {
  rejectedFiles: File[];
  isLimitCross?: boolean;

  limit?: number;
  maxSize?: string;
}
export interface FileUploadInterface {
  title?: string | React.ReactNode;
  disabled?: boolean;
  className?: string;
  maxFiles?: number;
  maxSize?: number;
  accept?: Accept;
  icon?: React.ReactNode;
  children?: ReactNode;
  is_multiple?: boolean;
  onDropFile: (
    acceptedFiles: File[],
    nextUploading?: () => void,
    option?: FileDropRestOption,
  ) => void;
  noDrag?: boolean;
  noClick?: boolean;
  autoFocus?: boolean;
  subTitle?: string | React.ReactNode;
}

export interface RenderTitleInterface {
  uploading?: boolean;
  title?: string | React.ReactNode;
  isDragActive?: boolean;
}
