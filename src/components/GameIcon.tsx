import Image from "next/image";
import React from "react";
import { categoryToIconType, type IconType } from "@/typings/types";

interface GameIconProps {
  type: IconType | "affinity";
  name: string;
  size?: number;
  className?: string;
}

const basePath = "/xii-equipment-editor";

const aliasType = (type: IconType | "affinity"): IconType => {
  return type === "affinity" ? "status" : type;
};

const resolveIconPath = (type: IconType | "affinity", name: string): string => {
  const n = normalize(name);
  const resolvedType = aliasType(type);

  if (resolvedType === "ui") {
    return `${basePath}/assets/ui/${n}.png`;
  }
  if (resolvedType === "status") {
    return `${basePath}/assets/status/${n}.png`;
  }
  if (resolvedType === "elements") {
    return `${basePath}/assets/elements/${n}.png`;
  }

  const mappedType =
    (categoryToIconType as Record<string, IconType>)[name] ?? resolvedType;

  return `${basePath}/assets/equipments/${mappedType}/${n}.png`;
};

const normalize = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[\s-]+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
};

const GameIcon: React.FC<GameIconProps> = ({
  type,
  name,
  size = 24,
  className,
}) => {
  const src = resolveIconPath(type, name);

  return (
    <Image
      src={src}
      alt={`${type}-${name}`}
      height={size}
      width={size}
      className={`inline-flex aspect-square object-contain ${className ?? ""}`}
      style={{ height: size, width: "auto" }}
    />
  );
};

export default GameIcon;
