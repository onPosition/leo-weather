import clear_day from "../../public/icons/weather-outline/clear_day_outline.svg";
import clear_day_colored from "../../public/icons/weather-color/clear_day.png";
import clear_night from "../../public/icons/weather-outline/clear_night_outline.svg";
import clear_night_colored from "../../public/icons/weather-color/clear_night.png";
import cloudy from "../../public/icons/weather-outline/cloudy_outline.svg";
import cloudy_colored from "../../public/icons/weather-color/cloudy.png";
import drizzle from "../../public/icons/weather-outline/drizzle_outline.svg";
import drizzle_colored from "../../public/icons/weather-color/drizzle.png";
import flurries from "../../public/icons/weather-outline/flurries_outline.svg";
import flurries_colored from "../../public/icons/weather-color/flurries.png";
import fog from "../../public/icons/weather-outline/fog_outline.svg";
import fog_colored from "../../public/icons/weather-color/fog.png";
import ice_pellets from "../../public/icons/weather-outline/ice_pellets_outline.svg";
import ice_pellets_colored from "../../public/icons/weather-color/ice_pellets.png";
import ice_pellets_light from "../../public/icons/weather-outline/ice_pellets_light_outline.svg";
import ice_pellets_light_colored from "../../public/icons/weather-color/ice_pellets_light.png";
import ice_pellets_heavy from "../../public/icons/weather-outline/ice_pellets_heavy_outline.svg";
import ice_pellets_heavy_colored from "../../public/icons/weather-color/ice_pellets_heavy.png";
import mostly_clear_day from "../../public/icons/weather-outline/mostly_clear_day_outline.svg";
import mostly_clear_day_colored from "../../public/icons/weather-color/mostly_clear_day.png";
import mostly_clear_night from "../../public/icons/weather-outline/mostly_clear_night_outline.svg";
import mostly_clear_night_colored from "../../public/icons/weather-color/mostly_clear_night.png";
import mostly_cloudy from "../../public/icons/weather-outline/mostly_cloudy_outline.svg";
import mostly_cloudy_colored from "../../public/icons/weather-color/mostly_cloudy.png";
import rain from "../../public/icons/weather-outline/rain_outline.svg";
import rain_colored from "../../public/icons/weather-color/rain.png";
import rain_heavy from "../../public/icons/weather-outline/rain_heavy_outline.svg";
import rain_heavy_colored from "../../public/icons/weather-color/rain_heavy.png";
import rain_light from "../../public/icons/weather-outline/rain_light_outline.svg";
import rain_light_colored from "../../public/icons/weather-color/rain_light.png";
import snow from "../../public/icons/weather-outline/snow_outline.svg";
import snow_colored from "../../public/icons/weather-color/snow.png";
import snow_heavy from "../../public/icons/weather-outline/snow_heavy_outline.svg";
import snow_heavy_colored from "../../public/icons/weather-color/snow_heavy.png";
import snow_light from "../../public/icons/weather-outline/snow_light_outline.svg";
import snow_light_colored from "../../public/icons/weather-color/snow_light.png";
import thunderstorm from "../../public/icons/weather-outline/thunderstorm_outline.svg";
import thunderstorm_colored from "../../public/icons/weather-color/thunderstorm.png";

interface WeatherIconMap {
  [key: string]: { src: string };
}

export const weatherIcons: WeatherIconMap = {
  "1000": clear_day,
  "1000_colored": clear_day_colored,
  "1100": mostly_clear_day,
  "1100_colored": mostly_clear_day_colored,
  "1101": mostly_cloudy, // Partly cloudy code
  "1101_colored": mostly_cloudy_colored,
  "1001": cloudy,
  "1001_colored": cloudy_colored,
  "2000": fog,
  "2000_colored": fog_colored,
  "2100": fog,
  "2100_colored": fog_colored,
  "4000": drizzle,
  "4000_colored": drizzle_colored,
  "4001": rain,
  "4001_colored": rain_colored,
  "4200": rain_light,
  "4200_colored": rain_light_colored,
  "4201": rain_heavy,
  "4201_colored": rain_heavy_colored,
  "5000": snow_light,
  "5000_colored": snow_light_colored,
  "5100": snow,
  "5100_colored": snow_colored,
  "5001": flurries,
  "5001_colored": flurries_colored,
  "5101": snow_heavy,
  "5101_colored": snow_heavy_colored,
  "6000": ice_pellets,
  "6000_colored": ice_pellets_colored,
  "6100": ice_pellets_light,
  "6100_colored": ice_pellets_light_colored,
  "6101": ice_pellets_heavy,
  "6101_colored": ice_pellets_heavy_colored,
  "7000": clear_night,
  "7000_colored": clear_night_colored,
  "7100": mostly_clear_night,
  "7100_colored": mostly_clear_night_colored,
  "8000": thunderstorm,
  "8000_colored": thunderstorm_colored,
};
