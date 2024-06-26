import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem } from "@/components/ui/form";
import AutoFormTooltip from "../common/auto-form-tooltip";
import { AutoFormInputComponentProps } from "../types";
import AutoFormLabel from "../common/auto-form-label";

export default function AutoFormCheckbox({
  label,
  isRequired,
  field,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  return (
    <div>
      <FormItem>
        <div className="mb-3 flex items-center gap-3">
          <FormControl>
            <Checkbox
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
