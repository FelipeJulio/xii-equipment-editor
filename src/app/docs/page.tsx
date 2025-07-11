"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GameIcon from "@/components/GameIcon";

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
              <TabsTrigger
                className="w-full flex justify-start py-2 px-6 cursor-pointer hover:opacity-90 border-0"
                value="apply"
              >
                Apply progression
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
              Each piece of equipment can be configured with attributes, ranging
              from level 1 to 12. Most attributes accept values from 0 to 255,
              while some, such as percentages, are limited to 0 to 100.
            </p>

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

            <Separator className="my-4" />

            <h2 className="text-xl font-semibold mb-2">List of Attributes</h2>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Attribute</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Range</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <strong>Range</strong>
                  </TableCell>
                  <TableCell>
                    Distance needed between user and target to land a hit.
                  </TableCell>
                  <TableCell className="text-right">0 ~ 255</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Attack</strong>
                  </TableCell>
                  <TableCell>
                    Base physical damage dealt by the weapon.
                  </TableCell>
                  <TableCell className="text-right">0 ~ 255</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Knockback Chance</strong>
                  </TableCell>
                  <TableCell>
                    Chance to knock small enemies back and briefly stun them.
                  </TableCell>
                  <TableCell className="text-right">0 ~ 100</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Combo / Critical</strong>
                  </TableCell>
                  <TableCell>
                    Chance to trigger multi-hits or critical hits.
                  </TableCell>
                  <TableCell className="text-right">0 ~ 100</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Evade</strong>
                  </TableCell>
                  <TableCell>
                    Reduces chance of being hit by physical attacks.
                  </TableCell>
                  <TableCell className="text-right">0 ~ 100</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Hit-Rate</strong>
                  </TableCell>
                  <TableCell>
                    Chance to successfully land a physical hit.
                  </TableCell>
                  <TableCell className="text-right">0 ~ 100</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Charge Time</strong>
                  </TableCell>
                  <TableCell>
                    Time it takes for the action bar to fill.
                  </TableCell>
                  <TableCell className="text-right">0 ~ 255</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Magick Resist</strong>
                  </TableCell>
                  <TableCell>
                    Reduces damage taken from magick attacks.
                  </TableCell>
                  <TableCell className="text-right">0 ~ 255</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Defense</strong>
                  </TableCell>
                  <TableCell>Reduces physical damage received.</TableCell>
                  <TableCell className="text-right">0 ~ 255</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>HP</strong>
                  </TableCell>
                  <TableCell>
                    Boosts maximum HP while the item is equipped.
                  </TableCell>
                  <TableCell className="text-right">0 ~ 255</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>MP</strong>
                  </TableCell>
                  <TableCell>
                    Boosts maximum MP while the item is equipped.
                  </TableCell>
                  <TableCell className="text-right">0 ~ 255</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Strength</strong>
                  </TableCell>
                  <TableCell>Improves physical damage scaling.</TableCell>
                  <TableCell className="text-right">0 ~ 255</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Magick Power</strong>
                  </TableCell>
                  <TableCell>
                    Improves damage and healing from magick spells.
                  </TableCell>
                  <TableCell className="text-right">0 ~ 255</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Vitality</strong>
                  </TableCell>
                  <TableCell>
                    Helps resist debuffs and improves defensive effects.
                  </TableCell>
                  <TableCell className="text-right">0 ~ 255</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Speed</strong>
                  </TableCell>
                  <TableCell>
                    Reduces Charge Time and increases action frequency.
                  </TableCell>
                  <TableCell className="text-right">0 ~ 255</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Augment</strong>
                  </TableCell>
                  <TableCell>
                    Grants passive effects or internal flags for special traits.
                  </TableCell>
                  <TableCell className="text-right">0 ~ 255</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="elements">
            <h1 className="text-2xl font-bold mb-4">Element Attributes</h1>

            <p className="text-muted-foreground mb-2">
              Each equipment level can define one elemental property, or remain
              neutral. Elemental affinities determine how attacks interact with
              enemy weaknesses, resistances, absorption, or immunity.
            </p>

            <p className="text-muted-foreground mb-2">
              Only <strong>one element per level</strong> is allowed. Setting
              multiple elements on the same level has no additional effect.
            </p>

            <p className="text-muted-foreground mb-4">
              For example, a sword might deal <Badge>Fire</Badge> damage from
              level 8 onward, while earlier levels remain <Badge>None</Badge>.
            </p>

            <Separator className="my-4" />

            <h2 className="text-xl font-semibold mb-2">List of Elements</h2>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[160px]">Element</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <GameIcon type="elements" name="fire" size={16} />
                      <strong>Fire</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    Opposes <strong>Water</strong>. Enemies affected by{" "}
                    <strong>Oil</strong> take triple fire damage.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <GameIcon type="elements" name="ice" size={16} />
                      <strong>Ice</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    Opposes <strong>Lightning</strong>. Often linked with spells
                    like <i>Blizzaga</i> and icy weapons.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <GameIcon type="elements" name="lightning" size={16} />
                      <strong>Lightning</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    Opposes <strong>Ice</strong>. Common among thunder-elemental
                    weapons and enemy attacks.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <GameIcon type="elements" name="earth" size={16} />
                      <strong>Earth</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    Opposes <strong>Wind</strong>. Not used in magick, but seen
                    in weapons like <i>Gaia Rod</i>.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <GameIcon type="elements" name="wind" size={16} />
                      <strong>Wind</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    Opposes <strong>Earth</strong>. Found in Aero spells and
                    various polearm weapons.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <GameIcon type="elements" name="water" size={16} />
                      <strong>Water</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    Opposes <strong>Fire</strong>. Includes Aqua-based attacks
                    and some esper skills.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <GameIcon type="elements" name="holy" size={16} />
                      <strong>Holy</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    Opposes <strong>Dark</strong>. Used in high-level white
                    magick and powerful weapons.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <GameIcon type="elements" name="dark" size={16} />
                      <strong>Dark</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    Opposes <strong>Holy</strong>. Includes dark-based magick
                    and ninja swords in original versions.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="onhit">
            <h1 className="text-2xl font-bold mb-4">On-Hit Effects</h1>

            <p className="text-muted-foreground mb-2">
              On-Hit effects are triggered passively when a character attacks
              using a weapon or ammunition. These effects are mostly used in
              <strong> weapons and ranged projectiles </strong> to apply
              <strong> negative status conditions </strong> to enemies on
              contact.
            </p>

            <p className="text-muted-foreground mb-2">
              There is <strong>no hard limit</strong> on how many effects can be
              applied per level, but not all combinations are guaranteed to
              function simultaneously depending on the game&apos;s internal
              handling.
            </p>

            <p className="text-muted-foreground mb-4">
              Effects are defined per level. For example, you may apply{" "}
              <Badge>Poison</Badge> and <Badge>Blind</Badge>
              at level 3, while leaving earlier levels empty.
            </p>

            <Separator className="my-4" />

            <h2 className="text-xl font-semibold mb-2">
              Available Status Effects
            </h2>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[160px]">Effect</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["ko", "KO", "Instant defeat; removes target from battle."],
                  [
                    "stone",
                    "Stone",
                    "Defeated state caused by petrify countdown expiring.",
                  ],
                  [
                    "petrify",
                    "Petrify",
                    "Gradually turns target to stone; reduces physical interaction.",
                  ],
                  [
                    "stop",
                    "Stop",
                    "Freezes time; all actions and effects paused.",
                  ],
                  ["sleep", "Sleep", "Prevents actions until hit or expired."],
                  [
                    "confuse",
                    "Confuse",
                    "Causes random behavior and friendly fire.",
                  ],
                  [
                    "doom",
                    "Doom",
                    "Target is KO'd after a countdown unless cured.",
                  ],
                  ["blind", "Blind", "Reduces physical hit accuracy by 50%."],
                  [
                    "poison",
                    "Poison",
                    "Deals periodic damage based on max HP.",
                  ],
                  ["silence", "Silence", "Prevents the use of magick."],
                  ["sap", "Sap", "Drains fixed HP over time (10 HP/s)."],
                  ["oil", "Oil", "Triples fire damage taken by the target."],
                  ["reverse", "Reverse", "Swaps healing and damage effects."],
                  [
                    "disable",
                    "Disable",
                    "Prevents all actions; target can still move.",
                  ],
                  [
                    "immobilize",
                    "Immobilize",
                    "Prevents movement, but allows actions.",
                  ],
                  ["slow", "Slow", "Halves the rate of action charging."],
                  [
                    "disease",
                    "Disease",
                    "Sets current HP as max HP; prevents healing.",
                  ],
                  ["lure", "Lure", "Draws enemy aggression toward the wearer."],
                  [
                    "protect",
                    "Protect",
                    "Reduces physical damage taken by 25%.",
                  ],
                  [
                    "shell",
                    "Shell",
                    "Reduces magick damage and status success rate.",
                  ],
                  ["haste", "Haste", "Increases action charge speed by 50%."],
                  [
                    "bravery",
                    "Bravery",
                    "Increases physical damage dealt (×1.3).",
                  ],
                  [
                    "faith",
                    "Faith",
                    "Increases magick damage and healing (×1.3 / ×1.5).",
                  ],
                  [
                    "reflect",
                    "Reflect",
                    "Reflects magick spells back to caster.",
                  ],
                  [
                    "invisible",
                    "Invisible",
                    "Prevents targeting unless detected.",
                  ],
                  ["regen", "Regen", "Restores HP over time."],
                  [
                    "float",
                    "Float",
                    "Avoids traps and nullifies earth attacks.",
                  ],
                  [
                    "berserk",
                    "Berserk",
                    "Doubles speed and boosts physical damage; no control.",
                  ],
                  [
                    "bubble",
                    "Bubble",
                    "Doubles max HP and protects from Disease.",
                  ],
                  [
                    "hp_critical",
                    "HP Critical",
                    "Triggers effects at low HP (<15%).",
                  ],
                  ["libra", "Libra", "Reveals enemy stats and traps."],
                  [
                    "x_zone",
                    "X-Zone",
                    "Removes character from battle permanently.",
                  ],
                ].map(([key, label, desc]) => (
                  <TableRow key={key}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <GameIcon type="status" name={key} size={16} />
                        <strong>{label}</strong>
                      </div>
                    </TableCell>
                    <TableCell>{desc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="onequip">
            <h1 className="text-2xl font-bold mb-4">On-Equip Effects</h1>

            <p className="text-muted-foreground mb-2">
              On-Equip effects are activated passively when a character equips a
              piece of gear. These effects are mostly used in{" "}
              <strong>armor, shields, and accessories</strong> to grant helpful
              status buffs or auto-status at the start of battle.
            </p>

            <p className="text-muted-foreground mb-2">
              There is <strong>no hard limit</strong> on how many effects can be
              applied per level, but some effects may override others or behave
              inconsistently depending on the game&apos;s internal logic.
            </p>

            <p className="text-muted-foreground mb-4">
              Effects are defined per level. For example, an armor piece could
              grant <Badge>Protect</Badge> and <Badge>Regen</Badge> at level 6
              and above, while offering no bonuses at earlier levels.
            </p>

            <Separator className="my-4" />

            <h2 className="text-xl font-semibold mb-2">
              Available Status Effects
            </h2>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Effect</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["ko", "KO", "Instant defeat; removes target from battle."],
                  [
                    "stone",
                    "Stone",
                    "Defeated state caused by petrify countdown expiring.",
                  ],
                  [
                    "petrify",
                    "Petrify",
                    "Gradually turns target to stone; reduces physical interaction.",
                  ],
                  [
                    "stop",
                    "Stop",
                    "Freezes time; all actions and effects paused.",
                  ],
                  ["sleep", "Sleep", "Prevents actions until hit or expired."],
                  [
                    "confuse",
                    "Confuse",
                    "Causes random behavior and friendly fire.",
                  ],
                  [
                    "doom",
                    "Doom",
                    "Target is KO'd after a countdown unless cured.",
                  ],
                  ["blind", "Blind", "Reduces physical hit accuracy by 50%."],
                  [
                    "poison",
                    "Poison",
                    "Deals periodic damage based on max HP.",
                  ],
                  ["silence", "Silence", "Prevents the use of magick."],
                  ["sap", "Sap", "Drains fixed HP over time (10 HP/s)."],
                  ["oil", "Oil", "Triples fire damage taken by the target."],
                  ["reverse", "Reverse", "Swaps healing and damage effects."],
                  [
                    "disable",
                    "Disable",
                    "Prevents all actions; target can still move.",
                  ],
                  [
                    "immobilize",
                    "Immobilize",
                    "Prevents movement, but allows actions.",
                  ],
                  ["slow", "Slow", "Halves the rate of action charging."],
                  [
                    "disease",
                    "Disease",
                    "Sets current HP as max HP; prevents healing.",
                  ],
                  ["lure", "Lure", "Draws enemy aggression toward the wearer."],
                  [
                    "protect",
                    "Protect",
                    "Reduces physical damage taken by 25%.",
                  ],
                  [
                    "shell",
                    "Shell",
                    "Reduces magick damage and status success rate.",
                  ],
                  ["haste", "Haste", "Increases action charge speed by 50%."],
                  [
                    "bravery",
                    "Bravery",
                    "Increases physical damage dealt (×1.3).",
                  ],
                  [
                    "faith",
                    "Faith",
                    "Increases magick damage and healing (×1.3 / ×1.5).",
                  ],
                  [
                    "reflect",
                    "Reflect",
                    "Reflects magick spells back to caster.",
                  ],
                  [
                    "invisible",
                    "Invisible",
                    "Prevents targeting unless detected.",
                  ],
                  ["regen", "Regen", "Restores HP over time."],
                  [
                    "float",
                    "Float",
                    "Avoids traps and nullifies earth attacks.",
                  ],
                  [
                    "berserk",
                    "Berserk",
                    "Doubles speed and boosts physical damage; no control.",
                  ],
                  [
                    "bubble",
                    "Bubble",
                    "Doubles max HP and protects from Disease.",
                  ],
                  [
                    "hp_critical",
                    "HP Critical",
                    "Triggers effects at low HP (<15%).",
                  ],
                  ["libra", "Libra", "Reveals enemy stats and traps."],
                  [
                    "x_zone",
                    "X-Zone",
                    "Removes character from battle permanently.",
                  ],
                ].map(([key, label, desc]) => (
                  <TableRow key={key}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <GameIcon type="status" name={key} size={16} />
                        <strong>{label}</strong>
                      </div>
                    </TableCell>
                    <TableCell>{desc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="immunity">
            <h1 className="text-2xl font-bold mb-4">Immunity Effects</h1>

            <p className="text-muted-foreground mb-2">
              Immunity effects passively protect a character from specific{" "}
              <strong>negative status conditions</strong> while a piece of gear
              is equipped. These are most commonly granted by{" "}
              <strong>accessories</strong>, though some shields and armor may
              also offer protection.
            </p>

            <p className="text-muted-foreground mb-2">
              Immunities are applied immediately upon equipping and remain
              active as long as the gear is worn. The effect prevents the status
              from being inflicted altogether, regardless of source or chance.
            </p>

            <p className="text-muted-foreground mb-4">
              Effects are defined per level. For example, an accessory could
              grant immunity to <Badge>Silence</Badge> and{" "}
              <Badge>Confuse</Badge> at level 7 and above, while offering no
              protection at earlier levels.
            </p>

            <Separator className="my-4" />

            <h2 className="text-xl font-semibold mb-2">
              Available Status Immunities
            </h2>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Status</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["ko", "KO", "Instant defeat; removes target from battle."],
                  [
                    "stone",
                    "Stone",
                    "Defeated state caused by petrify countdown expiring.",
                  ],
                  [
                    "petrify",
                    "Petrify",
                    "Gradually turns target to stone; reduces physical interaction.",
                  ],
                  [
                    "stop",
                    "Stop",
                    "Freezes time; all actions and effects paused.",
                  ],
                  ["sleep", "Sleep", "Prevents actions until hit or expired."],
                  [
                    "confuse",
                    "Confuse",
                    "Causes random behavior and friendly fire.",
                  ],
                  [
                    "doom",
                    "Doom",
                    "Target is KO'd after a countdown unless cured.",
                  ],
                  ["blind", "Blind", "Reduces physical hit accuracy by 50%."],
                  [
                    "poison",
                    "Poison",
                    "Deals periodic damage based on max HP.",
                  ],
                  ["silence", "Silence", "Prevents the use of magick."],
                  ["sap", "Sap", "Drains fixed HP over time (10 HP/s)."],
                  ["oil", "Oil", "Triples fire damage taken by the target."],
                  ["reverse", "Reverse", "Swaps healing and damage effects."],
                  [
                    "disable",
                    "Disable",
                    "Prevents all actions; target can still move.",
                  ],
                  [
                    "immobilize",
                    "Immobilize",
                    "Prevents movement, but allows actions.",
                  ],
                  ["slow", "Slow", "Halves the rate of action charging."],
                  [
                    "disease",
                    "Disease",
                    "Sets current HP as max HP; prevents healing.",
                  ],
                  ["lure", "Lure", "Draws enemy aggression toward the wearer."],
                  [
                    "berserk",
                    "Berserk",
                    "Doubles speed and boosts physical damage; no control.",
                  ],
                  [
                    "x_zone",
                    "X-Zone",
                    "Removes character from battle permanently.",
                  ],
                ].map(([key, label, desc]) => (
                  <TableRow key={key}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <GameIcon type="status" name={key} size={16} />
                        <strong>{label}</strong>
                      </div>
                    </TableCell>
                    <TableCell>{desc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="affinity">
            <h1 className="text-2xl font-bold mb-4">Affinity Attributes</h1>

            <p className="text-muted-foreground mb-2">
              Affinity defines how a piece of equipment interacts with specific{" "}
              <strong>elemental properties</strong>. When equipped, it can alter
              how much damage a character takes or deals with that element.
            </p>

            <p className="text-muted-foreground mb-2">
              These effects are especially common on <strong>staves</strong>,{" "}
              <strong>bows</strong>, and certain armor pieces like{" "}
              <strong>robes</strong>. They apply to both physical and magickal
              elemental damage, but do not stack.
            </p>

            <p className="text-muted-foreground mb-4">
              Effects are defined per level. For example, a character may{" "}
              <Badge>Absorb</Badge>{" "}
              <GameIcon type="elements" name="fire" size={14} /> fire starting
              from level 7 onward.
            </p>

            <Separator className="my-4" />

            <h2 className="text-xl font-semibold mb-2">Affinity Types</h2>

            <Table className="mb-6">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Affinity Type</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <strong>Absorb</strong>
                  </TableCell>
                  <TableCell>
                    Heals the character instead of taking damage.
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Immune</strong>
                  </TableCell>
                  <TableCell>Negates all damage from the element.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Half</strong>
                  </TableCell>
                  <TableCell>Takes only 50% of the damage.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Weak</strong>
                  </TableCell>
                  <TableCell>Takes 200% of the damage.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Potency</strong>
                  </TableCell>
                  <TableCell>
                    Increases outgoing elemental damage by 50%.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Separator className="my-4" />

            <h2 className="text-xl font-semibold mb-2">Available Elements</h2>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Element</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  [
                    "fire",
                    "Fire",
                    "Used in fire spells and weapons. Effective with Oil.",
                  ],
                  ["ice", "Ice", "Found in Blizzaga spells and icy weapons."],
                  [
                    "lightning",
                    "Lightning",
                    "Used by thunder-elemental weapons and spells.",
                  ],
                  ["earth", "Earth", "Rare; found in weapons like Gaia Rod."],
                  ["wind", "Wind", "Used in Aero spells and polearms."],
                  [
                    "water",
                    "Water",
                    "Found in Aqua-based attacks and esper skills.",
                  ],
                  ["holy", "Holy", "Used in white magick and sacred weapons."],
                  ["dark", "Dark", "Used in dark magick and ninja swords."],
                ].map(([key, label, desc]) => (
                  <TableRow key={key}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <GameIcon type="elements" name={key} size={16} />
                        <strong>{label}</strong>
                      </div>
                    </TableCell>
                    <TableCell>{desc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="issues">
            <h1 className="text-2xl font-bold mb-4">Possible Problems</h1>

            <p className="text-muted-foreground mb-2">
              For all changes to be visible to the player, the Clan Centurio
              Equipment Progression mod includes a built-in system that
              generates item descriptions.
            </p>

            <p className="text-muted-foreground mb-2">
              This system generates the files necessary for{" "}
              <a
                href="https://www.nexusmods.com/finalfantasy12/mods/319"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                The Insurgent&apos;s Descriptive Inventory
              </a>{" "}
              mod to display the new interface.
            </p>

            <p className="text-muted-foreground mb-2">
              In order to support a large number of attributes and effects, the
              equipment UI was adjusted to ensure enough space for all details,
              including stats, effects, and notes.
            </p>

            <p className="text-muted-foreground mb-2">
              The description generator breaks lines every{" "}
              <strong>9 attributes</strong> (including the title), and every{" "}
              <strong>16 effects</strong>, to preserve layout.
            </p>

            <p className="text-muted-foreground mb-2">
              There are intentionally <strong>no limitations</strong> on how
              many items you can assign in On-Hit, On-Equip, Immunity, or
              Affinity. This is to give full creative freedom when designing
              gear.
            </p>

            <p className="text-muted-foreground mb-2">
              That said,{" "}
              <strong className=" text-red-600">
                be careful when adding new effects to an item
              </strong>
              . If you try to fill every slot with too many effects, the UI
              simply won&apos;t be able to display all of them. Be aware of
              this.
            </p>

            <p className="text-muted-foreground mb-2">
              The new equipment UI consists of 4 lines:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-2">
              <li>
                <strong>General Info</strong> — Name, Level, Element, Category,
                Type, and License
              </li>
              <li>
                <strong>Attributes</strong> — All attributes listed in the
                Attributes tab
              </li>
              <li>
                <strong>Effects</strong> — A single block that concatenates:
                <ul className="list-disc pl-6 mt-1">
                  <li>On-Hit effects (or shows “None” if empty)</li>
                  <li>On-Equip effects (or shows “None” if empty)</li>
                  <li>Immunity effects (or shows “None” if empty)</li>
                  <li>
                    Affinity types and elements (or shows “None” if empty)
                  </li>
                </ul>
              </li>
              <li>
                <strong>Notes</strong> — Custom flavor text for some gear,
                especially accessories
              </li>
            </ul>

            <p className="text-muted-foreground">
              Always review your progression visually to catch anything that may
              not display correctly.
            </p>
          </TabsContent>

          <TabsContent value="apply">
            <h1 className="text-2xl font-bold mb-4">Apply Progression</h1>

            <h2 className="text-xl font-semibold mb-2">
              Downloading your progression
            </h2>
            <p className="text-muted-foreground mb-2">
              Once you&apos;re done creating your progression preset, just click{" "}
              <strong>Actions</strong> and then{" "}
              <strong>Download Progression</strong>.
            </p>
            <p className="text-muted-foreground mb-2">
              Your progression will be compiled into a mod-ready file called{" "}
              <strong className="text-[var(--primary)]">
                <code>cachedata.lua</code>
              </strong>
              .
            </p>
            <p className="text-muted-foreground mb-2">
              If you already have a previous copy, your browser may download it
              as{" "}
              <strong className="text-[var(--primary)]">
                <code>cachedata (1).lua</code>
              </strong>{" "}
              or similar. <strong>Make sure this never happens</strong>, as the
              mod will only read the file if it&apos;s named exactly{" "}
              <strong>
                <code>cachedata.lua</code>
              </strong>
              .
            </p>
            <p className="text-muted-foreground mb-4">
              After downloading, go to your game installation folder:{" "}
              <strong className="text-[var(--primary)]">
                <code>
                  FINAL FANTASY XII THE ZODIAC
                  AGE\x64\scripts\ClanCenturioEquipmentProgression
                </code>
              </strong>{" "}
              and replace the existing file.
            </p>
            <p className="text-muted-foreground mb-6">
              Don&apos;t worry, you can always regenerate a clean base version
              using the editor. Just click <strong>Actions</strong> →{" "}
              <strong>Clear Cache</strong>. Make sure to back up your
              progression first.
            </p>
            <Separator className="my-4" />
            <h2 className="text-xl font-semibold mb-2">Backup</h2>
            <p className="text-muted-foreground mb-2">
              You can export a backup of your progression anytime. Go to{" "}
              <strong>Actions</strong> and click <strong>Export Backup</strong>.
              A file named{" "}
              <strong className="text-[var(--primary)]">
                <code>xii-equipment-editor-backup.json</code>
              </strong>{" "}
              will be downloaded.
            </p>
            <p className="text-muted-foreground mb-4">
              The filename will include the current date and time so you can
              keep track of versions. You can restore this backup anytime via{" "}
              <strong>Upload Backup</strong>.{" "}
              <strong>
                This will overwrite your current progress permanently.
              </strong>
            </p>
            <Separator className="my-4" />
            <h2 className="text-xl font-semibold mb-2">Start from scratch</h2>
            <p className="text-muted-foreground mb-2">
              Want to start over? Just go to <strong>Actions</strong> and click{" "}
              <strong>Clear Cache</strong>.
            </p>
            <p className="text-muted-foreground">
              This will delete your current progression and create a fresh one
              based on the game’s vanilla values.{" "}
              <strong>This action is irreversible.</strong>
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
