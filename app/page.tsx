"use client";
import { useEffect, useState } from "react";
import {
  CurrentWeather,
  LocationHeader,
  HourlyForecast,
  DailyForecast,
  SunArc,
  LocationSelect,
  AITipButton,
  Card,
} from "@/components/";
import { TransformedWeather } from "./api/weather/route";
import { useLocation } from "./storage/LocationContext";
import { useUI } from "./storage/UIContext";
import LoadingScreen from "@/components/LoadingScreen";
import colorsByWeatherCode from "@/utils/getThemeByWeather";
export default function Home() {
  const [weather, setWeather] = useState<TransformedWeather | null>(null);
  const { isLocationSelectOpen } = useUI();
  const { currentLocation, isLoading } = useLocation();
  useEffect(() => {
    if (isLoading || !currentLocation) {
      return;
    }
    const { lat, lon } = currentLocation;
    fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      .then((res) => res.json())
      .then(setWeather);
  }, [currentLocation]);

  if (isLoading || !weather) return <LoadingScreen />;

  if (!currentLocation) {
    return <p>Failed to initialize location</p>;
  }
  const currentColor = colorsByWeatherCode(
    weather.current.weatherCode,
    weather.hourly[0].timestamp
  );
  console.log(currentColor);
  return (
    <div className="p-4 ">
      {weather && (
        <div
          className={`flex flex-col gap-8 transition-transform duration-500 `}
        >
          <Card variant="background" style={{ backgroundColor: currentColor }}>
            <div className="flex justify-between">
              <LocationHeader currentLocation={currentLocation} />
              {!isLocationSelectOpen && (
                <AITipButton
                  currentWeather={weather.current}
                  currentLocation={currentLocation}
                />
              )}
            </div>

            {isLocationSelectOpen ? (
              <LocationSelect />
            ) : (
              <CurrentWeather weather={weather} />
            )}
          </Card>
          <HourlyForecast data={weather.hourly} />
          <DailyForecast data={weather.daily} />
          <SunArc forecast={weather.daily[0]} />
        </div>
      )}
    </div>
  );
}
