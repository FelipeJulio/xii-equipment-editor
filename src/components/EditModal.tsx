"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { toast } from "sonner";

import { Plus, Save, Trash } from "lucide-react";

import type {
  EquipmentItem,
  ElementEntry,
  StatusEntry,
  AffinityEntry,
  AttributeKey,
  ElementKey,
  StatusKey,
  AffinityTypeKey,
  AmmunitionCategoryName,
  WeaponCategoryName,
  ShieldCategoryName,
  ArmorCategoryName,
} from "@/typings/types";

import {
  elementLabels,
  statusLabels,
  affinityTypeLabels,
  attributeLabels,
  elementIcons,
  statusIcons,
} from "@/typings/types";

import { GenerateAttribute } from "@/components/GenerateAttribute";
import GameIcon from "@/components/GameIcon";

import { getEquipmentData, saveEquipmentData } from "@/lib/localStorage";
import ItemImage from "@/components/ItemImage";
import { Badge } from "./ui/badge";

interface EditModalProps {
  item: EquipmentItem;
  onClose: (shouldRefresh?: boolean) => void;
}

export function EditModalContent({ item, onClose }: EditModalProps) {
  function normalizeItem(item: EquipmentItem): EquipmentItem {
    return {
      ...item,
      onhit:
        Array.isArray(item.onhit) && item.onhit.length === 12
          ? item.onhit
          : Array.from({ length: 12 }, () => []),
      onequip:
        Array.isArray(item.onequip) && item.onequip.length === 12
          ? item.onequip
          : Array.from({ length: 12 }, () => []),
      immunity:
        Array.isArray(item.immunity) && item.immunity.length === 12
          ? item.immunity
          : Array.from({ length: 12 }, () => []),
      affinity:
        Array.isArray(item.affinity) && item.affinity.length === 12
          ? item.affinity
          : Array.from({ length: 12 }, () => []),
      element:
        Array.isArray(item.element) && item.element.length === 12
          ? item.element
          : Array.from({ length: 12 }, () => ({
              name: "" as ElementKey,
              icon: 0,
            })),
    };
  }

  const [original, setOriginal] = useState<EquipmentItem>(() =>
    normalizeItem(JSON.parse(JSON.stringify(item)))
  );
  const [edited, setEdited] = useState<EquipmentItem>(() =>
    normalizeItem(JSON.parse(JSON.stringify(item)))
  );

  const [isEditedDirty, setIsEditedDirty] = useState(false);
  const [openedAttrKey, setOpenedAttrKey] = useState<AttributeKey | null>(null);

  useEffect(() => {
    const normalized = normalizeItem(JSON.parse(JSON.stringify(item)));
    setOriginal(normalized);
    setEdited(normalized);
  }, [item]);

  useEffect(() => {
    const isEqual = JSON.stringify(original) === JSON.stringify(edited);
    setIsEditedDirty(!isEqual);
  }, [edited, original]);

  // const attributeKeys = Object.keys(attributeLabels) as AttributeKey[];
  const handleAttrScaleChange = (
    key: AttributeKey,
    level: number,
    scaleVal: number
  ) => {
    setEdited((prev) => {
      const newAttr = { ...prev.attr };
      const entry = newAttr[key];
      if (entry) {
        const newScale = [...entry.scale];
        newScale[level] = scaleVal;
        newAttr[key] = { ...entry, scale: newScale };
      }
      return { ...prev, attr: newAttr };
    });
  };

  const allElementKeys = Object.keys(elementLabels) as ElementKey[];

  const handleElementChange = (level: number, val: ElementKey | "none") => {
    setEdited((prev) => {
      const newElements: ElementEntry[] = [...(prev.element || [])];

      while (newElements.length < 12) {
        newElements.push({ name: "" as ElementKey, icon: 0 });
      }

      newElements[level] =
        val === "none"
          ? { name: "" as ElementKey, icon: 0 }
          : { name: val, icon: elementIcons[val] ?? 0 };

      return { ...prev, element: newElements };
    });
  };

  const allStatusKeys = Object.keys(statusLabels) as StatusKey[];

  const handleMultiStatusAdd = (
    field: keyof Pick<EquipmentItem, "onhit" | "onequip" | "immunity">,
    level: number
  ) => {
    setEdited((prev) => {
      const newField = (prev[field] as StatusEntry[][]).slice();

      if (!Array.isArray(newField[level])) {
        newField[level] = [];
      }

      const usedNames = newField[level].map((e) => e.name);

      const nextKey = allStatusKeys.find((sk) => !usedNames.includes(sk));
      if (!nextKey) {
        return prev;
      }

      newField[level] = [
        ...newField[level],
        { name: nextKey, icon: statusIcons[nextKey] ?? 0 },
      ];

      return {
        ...prev,
        [field]: newField,
      } as EquipmentItem;
    });
  };

  const handleMultiStatusRemove = (
    field: keyof Pick<EquipmentItem, "onhit" | "onequip" | "immunity">,
    level: number,
    idx: number
  ) => {
    setEdited((prev) => {
      const newField = (prev[field] as StatusEntry[][]).slice();

      if (!Array.isArray(newField[level])) {
        newField[level] = [];
      }

      const lvlArr = newField[level]!.slice();
      lvlArr.splice(idx, 1);
      newField[level] = lvlArr;

      return {
        ...prev,
        [field]: newField,
      } as EquipmentItem;
    });
  };

  const handleMultiStatusChange = (
    field: keyof Pick<EquipmentItem, "onhit" | "onequip" | "immunity">,
    level: number,
    idx: number,
    val: StatusKey
  ) => {
    setEdited((prev) => {
      const newField = (prev[field] as StatusEntry[][]).slice();

      if (!Array.isArray(newField[level])) {
        newField[level] = [];
      }

      const lvlArr = newField[level]!.slice();
      lvlArr[idx] = { name: val, icon: statusIcons[val] ?? 0 };
      newField[level] = lvlArr;

      return {
        ...prev,
        [field]: newField,
      } as EquipmentItem;
    });
  };

  const allAffinityTypeKeys = Object.keys(
    affinityTypeLabels
  ) as AffinityTypeKey[];

  const handleAffinityAdd = (level: number) => {
    setEdited((prev) => {
      const newAffinity: AffinityEntry[][] = prev.affinity.map((lvl, i) => {
        if (i !== level) return lvl;

        const usedCombos = new Set<string>(
          lvl.map((e) => `${e.type}|${e.element}`)
        );

        let chosen: { type: AffinityTypeKey; element: ElementKey } | null =
          null;
        for (const t of allAffinityTypeKeys) {
          for (const eKey of allElementKeys) {
            const keyCombo = `${t}|${eKey}`;
            if (!usedCombos.has(keyCombo)) {
              chosen = { type: t as AffinityTypeKey, element: eKey };
              break;
            }
          }
          if (chosen) break;
        }
        if (!chosen) {
          return lvl;
        }

        return [
          ...lvl,
          {
            type: chosen.type,
            element: chosen.element,
            icon: elementIcons[chosen.element] ?? 0,
          },
        ];
      });
      return { ...prev, affinity: newAffinity };
    });
  };

  const handleAffinityRemove = (level: number, idx: number) => {
    setEdited((prev) => {
      const newAffinity: AffinityEntry[][] = prev.affinity.map((lvl, i) => {
        if (i === level) {
          const newArr = [...lvl];
          newArr.splice(idx, 1);
          return newArr;
        }
        return lvl;
      });
      return { ...prev, affinity: newAffinity };
    });
  };

  const handleAffinityChange = (
    level: number,
    idx: number,
    field: "type" | "element",
    val: string
  ) => {
    setEdited((prev) => {
      const newAffinity: AffinityEntry[][] = prev.affinity.map((lvl, i) => {
        if (i !== level) return lvl;

        const copy = [...lvl];
        const entry = { ...copy[idx] };

        if (field === "type") {
          entry.type = val as AffinityTypeKey;
        } else {
          entry.element = val as ElementKey;
        }
        entry.icon = elementIcons[entry.element] ?? 0;
        copy[idx] = entry;
        return copy;
      });
      return { ...prev, affinity: newAffinity };
    });
  };

  const handleSave = () => {
    const toSave: EquipmentItem = {
      ...edited,

      element: [...edited.element],

      onhit: edited.onhit.map((lvl) =>
        [...lvl].sort((a, b) => a.name.localeCompare(b.name))
      ),

      onequip: edited.onequip.map((lvl) =>
        [...lvl].sort((a, b) => a.name.localeCompare(b.name))
      ),

      immunity: edited.immunity.map((lvl) =>
        [...lvl].sort((a, b) => a.name.localeCompare(b.name))
      ),

      affinity: edited.affinity.map((lvl) =>
        [...lvl].sort((a, b) => {
          const cmpType = a.type.localeCompare(b.type);
          return cmpType !== 0 ? cmpType : a.element.localeCompare(b.element);
        })
      ),
    };

    const allData = getEquipmentData();
    const idx = allData.findIndex((i) => i.bit === toSave.bit);

    if (idx !== -1) {
      allData[idx] = toSave;
      saveEquipmentData(allData);
      setIsEditedDirty(false);

      toast.success("Item saved successfully", {
        description: `ID ${toSave.bit} (${toSave.name}) was updated.`,
      });
      onClose(true);
    } else {
      toast.error("Save failed", {
        description: "Something went wrong.",
      });
    }
  };

  const handleAutoScale = (key: AttributeKey, newScales: number[]) => {
    setEdited((prev) => {
      const newAttr = { ...prev.attr };
      const entry = newAttr[key];
      if (entry) {
        newAttr[key] = { ...entry, scale: newScales };
      }
      return { ...prev, attr: newAttr };
    });
  };

  const weaponCategories: WeaponCategoryName[] = [
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
    "Unarmed",
    "Unused",
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

  const ammoCategories: AmmunitionCategoryName[] = [
    "Arrow",
    "Bolt",
    "Shot",
    "Bomb",
  ];

  const getCategoryType = (category: string) => {
    if (weaponCategories.includes(category as WeaponCategoryName))
      return "weapon";
    if (shieldCategories.includes(category as ShieldCategoryName))
      return "shield";
    if (armorCategories.includes(category as ArmorCategoryName)) return "armor";
    if (ammoCategories.includes(category as AmmunitionCategoryName))
      return "ammo";
    return null;
  };

  const getValidAttributes = (category: string): AttributeKey[] => {
    const type = getCategoryType(category);
    if (type === "weapon") {
      return [
        "rge",
        "atk",
        "kb",
        "cmb",
        "evaw",
        "hit",
        "crg",
        "hp",
        "mp",
        "str",
        "mgk",
        "vit",
        "spd",
      ];
    }
    if (type === "shield") {
      return ["evas", "mres", "hp", "mp", "str", "mgk", "vit", "spd"];
    }
    if (type === "armor") {
      return ["def", "mres", "hp", "mp", "str", "mgk", "vit", "spd"];
    }
    if (type === "ammo") {
      return ["atk", "evaw", "hit", "hp", "mp", "str", "mgk", "vit", "spd"];
    }
    return [];
  };

  const supportsOnHit = (category: string) => {
    const type = getCategoryType(category);
    return type === "weapon" || type === "ammo";
  };

  const supportsOnEquip = (category: string) => {
    const type = getCategoryType(category);
    return type === "shield" || type === "armor";
  };

  const supportsImmunity = (category: string) => {
    const type = getCategoryType(category);
    return type === "shield" || type === "armor";
  };

  const supportsAffinity = (category: string) => {
    const type = getCategoryType(category);
    return type === "weapon" || type === "shield" || type === "armor";
  };

  return (
    <Dialog
      open={true}
      onOpenChange={(newState) => {
        if (!newState && isEditedDirty) {
          toast.warning("You have unsaved changes.", {
            description: "Please save or discard them first.",
          });
          return;
        }
        if (!newState) {
          onClose();
        }
      }}
    >
      <DialogContent className="flex flex-col h-full max-h-[80vh] w-full sm:max-w-[1160px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {edited.name} <Badge className="font-bold">{edited.category}</Badge>
          </DialogTitle>
          <DialogDescription>ID {edited.bit}</DialogDescription>
        </DialogHeader>

        <div className="grow">
          <Tabs defaultValue="account" className="flex flex-col w-full">
            <div className="flex flex-row justify-between">
              <TabsList className="mb-3 h-auto p-2">
                <TabsTrigger
                  value="details"
                  className="cursor-pointer hover:opacity-90 border-2"
                >
                  Details
                </TabsTrigger>
                {getValidAttributes(edited.category).length > 0 && (
                  <TabsTrigger
                    value="attributes"
                    className="cursor-pointer hover:opacity-90 border-2"
                  >
                    Attributes
                  </TabsTrigger>
                )}
                <TabsTrigger
                  value="elements"
                  className="cursor-pointer hover:opacity-90 border-2"
                >
                  Elements
                </TabsTrigger>
                {supportsOnHit(edited.category) && (
                  <TabsTrigger
                    value="onhit"
                    className="cursor-pointer hover:opacity-90 border-2"
                  >
                    On-Hit
                  </TabsTrigger>
                )}
                {supportsOnEquip(edited.category) && (
                  <TabsTrigger
                    value="onequip"
                    className="cursor-pointer hover:opacity-90 border-2"
                  >
                    On-Equip
                  </TabsTrigger>
                )}
                {supportsImmunity(edited.category) && (
                  <TabsTrigger
                    value="immunity"
                    className="cursor-pointer hover:opacity-90 border-2"
                  >
                    Immunity
                  </TabsTrigger>
                )}
                {supportsAffinity(edited.category) && (
                  <TabsTrigger
                    value="affinity"
                    className="cursor-pointer hover:opacity-90 border-2"
                  >
                    Affinity
                  </TabsTrigger>
                )}
              </TabsList>
              <div className="flex gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="cursor-pointer"
                      variant="outline"
                      disabled={!isEditedDirty}
                    >
                      Discard Changes
                      <Trash />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Discard all changes?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will restore the original item values. This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="cursor-pointer"
                        onClick={() => {
                          const updated = getEquipmentData().find(
                            (i) => i.bit === edited.bit
                          );
                          if (updated) {
                            setEdited(JSON.parse(JSON.stringify(updated)));
                          }
                          onClose();
                          toast("Changes discarded.");
                        }}
                      >
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  className="cursor-pointer"
                  onClick={handleSave}
                  disabled={!isEditedDirty}
                >
                  Save
                  <Save />
                </Button>
              </div>
            </div>

            <TabsContent value="details" className="flex flex-col gap-4 h-full">
              <h3 className="font-semibold">Details</h3>
              <Separator />
              <div className="flex flex-row border p-3 gap-4 rounded h-full items-start">
                <div className="flex border border-input overflow-hidden aspect-2/3 bg-black rounded-md">
                  <ItemImage
                    index={item.bit}
                    alt={edited.name}
                    width={106}
                    height={160}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Name</Label>
                      <p>{edited.name?.trim() ? edited.name : "None"}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="license">License</Label>
                      <p>{edited.license?.trim() ? edited.license : "None"}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="category">Category</Label>
                      <p>
                        {edited.category?.trim() ? edited.category : "None"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <p>{edited.notes?.trim() ? edited.notes : "None"}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="attributes" className="flex flex-col gap-4">
              <h3 className="font-semibold">Attributes</h3>
              <Separator />
              {getValidAttributes(edited.category).map((key) => {
                const entry = edited.attr[key] || {
                  value: 0,
                  scale: Array(12).fill(0),
                };
                const gridClass =
                  openedAttrKey === key
                    ? "grid grid-cols-6 gap-x-2 gap-y-3 pr-48 transition-all duration-200 ease-[cubic-bezier(0.5,0,0,1)]"
                    : "grid grid-cols-6 gap-x-2 gap-y-3 transition-all duration-200 ease-[cubic-bezier(0.5,0,0,1)]";
                return (
                  <div key={key} className="border p-3 rounded">
                    <div className="flex flex-row font-medium mb-3">
                      <div className="w-1/3">
                        <p>{attributeLabels[key]}</p>
                      </div>
                      <div className="w-1/3 flex justify-center">
                        <p>Original Value: {entry.value}</p>
                      </div>
                      <div className="w-1/3 flex justify-end">
                        <GenerateAttribute
                          attributeKey={key}
                          currentScales={entry.scale}
                          onGenerate={(newArray) =>
                            handleAutoScale(key, newArray)
                          }
                          onOpenChange={(isOpen) =>
                            setOpenedAttrKey(isOpen ? key : null)
                          }
                        />
                      </div>
                    </div>
                    <div className={gridClass}>
                      {entry.scale.map((val, idx) => (
                        <div key={idx} className="flex gap-2 flex-col">
                          <Label>Level {idx + 1}</Label>
                          <Input
                            type="number"
                            value={val}
                            onChange={(e) =>
                              handleAttrScaleChange(
                                key,
                                idx,
                                Number(e.target.value)
                              )
                            }
                            className="w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </TabsContent>

            <TabsContent value="elements" className="flex flex-col gap-4">
              <h3 className="font-semibold">Elements</h3>
              <Separator />
              <div className="grid grid-cols-6 gap-x-2 gap-y-3 border p-3 rounded">
                {Array.from({ length: 12 }).map((_, idx) => {
                  const entry = edited.element?.[idx];
                  const val = entry && entry.name ? entry.name : "none";

                  return (
                    <div key={idx} className="flex gap-2 flex-col">
                      <Label>Level {idx + 1}</Label>
                      <Select
                        value={val}
                        onValueChange={(v) =>
                          handleElementChange(idx, v as ElementKey | "none")
                        }
                      >
                        <SelectTrigger className="w-full cursor-pointer">
                          <SelectValue placeholder="None">
                            {val !== "none" && val in elementLabels
                              ? elementLabels[val as ElementKey]
                              : "None"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none" className="cursor-pointer">
                            None
                          </SelectItem>
                          {allElementKeys.map((ek) => (
                            <SelectItem
                              key={ek}
                              value={ek}
                              className="cursor-pointer"
                            >
                              <GameIcon type="elements" name={ek} size={16} />
                              {elementLabels[ek]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {(["onhit", "onequip", "immunity"] as const).map((field) => {
              const fieldArr = Array.isArray(edited[field])
                ? (edited[field] as StatusEntry[][])
                : [];
              return (
                <TabsContent
                  key={field}
                  value={field}
                  className="flex flex-col gap-4"
                >
                  <h3 className="font-semibold capitalize">{field}</h3>
                  <Separator />
                  <div className="space-y-4">
                    {fieldArr.map((lvlArr: StatusEntry[], lvlIdx: number) => (
                      <div key={lvlIdx} className="border p-3 rounded">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Level {lvlIdx + 1}</p>
                          <Button
                            size="sm"
                            className="cursor-pointer"
                            onClick={() => handleMultiStatusAdd(field, lvlIdx)}
                          >
                            Add
                            <Plus />
                          </Button>
                        </div>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          {lvlArr.map((entry, idx) => (
                            <div
                              key={idx}
                              className="flex border p-3 rounded items-center gap-2"
                            >
                              <Select
                                value={entry.name}
                                onValueChange={(v) =>
                                  handleMultiStatusChange(
                                    field,
                                    lvlIdx,
                                    idx,
                                    v as StatusKey
                                  )
                                }
                              >
                                <SelectTrigger className="w-100 cursor-pointer">
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent className="max-h-96">
                                  {allStatusKeys
                                    .filter((sk) => {
                                      const usedNames = lvlArr
                                        .map((e, j) =>
                                          j === idx ? null : e.name
                                        )
                                        .filter(
                                          (n): n is StatusKey => n !== null
                                        );
                                      return (
                                        sk === entry.name ||
                                        !usedNames.includes(sk)
                                      );
                                    })
                                    .map((sk) => (
                                      <SelectItem
                                        key={sk}
                                        value={sk}
                                        className="cursor-pointer"
                                      >
                                        <div className="flex items-center gap-2">
                                          <GameIcon
                                            type="status"
                                            name={sk}
                                            size={16}
                                          />
                                          <span>{statusLabels[sk]}</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                              <Button
                                size="icon"
                                variant="destructive"
                                className="cursor-pointer hover:opacity-90"
                                onClick={() =>
                                  handleMultiStatusRemove(field, lvlIdx, idx)
                                }
                              >
                                <Trash />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              );
            })}

            <TabsContent value="affinity" className="flex flex-col gap-4">
              <h3 className="font-semibold">Affinity</h3>
              <Separator />
              <div className="space-y-4">
                {edited.affinity.map((lvl, lvlIdx) => (
                  <div key={lvlIdx} className="border p-3 rounded">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Level {lvlIdx + 1}</p>
                      <Button
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => handleAffinityAdd(lvlIdx)}
                      >
                        Add
                        <Plus />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {lvl.map((entry, idx) => {
                        const usedCombos = new Set<string>(
                          lvl
                            .map((e, j) =>
                              j === idx ? null : `${e.type}|${e.element}`
                            )
                            .filter((x): x is string => x !== null)
                        );

                        return (
                          <div
                            key={idx}
                            className="flex border p-3 items-center gap-2 rounded-lg"
                          >
                            <Select
                              value={entry.type}
                              onValueChange={(v) =>
                                handleAffinityChange(lvlIdx, idx, "type", v)
                              }
                            >
                              <SelectTrigger className="w-full cursor-pointer">
                                <SelectValue placeholder="Type" />
                              </SelectTrigger>
                              <SelectContent>
                                {allAffinityTypeKeys
                                  .filter((atk) => {
                                    const combo = `${atk}|${entry.element}`;
                                    return (
                                      atk === entry.type ||
                                      !usedCombos.has(combo)
                                    );
                                  })
                                  .map((atk) => (
                                    <SelectItem
                                      key={atk}
                                      value={atk}
                                      className="cursor-pointer"
                                    >
                                      {affinityTypeLabels[atk]}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>

                            <Select
                              value={entry.element}
                              onValueChange={(v) =>
                                handleAffinityChange(lvlIdx, idx, "element", v)
                              }
                            >
                              <SelectTrigger className="w-full cursor-pointer">
                                <SelectValue placeholder="Element" />
                              </SelectTrigger>
                              <SelectContent>
                                {allElementKeys
                                  .filter((ek) => {
                                    const combo = `${entry.type}|${ek}`;
                                    return (
                                      ek === entry.element ||
                                      !usedCombos.has(combo)
                                    );
                                  })
                                  .map((ek) => (
                                    <SelectItem
                                      key={ek}
                                      value={ek}
                                      className="cursor-pointer"
                                    >
                                      <GameIcon
                                        type="elements"
                                        name={ek}
                                        size={16}
                                      />
                                      {elementLabels[ek]}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>

                            <Button
                              size="icon"
                              variant="destructive"
                              className="cursor-pointer hover:opacity-90"
                              onClick={() => handleAffinityRemove(lvlIdx, idx)}
                            >
                              <Trash />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
