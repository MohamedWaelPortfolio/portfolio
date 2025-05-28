"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function useThemeEffect() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const root = window.document.documentElement;

    const handleThemeChange = () => {
      if (theme === "dark") {
        root.classList.add("theme-transition");
        root.classList.add("dark");
      } else {
        root.classList.add("theme-transition");
        root.classList.remove("dark");
      }

      // Remove transition class after animation completes
      window.setTimeout(() => {
        root.classList.remove("theme-transition");
      }, 300);
    };

    handleThemeChange();

    return () => {
      root.classList.remove("theme-transition");
    };
  }, [theme]);

  return { theme, setTheme };
}
