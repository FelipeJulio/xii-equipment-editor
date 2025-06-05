"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";

import type {
  EquipmentItem,
  ElementEntry,
  StatusEntry,
  AffinityEntry,
} from "@/typings/types";
import {
  elementLabels,
  statusLabels,
  affinityTypeLabels,
} from "@/typings/types";
import { exportCache } from "@/lib/exportCache";
import { getEquipmentData } from "@/lib/localStorage";
import { Download, Meh, Trash2 } from "lucide-react";
import { getColumns } from "./EquipmentColumns";
import GameIcon from "./GameIcon";

interface DataTableProps<TData extends EquipmentItem> {
  data: TData[];
}

export function DataTable<TData extends EquipmentItem>({
  data,
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [elementFilter, setElementFilter] = useState<string>("all");
  const [onhitFilter, setOnhitFilter] = useState<string>("all");
  const [onequipFilter, setOnequipFilter] = useState<string>("all");
  const [immunityFilter, setImmunityFilter] = useState<string>("all");
  const [affinityTypeFilter, setAffinityTypeFilter] = useState<string>("all");
  const [affinityElementFilter, setAffinityElementFilter] =
    useState<string>("all");
  const [level, setLevel] = useState<number>(1);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 14 });

  const categories = useMemo(
    () => Array.from(new Set(data.map((item) => item.category))),
    [data]
  );

  const filteredData = useMemo(
    () =>
      data.filter((item) => {
        if (
          globalFilter &&
          !Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(globalFilter.toLowerCase())
        ) {
          return false;
        }
        if (categoryFilter !== "all" && item.category !== categoryFilter) {
          return false;
        }
        if (
          elementFilter !== "all" &&
          !item.element.some((e: ElementEntry) => e.name === elementFilter)
        ) {
          return false;
        }
        if (
          onhitFilter !== "all" &&
          !item.onhit.some((lvl: StatusEntry[]) =>
            lvl.some((s) => s.name === onhitFilter)
          )
        ) {
          return false;
        }
        if (
          onequipFilter !== "all" &&
          !item.onequip.some((lvl: StatusEntry[]) =>
            lvl.some((s) => s.name === onequipFilter)
          )
        ) {
          return false;
        }
        if (
          immunityFilter !== "all" &&
          !item.immunity.some((lvl: StatusEntry[]) =>
            lvl.some((s) => s.name === immunityFilter)
          )
        ) {
          return false;
        }
        if (affinityTypeFilter !== "all" && affinityElementFilter !== "all") {
          if (
            !item.affinity.some((lvl: AffinityEntry[]) =>
              lvl.some(
                (a) =>
                  a.type === affinityTypeFilter &&
                  a.element === affinityElementFilter
              )
            )
          ) {
            return false;
          }
        } else if (affinityTypeFilter !== "all") {
          if (
            !item.affinity.some((lvl: AffinityEntry[]) =>
              lvl.some((a) => a.type === affinityTypeFilter)
            )
          ) {
            return false;
          }
        } else if (affinityElementFilter !== "all") {
          if (
            !item.affinity.some((lvl: AffinityEntry[]) =>
              lvl.some((a) => a.element === affinityElementFilter)
            )
          ) {
            return false;
          }
        }
        return true;
      }),
    [
      data,
      globalFilter,
      categoryFilter,
      elementFilter,
      onhitFilter,
      onequipFilter,
      immunityFilter,
      affinityTypeFilter,
      affinityElementFilter,
    ]
  );

  const columns = useMemo(() => getColumns(level), [level]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const getSigilColor = (level: number): string => {
    if (level >= 12) {
      return "#fd4336";
    } else if (level >= 11) {
      return "#ffa825";
    } else if (level >= 9) {
      return "#784bff";
    } else if (level >= 6) {
      return "#339dff";
    } else if (level >= 3) {
      return "#4ac24a";
    } else {
      return "";
    }
  };

  const { filterCount, isAnyFilterActive } = useMemo(() => {
    let count = 0;
    if (globalFilter.trim() !== "") count++;
    if (categoryFilter !== "all") count++;
    if (elementFilter !== "all") count++;
    if (onhitFilter !== "all") count++;
    if (onequipFilter !== "all") count++;
    if (immunityFilter !== "all") count++;
    if (affinityTypeFilter !== "all") count++;
    if (affinityElementFilter !== "all") count++;
    if (level !== 1) count++;

    return {
      filterCount: count,
      isAnyFilterActive: count > 0,
    };
  }, [
    globalFilter,
    categoryFilter,
    elementFilter,
    onhitFilter,
    onequipFilter,
    immunityFilter,
    affinityTypeFilter,
    affinityElementFilter,
    level,
  ]);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-3 items-center rounded-md border p-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Search</p>
          <Input
            placeholder="Name, License, Category..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-100 max-w-[200px]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Category</p>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="max-h-96">
              <SelectItem value="all">All</SelectItem>
              {categories.map((cat) => (
                <SelectItem className="cursor-pointer" key={cat} value={cat}>
                  <GameIcon type="weapons" name={cat} size={16} />
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Element</p>
          <Select value={elementFilter} onValueChange={setElementFilter}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Element" />
            </SelectTrigger>
            <SelectContent className="max-h-96">
              <SelectItem value="all">All</SelectItem>
              {Object.entries(elementLabels).map(([key, label]) => (
                <SelectItem className="cursor-pointer" key={key} value={key}>
                  <GameIcon type="elements" name={label} size={16} />
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">On-Hit</p>
          <Select value={onhitFilter} onValueChange={setOnhitFilter}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="On-Hit" />
            </SelectTrigger>
            <SelectContent className="max-h-96">
              <SelectItem value="all">All</SelectItem>
              {Object.entries(statusLabels).map(([key, label]) => (
                <SelectItem className="cursor-pointer" key={key} value={key}>
                  <GameIcon type="status" name={label} size={16} />
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">On-Equip</p>
          <Select value={onequipFilter} onValueChange={setOnequipFilter}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="On-Equip" />
            </SelectTrigger>
            <SelectContent className="max-h-96">
              <SelectItem value="all">All</SelectItem>
              {Object.entries(statusLabels).map(([key, label]) => (
                <SelectItem className="cursor-pointer" key={key} value={key}>
                  <GameIcon type="status" name={label} size={16} />
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">immunity</p>
          <Select value={immunityFilter} onValueChange={setImmunityFilter}>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="immunity" />
            </SelectTrigger>
            <SelectContent className="max-h-96">
              <SelectItem value="all">All</SelectItem>
              {Object.entries(statusLabels).map(([key, label]) => (
                <SelectItem className="cursor-pointer" key={key} value={key}>
                  <GameIcon type="status" name={label} size={16} />
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Affinity</p>
          <div className="flex flex-row gap-2">
            <Select
              value={affinityTypeFilter}
              onValueChange={setAffinityTypeFilter}
            >
              <SelectTrigger className="cursor-pointer rounded-none">
                <SelectValue
                  className="cursor-pointer"
                  placeholder="Affinity Type"
                />
              </SelectTrigger>
              <SelectContent className="max-h-96">
                <SelectItem value="all">All</SelectItem>
                {Object.entries(affinityTypeLabels).map(([key, label]) => (
                  <SelectItem className="cursor-pointer" key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={affinityElementFilter}
              onValueChange={setAffinityElementFilter}
            >
              <SelectTrigger className="cursor-pointer">
                <SelectValue
                  className="cursor-pointer"
                  placeholder="Affinity Element"
                />
              </SelectTrigger>
              <SelectContent className="max-h-96">
                <SelectItem value="all">All</SelectItem>
                {Object.entries(elementLabels).map(([key, label]) => (
                  <SelectItem className="cursor-pointer" key={key} value={key}>
                    <GameIcon type="elements" name={label} size={16} />
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Centurio Sigil Level</p>
          <Select
            value={String(level)}
            onValueChange={(val) => setLevel(Number(val))}
          >
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="Centurio Sigil Level" />
            </SelectTrigger>
            <SelectContent className="max-h-96">
              {Array.from({ length: 12 }, (_, i) => {
                const lvl = i + 1;
                return (
                  <SelectItem
                    key={lvl}
                    value={String(lvl)}
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <GameIcon type="ui" name="sigil" size={16} />
                    <span
                      className="font-medium"
                      style={{ color: getSigilColor(lvl) }}
                    >
                      Centurio Sigil+{lvl}
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        {isAnyFilterActive && (
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Reset</p>
            <div className="flex flex-row gap-2">
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => {
                  setGlobalFilter("");
                  setCategoryFilter("all");
                  setElementFilter("all");
                  setOnhitFilter("all");
                  setOnequipFilter("all");
                  setImmunityFilter("all");
                  setAffinityTypeFilter("all");
                  setAffinityElementFilter("all");
                  setLevel(1);
                }}
              >
                {filterCount}
                <Trash2 />
              </Button>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Export</p>
          <div className="flex flex-row gap-2">
            <Button
              variant="default"
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
              Export
              <Download />
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <p className="flex flex-col items-center justify-center gap-2">
                    No results
                    <Meh />
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center gap-4">
          Show
          <Select
            value={String(pagination.pageSize)}
            onValueChange={(val) =>
              setPagination((p) => ({ ...p, pageSize: Number(val) }))
            }
          >
            <SelectTrigger className="cursor-pointer" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-96">
              {[14, 28, 42, 56, 100].map((size) => (
                <SelectItem
                  key={size}
                  value={String(size)}
                  className="flex flex-row items-center cursor-pointer"
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="cursor-pointer"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
