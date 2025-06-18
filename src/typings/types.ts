// Keys

export type AttributeKey =
  | "rge"
  | "atk"
  | "kb"
  | "cmb"
  | "evas"
  | "evaw"
  | "hit"
  | "crg"
  | "mres"
  | "def"
  | "hp"
  | "mp"
  | "str"
  | "mgk"
  | "vit"
  | "spd";

export type ElementKey =
  | "fire"
  | "lightning"
  | "ice"
  | "earth"
  | "water"
  | "wind"
  | "holy"
  | "dark";

export type StatusKey =
  | "ko"
  | "stone"
  | "petrify"
  | "stop"
  | "sleep"
  | "confuse"
  | "doom"
  | "blind"
  | "poison"
  | "silence"
  | "sap"
  | "oil"
  | "reverse"
  | "disable"
  | "immobilize"
  | "slow"
  | "disease"
  | "lure"
  | "protect"
  | "shell"
  | "haste"
  | "bravery"
  | "faith"
  | "reflect"
  | "invisible"
  | "regen"
  | "float"
  | "berserk"
  | "bubble"
  | "hp_critical"
  | "libra"
  | "x_zone";

export type AffinityTypeKey = "absorb" | "immune" | "half" | "weak" | "potency";

//Labels and Icons

export const attributeLabels: Record<AttributeKey, string> = {
  rge: "Range",
  atk: "Attack",
  kb: "Knockback",
  cmb: "Combo/Crit",
  evas: "Evade (S)",
  evaw: "Evade (W)",
  hit: "Hit-Rate",
  crg: "Charge",
  mres: "Magick Resist",
  def: "Defense",
  hp: "HP",
  mp: "MP",
  str: "Strength",
  mgk: "Magick Power",
  vit: "Vitality",
  spd: "Speed",
};

export const elementLabels: Record<ElementKey, string> = {
  fire: "Fire",
  lightning: "Lightning",
  ice: "Ice",
  earth: "Earth",
  water: "Water",
  wind: "Wind",
  holy: "Holy",
  dark: "Dark",
};

export const statusLabels: Record<StatusKey, string> = {
  ko: "KO",
  stone: "Stone",
  petrify: "Petrify",
  stop: "Stop",
  sleep: "Sleep",
  confuse: "Confuse",
  doom: "Doom",
  blind: "Blind",
  poison: "Poison",
  silence: "Silence",
  sap: "Sap",
  oil: "Oil",
  reverse: "Reverse",
  disable: "Disable",
  immobilize: "Immobilize",
  slow: "Slow",
  disease: "Disease",
  lure: "Lure",
  protect: "Protect",
  shell: "Shell",
  haste: "Haste",
  bravery: "Bravery",
  faith: "Faith",
  reflect: "Reflect",
  invisible: "Invisible",
  regen: "Regen",
  float: "Float",
  berserk: "Berserk",
  bubble: "Bubble",
  hp_critical: "HP Critical",
  libra: "Libra",
  x_zone: "X-Zone",
};

export const affinityTypeLabels: Record<AffinityTypeKey, string> = {
  absorb: "Absorb",
  immune: "Immune",
  half: "Half",
  weak: "Weak",
  potency: "Potency",
};

export const elementIcons: Record<ElementKey, number> = {
  fire: 10,
  lightning: 11,
  ice: 12,
  earth: 13,
  water: 14,
  wind: 15,
  holy: 16,
  dark: 17,
};

export const statusIcons: Record<StatusKey, number> = {
  ko: 1,
  stone: 2,
  petrify: 3,
  stop: 4,
  sleep: 5,
  confuse: 6,
  doom: 7,
  blind: 8,
  poison: 9,
  silence: 10,
  sap: 11,
  oil: 12,
  reverse: 13,
  disable: 14,
  immobilize: 15,
  slow: 16,
  disease: 17,
  lure: 18,
  protect: 19,
  shell: 20,
  haste: 21,
  bravery: 22,
  faith: 23,
  reflect: 24,
  invisible: 25,
  regen: 26,
  float: 27,
  berserk: 28,
  bubble: 29,
  hp_critical: 30,
  libra: 31,
  x_zone: 32,
};

