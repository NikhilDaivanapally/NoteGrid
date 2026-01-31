"use client";

import React, { useEffect, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

type Props = {
  value: {
    createdFrom: string;
    createdTo: string;
  };
  onChange: (filters: { createdFrom: string; createdTo: string }) => void;
};

export function CreatedDateFilter({ value, onChange }: Props) {
  const { createdFrom, createdTo } = value;

  const [draftRange, setDraftRange] = React.useState<DateRange | undefined>();

  useEffect(() => {
    if (!createdFrom && !createdTo) {
      setDraftRange(undefined);
      return;
    }

    setDraftRange({
      from: createdFrom ? new Date(createdFrom) : undefined,
      to: createdTo ? new Date(createdTo) : undefined,
    });
  }, [createdFrom, createdTo]);

  const label = useMemo(() => {
    if (createdFrom && createdTo) {
      return `${format(new Date(createdFrom), "PPP")} - ${format(
        new Date(createdTo),
        "PPP"
      )}`;
    }
    if (createdFrom) {
      return `From ${format(new Date(createdFrom), "PPP")}`;
    }
    return "Date Range";
  }, [createdFrom, createdTo]);

  const handleApply = () => {
    onChange({
      createdFrom: draftRange?.from ? draftRange.from.toISOString() : "",
      createdTo: draftRange?.to ? draftRange.to.toISOString() : "",
    });
  };

  const handleClear = () => {
    setDraftRange(undefined);
    onChange({ createdFrom: "", createdTo: "" });
  };

  const isDirty =
    draftRange?.from?.toISOString() !== createdFrom ||
    draftRange?.to?.toISOString() !== createdTo;

  return (
    <div className="flex flex-col gap-2 text-sm">
      <span className="text-muted-foreground">Date Range</span>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start gap-2 min-w-60">
              <CalendarIcon className="h-4 w-4" />
              {label}
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-3" align="start">
            <Calendar
              mode="range"
              selected={draftRange}
              onSelect={setDraftRange}
              captionLayout="dropdown"
              numberOfMonths={2}
            />

            <div className="flex items-center justify-end gap-2 mt-3 border-t pt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDraftRange(undefined)}
              >
                Cancel
              </Button>

              <Button size="sm" onClick={handleApply} disabled={!isDirty}>
                Apply
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {(createdFrom || createdTo) && (
          <Button variant="ghost" size="icon" onClick={handleClear}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
