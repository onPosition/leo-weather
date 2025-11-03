"use client";
import { AutocompleteResponse, CurrentLocation } from "@/app/lib/types";
import { useLocation } from "@/app/storage/LocationContext";
import { useEffect, useState } from "react";
import { useUI } from "@/app/storage/UIContext";
import FavItem from "@/components/ui/FavItem";
import type { TransformedWeather } from "../api/weather/route";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Cross, Plus } from "lucide-react";

export default function LocationSelect() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<AutocompleteResponse | []>([]);
  const [favourites, setFavourites] = useState<CurrentLocation[]>([]);
  const { setCurrentLocation } = useLocation();
  const router = useRouter();
  const [favouriteWeatherData, setFavouriteWeatherData] = useState<
    Array<{
      temperature: number;
      weatherCode: number;
      timeStamp: string;
    }>
  >([]);

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
    navigator.vibrate(50);
    router.push("/");
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

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const weatherPromises = favourites.map(({ lat, lon }) =>
          fetch(`/api/weather?lat=${lat}&lon=${lon}`)
            .then((res) => res.json())
            .then((data: TransformedWeather) => ({
              temperature: data.current.temperature,
              weatherCode: data.current.weatherCode,
              timeStamp: data.hourly[0].timestamp,
            }))
        );

        const weatherData = await Promise.all(weatherPromises);
        setFavouriteWeatherData(weatherData);
      } catch (error) {
        console.error("Ошибка загрузки погоды:", error);
      }
    };

    if (favourites.length > 0) {
      fetchWeatherData();
    }
  }, [favourites]);
  return (
    <div className="flex items-center h-full flex-col gap-4 justify-between p-4">
      {favourites.length > 0 && (
        <div className="grid grid-cols-1 gap-2 mt-2 w-full">
          {favourites.map((location, idx) => (
            <FavItem
              key={location.place_id}
              location={location}
              onSelect={locationSelectHandler}
              onRemove={favouritesHandler}
              currentWeather={favouriteWeatherData[idx]}
            />
          ))}
        </div>
      )}
      <Link href="/city/add" className=" flex flex-col mb-8 items-center">
        <Plus className="w-8 h-8" />
        Add city
      </Link>
    </div>
  );
}
