"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="flex flex-col w-full max-w-7xl px-4 mt-20">
      <Header dark={dark} setDark={setDark} />
      <main className="flex w-full overflow-hidden">{children}</main>
    </div>
  );
}
