import { HourlyItem } from "../app/lib/types";
import formatTime from "@/utils/formatTime";
import WeatherIcon from "./ui/WeatherIcon";
import Card from "./ui/Card";

interface HourlyForecastProps {
  data: HourlyItem[];
}
interface HourlyForecastCardProps {
  data: HourlyItem;
}

function HourlyForecastCard({ data }: HourlyForecastCardProps) {
  const formattedTime = formatTime(data.timestamp, "hourly");
  return (
    <div className="flex items-center gap-1 flex-col shrink-0 justify-center text-gray-500">
      <p>{formattedTime}</p>
      <Card variant="hourlyIcon" className="w-[68px] h-[68px]">
        <WeatherIcon weatherCode={data.weatherCode} />
      </Card>
      <p>{data.temperature.toFixed(0)}°</p>
    </div>
  );
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
  return (
    <div className="m-4 mr-0">
      <h3>Hourly Weather</h3>
      <div className="flex max-w-full gap-4 overflow-scroll no-scrollbar">
        {data.map((item: HourlyItem) => (
          <HourlyForecastCard key={item.timestamp} data={item} />
        ))}
      </div>
    </div>
  );
}
