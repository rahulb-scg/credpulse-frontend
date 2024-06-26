import { Dispatch, SetStateAction } from "react";

type DropdownProps = {
  name: string;
  selected: string;
  options: string[];
  className?: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

export default function Dropdown({
  name,
  options,
  selected,
  className,
  setSelected,
}: DropdownProps) {
  return (
    <select
      name={name}
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      className={
        className +
        " h-12 w-full rounded-lg border border-blue-400 focus:outline-none"
      }
    >
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
}
