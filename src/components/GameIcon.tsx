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
  const n = normalize(name);

  if (type === "ui") {
    return `/icons/ui/${n}.png`;
  }

  if (type === "status") {
    return `/icons/status/${n}.png`;
  }

  if (type === "elements") {
    return `/icons/elements/${n}.png`;
  }
  if (type === "affinity") {
    return `/icons/status/${n}.png`;
  }

  const mappedType = categoryToIconTypeMap[n] || type;
  return `/icons/equipments/${normalize(mappedType)}/${n}.png`;
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/[\s-]+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

export default GameIcon;
