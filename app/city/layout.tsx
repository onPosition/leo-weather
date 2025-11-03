import type { ReactNode } from "react";
import Link from "next/link";

export const metadata = {
  title: "City — Leo Weather",
};

export default function CityLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-dvh mobile-only relative">
      <header className="py-4">
        <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link href="/" className="absolute left-4 top-4">
            ←
          </Link>
          <h1 className="font-bold text-center w-full">Favoutire Locations</h1>
        </nav>
      </header>

      <main className="h-full">{children}</main>
    </div>
  );
}
