import { CurrentLocation } from "@/app/lib/types";
import { useRef, useState } from "react";
import WeatherIcon from "./WeatherIcon";
import getThemeByWeatherCode from "@/utils/getThemeByWeather";

type FavItemProps = {
  location: CurrentLocation;
  onSelect: (loc: CurrentLocation) => void;
  onRemove: (loc: CurrentLocation) => void;
  currentWeather?: {
    temperature: number;
    weatherCode: number;
    timeStamp: string;
  };
};

const FavItem = ({
  location,
  currentWeather,
  onSelect,
  onRemove,
}: FavItemProps) => {
  const [showIcon, setShowIcon] = useState(false);
  const timer = useRef<number | null>(null);

  const currentColor = getThemeByWeatherCode(
    currentWeather?.weatherCode || 1000,
    currentWeather?.timeStamp || ""
  );

  const startLong = () => {
    timer.current = window.setTimeout(() => setShowIcon(true), 500);
  };

  const cancelLong = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowIcon(!showIcon);
  };

  return (
    <div
      className="p-4 bg-card-transparent rounded-2xl flex justify-between items-center select-none"
      style={{ backgroundColor: currentColor }}
      onClick={() => {
        if (showIcon) {
          setShowIcon(false);
        } else {
          onSelect(location);
        }
      }}
      onMouseDown={startLong}
      onMouseUp={cancelLong}
      onMouseLeave={cancelLong}
      onTouchStart={startLong}
      onTouchEnd={cancelLong}
      onContextMenu={handleContextMenu} // десктопный сценарий
    >
      <div className="flex-1 truncate text-xl">
        {showIcon ? (
          <span
            className="text-red-500 m-auto  cursor-pointer transition-opacity duration-300 ease-in-out opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(location);
              setShowIcon(false);
            }}
          >
            🗑️
          </span>
        ) : (
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 w-full text-white">
            <p className="truncate text-left">{location.city}</p>
            <div className="w-12 shrink-0">
              <WeatherIcon
                colored
                weatherCode={currentWeather?.weatherCode ?? 1001}
              />
            </div>
            <p className="min-w-12 text-right">
              {currentWeather
                ? `${currentWeather.temperature.toFixed(0)}°`
                : "—"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavItem;
