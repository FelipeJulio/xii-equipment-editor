import { useEffect, useState, useCallback } from "react";
import { parseRawData } from "@/lib/parseRawData";
import { initEquipmentData, getEquipmentData } from "@/lib/localStorage";
import { DataTable } from "@/components/DataTable";
import type { EquipmentItem } from "@/typings/types";

export default function EquipmentTable() {
  const [data, setData] = useState<EquipmentItem[]>([]);

  const loadInitialData = useCallback(() => {
    const existing = getEquipmentData();
    if (!existing || existing.length === 0) {
      const parsed = parseRawData();
      initEquipmentData(parsed);
      setData(parsed);
    } else {
      setData(existing);
    }
  }, []);

  const refreshData = useCallback(() => {
    setData(getEquipmentData());
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return <DataTable data={data} onDataRefresh={refreshData} />;
}
