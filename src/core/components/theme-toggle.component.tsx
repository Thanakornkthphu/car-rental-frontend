"use client";

import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "@/core/stores/theme.store";

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark" || currentTheme === "light") useThemeStore.setState({ theme: currentTheme });
  }, []);

  return (
    <button
      type="button"
      data-testid="theme-toggle-button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="flex size-9 items-center justify-center rounded-button text-foreground hover:bg-surface"
    >
      {theme === "dark" ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
    </button>
  );
}
