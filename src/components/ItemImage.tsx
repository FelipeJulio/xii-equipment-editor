"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ItemImageProps {
  index: number;
  alt?: string;
  width?: number;
  height?: number;
}

export default function ItemImage({
  index,
  alt = "Item Image",
  width = 32,
  height = 32,
}: ItemImageProps) {
  const basePath = "/xii-equipment-editor";
  const key = String(index).padStart(2, "0");
  const initialSrc = `${basePath}/assets/previews/item_${key}.png`;

  const [src, setSrc] = useState(initialSrc);

  useEffect(() => {
    setSrc(initialSrc);
  }, [initialSrc]);

  const handleError = () => {
    setSrc(`${basePath}/assets/previews/item_none.png`);
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
      className="flex aspect-2/3 object-contain"
    />
  );
}
