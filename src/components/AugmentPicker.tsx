"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { augmentLabels } from "@/typings/types";

interface AugmentPickerProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function AugmentPicker({ value, onValueChange }: AugmentPickerProps) {
  const [open, setOpen] = useState(false);
  const entries = Object.entries(augmentLabels);
  const sortedEntries = [
    ["255", "None"],
    ...entries.filter(([key]) => key !== "255"),
  ];

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value !== "255"
            ? augmentLabels[parseInt(value)] ?? "Unknown"
            : "None"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 overflow-auto" align="start">
        <Command>
          <CommandInput placeholder="Search augment..." className="h-9" />
          <CommandList>
            <CommandEmpty>No augment found.</CommandEmpty>
            <CommandGroup>
              {sortedEntries.map(([key, label]) => (
                <CommandItem
                  key={key}
                  value={`${key} ${label.toLowerCase()}`}
                  onSelect={() => {
                    onValueChange(key);
                    setOpen(false);
                  }}
                >
                  {label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === key ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
