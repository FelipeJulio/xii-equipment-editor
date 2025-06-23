"use client";

import * as React from "react";
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
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { augmentLabels } from "@/typings/types";

interface AugmentFilterProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function AugmentFilter({ value, onValueChange }: AugmentFilterProps) {
  const [open, setOpen] = useState(false);

  const entries = Object.entries(augmentLabels);
  const sortedEntries = [
    ["255", "None"],
    ...entries.filter(([key]) => key !== "255"),
  ];

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">Augment</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-auto justify-between"
          >
            {value !== "all"
              ? augmentLabels[parseInt(value)] ?? "Unknown"
              : "All"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Command>
            <CommandInput placeholder="Search augment..." className="h-9" />
            <CommandList>
              <CommandEmpty>No augment found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  key="all"
                  value="all"
                  onSelect={() => {
                    onValueChange("all");
                    setOpen(false);
                  }}
                >
                  All
                  <Check
                    className={cn(
                      "ml-auto",
                      value === "all" ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
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
    </div>
  );
}
