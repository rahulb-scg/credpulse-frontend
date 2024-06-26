"use client";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { Dispatch, SetStateAction, useRef } from "react";
import { Button } from "./ui/button";
import InputField from "./InputField";

type fileProps = {
  file?: File;
  accept?: string;
  placeholder?: string;
  setFile: Dispatch<SetStateAction<File | undefined>>;
};

export default function FileInput({
  file,
  accept,
  setFile,
  placeholder,
}: fileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-row items-center">
      <input
        type="file"
        accept={accept}
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          e.preventDefault();
          if (setFile && e.target.files) setFile(e.target.files[0]);
        }}
      />
      <InputField
        readOnly
        type="text"
        value={file ? file.name : ""}
        placeholder={placeholder ?? ""}
      />
      {file && (
        <XMarkIcon
          className="h-8 w-8 cursor-pointer"
          onClick={() => setFile(undefined)}
        />
      )}
      <Button
        onClick={() => {
          if (fileInputRef?.current?.value) fileInputRef.current.value = "";
          setFile(undefined);
          fileInputRef?.current?.click();
        }}
        className="w-24 border-2 border-primary text-primary"
      >
        Browse
      </Button>
    </div>
  );
}
