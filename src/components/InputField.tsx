import { ChangeEvent, ReactElement, ReactNode } from "react";

type InputProps = {
  type: string;
  readOnly?: boolean;
  className?: string;
  placeholder?: string;
  value: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export default function InputField({
  type,
  value,
  onChange,
  readOnly,
  className,
  placeholder,
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      className={
        className +
        " rounded-md border p-2 focus:outline-none" +
        (!readOnly ? " hover:border-blue-300 focus:border-blue-500" : "")
      }
      onChange={onChange}
      readOnly={readOnly ?? false}
    />
  );
}
