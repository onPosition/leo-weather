const colorsByWeatherCode: Record<number, string> = {
  // Clear to mostly cloudy
  1000: "#26ACFF",
  1100: "#26ACFF",
  1101: "#26ACFF",
  1102: "#26ACFF",
  1103: "#26ACFF",
  // Cloudy to fog
  1001: "#4b6c8b",
  2000: "#4B7194",
  2100: "#4B7194",
  // Drizzle to heavy rain
  4000: "#3E4E58",
  4001: "#3E4E58",
  4200: "#3E4E58",
  4201: "#3E4E58",
  // Snow, ice pellets
  5000: "#427BBD",
  5001: "#427BBD",
  5100: "#427BBD",
  5101: "#427BBD",
  6000: "#427BBD",
  6001: "#427BBD",
  6200: "#427BBD",
  6201: "#427BBD",
  7000: "#427BBD",
  7101: "#427BBD",
  7102: "#427BBD",
  //   Thunderstorm:
  8000: "#273343",
};

export default function getThemeByWeatherCode(
  weatherCode: number,
  timestamp: string
): string {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const isNightTime = hours >= 19 || hours < 6;
  console.log(hours);

  if (isNightTime) {
    return "#2B2A34";
  }

  return colorsByWeatherCode[weatherCode] || "#26ACFF";
}
