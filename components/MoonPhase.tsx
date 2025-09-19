"use client";

import { useEffect, useState } from "react";
import cn from "@/utils/cn";

type MoonPhase = {
  key: string;
  label: string;
  icon: string; // путь до svg
};

// таблица фаз
const phases: MoonPhase[] = [
  { key: "new", label: "New Moon", icon: "/moon/new_moon.svg" },
  {
    key: "waxing-crescent",
    label: "Waxing Crescent",
    icon: "/moon/waxing_crescent.svg",
  },
  {
    key: "first-quarter",
    label: "First Quarter",
    icon: "/moon/first_quarter.svg",
  },
  {
    key: "waxing-gibbous",
    label: "Waxing Gibbous",
    icon: "/moon/waxing_gibbous.svg",
  },
  { key: "full", label: "Full Moon", icon: "/moon/full_moon.svg" },
  {
    key: "waning-gibbous",
    label: "Waning Gibbous",
    icon: "/moon/waning_gibbous.svg",
  },
  {
    key: "last-quarter",
    label: "Last Quarter",
    icon: "/moon/last_quarter.svg",
  },
  {
    key: "waning-crescent",
    label: "Waning Crescent",
    icon: "/moon/waning_crescent.svg",
  },
];

function calculateMoonPhase(date: Date): MoonPhase {
  const lp = 2551443; // длина лунного цикла в секундах (29.53 суток)
  const newMoon = new Date(Date.UTC(2000, 0, 6, 18, 14)); // эталон новолуния
  const phaseTime = (date.getTime() - newMoon.getTime()) / 1000;
  const phase = (phaseTime % lp) / lp; // 0..1

  if (phase < 0.03 || phase > 0.97) return phases[0]; // New
  if (phase < 0.25) return phases[1]; // Waxing Crescent
  if (phase < 0.27) return phases[2]; // First Quarter
  if (phase < 0.5) return phases[3]; // Waxing Gibbous
  if (phase < 0.53) return phases[4]; // Full
  if (phase < 0.75) return phases[5]; // Waning Gibbous
  if (phase < 0.77) return phases[6]; // Last Quarter
  return phases[7]; // Waning Crescent
}

export default function MoonPhase({ className }: { className?: string }) {
  const [phase, setPhase] = useState<MoonPhase | null>(null);

  useEffect(() => {
    const currentPhase = calculateMoonPhase(new Date());
    setPhase(currentPhase);
  }, []);

  if (!phase) return null;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img
        src={`/icons/${phase.icon}`}
        alt={phase.label}
        width={16}
        height={16}
      />
      <span className="text-xs text-white">{phase.label}</span>
    </div>
  );
}
