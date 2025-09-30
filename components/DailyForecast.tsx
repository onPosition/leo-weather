import { DailyItem } from "../app/lib/types";
import formatTime from "@/utils/formatTime";
import WeatherIcon from "./ui/WeatherIcon";
import Card from "./ui/Card";

interface DailyForecastProps {
  data: DailyItem[];
}
interface DailyForecastCardProps {
  data: DailyItem;
  isFirst: boolean;
}

function DailyForecastCard({ data, isFirst }: DailyForecastCardProps) {
  const formattedTime = formatTime(data.timestamp, "weekday");
  return (
    <div className="flex items-center justify-between rounded-2xl">
      <div className="flex items-center gap-2">
        <Card variant="hourlyIcon" className="w-[68px] h-[68px]">
          <WeatherIcon weatherCode={data.weatherCodeMax} />
        </Card>
        <div className="flex flex-col">
          <p className="text-gray-500">{formattedTime.date}</p>
          <p>{formattedTime.day}</p>
        </div>
      </div>
      <div className="flex gap-8">
        <ul className="text-center">
          <li className={isFirst ? "text-gray-400" : "invisible"}>Day</li>
          <li className={`${!isFirst && "-mt-4"}`}>
            {data.temperatureMax.toFixed(0)}°
          </li>
        </ul>
        <ul className="text-center">
          <li className={isFirst ? "text-gray-400" : "invisible"}>Night</li>
          <li className={`${!isFirst && "-mt-4"} text-gray-400`}>
            {data.temperatureMin.toFixed(0)}°
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function DailyForecast({ data }: DailyForecastProps) {
  return (
    <section className="m-4 mt-0">
      <h3>7-Day Forecast</h3>
      <div className="flex flex-col max-w-full gap-2 overflow-scroll">
        {data.map((item: DailyItem, idx) => (
          <DailyForecastCard
            key={item.timestamp}
            data={item}
            isFirst={idx === 0}
          />
        ))}
      </div>
    </section>
  );
}
