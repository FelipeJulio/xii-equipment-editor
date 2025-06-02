import { EquipmentItem, AttributeKey } from "./types";

export type RawEquipmentItem = Omit<
  EquipmentItem,
  "attr" | "element" | "onhit" | "onequip" | "immunity" | "affinity"
> & {
  attr: Partial<Record<AttributeKey, { value: number; max: number }>>;
  element: { name: string; icon: number }[];
  onhit: { name: string; icon: number }[][];
  onequip: { name: string; icon: number }[][];
  immunity: { name: string; icon: number }[][];
  affinity: { type: string; element: string; icon: number }[][];
};
