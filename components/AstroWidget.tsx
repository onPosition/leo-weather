import { DailyItem } from "@/app/lib/types";
import formatTime from "@/utils/formatTime";
import Card from "./ui/Card";
import SunMoonArc from "./SunMoon";
import MoonPhase from "./MoonPhase";
import { getSunMoonProgress } from "@/utils/getSunMoonProgress";
 

interface SunArcProps {
  forecast: DailyItem;
}

export default function SunArc({
  forecast: { sunriseTime, sunsetTime, moonriseTime, moonsetTime },
}: SunArcProps) {
  const { sunProgress, moonProgress } = getSunMoonProgress(
    sunriseTime,
    sunsetTime,
    moonriseTime,
    moonsetTime
  );

  return (
    <section className="m-4 mt-0">
      <h3>Sun & Moon</h3>
      <Card className="bg-[#26ACFF] overflow-hidden">
        <div className="flex justify-between items-center px-8 py-2 m-6 mb-2 text-white bg-[#0890E5] rounded-3xl">
          <div className="">
            <div className="flex justify-between">
              <p>Sunrise:</p> <p> {formatTime(sunriseTime, "hourly")}</p>
            </div>
            <p className="text-white/60">
              Moonrise: {formatTime(moonriseTime, "hourly")}
            </p>
          </div>
          <div className="">
            <div className="flex justify-between">
              <p>Sunset:</p> <p> {formatTime(sunsetTime, "hourly")}</p>
            </div>
            <p className="text-white/60">
              Moonset: {formatTime(moonsetTime, "hourly")}
            </p>
          </div>
        </div>
        <SunMoonArc sunProgress={sunProgress} moonProgress={moonProgress} />
        <MoonPhase className="w-fit m-auto -mt-12 pb-4" />
      </Card>
    </section>
  );
}
