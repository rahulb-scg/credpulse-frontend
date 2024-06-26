import AutoFormCheckbox from "./fields/auto-form-checkbox";
import AutoFormDate from "./fields/auto-form-date-picker";
import AutoFormEnum from "./fields/auto-form-enum";
import AutoFormFile from "./fields/auto-form-file";
import AutoFormInput from "./fields/auto-form-input";
import AutoFormNumber from "./fields/auto-form-number";
import AutoFormRadioGroup from "./fields/auto-form-radio-group";
import AutoFormSelect from "./fields/auto-form-select";
import AutoFormSwitch from "./fields/auto-form-switch";
import AutoFormTextarea from "./fields/auto-form-textarea";

export const INPUT_COMPONENTS = {
  checkbox: AutoFormCheckbox,
  date: AutoFormDate,
  select: AutoFormEnum,
  radio: AutoFormRadioGroup,
  switch: AutoFormSwitch,
  textarea: AutoFormTextarea,
  number: AutoFormNumber,
  file: AutoFormFile,
  fallback: AutoFormInput,
  select_input: AutoFormSelect,
};

/**
 * Define handlers for specific Zod types.
 * You can expand this object to support more types.
 */
export const DEFAULT_ZOD_HANDLERS: {
  [key: string]: keyof typeof INPUT_COMPONENTS;
} = {
  ZodBoolean: "checkbox",
  ZodDate: "date",
  ZodEnum: "select",
  ZodNativeEnum: "select",
  ZodNumber: "number",
};
