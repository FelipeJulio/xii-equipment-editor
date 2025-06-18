import type { Viewport } from "next";
import { metadata } from "@/app/metadata";
import { defaultFont } from "@/lib/font";
import { Toaster } from "@/components/ui/sonner";
import clsx from "clsx";
import "./globals.css";
import { AppWrapper } from "@/components/AppWrapper";
import GameIcon from "@/components/GameIcon";

export { metadata };

export const viewport: Viewport = {
  themeColor: "black",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-y-scroll dark">
      <body
        className={clsx(
          defaultFont.variable,
          "flex flex-col justify-center items-center "
        )}
      >
        <AppWrapper>{children}</AppWrapper>
        <Toaster />
        <div className="flex flex-col justify-center gap-2 py-24">
          <p className="flex justify-center gap-2">
            Made by
            <a
              href="https://next.nexusmods.com/profile/fehdead?gameId=2304"
              target="_blank"
              className="underline underline-offset-4"
            >
              FehDead
            </a>
          </p>
          <GameIcon type="ui" name="kupo" size={22} />
        </div>
      </body>
    </html>
  );
}
