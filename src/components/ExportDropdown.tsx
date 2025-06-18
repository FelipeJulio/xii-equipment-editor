"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Download, Trash2, MoreVertical } from "lucide-react";
import { exportCache } from "@/lib/exportCache";
import { getEquipmentData } from "@/lib/localStorage";
import { useState } from "react";

export function ExportDropdown() {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClearCache = () => {
    localStorage.removeItem("xii-equipment-editor");
    location.reload();
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
          <DropdownMenuItem
            className="cursor-pointer"
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
            Export Cache
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-destructive"
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
