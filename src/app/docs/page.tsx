"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function DocsPage() {
  const [tab, setTab] = useState("attributes");

  return (
    <div className="flex w-full">
      <div className="w-60 border-r p-4">
        <div className="sticky top-[6rem] pt-4">
          <Tabs value={tab} onValueChange={setTab} className="w-full sticky">
            <h3 className="py-2 px-6 font-semibold">Docs</h3>
            <TabsList className="flex flex-col items-start gap-2 w-full h-auto bg-transparent">
              <TabsTrigger
                className="w-full flex justify-start py-2 px-6 cursor-pointer hover:opacity-90 border-0"
                value="attributes"
              >
                Attributes
              </TabsTrigger>
              <TabsTrigger
                className="w-full flex justify-start py-2 px-6 cursor-pointer hover:opacity-90 border-0"
                value="elements"
              >
                Elements
              </TabsTrigger>
              <TabsTrigger
                className="w-full flex justify-start py-2 px-6 cursor-pointer hover:opacity-90 border-0"
                value="onhit"
              >
                On-Hit
              </TabsTrigger>
              <TabsTrigger
                className="w-full flex justify-start py-2 px-6 cursor-pointer hover:opacity-90 border-0"
                value="onequip"
              >
                On-Equip
              </TabsTrigger>
              <TabsTrigger
                className="w-full flex justify-start py-2 px-6 cursor-pointer hover:opacity-90 border-0"
                value="immunity"
              >
                Immunity
              </TabsTrigger>
              <TabsTrigger
                className="w-full flex justify-start py-2 px-6 cursor-pointer hover:opacity-90 border-0"
                value="affinity"
              >
                Affinity
              </TabsTrigger>
              <TabsTrigger
                className="w-full flex justify-start py-2 px-6 cursor-pointer hover:opacity-90 border-0"
                value="issues"
              >
                Possible Issues
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="flex-1 p-10">
        <Tabs value={tab} className="w-full">
          <TabsContent value="attributes">
            <h1 className="text-2xl font-bold mb-4">Equipment Attributes</h1>

            <p className="text-muted-foreground mb-2">
              Each piece of equipment can be configured with up to 16 attributes
              that scale from level 1 to 12. Most attributes accept values from
              0 to 255, while a few—like percentages—are limited to 0–100.
            </p>

            <Separator className="my-4" />

            <h2 className="text-xl font-semibold mb-2">List of Attributes</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Range</h3>
                <p className="text-muted-foreground">
                  Distance needed between user and target to land a hit. Higher
                  values allow more reach.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Value range: 0 ~ 255
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Attack</h3>
                <p className="text-muted-foreground">
                  Base physical damage dealt by the weapon.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Value range: 0 ~ 255
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Knockback</h3>
                <p className="text-muted-foreground">
                  Chance to knock small enemies back and briefly stun them.
                  Bosses and large foes are immune.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Value range: 0 ~ 100
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Combo / Critical</h3>
                <p className="text-muted-foreground">
                  Chance to trigger multi-hits (melee) or critical hits (ranged
                  weapons).
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Value range: 0 ~ 100
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Evade (S)</h3>
                <p className="text-muted-foreground">
                  Shield-based evasion rate. Only applies to shields.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Value range: 0 ~ 100
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Evade (W)</h3>
                <p className="text-muted-foreground">
                  Weapon-based evasion rate. Only applies to weapons.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Value range: 0 ~ 100
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Hit-Rate</h3>
                <p className="text-muted-foreground">
                  Chance to successfully land a physical hit. Also influences
                  combo consistency.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Value range: 0 ~ 100%
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Charge</h3>
                <p className="text-muted-foreground">
                  Time it takes for the action bar to fill. Lower values mean
                  faster actions.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Value range: 0 ~ 255
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Magick Resist</h3>
                <p className="text-muted-foreground">
                  Reduces damage taken from magick attacks.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Value range: 0 ~ 255
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Defense</h3>
                <p className="text-muted-foreground">
                  Reduces physical damage received.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Value range: 0 ~ 255
                </p>
              </div>

              <div>
                <h3 className="font-semibold">HP</h3>
                <p className="text-muted-foreground">
                  Boosts maximum HP while the item is equipped.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Value range: 0 ~ 255
                </p>
              </div>

              <div>
                <h3 className="font-semibold">MP</h3>
                <p className="text-muted-foreground">
                  Boosts maximum MP while the item is equipped.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Value range: 0 ~ 255
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Strength</h3>
                <p className="text-muted-foreground">
                  Improves physical damage scaling.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Value range: 0 ~ 255
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Magick Power</h3>
                <p className="text-muted-foreground">
                  Improves damage and healing from magick spells.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Value range: 0 ~ 255
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Vitality</h3>
                <p className="text-muted-foreground">
                  Helps resist debuffs and improves some defensive effects.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Value range: 0 ~ 255
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Speed</h3>
                <p className="text-muted-foreground">
                  Reduces Charge Time and increases action frequency.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Value range: 0 ~ 255
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Augment</h3>
                <p className="text-muted-foreground">
                  Enables special passive effects or flags related to the item.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Value range: 0 ~ 255
                </p>
              </div>
            </div>

            <Separator className="my-4" />

            <h2 className="text-xl font-semibold mb-2">Adjustment Methods</h2>

            <div className="space-y-4 mt-6">
              <div>
                <h3 className="font-semibold">Manual</h3>
                <p className="text-muted-foreground">
                  Define a custom value for each level individually.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  If the objective is full control over each level.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Auto Scale – Linear</h3>
                <p className="text-muted-foreground">
                  Choose start and end values. The system evenly distributes
                  values across levels.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  If the objective is a smooth, uniform progression.
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Auto Scale – Factor</h3>
                <p className="text-muted-foreground">
                  Define a curve that applies exponential or decelerating
                  scaling across levels.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  If the objective is power spikes or late-game boosts.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="elements">
            <h1 className="text-2xl font-bold mb-4">Element Attributes</h1>
            <p className="text-muted-foreground mb-2">
              Define per-level elemental properties. Ex: from level 8 onward,
              set
              <Badge>fire</Badge> and earlier levels as <Badge>none</Badge>.
            </p>
            <p className="text-muted-foreground">
              Only one element per level is allowed.
            </p>
          </TabsContent>

          <TabsContent value="onhit">
            <h1 className="text-2xl font-bold mb-4">On-Hit Attributes</h1>
            <p className="text-muted-foreground">
              Apply status effects on hit (e.g. <Badge>Poison</Badge>,{" "}
              <Badge>Sap</Badge>). Multiple effects allowed.
            </p>
          </TabsContent>

          <TabsContent value="onequip">
            <h1 className="text-2xl font-bold mb-4">On-Equip Attributes</h1>
            <p className="text-muted-foreground">
              Apply effects to the player while the equipment is equipped.
            </p>
          </TabsContent>

          <TabsContent value="immunity">
            <h1 className="text-2xl font-bold mb-4">Immunity Attributes</h1>
            <p className="text-muted-foreground">
              Grants permanent immunities to specific status effects while
              equipped.
            </p>
          </TabsContent>

          <TabsContent value="affinity">
            <h1 className="text-2xl font-bold mb-4">Affinity Attributes</h1>
            <p className="text-muted-foreground mb-2">
              Define elemental reactions:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>Absorb</li>
              <li>Immune</li>
              <li>Half</li>
              <li>Weak</li>
              <li>Potency</li>
            </ul>
            <p className="text-muted-foreground">
              Ex: Absorb <Badge>fire</Badge> starting level 7 by applying{" "}
              <Badge>absorb</Badge> fire from level 7+.
            </p>
          </TabsContent>

          <TabsContent value="issues">
            <h1 className="text-2xl font-bold mb-4">Possible Problems</h1>
            <p className="text-muted-foreground">
              Some effects may conflict or overlap, especially when assigning
              multiple status or affinity changes in sequence.
            </p>
            <p className="text-muted-foreground">
              Always review your progression visually to catch unexpected
              values.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
