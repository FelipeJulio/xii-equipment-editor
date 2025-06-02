"use client";

import { useEffect, useState } from "react";
import { parseRawData } from "@/lib/parseRawData";
import { initEquipmentData, getEquipmentData } from "@/lib/localStorage";
import { DataTable } from "./data-table";
import type { EquipmentItem } from "@/typings/types";

export default function EquipmentTable() {
  const [data, setData] = useState<EquipmentItem[]>([]);

  useEffect(() => {
    initEquipmentData(parseRawData());
    setData(getEquipmentData());
  }, []);

  return <DataTable data={data} />;
}
