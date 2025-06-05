"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { EquipmentItem } from "@/typings/types";
import { Button } from "@/components/ui/button";
import { Edit, Loader2 } from "lucide-react";

const EditModalContent = dynamic(
  () => import("@/components/EditModal").then((mod) => mod.EditModalContent),
  {
    ssr: false,
  }
);

export function EditButton({ item }: { item: EquipmentItem }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await import("@/components/EditModal");
      setOpen(true);
    } catch (err) {
      console.error("Falha ao carregar o modal:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        size="sm"
        className="cursor-pointer"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            Edit <Loader2 className="animate-spin h-4 w-4" />
          </>
        ) : (
          <>
            Edit <Edit size={16} />
          </>
        )}
      </Button>

      {open && <EditModalContent item={item} onClose={() => setOpen(false)} />}
    </>
  );
}
