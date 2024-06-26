/**
 * @author Sirjan Tamang
 */

"use client";

import { ReactNode, useCallback, useState } from "react";
import {
  DropzoneInputProps,
  DropzoneRootProps,
  useDropzone,
} from "react-dropzone";
import { cn } from "../../lib/utils";
import { Icons } from "../ui/icons";
import {
  FileUploadInterface,
  RenderTitleInterface,
} from "./file-uploader.types";

/**
 * FileUpload component for uploading files.
 * @param {Object} props - The component props.
 * @param {string} [props.title='Upload Files'] - The title of the file upload component for default case.
 * @param {string} [props.className] - Additional CSS class names.
 * @param {number} [props.maxFiles=5] - The maximum number of files allowed to be uploaded.
 * @param {number} [props.maxSize] - The maximum size of each file in bytes.
 * @param {Object} [props.accept] - The accepted file types with corresponding extensions.
 * @param {ReactNode} [props.children] - The content to render inside the file upload component.
 * @param {boolean} [props.is_multiple] - Whether multiple files can be uploaded at once.
 * @param {boolean} [props.disabled=false] - Whether the file upload is disabled.
 * @param {Function} props.onDropFile - The function to handle the dropped files.
 * @param {ReactNode} [props.icon] - The custom icon to render in the file upload component.
 * @param {boolean} [props.autoFocus] - Whether the file upload component should be auto-focused.
 * @param {boolean} [props.noDrag] - Whether the file upload component should disable drag and drop functionality.
 * @returns {ReactNode} The rendered FileUpload component.
 */
export const FileUploader = ({
  title = "Upload Files",
  className,
  maxFiles = 5,
  maxSize,
  subTitle,
  accept = {
    "image/jpeg": [],
    "image/png": [],
    "application/pdf": [],
  },
  children,
  is_multiple,
  disabled = false,
  onDropFile,
  icon,
  autoFocus,
  noDrag,

  ...rest
}: FileUploadInterface) => {
  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

  const [uploading, setUploading] = useState(false);

  const nextUploading = useCallback(() => setUploading(false), []);

  const onDrop = async (acceptedFiles: any[], fileRejections: any[]) => {
    // setUploading(true);

    let isLimitCross: boolean = false;
    const rejectedFiles: any = [];
    if (fileRejections.length > 0) {
      if (maxFiles && fileRejections.length > maxFiles) {
        isLimitCross = true;
      }

      fileRejections.forEach((rejected) => {
        if (rejected?.file && rejected.file?.size > (maxSize || MAX_SIZE)) {
          rejectedFiles.push(rejected);
        }
      });
    }
    onDropFile(acceptedFiles, nextUploading, {
      rejectedFiles,
      isLimitCross,
      limit: maxFiles,
      maxSize: `${(maxSize || MAX_SIZE) / (1024 * 1024)} MB`,
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: is_multiple,
    accept,
    maxFiles,
    // maxSize: maxSize || MAX_SIZE,
    disabled: disabled || uploading,
    onDrop,
    autoFocus,
    noDrag,
    ...rest,
  });

  return (
    <div className={cn("col-flex gap-2", className)}>
      {children ? (
        <div
          className={`
               `}
          {...getRootProps()}
        >
          {children}
          <input {...getInputProps()} />
        </div>
      ) : (
        <DefaultFileUpload
          {...{
            getRootProps,
            getInputProps,
            isDragActive,
            uploading,
            icon,
            title,
            subTitle,
          }}
        />
      )}
    </div>
  );
};

const DefaultFileUpload = ({
  getRootProps,
  getInputProps,
  isDragActive,
  uploading,
  icon,
  title,
  subTitle,
}: {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  isDragActive: boolean;
  uploading: boolean;
  icon: ReactNode;
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "border-color-100 flex flex-col items-center justify-center  gap-2  rounded  border border-dashed p-4  px-4  py-3 text-sm text-muted-foreground",
        {
          " hover:text-base-primary cursor-pointer bg-muted transition-colors hover:border-primary":
            !uploading,
          " cursor-none bg-muted": uploading,
        },
      )}
      {...getRootProps()}
    >
      {/* <RenderIcon {...{ uploading, icon }} />
      <UploadingImage {...{ uploading }} /> */}
      <input {...getInputProps()} />
      <Icons.cloudUpload className="h-8 w-8" />

      <RenderTitle {...{ uploading, title, isDragActive }} />
      <div className="text-xs font-medium">
        {subTitle ?? (
          <>
            {" "}
            Supported Files: <span className="">JPG, PNG, PDF</span>
          </>
        )}
      </div>
    </div>
  );
};

const RenderIcon = ({
  uploading,
  icon,
}: {
  uploading?: boolean;
  icon?: ReactNode;
}) => {
  if (uploading) return <></>;
  if (icon) return <>{icon}</>;
  return <Icons.cloudUpload className="text-2xl" />;
};

const UploadingImage = ({ uploading }: { uploading?: boolean }) => {
  return uploading ? (
    <div className="col-flex items-center gap-2">
      {/* <span className="text-primary">
                <Loading appearance="neutral" size="sm" />
            </span> */}
      <span className="text-base-secondary">Uploading...</span>
    </div>
  ) : (
    <></>
  );
};

const RenderTitle = ({
  uploading,
  title,
  isDragActive,
}: RenderTitleInterface) => {
  if (uploading) return <></>;
  // if (!isDragActive) return <>{title || null}</>;
  return (
    <div className="text-disabled-100  font-bold  ">
      Drag & drop files or Browse{" "}
    </div>
  );
};
