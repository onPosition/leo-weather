"use client";
import { AutocompleteResponse, CurrentLocation } from "@/app/lib/types";
import { useLocation } from "@/app/storage/LocationContext";
import { useEffect, useState } from "react";
import { useUI } from "@/app/storage/UIContext";
import FavItem from "./ui/FavItem";

export default function LocationSelect() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<AutocompleteResponse | []>([]);
  const [favourites, setFavourites] = useState<CurrentLocation[]>([]);
  const { setCurrentLocation } = useLocation();
  const { toggleLocationSelect } = useUI();

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

    // Проверяем, есть ли уже этот город в избранном
    const isDuplicate = favourites.some(
      (fav: CurrentLocation) => fav.place_id === locationObject.place_id
    );
    let newFavourites;
    if (isDuplicate) {
      // Если есть, удаляем его
      newFavourites = favourites.filter(
        (fav: CurrentLocation) => !(fav.place_id === locationObject.place_id)
      );
    } else {
      // Если нет, добавляем
      newFavourites = [...favourites, locationObject];
    }

    // Обновляем состояние и localStorage
    setFavourites(newFavourites);
    navigator.vibrate(50);
    localStorage.setItem("favourites", JSON.stringify(newFavourites));
  };

  // Функция для проверки наличия города в избранном
  const isLocationFavourite = (locationData: CurrentLocation) => {
    return favourites.some(
      (fav: CurrentLocation) => fav.place_id === locationData.place_id
    );
  };

  useEffect(() => {
    const savedFavourites = JSON.parse(
      localStorage.getItem("favourites") ?? "[]"
    );
    setFavourites(savedFavourites);
  }, []);

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
      {favourites.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {favourites.map((location) => (
            <FavItem
              key={location.place_id}
              location={location}
              onSelect={locationSelectHandler}
              onRemove={favouritesHandler}
            />
          ))}
        </div>
      )}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 bg-card-transparent rounded-2xl w-full"
      ></input>

      <div className="flex flex-col gap-2 mt-2">
        {"features" in locations &&
          locations.features
            .filter((loc) => loc.properties?.city)
            .map((location) => (
              <div
                className="p-4 bg-card-transparent rounded-2xl flex justify-between items-center foobar"
                key={location.properties.place_id}
                onClick={() => locationSelectHandler(location.properties)}
              >
                {location.properties.city} <br />
                {location.properties.state ||
                  location.properties.region ||
                  location.properties.county ||
                  location.properties.municipality}
                <div
                  className="p-2 bg-white rounded-2xl ml-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    favouritesHandler(location.properties);
                  }}
                >
                  {isLocationFavourite(location.properties) ? "💖" : "➕"}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
