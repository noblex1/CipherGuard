"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    // Ensure only the light class is present
    root.classList.remove("dark");
    root.classList.add("light");
  }, []);

  const value: ThemeProviderState = {
    theme: "light",
    setTheme: () => {},
  };

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
