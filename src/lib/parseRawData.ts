import rawData from "@/data/data.json";
import type {
  EquipmentItem,
  ElementKey,
  StatusKey,
  AffinityTypeKey,
  ElementEntry,
  StatusEntry,
  AffinityEntry,
  AttributeKey,
} from "@/typings/types";
import type { RawEquipmentItem } from "@/typings/raw";

export function parseRawData(): EquipmentItem[] {
  return (rawData as RawEquipmentItem[]).map((item) => {
    const parsedAttr: Partial<
      Record<AttributeKey, { value: number; scale: number[] }>
    > = {};
    Object.entries(item.attr).forEach(([rawKey, rawEntry]) => {
      const key = rawKey as AttributeKey;
      const { value, max } = rawEntry as { value: number; max: number };
      parsedAttr[key] = {
        value,
        scale: Array(12).fill(max),
      };
    });

    const parsedElement: ElementEntry[] = (
      item.element as {
        name: string;
        icon: number;
      }[]
    ).map<ElementEntry>((e) => ({
      name: e.name as ElementKey,
      icon: e.icon,
    }));

    const parsedOnHit: StatusEntry[][] = (
      item.onhit as {
        name: string;
        icon: number;
      }[][]
    ).map((lvl) =>
      lvl.map<StatusEntry>((s) => ({
        name: s.name as StatusKey,
        icon: s.icon,
      }))
    );

    const parsedOnEquip: StatusEntry[][] = (
      item.onequip as {
        name: string;
        icon: number;
      }[][]
    ).map((lvl) =>
      lvl.map<StatusEntry>((s) => ({
        name: s.name as StatusKey,
        icon: s.icon,
      }))
    );

    const parsedImmunity: StatusEntry[][] = (
      item.immunity as {
        name: string;
        icon: number;
      }[][]
    ).map((lvl) =>
      lvl.map<StatusEntry>((s) => ({
        name: s.name as StatusKey,
        icon: s.icon,
      }))
    );

    const parsedAffinity: AffinityEntry[][] = (
      item.affinity as {
        type: string;
        element: string;
        icon: number;
      }[][]
    ).map((lvl) =>
      lvl.map<AffinityEntry>((a) => ({
        type: a.type as AffinityTypeKey,
        element: a.element as ElementKey,
        icon: a.icon,
      }))
    );

    const result: EquipmentItem = {
      id: item.id,
      bit: item.bit,
      name: item.name,
      license: item.license,
      category: item.category,
      notes: item.notes,
      attr: parsedAttr,
      element: parsedElement,
      onhit: parsedOnHit,
      onequip: parsedOnEquip,
      immunity: parsedImmunity,
      affinity: parsedAffinity,
    };

    return result;
  });
}
