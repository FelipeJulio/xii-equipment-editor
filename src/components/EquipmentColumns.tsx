"use client";

import React from "react";
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
  augmentLabels,
} from "@/typings/types";

import { EditButton } from "@/components/EditButton";
import ItemImage from "@/components/ItemImage";
import GameIcon from "@/components/GameIcon";
import { TOTAL_SLOTS } from "@/lib/constants";

export function getColumns(
  level: number,
  getSigilColor: (level: number) => string,
  onDataRefresh: () => void
): ColumnDef<EquipmentItem>[] {
  function safeArray<T>(arr: T[] | undefined, fallback: T): T[] {
    const base = Array.isArray(arr) ? arr : [];
    const missing = Math.max(0, TOTAL_SLOTS - base.length);
    return [...base, ...Array.from({ length: missing }, () => fallback)];
  }

  const renderStatusEntries = (entries: StatusEntry[]): React.ReactNode => {
    if (!entries || entries.length === 0) return "-";

    return React.createElement(
      "div",
      { className: "flex flex-wrap gap-2 items-center" },
      entries.map((s, i) =>
        React.createElement(
          "div",
          { key: i, className: "flex items-center gap-1" },
          React.createElement(GameIcon, {
            type: "status",
            name: s.name,
            size: 16,
          }),
          React.createElement("span", null, statusLabels[s.name])
        )
      )
    );
  };

  return [
    {
      id: "image",
      header: "Img",
      size: 48,
      cell: ({ row }) => {
        const bit = row.original.bit;
        const name = row.getValue("name") as string;
        return (
          <div className="flex justify-center w-[34px]">
            <div className="border rounded overflow-hidden bg-black">
              <ItemImage index={bit} alt={name} width={32} height={48} />
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
        const name = row.getValue("name") as string;
        return (
          <span className="font-medium" style={{ color: getSigilColor(level) }}>
            {level === 0 ? name : `${name}+${level}`}
          </span>
        );
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
      id: "augment",
      header: "Augment",
      cell: ({ row }) => {
        const augmentAttr = row.original.attr["aug"];
        const value = augmentAttr?.scale?.[level - 1] ?? 255;

        if (value === 255) {
          return "-";
        }

        const label = augmentLabels[value] || `#${value}`;

        return <span>{label}</span>;
      },
    },
    {
      id: "element",
      header: "Elements",
      cell: ({ row }) => {
        const entry = row.original.element.scale[level - 1] as ElementEntry;

        if (!entry || !entry.name) {
          return "-";
        }

        return (
          <div className="flex items-center gap-1">
            <GameIcon
              type="elements"
              name={entry.name as ElementKey}
              size={16}
            />
            <span>{elementLabels[entry.name as ElementKey] || "-"}</span>
          </div>
        );
      },
    },
    {
      id: "onhit",
      header: "On-Hit",
      cell: ({ row }) => {
        const onhit = safeArray(row.original.onhit.scale, []);
        return renderStatusEntries(onhit[level - 1] || []);
      },
    },
    {
      id: "onequip",
      header: "On-Equip",
      cell: ({ row }) => {
        const onequip = safeArray(row.original.onequip.scale, []);
        return renderStatusEntries(onequip[level - 1] || []);
      },
    },
    {
      id: "immunity",
      header: "Immunity",
      cell: ({ row }) => {
        const immunity = safeArray(row.original.immunity.scale, []);
        return renderStatusEntries(immunity[level - 1] || []);
      },
    },

    {
      id: "affinity",
      header: "Affinity",
      cell: ({ row }) => {
        const affinity = safeArray(row.original.affinity.scale, []);
        const entries: AffinityEntry[] = affinity[level - 1] || [];
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
            {presentTypes.map((type) => (
              <div key={type} className="flex items-center gap-1 flex-wrap">
                <span className="font-semibold">
                  {affinityTypeLabels[type]}:
                </span>
                {grouped[type].map((a, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <GameIcon type="elements" name={a.element} size={16} />
                    <span>{elementLabels[a.element]}</span>
                  </div>
                ))}
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
        return <EditButton item={item} onDataRefresh={onDataRefresh} />;
      },
    },
  ];
}
