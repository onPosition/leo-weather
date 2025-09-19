"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";

type UIContextType = {
  isLocationSelectOpen: boolean;
  setIsLocationSelectOpen: (open: boolean) => void;
  toggleLocationSelect: () => void;

  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  toggleMenu: () => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  theme: Theme;
  toggleTheme: () => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLocationSelectOpen, setIsLocationSelectOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
  }, []);

  const toggleLocationSelect = () => setIsLocationSelectOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <UIContext.Provider
      value={{
        isLocationSelectOpen,
        setIsLocationSelectOpen,
        toggleLocationSelect,
        isMenuOpen,
        setIsMenuOpen,
        toggleMenu,
        isLoading,
        setIsLoading,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
