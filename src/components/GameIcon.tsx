import Image from "next/image";
import React from "react";
import { categoryToIconTypeMap, type IconType } from "@/typings/types";

interface GameIconProps {
  type: IconType;
  name: string;
  size?: number;
  className?: string;
}

const basePath = "/xii-equipment-editor";

const resolveIconPath = (type: IconType, name: string): string => {
  const n = normalize(name);

  if (type === "ui") {
    return `${basePath}/assets/ui/${n}.png`;
  }
  if (type === "status") {
    return `${basePath}/assets/status/${n}.png`;
  }
  if (type === "elements") {
    return `${basePath}/assets/elements/${n}.png`;
  }
  if (type === "affinity") {
    return `${basePath}/assets/status/${n}.png`;
  }

  const mappedType = categoryToIconTypeMap[n] || type;
  return `${basePath}/assets/equipments/${mappedType}/${n}.png`;
};

const normalize = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[\s-]+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
};

const GameIcon: React.FC<GameIconProps> = ({ type, name, size = 24 }) => {
  const src = resolveIconPath(type, name);

  return (
    <Image
      src={src}
      alt={`${type}-${name}`}
      height={size}
      width={size}
      className="inline-flex aspect-square object-contain"
      style={{ height: size, width: "auto" }}
    />
  );
};

export default GameIcon;
