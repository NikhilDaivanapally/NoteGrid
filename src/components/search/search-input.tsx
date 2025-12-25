"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type SearchInputProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  delay?: number;
};

export function SearchInput({
  value = "",
  onChange,
  placeholder = "Search notes...",
  delay = 300,
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value);

  // Sync external value changes (e.g., reset/clear from parent)
  useEffect(() => {
    if (inputValue !== value) {
      setInputValue(value);
    }
  }, [value]);

  // Debounce: call onChange only when needed, skip unnecessary calls (including initial mount)
  useEffect(() => {
    const timer = setTimeout(() => {
      // value here is captured at the time this effect ran
      // If inputValue matches the captured prop value, no change has occurred → skip
      if (inputValue !== value) {
        onChange(inputValue);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [inputValue, delay, onChange]);

  return (
    <div className="relative w-full lg:max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground focus-visible:border-none focus-visible:ring-0" />

      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-9"
      />

      {inputValue && (
        <Button
          type="button"
          size={"icon"}
          onClick={() => {
            setInputValue("");
          }}
          className="absolute right-3 bg-transparent hover:bg-transparent w-fit h-fit  rounded-full top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
