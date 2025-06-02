import type { EquipmentItem } from "@/typings/types";

const STORAGE_KEY = "xii-equipment-editor";

export function getEquipmentData(): EquipmentItem[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as EquipmentItem[];
  } catch {
    console.error("Failed to parse equipment data from localStorage");
    return [];
  }
}

export function saveEquipmentData(data: EquipmentItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function initEquipmentData(defaultData: EquipmentItem[]) {
  if (typeof window === "undefined") return;
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  }
}
