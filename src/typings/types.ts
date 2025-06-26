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
  | "spd"
  | "aug";

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

export type AugmentId = number;

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
  aug: "Augment",
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

export const augmentLabels: Record<AugmentId, string> = {
  255: "None",
  0: "Stability",
  1: "Safety",
  2: "Accuracy Boost",
  3: "Shield Boost",
  4: "Evasion Boost",
  5: "Last Stand",
  6: "Counter",
  7: "Counter Boost",
  8: "Spellbreaker",
  9: "Brawler",
  10: "Adrenaline",
  11: "Focus",
  12: "Lobbying",
  13: "Combo Boost",
  14: "Item Boost",
  15: "Medicine Reverse",
  16: "Weatherproof",
  17: "Thievery",
  18: "Saboteur",
  19: "Magick Lore 1",
  20: "Warmage",
  21: "Martyr",
  22: "Magick Lore 2",
  23: "Headsman",
  24: "Magick Lore 3",
  25: "Treasure Hunter",
  26: "Magick Lore 4",
  27: "Double EXP",
  28: "Double LP",
  29: "No EXP",
  30: "Spellbound",
  31: "Piercing Magick",
  32: "Offering",
  33: "Muffle",
  34: "Life Cloak",
  35: "Battle Lore 1",
  36: "Parsimony",
  37: "Tread Lightly",
  38: "Unused",
  39: "Emptiness",
  40: "Resist Piercing Damage",
  41: "Anti-Libra",
  42: "Battle Lore 2",
  43: "Battle Lore 3",
  44: "Battle Lore 4",
  45: "Battle Lore 5",
  46: "Battle Lore 6",
  47: "Battle Lore 7",
  48: "Stoneskin",
  49: "Attack Boost",
  50: "Double Edged",
  51: "Spellspring",
  52: "Elemental Shift",
  53: "Celerity",
  54: "Swiftcast",
  55: "Physical-Immunity",
  56: "Magick-Immunity",
  57: "Status-Immunity",
  58: "Damage Spikes",
  59: "Suicidal",
  60: "Battle Lore 8",
  61: "Battle Lore 9",
  62: "Battle Lore 10",
  63: "Battle Lore 11",
  64: "Battle Lore 12",
  65: "Battle Lore 13",
  66: "Battle Lore 14",
  67: "Battle Lore 15",
  68: "Battle Lore 16",
  69: "Magick Lore 5",
  70: "Magick Lore 6",
  71: "Magick Lore 7",
  72: "Magick Lore 8",
  73: "Magick Lore 9",
  74: "HP +30",
  75: "HP +70",
  76: "HP +110",
  77: "HP +150",
  78: "HP +190",
  79: "HP +230",
  80: "HP +270",
  81: "HP +310",
  82: "HP +350",
  83: "HP +390",
  84: "HP +435",
  85: "HP +500",
  86: "Inquisitor",
  87: "Magick Lore 10",
  88: "Shield Block 3",
  89: "Shield Block 2",
  90: "Shield Block 1",
  91: "Channeling 3",
  92: "Channeling 2",
  93: "Channeling 1",
  94: "Swiftness 3",
  95: "Swiftness 2",
  96: "Swiftness 1",
  97: "Magick Lore 11",
  98: "Magick Lore 12",
  99: "Magick Lore 13",
  100: "Magick Lore 14",
  101: "Magick Lore 15",
  102: "Magick Lore 16",
  103: "Serenity",
  104: "Gambit Slot 1",
  105: "Gambit Slot 2",
  106: "Gambit Slot 3",
  107: "Gambit Slot 4",
  108: "Gambit Slot 5",
  109: "Gambit Slot 6",
  110: "Gambit Slot 7",
  111: "Gambit Slot 8",
  112: "Gambit Slot 9",
  113: "Gambit Slot 10",
  114: "Essentials",
  115: "Unused",
  116: "Remedy Lore 3",
  117: "Remedy Lore 2",
  118: "Remedy Lore 1",
  119: "Potion Lore 3",
  120: "Potion Lore 2",
  121: "Potion Lore 1",
  122: "Ether Lore 3",
  123: "Ether Lore 2",
  124: "Ether Lore 1",
  125: "Phoenix Lore 3",
  126: "Phoenix Lore 2",
  127: "Phoenix Lore 1",
  128: "Second Board",
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
  ko: 21,
  stone: 22,
  petrify: 23,
  stop: 24,
  sleep: 25,
  confuse: 26,
  doom: 27,
  blind: 28,
  poison: 29,
  silence: 30,
  sap: 31,
  oil: 32,
  reverse: 33,
  disable: 34,
  immobilize: 35,
  slow: 36,
  disease: 37,
  lure: 38,
  protect: 39,
  shell: 40,
  haste: 41,
  bravery: 42,
  faith: 43,
  reflect: 44,
  invisible: 45,
  regen: 46,
  float: 47,
  berserk: 48,
  bubble: 49,
  hp_critical: 50,
  libra: 51,
  x_zone: 52,
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
  element: {
    value: ElementEntry;
    scale: ElementEntry[];
  };

  onhit: {
    value: StatusEntry[];
    scale: StatusEntry[][];
  };

  onequip: {
    value: StatusEntry[];
    scale: StatusEntry[][];
  };

  immunity: {
    value: StatusEntry[];
    scale: StatusEntry[][];
  };

  affinity: {
    value: AffinityEntry[];
    scale: AffinityEntry[][];
  };
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
