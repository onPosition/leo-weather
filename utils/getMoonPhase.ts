export function getMoonPhase(date: Date = new Date()): {
  moonPhase: string;
  illumination: number; // 0 = new moon, 1 = full moon
} {
  const lp = 2551443; // Moon cycle length in seconds
  const newMoon = new Date(Date.UTC(2000, 0, 6, 18, 14)); // New moon date
  const phaseTime = (date.getTime() - newMoon.getTime()) / 1000;
  const phase = (phaseTime % lp) / lp;

  let phaseName = "";
  if (phase < 0.03 || phase > 0.97) phaseName = "New Moon 🌑";
  else if (phase < 0.25) phaseName = "Waxing Crescent 🌒";
  else if (phase < 0.27) phaseName = "First Quarter 🌓";
  else if (phase < 0.5) phaseName = "Waxing Gibbous 🌔";
  else if (phase < 0.53) phaseName = "Full Moon 🌕";
  else if (phase < 0.75) phaseName = "Waning Gibbous 🌖";
  else if (phase < 0.77) phaseName = "Last Quarter 🌗";
  else phaseName = "Waning Crescent 🌘";

  return {
    moonPhase: phaseName,
    illumination: phase,
  };
}
