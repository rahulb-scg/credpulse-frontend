import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { AutoFormInputComponentProps } from "../types";
import AutoFormLabel from "../common/auto-form-label";
import AutoFormTooltip from "../common/auto-form-tooltip";

export default function AutoFormTextarea({
  label,
  isRequired,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;
  return (
    <FormItem>
      {showLabel && <AutoFormLabel label={label} isRequired={isRequired} />}
      <FormControl>
        <Textarea {...fieldPropsWithoutShowLabel} />
      </FormControl>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}
