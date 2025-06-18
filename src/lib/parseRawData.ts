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
  WeaponCategoryName,
  ShieldCategoryName,
  ArmorCategoryName,
  AmmunitionCategoryName,
  CategoryName,
} from "@/typings/types";

import { elementIcons } from "@/typings/types";
import type { RawEquipmentItem } from "@/typings/raw";

// Categorias definidas
const weaponCategories: WeaponCategoryName[] = [
  "Unused",
  "Unarmed",
  "Sword",
  "Greatsword",
  "Katana",
  "Ninja Sword",
  "Spear",
  "Pole",
  "Bow",
  "Crossbow",
  "Gun",
  "Axe",
  "Hammer",
  "Dagger",
  "Rod",
  "Staff",
  "Mace",
  "Measure",
  "Hand-Bomb",
];
const shieldCategories: ShieldCategoryName[] = ["Shield"];
const armorCategories: ArmorCategoryName[] = [
  "Light Helm",
  "Mystic Helm",
  "Heavy Helm",
  "Light Armor",
  "Mystic Armor",
  "Heavy Armor",
  "Ring",
  "Armlet",
  "Glove",
  "Gorget",
  "Pendant",
  "Belt",
  "Boot",
  "Nethecite",
  "Ribbon",
  "Shard",
];
const ammunitionCategories: AmmunitionCategoryName[] = [
  "Arrow",
  "Bolt",
  "Shot",
  "Bomb",
];

const weaponCategorySet = new Set<string>(weaponCategories);
const shieldCategorySet = new Set<string>(shieldCategories);
const armorCategorySet = new Set<string>(armorCategories);
const ammunitionCategorySet = new Set<string>(ammunitionCategories);

export function parseRawData(): EquipmentItem[] {
  return (rawData as RawEquipmentItem[]).map((item) => {
    const parsedAttr: Partial<
      Record<AttributeKey, { value: number; scale: number[] }>
    > = {};
    Object.entries(item.attr || {}).forEach(([rawKey, rawEntry]) => {
      const key = rawKey as AttributeKey;
      const { value, max } = rawEntry ?? { value: 0, max: 0 };
      parsedAttr[key] = { value, scale: Array(12).fill(max) };
    });

    const parsedElement: ElementEntry[] = Array.from({ length: 12 }, (_, i) => {
      const el = item.element?.[i];
      return el && el.name
        ? {
            name: el.name as ElementKey,
            icon: elementIcons[el.name as ElementKey] ?? 0,
          }
        : {};
    });

    const parseStatusArray = (
      arr?: { name?: string; icon?: number }[][]
    ): StatusEntry[][] =>
      Array.from({ length: 12 }, (_, i) =>
        (arr?.[i] ?? [])
          .filter(
            (s): s is { name: string; icon: number } =>
              typeof s.name === "string"
          )
          .map((s) => ({ name: s.name as StatusKey, icon: s.icon }))
      );

    const parseAffinityArray = (
      arr?: { type?: string; element?: string; icon?: number }[][]
    ): AffinityEntry[][] =>
      Array.from({ length: 12 }, (_, i) =>
        (arr?.[i] ?? [])
          .filter(
            (a): a is { type: string; element: string; icon: number } =>
              typeof a.type === "string" && typeof a.element === "string"
          )
          .map((a) => ({
            type: a.type as AffinityTypeKey,
            element: a.element as ElementKey,
            icon: elementIcons[a.element as ElementKey] ?? 0,
          }))
      );

    const parsedOnHit = parseStatusArray(item.onhit);
    const parsedOnEquip = parseStatusArray(item.onequip);
    const parsedImmunity = parseStatusArray(item.immunity);
    const parsedAffinity = parseAffinityArray(item.affinity);

    let parsedCategory: CategoryName | null = null;

    if (weaponCategorySet.has(item.category)) {
      parsedCategory = item.category as WeaponCategoryName;
    } else if (shieldCategorySet.has(item.category)) {
      parsedCategory = item.category as ShieldCategoryName;
    } else if (armorCategorySet.has(item.category)) {
      parsedCategory = item.category as ArmorCategoryName;
    } else if (ammunitionCategorySet.has(item.category)) {
      parsedCategory = item.category as AmmunitionCategoryName;
    }

    if (!parsedCategory) {
      throw new Error(
        `Unknown category "${item.category}" for item "${item.name}"`
      );
    }

    const parsedItem: EquipmentItem = {
      id: item.id,
      bit: item.bit,
      name: item.name,
      license: item.license,
      notes: item.notes,
      category: parsedCategory,
      attr: parsedAttr,
      element: parsedElement,
      onhit: parsedOnHit,
      onequip: parsedOnEquip,
      immunity: parsedImmunity,
      affinity: parsedAffinity,
    };

    return parsedItem;
  });
}
