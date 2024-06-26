import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { AutoFormInputComponentProps } from "../types";
import AutoFormLabel from "../common/auto-form-label";
import AutoFormTooltip from "../common/auto-form-tooltip";
import SingleFileUploader from "@/components/fileUploader/single-file-uploader";
export default function AutoFormFile({
  label,
  isRequired,
  fieldConfigItem,
  fieldProps,
  field,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;
  const handleFileChange = (file?: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        field.onChange(file);
      };
      reader.readAsDataURL(file);
    } else field.onChange(file);
  };

  return (
    <FormItem>
      {showLabel && <AutoFormLabel label={label} isRequired={isRequired} />}

      <FormControl>
        <SingleFileUploader {...fieldProps} onChange={handleFileChange} />
      </FormControl>

      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}
