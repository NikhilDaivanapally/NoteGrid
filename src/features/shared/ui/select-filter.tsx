"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectOption<T extends string> = {
  label: string;
  value: T;
};

type SelectFilterProps<T extends string> = {
  label?: string;
  value: T;
  options: SelectOption<T>[];
  placeholder?: string;
  onChange: (value: T) => void;
  triggerClassName?: string;
};

export function SelectFilter<T extends string>({
  label = "Sort",
  value,
  options,
  placeholder = "Select",
  onChange,
  triggerClassName = "w-34",
}: SelectFilterProps<T>) {
  console.log(options);
  return (
    <div className="flex flex-col items-start gap-2 text-sm">
      <span className="text-muted-foreground">{label}</span>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
