import { HourlyItem, DailyItem } from "@/app/lib/types";
import { NextResponse } from "next/server";

const API_URL = process.env.WEATHER_API_URL;
const API_KEY = process.env.WEATHER_API_KEY;

export interface TransformedWeather {
  current: {
    temperature: number;
    temperatureApparent: number;
    rainIntensity: number;
    precipitationProbability: number;
    windSpeed: number;
    uvIndex: number;
    weatherCode: number;
    humidity: number;
  };
  hourly: Array<{
    timestamp: string;
    temperature: number;
    weatherCode: number;
    uvIndex: number;
    windSpeed: number;
    visibility: number;
    precipitationProbability: number;
    rainIntensity: number;
    snowIntensity: number;
    freezingRainIntensity: number;
  }>;
  daily: Array<{
    timestamp: string;
    temperatureMax: number;
    temperatureMin: number;
    sunriseTime: string;
    sunsetTime: string;
    weatherCodeMax: number;
    moonriseTime: string;
    moonsetTime: string;
  }>;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  const res = await fetch(
    `${API_URL}?location=${lat},${lon}&apikey=${API_KEY}&units=metric`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) {
    const error = await res.json();
    throw new Error(`Failed to fetch weather data: ${error.message}`);
  }
  const data = await res.json();

  const transformed: TransformedWeather = {
    current: {
      temperature: data.timelines.minutely[0]?.values.temperature || 0,
      temperatureApparent:
        data.timelines.minutely[0]?.values.temperatureApparent || 0,
      precipitationProbability:
        data.timelines.minutely[0]?.values.precipitationProbability || 0,
      rainIntensity: data.timelines.minutely[0]?.values.rainIntensity || 0,
      windSpeed: data.timelines.minutely[0]?.values.windSpeed || 0,
      uvIndex: data.timelines.minutely[0]?.values.uvIndex || 0,
      weatherCode: data.timelines.minutely[0]?.values.weatherCode || 0,
      humidity: data.timelines.minutely[0]?.values.humidity || 0,
    },
    hourly:
      data.timelines.hourly
        .slice(0, 12)
        .map((entry: { time: string; values: HourlyItem }) => ({
          timestamp: entry.time,
          temperature: entry.values.temperature,
          weatherCode: entry.values.weatherCode,
          uvIndex: entry.values.uvIndex,
          windSpeed: entry.values.windSpeed,
          visibility: entry.values.visibility,
          precipitationProbability: entry.values.precipitationProbability,
          rainIntensity: entry.values.rainIntensity,
          snowIntensity: entry.values.snowIntensity,
          freezingRainIntensity: entry.values.freezingRainIntensity,
        })) || [],
    daily:
      data.timelines.daily.map(
        (entry: { time: string; values: DailyItem }) => ({
          timestamp: entry.time,
          temperatureMax: entry.values.temperatureMax,
          temperatureMin: entry.values.temperatureMin,
          sunriseTime: entry.values.sunriseTime,
          sunsetTime: entry.values.sunsetTime,
          weatherCodeMax: entry.values.weatherCodeMax,
          moonriseTime: entry.values.moonriseTime,
          moonsetTime: entry.values.moonsetTime,
        })
      ) || [],
  };
  return NextResponse.json(transformed);
}
