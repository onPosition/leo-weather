"use client";
import { TransformedWeather } from "@/app/api/weather/route";
import AlertsPanel from "./Alerts";
import WeatherIcon from "./ui/WeatherIcon";
import Card from "./ui/Card";
import Image from "next/image";
interface CurrentWeatherProps {
  weather: TransformedWeather;
}

export default function CurrentWeather({
  weather: {
    current: {
      weatherCode,
      temperature,
      temperatureApparent,
      windSpeed,
      uvIndex,
      humidity,
    },
    hourly,
  },
}: CurrentWeatherProps) {
  const features = [
    { title: "Wind", value: windSpeed, icon: "/wind.svg", unit: "m/s" },
    { title: "Humidity", value: humidity, icon: "/humidity.svg", unit: "%" },
    { title: "UV Index", value: uvIndex, icon: "/uv-index.svg", unit: "" },
  ];
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-around transition-transform">
        <div className="w-[70px]">
          <WeatherIcon weatherCode={weatherCode} colored={true} />
        </div>
        <h1 className="leading-none">{temperature.toFixed(0)}°</h1>
        <p className="text-white/60">
          Feels like
          <br />
          <span className="text-xl">{temperatureApparent.toFixed(0)}°</span>
        </p>
      </div>
      <AlertsPanel forecast={hourly} />
      <section className="grid grid-cols-3 gap-4">
        {features.map((feature, idx) => (
          <Card variant="weatherFeature" key={idx}>
            <Image src={feature.icon} alt="wind" width={16} height={16} />
            <div>
              <p className="opacity-50">{feature.title}</p>
              <p className="">
                {feature.value} {feature.unit}
              </p>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
}
