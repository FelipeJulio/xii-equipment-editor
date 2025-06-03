"use client";

import { ColumnDef } from "@tanstack/react-table";
import type {
  EquipmentItem,
  ElementEntry,
  StatusEntry,
  AffinityEntry,
  ElementKey,
} from "@/typings/types";
import {
  elementLabels,
  statusLabels,
  affinityTypeLabels,
} from "@/typings/types";

import { EditButton } from "./EditButton";
import ItemImage from "./ItemImage";
import GameIcon from "./GameIcon";

export function getColumns(level: number): ColumnDef<EquipmentItem>[] {
  return [
    {
      id: "image",
      header: "Img",
      size: 48,
      cell: ({ row }) => {
        const bit = row.original.bit;

        return (
          <div className="flex justify-center">
            <div className="border rounded overflow-hidden aspect-2/3 bg-black">
              <ItemImage
                index={bit}
                alt={`Item ${bit}`}
                width={32}
                height={32}
              />
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "bit",
      header: "ID",
      cell: ({ row }) => {
        const v = row.getValue("bit") as number;
        return v != null ? v : "-";
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const v = row.getValue("name") as string;
        return v ? v : "-";
      },
    },
    {
      accessorKey: "license",
      header: "License",
      cell: ({ row }) => {
        const v = row.getValue("license") as string;
        return v ? v : "-";
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        if (!category) return "-";
        return (
          <div className="flex items-center gap-1">
            <GameIcon type="weapons" name={category} size={16} />
            <span>{category}</span>
          </div>
        );
      },
    },
    {
      id: "element",
      header: "Elements",
      cell: ({ row }) => {
        const entry: ElementEntry | undefined = row.original.element[level - 1];
        if (!entry || entry.name === "") {
          return "-";
        }
        return (
          <div className="flex items-center gap-1">
            <GameIcon type="elements" name={entry.name} size={16} />
            <span>{elementLabels[entry.name as ElementKey] || "-"}</span>
          </div>
        );
      },
    },
    {
      id: "onhit",
      header: "On-Hit",
      cell: ({ row }) => {
        const entries: StatusEntry[] = row.original.onhit[level - 1] || [];
        if (entries.length === 0) {
          return "-";
        }
        return (
          <div className="flex flex-wrap gap-2 items-center">
            {entries.map((s, i) => (
              <div key={i} className="flex items-center gap-1">
                <GameIcon type="statusEffect" name={s.name} size={16} />
                <span>{statusLabels[s.name]}</span>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      id: "onequip",
      header: "On-Equip",
      cell: ({ row }) => {
        const entries: StatusEntry[] = row.original.onequip[level - 1] || [];
        if (entries.length === 0) {
          return "-";
        }
        return (
          <div className="flex flex-wrap gap-2 items-center">
            {entries.map((s, i) => (
              <div key={i} className="flex items-center gap-1">
                <GameIcon type="statusEffect" name={s.name} size={16} />
                <span>{statusLabels[s.name]}</span>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      id: "immunity",
      header: "Immunity",
      cell: ({ row }) => {
        const entries: StatusEntry[] = row.original.immunity[level - 1] || [];
        if (entries.length === 0) {
          return "-";
        }
        return (
          <div className="flex flex-wrap gap-2 items-center">
            {entries.map((s, i) => (
              <div key={i} className="flex items-center gap-1">
                <GameIcon type="statusEffect" name={s.name} size={16} />
                <span>{statusLabels[s.name]}</span>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      id: "affinity",
      header: "Affinity",
      cell: ({ row }) => {
        const entries: AffinityEntry[] = row.original.affinity[level - 1] || [];
        if (entries.length === 0) {
          return "-";
        }
        const grouped: Record<string, AffinityEntry[]> = {};
        entries.forEach((a) => {
          if (!grouped[a.type]) {
            grouped[a.type] = [];
          }
          grouped[a.type].push(a);
        });
        const typeOrder: Array<AffinityEntry["type"]> = [
          "absorb",
          "immune",
          "half",
          "weak",
          "potency",
        ];
        const presentTypes = typeOrder.filter((t) => grouped[t]);
        return (
          <div className="flex flex-wrap gap-2 items-center">
            {presentTypes.map((type, idx) => (
              <div key={type} className="flex items-center gap-1">
                <span className="font-semibold">
                  {affinityTypeLabels[type]}:
                </span>
                {grouped[type].map((a, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <GameIcon type="elements" name={a.element} size={16} />
                    <span>{elementLabels[a.element]}</span>
                  </div>
                ))}
                {idx < presentTypes.length - 1 && (
                  <span className="px-1">|</span>
                )}
              </div>
            ))}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;
        return <EditButton item={item} />;
      },
    },
  ];
}
