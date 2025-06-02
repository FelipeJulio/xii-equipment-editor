import Image from "next/image";
import React from "react";
import { categoryToIconTypeMap, type IconType } from "@/typings/types";

interface GameIconProps {
  type: IconType;
  name: string;
  size?: number;
  className?: string;
}

const GameIcon: React.FC<GameIconProps> = ({
  type,
  name,
  size = 24,
  className = "",
}) => {
  const src = resolveIconPath(type, name);

  return (
    <Image
      src={src}
      alt={`${type}-${name}`}
      height={size}
      width={size}
      className={className}
      style={{ height: size, width: "auto" }}
      unoptimized
    />
  );
};

function resolveIconPath(type: IconType, name: string): string {
  if (type === "ui") {
    return `/icons/ui/${normalize(name)}.png`;
  }

  if (type === "elements" || type === "statusEffect" || type === "affinity") {
    return `/icons/${type}/${normalize(name)}.png`;
  }

  const mappedType = categoryToIconTypeMap[normalize(name)] || type;

  return `/icons/equipment/${normalize(mappedType)}/${normalize(name)}.png`;
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/[\s-]+/g, "_") // espaços ou hífens → underscore
    .replace(/[^a-z0-9_]/g, ""); // remove tudo que não for letra, número ou underscore
}

export default GameIcon;
