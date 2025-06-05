"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function DocsPage() {
  return (
    <div className="flex w-full rounded-md border p-4 overflow-auto mb-4">
      <div className="w-full flex flex-col space-y-4 mx-auto py-10 gap-4 px-2">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Docs</h1>

        <Separator />

        <h2 className="text-2xl font-semibold">How it Works</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          By clicking “Edit”, a tab will open listing all editable properties.
          Each property has 12 levels, corresponding to equipment progression.
        </p>

        <h3 className="text-xl font-semibold mt-4">Equipment Attributes</h3>
        <p className="text-muted-foreground text-base leading-relaxed">
          You can create progression values for each attribute. Each equipment
          has different editable attributes.
        </p>
        <p className="text-muted-foreground text-base leading-relaxed">
          Editable attributes include: Range, Attack Power, Knockback %,
          Combo/Critical %, Evade, Hit-Rate, Charge Time, Magick Resist,
          Defense, HP, MP, Strength, Magick Power, Vitality, and Speed.
        </p>
        <p className="text-muted-foreground text-base leading-relaxed">
          There are three ways to adjust attributes:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground text-base leading-relaxed">
          <li>
            <strong>Manual:</strong> Enter values manually for each level,
            ascending or descending.
          </li>
          <li>
            <strong>Auto Scale - Linear:</strong> Set start and end values; the
            tool distributes the difference evenly across levels.
          </li>
          <li>
            <strong>Auto Scale - Scale Factor:</strong> Set a curve-based
            progression where higher values produce steeper growth.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mt-4">Element Attributes</h3>
        <p className="text-muted-foreground text-base leading-relaxed">
          Define elemental properties per level. For example, to make a weapon
          Fire-elemental from level 8, set levels 1–7 to <Badge>none</Badge> and
          levels 8–12 to <Badge>fire</Badge>.
        </p>
        <p className="text-muted-foreground text-base leading-relaxed">
          Elements can change across levels, but only one element per level is
          allowed.
        </p>

        <h3 className="text-xl font-semibold mt-4">On-Hit Attributes</h3>
        <p className="text-muted-foreground text-base leading-relaxed">
          These are status effects applied to the enemy on hit (e.g.{" "}
          <Badge>Poison</Badge>,<Badge>Sap</Badge>). You can assign multiple
          effects or leave a level empty for none.
        </p>

        <h3 className="text-xl font-semibold mt-4">On-Equip Attributes</h3>
        <p className="text-muted-foreground text-base leading-relaxed">
          Similar to On-Hit, but these effects are permanently applied to the
          player while the equipment is equipped.
        </p>

        <h3 className="text-xl font-semibold mt-4">Immunity Attributes</h3>
        <p className="text-muted-foreground text-base leading-relaxed">
          Defines permanent immunities to status effects while the equipment is
          worn.
        </p>

        <h3 className="text-xl font-semibold mt-4">Affinity Attributes</h3>
        <p className="text-muted-foreground text-base leading-relaxed">
          These represent elemental interactions based on conditions:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground text-base leading-relaxed">
          <li>Absorb</li>
          <li>Immune</li>
          <li>Half</li>
          <li>Weak</li>
          <li>Potency</li>
        </ul>
        <p className="text-muted-foreground text-base leading-relaxed">
          For example, set a weapon to absorb <Badge>fire</Badge> starting at
          level 7 by assigning
          <Badge>absorb</Badge> to fire from level 7 onward.
        </p>
      </div>
    </div>
  );
}
