import { useUncontrolled } from "@/hooks/core/use-uncontrolled.hook"
import { SelectInputProps, SelectValueType } from "@/types/select-input.type"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useMemo } from "react"
import { Icons } from "../ui/icons"

const SelectInput = ({
  value: valueProps,
  defaultValue,
  onChange,
  options,
  className,
  placeholder
}: SelectInputProps<SelectValueType>) => {
  const [value, onValueChange] = useUncontrolled({
    value: valueProps,
    defaultValue,
    onChange
  })
  const displayValue = useMemo(() => {
    return options.find((option) => option?.value === value)?.label
  }, [options, value])
  const displayPlaceholder = (
    <span className="text-sm font-medium text-muted-foreground">{placeholder ?? "Select Options"}</span>
  )

  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue as string} value={value as string}>
      <SelectTrigger className={className}>
        {displayValue ? <SelectValue>{displayValue}</SelectValue> : displayPlaceholder}
        {/* {displayValue && (
          <Icons.x
            onClick={(e) => {
              console.log("cross");
              e.stopPropagation();
            }}
            className="z-[9999] ml-auto h-4 w-4 text-destructive opacity-80 hover:opacity-100"
          />
        )} */}
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem value={option?.value as string} key={option?.value}>
            {option?.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectInput
