import { weatherIcons } from "@/app/lib/weatherIcons";

interface WeatherIconProps {
  weatherCode: number;
  inverted?: boolean;
  colored?: boolean;
}

const WeatherIcon = ({
  weatherCode,
  inverted = false,
  colored = false,
}: WeatherIconProps) => {
  const iconObj = weatherIcons[weatherCode] || weatherIcons["1001"];
  const iconObjColored =
    weatherIcons[`${weatherCode}_colored`] || weatherIcons["1000_colored"];
  const iconSrc = iconObj.src;
  const iconColored = iconObjColored.src;
  if (!iconSrc) {
    return (
      <span role="img" aria-label="weather icon">
        🌚
      </span>
    );
  }

  return (
    <img
      src={colored ? iconColored : iconSrc}
      alt={`Icon for ${weatherCode}`}
      style={{
        filter: `${inverted ? "invert(1)" : ""} `,
      }}
    />
  );
};

export default WeatherIcon;
