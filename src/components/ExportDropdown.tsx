"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Trash2, MoreVertical, Upload } from "lucide-react";
import { exportCache } from "@/lib/exportCache";
import { getEquipmentData } from "@/lib/localStorage";
import { useState } from "react";
import { toast } from "sonner";

export function ExportDropdown() {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClearCache = () => {
    localStorage.removeItem("xii-equipment-editor");
    location.reload();
  };

  const handleDownloadBackup = () => {
    const raw = localStorage.getItem("xii-equipment-editor");
    if (!raw) return;

    const blob = new Blob([raw], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    a.href = url;
    a.download = `xii-equipment-editor-backup-${timestamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUploadBackup = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const content = await file.text();

      try {
        const parsed = JSON.parse(content);

        const isValid =
          Array.isArray(parsed) &&
          parsed.every(
            (item) =>
              typeof item === "object" &&
              typeof item.id === "number" &&
              typeof item.name === "string" &&
              typeof item.category === "string" &&
              typeof item.attr === "object" &&
              item !== null
          );

        if (!isValid) {
          toast.error("Invalid backup", {
            description: "The structure does not match expected format.",
          });
          return;
        }

        localStorage.setItem("xii-equipment-editor", JSON.stringify(parsed));
        toast.success("Backup loaded", {
          description: "Your equipment data was restored successfully.",
        });

        setTimeout(() => location.reload(), 1000);
      } catch {
        toast.error("Failed to parse file", {
          description: "The uploaded file is not a valid JSON.",
        });
      }
    };

    input.click();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="cursor-pointer">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuLabel>Export</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer hover:opacity-75"
            onClick={() => {
              const lua = exportCache(getEquipmentData());
              const blob = new Blob([lua], {
                type: "text/plain;charset=utf-8",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "cachedata.lua";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Progression
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Backup</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer hover:opacity-75"
            onClick={handleDownloadBackup}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Backup
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer hover:opacity-75"
            onClick={handleUploadBackup}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Backup
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer text-destructive hover:opacity-75"
            onClick={() => setConfirmOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4 text-destructive" />
            Clear Cache
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-muted-foreground">
            This will permanently delete the current cache and reload the page.
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleClearCache}
              className="cursor-pointer"
            >
              Clear Cache
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
