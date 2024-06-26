import { DictionaryType } from "./common.type";

export type SelectValueType = string | number;

export interface SelectInputOptions {
  label: SelectValueType;
  value: SelectValueType;
  data?: DictionaryType;
}

export interface SelectInputProps<TValue> {
  value?: TValue;
  defaultValue?: TValue;
  options: SelectInputOptions[];
  onChange?: (value: TValue) => void;
  placeholder?: string;
  className?: string;
}
