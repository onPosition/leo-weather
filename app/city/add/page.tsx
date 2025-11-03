"use client";
import { AutocompleteResponse, CurrentLocation } from "@/app/lib/types";
import { useLocation } from "@/app/storage/LocationContext";
import { useEffect, useState, useRef } from "react";
import { useUI } from "@/app/storage/UIContext";
import { useRouter } from "next/navigation";

export default function LocationSelect() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<AutocompleteResponse | []>([]);
  const [favourites, setFavourites] = useState<CurrentLocation[]>([]);
  const { setCurrentLocation } = useLocation();
  const { toggleLocationSelect } = useUI();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Small timeout helps on some mobile browsers where immediate focus is ignored
    const t = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const savedFavourites = JSON.parse(
      localStorage.getItem("favourites") ?? "[]"
    );
    setFavourites(savedFavourites);
  }, []);

  function locationSelectHandler(locationData: CurrentLocation) {
    const locationObject = {
      country: locationData.country,
      country_code: locationData.country_code,
      region: locationData.region,
      state: locationData.state,
      place_id: locationData.place_id,
      city: locationData.city,
      timezone: locationData.timezone,
      lon: locationData.lon,
      lat: locationData.lat,
    };
    setCurrentLocation(locationObject);
    toggleLocationSelect();
    navigator.vibrate(50);
  }
  const favouritesHandler = (locationData: CurrentLocation) => {
    const locationObject = {
      country: locationData.country,
      country_code: locationData.country_code,
      region: locationData.region,
      state: locationData.state,
      place_id: locationData.place_id,
      city: locationData.city,
      timezone: locationData.timezone,
      lon: locationData.lon,
      lat: locationData.lat,
    };

    // Если нет, добавляем
    const newFavourites = [...favourites, locationObject];

    // Обновляем состояние и localStorage
    // setFavourites(newFavourites);
    navigator.vibrate(50);
    localStorage.setItem("favourites", JSON.stringify(newFavourites));
    router.push("/city");
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (query) {
        fetch(`/api/location?place=${query}`)
          .then((res) => res.json())
          .then(setLocations);
      }
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  return (
    <div className="flex items-center flex-col gap-4 justify-center p-4">
      <input
        ref={inputRef}
        autoFocus
        type="text"
        inputMode="search"
        enterKeyHint="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 bg-card-transparent rounded-2xl w-full"
      />
      {/* Suggested Locations */}
      <div className="flex flex-col gap-2 mt-2 w-full">
        {"features" in locations &&
          locations.features
            .filter((loc) => loc.properties?.city)
            .map((location) => (
              <div
                className="p-4 bg-card-transparent rounded-2xl flex  items-center foobar"
                key={location.properties.place_id}
                onClick={() => favouritesHandler(location.properties)}
              >
                <span className="font-semibold truncate">
                  {location.properties.city}
                </span>

                <span className="overflow-ellipsis truncate">
                  {", "}
                  {location.properties.state ||
                    location.properties.region ||
                    location.properties.county ||
                    location.properties.municipality}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
}
