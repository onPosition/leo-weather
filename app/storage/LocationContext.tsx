"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { CurrentLocation } from "../lib/types";

const fetchLocationByIp = async () => {
  const res = await fetch("/api/ip-whois");
  const data = await res.json();
  return data;
};

const defaultLocation: CurrentLocation = {
  country: "Montenegro",
  country_code: "me",
  place_id:
    "51468435841943334059ecb314da83384540f00101f901b887870000000000c00208",
  city: "Podgorica",
  lon: 19.2621081,
  lat: 42.4415238,
  timezone: { name: "CET" },
};

type LocationContextType = {
  currentLocation: CurrentLocation | null;
  setCurrentLocation: (loc: CurrentLocation) => void;
  isLoading: boolean;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [currentLocation, setCurrentLocationState] =
    useState<CurrentLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeLocation = async () => {
      const stored = localStorage.getItem("currentLocation");
      if (stored) {
        setCurrentLocationState(JSON.parse(stored));
        setIsLoading(false);
        return;
      }

      try {
        console.log("Fetching location by IP...");
        const locationFromIp = await fetchLocationByIp();
        setCurrentLocation(locationFromIp);
      } catch (error) {
        console.error("Failed to fetch location by IP, using default.", error);
        setCurrentLocation(defaultLocation);
      } finally {
        setIsLoading(false);
      }
    };

    initializeLocation();
  }, []);

  const setCurrentLocation = (loc: CurrentLocation) => {
    setCurrentLocationState(loc);
    localStorage.setItem("currentLocation", JSON.stringify(loc));
  };

  return (
    <LocationContext.Provider
      value={{ currentLocation, setCurrentLocation, isLoading }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used within LocationProvider");
  return ctx;
}