// Categories

export type WeaponCategoryName =
  | "Sword"
  | "Greatsword"
  | "Katana"
  | "Ninja Sword"
  | "Spear"
  | "Pole"
  | "Bow"
  | "Crossbow"
  | "Gun"
  | "Axe"
  | "Hammer"
  | "Dagger"
  | "Rod"
  | "Staff"
  | "Mace"
  | "Measure"
  | "Hand-Bomb"
  | "Unarmed"
  | "Unused";

export type ShieldCategoryName = "Shield";

export type ArmorCategoryName =
  | "Light Helm"
  | "Mystic Helm"
  | "Heavy Helm"
  | "Light Armor"
  | "Mystic Armor"
  | "Heavy Armor"
  | "Ring"
  | "Armlet"
  | "Glove"
  | "Gorget"
  | "Pendant"
  | "Belt"
  | "Boot"
  | "Nethecite"
  | "Ribbon"
  | "Shard";

export type AmmunitionCategoryName = "Arrow" | "Bolt" | "Shot" | "Bomb";

export type CategoryName =
  | WeaponCategoryName
  | ShieldCategoryName
  | ArmorCategoryName
  | AmmunitionCategoryName;

// Models

export interface AttributeEntry {
  name: AttributeKey;
  value: number;
  scale: number[];
}

export type ElementEntry = Partial<{
  name: ElementKey | "";
  icon: number;
}>;

export interface StatusEntry {
  name: StatusKey;
  icon: number;
}

export interface AffinityEntry {
  type: AffinityTypeKey;
  element: ElementKey;
  icon: number;
}

export interface EquipmentItem {
  id: number;
  bit: number;
  name: string;
  license: string;
  category: CategoryName;
  notes: string;

  attr: Partial<Record<AttributeKey, { value: number; scale: number[] }>>;

  element: ElementEntry[];
  onhit: StatusEntry[][];
  onequip: StatusEntry[][];
  immunity: StatusEntry[][];
  affinity: AffinityEntry[][];
}

// Icon Map

export type IconType =
  | "elements"
  | "status"
  | "weapons"
  | "protectives"
  | "accessories"
  | "ammunitions"
  | "ui";

export const categoryToIconType: Record<CategoryName, IconType> = {
  // Weapons
  Sword: "weapons",
  Greatsword: "weapons",
  Katana: "weapons",
  "Ninja Sword": "weapons",
  Spear: "weapons",
  Pole: "weapons",
  Bow: "weapons",
  Crossbow: "weapons",
  Gun: "weapons",
  Axe: "weapons",
  Hammer: "weapons",
  Dagger: "weapons",
  Rod: "weapons",
  Staff: "weapons",
  Mace: "weapons",
  Measure: "weapons",
  "Hand-Bomb": "weapons",
  Unarmed: "weapons",
  Unused: "weapons",

  // Shield
  Shield: "protectives",

  // Armor
  "Light Helm": "protectives",
  "Mystic Helm": "protectives",
  "Heavy Helm": "protectives",
  "Light Armor": "protectives",
  "Mystic Armor": "protectives",
  "Heavy Armor": "protectives",

  // Accessories
  Ring: "accessories",
  Armlet: "accessories",
  Glove: "accessories",
  Gorget: "accessories",
  Pendant: "accessories",
  Belt: "accessories",
  Boot: "accessories",
  Nethecite: "accessories",
  Ribbon: "accessories",
  Shard: "accessories",

  // Ammunition
  Arrow: "ammunitions",
  Bolt: "ammunitions",
  Shot: "ammunitions",
  Bomb: "ammunitions",
};

// Utils

export function safeArray<T>(
  arr: T[] | undefined,
  filler: T,
  length = 12
): T[] {
  const base = Array.isArray(arr) ? arr : [];
  const missing = Math.max(0, length - base.length);
  return [...base, ...Array.from({ length: missing }, () => filler)];
}
