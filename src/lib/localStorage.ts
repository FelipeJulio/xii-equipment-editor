import type { EquipmentItem } from "@/typings/types";
import { CURRENT_VERSION, STORAGE_KEY } from "@/lib/constants";

interface StoredData {
  version: number;
  data: EquipmentItem[];
}

export function getEquipmentData(): EquipmentItem[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as StoredData;

    if (
      !parsed ||
      typeof parsed !== "object" ||
      parsed.version !== CURRENT_VERSION ||
      !Array.isArray(parsed.data)
    ) {
      console.warn("Invalid or outdated equipment data. Clearing cache data.");
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }

    return parsed.data;
  } catch (err) {
    console.error("Failed to parse equipment data from cache data:", err);
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function saveEquipmentData(data: EquipmentItem[]) {
  const payload: StoredData = {
    version: CURRENT_VERSION,
    data,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function initEquipmentData(defaultData: EquipmentItem[]) {
  if (typeof window === "undefined") return;

  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    const payload: StoredData = {
      version: CURRENT_VERSION,
      data: defaultData,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }
}
