import { DatePicker } from "@/components/ui/date-picker";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";

import { AutoFormInputComponentProps } from "../types";
import AutoFormLabel from "../common/auto-form-label";
import AutoFormTooltip from "../common/auto-form-tooltip";

export default function AutoFormDate({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  return (
    <FormItem>
      <AutoFormLabel label={label} isRequired={isRequired} />
      <FormControl>
        <DatePicker
          date={field.value}
          setDate={field.onChange}
          {...fieldProps}
        />
      </FormControl>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />

      <FormMessage />
    </FormItem>
  );
}
