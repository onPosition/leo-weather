import { DailyItem } from "@/app/lib/types";
import formatTime from "@/utils/formatTime";
import Card from "./ui/Card";
import SunMoonArc from "./SunMoon";
import MoonPhase from "./MoonPhase";

interface SunArcProps {
  forecast: DailyItem;
}

export default function SunArc({
  forecast: { sunriseTime, sunsetTime, moonriseTime, moonsetTime },
}: SunArcProps) {
  const now = Date.now() / 1000;
  const sunsetString = new Date(sunsetTime).getTime() / 1000;
  const sunriseString = new Date(sunriseTime).getTime() / 1000;
  const total = sunsetString - sunriseString;
  let progress = Math.min(Math.max((now - sunriseString) / total, 0), 1);
  const moonsetString = new Date(moonsetTime).getTime() / 1000;
  const moonriseString = new Date(moonriseTime).getTime() / 1000;
  const moonTotal = moonsetString - moonriseString;
  const moonProgress = Math.min(
    Math.max((now - moonriseString) / moonTotal, 0),
    1
  );

  return (
    <section>
      <h3>Sun & Moon</h3>
      <Card className="bg-[#26ACFF] overflow-hidden">
        <div className="flex justify-between items-center px-8 py-2 m-6 mb-2 text-white bg-[#0890E5] rounded-4xl">
          <div className="">
            <div className="flex justify-between">
              <p>Sunrise:</p> <p> {formatTime(sunriseTime, "hourly")}</p>
            </div>
            <p className="text-white/30">
              Moonrise: {formatTime(moonriseTime, "hourly")}
            </p>
          </div>
          <div className="">
            <div className="flex justify-between">
              <p>Sunset:</p> <p> {formatTime(sunsetTime, "hourly")}</p>
            </div>
            <p className="text-white/30">
              Moonset: {formatTime(moonsetTime, "hourly")}
            </p>
          </div>
        </div>
        <SunMoonArc sunProgress={progress} moonProgress={moonProgress} />
        <MoonPhase className="w-fit m-auto -mt-12 pb-6" />
      </Card>
    </section>
  );
}
