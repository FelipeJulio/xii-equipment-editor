"use client";

import { useState, useEffect } from "react";
import EquipmentTable from "@/components/EquipmentTable";
import { Header } from "@/components/Header";

export default function Page() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
    } else if (saved === "light") {
      setDark(false);
    } else {
      const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(prefers);
    }
  }, []);

  return (
    <div className="min-h-screen w-full max-w-[1600] px-4">
      <Header dark={dark} setDark={setDark} />
      <main className="w-full">
        <EquipmentTable />
      </main>
    </div>
  );
}
