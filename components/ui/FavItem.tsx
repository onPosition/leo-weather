import { CurrentLocation } from "@/app/lib/types";
import { useRef, useState } from "react";

type FavItemProps = {
  location: CurrentLocation;
  onSelect: (loc: CurrentLocation) => void;
  onRemove: (loc: CurrentLocation) => void;
};

const FavItem = ({ location, onSelect, onRemove }: FavItemProps) => {
  const [showIcon, setShowIcon] = useState(false);
  const timer = useRef<number | null>(null);

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
      <div className="flex-1 truncate text-center">
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
          <span className="transition-opacity duration-300 ease-in-out opacity-100">
            {location.city}
          </span>
        )}
      </div>
    </div>
  );
};

export default FavItem;
