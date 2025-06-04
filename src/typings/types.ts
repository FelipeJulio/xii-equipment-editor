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

export const attributeLabels: Record<AttributeKey, string> = {
  rge: "Range",
  atk: "Attack Power",
  kb: "Knockback %",
  cmb: "Combo/Critical %",
  evas: "Evade",
  evaw: "Evade",
  hit: "Hit-Rate",
  crg: "Charge Time",
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

export interface AttributeEntry {
  name: AttributeKey;
  value: number;
  scale: number[];
}

export interface ElementEntry {
  name: "" | ElementKey;
  icon: number;
}

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
  category: string;
  notes: string;
  attr: Partial<Record<AttributeKey, { value: number; scale: number[] }>>;
  element: ElementEntry[];
  onhit: StatusEntry[][];
  onequip: StatusEntry[][];
  immunity: StatusEntry[][];
  affinity: AffinityEntry[][];
}

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

export const affinityIcons: Record<AffinityTypeKey, number> = {
  absorb: 100,
  immune: 101,
  half: 102,
  weak: 103,
  potency: 104,
};

export type IconType =
  | "elements"
  | "status"
  | "affinity"
  | "accessories"
  | "ammunitions"
  | "protectives"
  | "weapons"
  | "ui";

export const categoryToIconTypeMap: Record<string, IconType> = {
  sword: "weapons",
  greatsword: "weapons",
  dagger: "weapons",
  katana: "weapons",
  bow: "weapons",
  gun: "weapons",
  crossbow: "weapons",
  pole: "weapons",
  rod: "weapons",
  stave: "weapons",
  axe: "weapons",
  hammer: "weapons",
  mace: "weapons",
  measure: "weapons",
  ninja_sword: "weapons",
  hand_bomb: "weapons",
  spear: "weapons",

  heavy_armor: "protectives",
  light_armor: "protectives",
  mystic_armor: "protectives",
  heavy_helm: "protectives",
  light_helm: "protectives",
  mystic_helm: "protectives",
  shield: "protectives",

  ring: "accessories",
  belt: "accessories",
  armlet: "accessories",
  glove: "accessories",
  gorget: "accessories",
  pendant: "accessories",
  boot: "accessories",
  ribbon: "accessories",
  shard: "accessories",
  magicite: "accessories",
  nethecite: "accessories",

  arrow: "ammunitions",
  bolt: "ammunitions",
  shot: "ammunitions",
  bomb: "ammunitions",
};
