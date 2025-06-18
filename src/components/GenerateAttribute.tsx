"use client";

import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import { attributeLabels } from "@/typings/types";
import type { AttributeKey } from "@/typings/types";

interface GenerateAttributeProps {
  attributeKey: AttributeKey;
  currentScales: number[];
  onGenerate: (newScales: number[]) => void;
  onOpenChange: (isOpen: boolean) => void;
}

export function GenerateAttribute({
  attributeKey,
  currentScales,
  onGenerate,
  onOpenChange,
}: GenerateAttributeProps) {
  const label = attributeLabels[attributeKey];
  const [open, setOpen] = useState(false);
  const [minVal, setMinVal] = useState<string>("");
  const [maxVal, setMaxVal] = useState<string>("");
  const [mode, setMode] = useState<"linear" | "scale">("linear");
  const [factor, setFactor] = useState<number>(1);

  const isDisabled =
    minVal.trim() === "" ||
    maxVal.trim() === "" ||
    isNaN(parseFloat(minVal)) ||
    isNaN(parseFloat(maxVal));

  function handleOpenChange(newState: boolean) {
    setOpen(newState);
    onOpenChange(newState);
  }

  function generateScales() {
    const min = parseFloat(minVal);
    const max = parseFloat(maxVal);
    if (isNaN(min) || isNaN(max)) return;

    const newScales: number[] = new Array(12).fill(0);

    if (mode === "linear") {
      for (let i = 0; i < 12; i++) {
        const raw = min + ((max - min) * i) / 11;
        newScales[i] = Math.round(raw);
      }
    } else {
      for (let i = 0; i < 12; i++) {
        const t = i / 11;
        const raw = min + (max - min) * Math.pow(t, factor);
        newScales[i] = Math.round(raw);
      }
    }

    onGenerate(newScales);
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline" className="cursor-pointer">
          <Star />
          Auto Scale
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <div className="flex flex-col gap-4">
          <p className="text-md font-semibold flex flex-row justify-between">
            <span>{label}</span>
            <span className="opacity-60">1 to {currentScales.length}</span>
          </p>
          <Separator />
          <div className="grid grid-cols-2 items-center gap-2">
            <Label htmlFor={`min-${attributeKey}`} className="text-sm">
              Start Value
            </Label>
            <Input
              id={`min-${attributeKey}`}
              value={minVal}
              onChange={(e) => setMinVal(e.target.value)}
              type="number"
              className="h-8"
              placeholder="0"
            />
          </div>
          <Separator />
          <div className="grid grid-cols-2 items-center gap-2">
            <Label htmlFor={`max-${attributeKey}`} className="text-sm">
              End Value
            </Label>
            <Input
              id={`max-${attributeKey}`}
              value={maxVal}
              onChange={(e) => setMaxVal(e.target.value)}
              type="number"
              className="h-8"
              placeholder="100"
            />
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <Label className="text-sm">Mode</Label>
            <ToggleGroup
              variant="outline"
              type="single"
              value={mode}
              onValueChange={(val) => {
                if (val === "linear" || val === "scale") setMode(val);
              }}
              className="grid grid-cols-2 w-full"
            >
              <ToggleGroupItem
                value="linear"
                aria-label="Linear"
                className="cursor-pointer"
              >
                Linear
              </ToggleGroupItem>
              <ToggleGroupItem
                value="scale"
                aria-label="Scale Factor"
                className="cursor-pointer"
              >
                Scale Factor
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          {mode === "scale" && (
            <>
              <Separator />
              <div className="flex flex-col gap-2">
                <Label className="text-sm flex flex-row justify-between">
                  Factor <span>{factor.toFixed(1)}</span>
                </Label>
                <Slider
                  value={[factor]}
                  onValueChange={([v]) => setFactor(v)}
                  min={1}
                  max={2}
                  step={0.1}
                  className="w-full cursor-pointer"
                />
                <small className="mt-2 opacity-60">
                  Values near 1 yield a smoother, more linear curve; near 2
                  produce a sharper, accelerated growth.
                </small>
              </div>
            </>
          )}
          <Separator />
          <div className="flex justify-end">
            <Button
              size="sm"
              className="cursor-pointer"
              onClick={generateScales}
              disabled={isDisabled}
            >
              <Star />
              Generate
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
