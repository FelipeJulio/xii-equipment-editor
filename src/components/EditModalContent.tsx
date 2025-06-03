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
import { Textarea } from "@/components/ui/textarea";
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
} from "@/typings/types";

import {
  elementLabels,
  statusLabels,
  affinityTypeLabels,
  attributeLabels,
  elementIcons,
  statusIcons,
  affinityIcons,
} from "@/typings/types";

import { GenerateAttribute } from "./GenerateAttribute";
import GameIcon from "./GameIcon";

import { getEquipmentData, saveEquipmentData } from "@/lib/localStorage";
import ItemImage from "./ItemImage";

interface EditModalProps {
  item: EquipmentItem;
  onClose: () => void;
}

export function EditModalContent({ item, onClose }: EditModalProps) {
  const [edited, setEdited] = useState<EquipmentItem>(() => {
    return JSON.parse(JSON.stringify(item));
  });

  const [isEditedDirty, setIsEditedDirty] = useState(false);
  const [openedAttrKey, setOpenedAttrKey] = useState<AttributeKey | null>(null);

  useEffect(() => {
    setEdited(JSON.parse(JSON.stringify(item)));
  }, [item]);

  useEffect(() => {
    const isEqual = JSON.stringify(item) === JSON.stringify(edited);
    setIsEditedDirty(!isEqual);
  }, [edited, item]);

  const attributeKeys = Object.keys(attributeLabels) as AttributeKey[];
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
            icon: affinityIcons[chosen.type] ?? 0,
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
          entry.icon = affinityIcons[entry.type] ?? 0;
        } else {
          entry.element = val as ElementKey;
        }
        copy[idx] = entry;
        return copy;
      });
      return { ...prev, affinity: newAffinity };
    });
  };

  const handleSave = () => {
    const toSave: EquipmentItem = {
      ...edited,

      onhit: edited.onhit.map((lvl) =>
        [...lvl].sort((a, b) => a.name.localeCompare(b.name))
      ),

      onequip: edited.onequip.map((lvl) =>
        [...lvl].sort((a, b) => a.name.localeCompare(b.name))
      ),

      immunity: edited.immunity.map((lvl) =>
        [...lvl].sort((a, b) => a.name.localeCompare(b.name))
      ),

      element: edited.element
        .map((entry) => ({ ...entry }))
        .sort((a, b) => a.name.localeCompare(b.name)),

      affinity: edited.affinity.map((lvl) =>
        [...lvl].sort((a, b) => {
          const cmpType = a.type.localeCompare(b.type);
          if (cmpType !== 0) return cmpType;
          return a.element.localeCompare(b.element);
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
      onClose();
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
          <DialogTitle>{edited.name}</DialogTitle>
          <DialogDescription>ID {edited.bit}</DialogDescription>
        </DialogHeader>

        <div className="grow">
          <Tabs defaultValue="account" className="flex flex-col w-full">
            <div className="flex flex-row justify-between">
              <TabsList className="mb-3">
                <TabsTrigger value="details" className="cursor-pointer">
                  Details
                </TabsTrigger>
                <TabsTrigger value="attributes" className="cursor-pointer">
                  Attributes
                </TabsTrigger>
                <TabsTrigger value="elements" className="cursor-pointer">
                  Elements
                </TabsTrigger>
                <TabsTrigger value="onhit" className="cursor-pointer">
                  On-Hit
                </TabsTrigger>
                <TabsTrigger value="onequip" className="cursor-pointer">
                  On-Equip
                </TabsTrigger>
                <TabsTrigger value="immunity" className="cursor-pointer">
                  Immunity
                </TabsTrigger>
                <TabsTrigger value="affinity" className="cursor-pointer">
                  Affinity
                </TabsTrigger>
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

            <TabsContent value="details" className="flex flex-col gap-2 h-full">
              <h3 className="font-semibold">Details</h3>
              <Separator />
              <div className="flex flex-row border p-3 gap-4 rounded h-full items-start">
                <div className="flex border  overflow-hidden aspect-2/3 bg-black rounded-md">
                  <ItemImage
                    index={item.bit}
                    alt={`Item ${item.bit}`}
                    width={106}
                    height={106}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        disabled
                        value={edited.name}
                        onChange={(e) =>
                          setEdited((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="license">License</Label>
                      <Input
                        id="license"
                        disabled
                        value={edited.license}
                        onChange={(e) =>
                          setEdited((prev) => ({
                            ...prev,
                            license: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        disabled
                        value={edited.category}
                        onChange={(e) =>
                          setEdited((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      disabled
                      maxLength={110}
                      value={edited.notes}
                      onChange={(e) =>
                        setEdited((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {edited.notes.length}/110
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="attributes" className="flex flex-col gap-2">
              <h3 className="font-semibold">Attributes</h3>
              <Separator />
              {attributeKeys.map((key) => {
                const entry = edited.attr[key] || {
                  value: 0,
                  scale: Array(12).fill(0),
                };
                const gridClass =
                  openedAttrKey === key
                    ? "grid grid-cols-6 gap-x-2 gap-y-3 pr-48"
                    : "grid grid-cols-6 gap-x-2 gap-y-3";
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
                                            type="statusEffect"
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
