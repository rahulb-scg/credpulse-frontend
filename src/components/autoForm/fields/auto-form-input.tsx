import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { AutoFormInputComponentProps } from "../types";
import AutoFormLabel from "../common/auto-form-label";
import AutoFormTooltip from "../common/auto-form-tooltip";
import { PasswordInput } from "@/components/ui/password-input";

export default function AutoFormInput({
  label,
  isRequired,
  fieldConfigItem,
  fieldProps,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
  const showLabel = _showLabel === undefined ? true : _showLabel;
  const type = fieldProps.type || "text";

  return (
    <div className="flex flex-row  items-center space-x-2">
      <FormItem className="flex w-full flex-col justify-start">
        {showLabel && <AutoFormLabel label={label} isRequired={isRequired} />}
        <FormControl>
          <>
            {" "}
            {type === "password" && (
              <PasswordInput
                {...fieldPropsWithoutShowLabel}
                placeholder={fieldProps?.placeholder ?? `Enter ${label ?? ""}`}
              />
            )}
            {type !== "password" && (
              <Input
                type={type}
                {...fieldPropsWithoutShowLabel}
                placeholder={fieldProps?.placeholder ?? `Enter ${label ?? ""}`}
              />
            )}
          </>
        </FormControl>
        <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
        <FormMessage />
      </FormItem>
    </div>
  );
}
