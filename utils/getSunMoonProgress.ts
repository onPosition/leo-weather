export function getSunMoonProgress(
  sunriseTime: string,
  sunsetTime: string,
  moonriseTime: string,
  moonsetTime: string
) {
  const now = Date.now() / 1000;

  const sunriseEpoch = new Date(sunriseTime).getTime() / 1000;
  const sunsetEpoch = new Date(sunsetTime).getTime() / 1000;
  const moonriseEpoch = new Date(moonriseTime).getTime() / 1000;
  const moonsetEpoch = new Date(moonsetTime).getTime() / 1000;

  const sunTotal = Math.max(sunsetEpoch - sunriseEpoch, 1);

  let moonTotal = moonsetEpoch - moonriseEpoch;
  if (moonTotal <= 0) {
    moonTotal += 24 * 60 * 60;
  }

  const rawSun = (now - sunriseEpoch) / sunTotal;
  let rawMoon = (now - moonriseEpoch) / moonTotal;

  if (new Date(moonsetTime) < new Date(moonriseTime) && now < moonriseEpoch) {
    rawMoon = (now + 24 * 60 * 60 - moonriseEpoch) / moonTotal;
  }

  const sunProgress = Math.min(Math.max(rawSun, 0), 1);
  const moonProgress = Math.min(Math.max(rawMoon, 0), 1);

  return { sunProgress, moonProgress };
}
