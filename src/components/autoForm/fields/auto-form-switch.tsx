import { FormControl, FormItem } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

import { AutoFormInputComponentProps } from "../types";
import AutoFormLabel from "../common/auto-form-label";
import AutoFormTooltip from "../common/auto-form-tooltip";

export default function AutoFormSwitch({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  return (
    <div>
      <FormItem>
        <div className="flex items-center gap-3">
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              {...fieldProps}
            />
          </FormControl>
          <AutoFormLabel label={label} isRequired={isRequired} />
        </div>
      </FormItem>
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
    </div>
  );
}
