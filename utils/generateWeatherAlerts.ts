/**
 * Analyzes an array of weather data and generates alert points.
 * @param {Array<Object>} hourlyData - An array of objects with weather data by hours.
 * @returns {Array<Object>} - An array of objects with alert points.
 */

import { HourlyItem } from "@/app/lib/types";

const THRESHOLDS = {
  STRONG_WIND_SPEED: 6,
  HIGH_UV_INDEX: 6,
  PRECIPITATION_PROBABILITY: 10,
  LOW_VISIBILITY: 1,
  SIGNIFICANT_TEMP_CHANGE: 8,
  HOURS_TO_FORECAST: 6,
};
export default function analyzeWeatherData(hourlyData: HourlyItem[]) {
  if (!hourlyData || hourlyData.length === 0) {
    return [];
  }

  const warnings = [];
  const now = hourlyData[0];
  const nowTime = new Date(hourlyData[0].timestamp);

  // High UV index
  if (now.uvIndex >= THRESHOLDS.HIGH_UV_INDEX) {
    warnings.push({
      type: "uv_index",
      message: `High UV Index: ${now.uvIndex}`,
    });
  }

  // Strong wind
  if (now.windSpeed >= THRESHOLDS.STRONG_WIND_SPEED) {
    warnings.push({
      type: "wind",
      message: `Wind speed is ${Math.round(now.windSpeed)} m/s`,
    });
  }

  // Low visibility
  if (now.visibility <= THRESHOLDS.LOW_VISIBILITY) {
    warnings.push({
      type: "visibility",
      message: `Low Visibility: ${now.visibility} km`,
    });
  }

  // Forecast for the next hours
  const forecastLimit = Math.min(
    hourlyData.length,
    THRESHOLDS.HOURS_TO_FORECAST + 1
  );

  const upcomingWarningTypes = new Set();

  for (let i = 1; i < forecastLimit; i++) {
    const forecast = hourlyData[i];

    const forecastTime = new Date(hourlyData[i].timestamp);
    const hoursUntil = Math.round(
      (forecastTime.getTime() - nowTime.getTime()) / (1000 * 60 * 60)
    );

    // Precipitation
    if (
      forecast.precipitationProbability >=
        THRESHOLDS.PRECIPITATION_PROBABILITY &&
      !upcomingWarningTypes.has("precipitation")
    ) {
      let precipType = "Precipitation";
      if (forecast.rainIntensity > 0) precipType = "Rain";
      if (forecast.snowIntensity > 0) precipType = "Snow";
      if (forecast.freezingRainIntensity > 0) precipType = "Freezing Rain";

      warnings.push({
        type: "precipitation",
        icon: "💧",
        title: `${precipType} Soon`,
        message: `${precipType} is expected in the next ${hoursUntil} hours with a probability of ${forecast.precipitationProbability}%.`,
      });
      upcomingWarningTypes.add("precipitation");
    }

    // Significant temperature change
    const tempDiff = forecast.temperature - now.temperature;
    if (
      Math.abs(tempDiff) >= THRESHOLDS.SIGNIFICANT_TEMP_CHANGE &&
      !upcomingWarningTypes.has("temp_change")
    ) {
      warnings.push({
        type: "temp_change",
        icon: tempDiff > 0 ? "📈" : "📉",
        title: tempDiff > 0 ? "Temperature Rise" : "Temperature Drop",
        message: `Temperature is expected to change by ${Math.round(
          Math.abs(tempDiff)
        )}°C in the next ${hoursUntil} hours.`,
      });
      upcomingWarningTypes.add("temp_change");
    }
  }

  return warnings;
}
