"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark-neon" | "light-minimal" | "cyber-gradient";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark-neon");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read theme from localStorage on mount
    const savedTheme = localStorage.getItem("portfolio-theme") as Theme;
    if (
      savedTheme === "dark-neon" ||
      savedTheme === "light-minimal" ||
      savedTheme === "cyber-gradient"
    ) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme("dark-neon");
    }
    setMounted(true);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    root.classList.remove("theme-light-minimal", "theme-cyber-gradient");
    
    if (newTheme === "light-minimal") {
      root.classList.add("theme-light-minimal");
    } else if (newTheme === "cyber-gradient") {
      root.classList.add("theme-cyber-gradient");
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("portfolio-theme", newTheme);
    applyTheme(newTheme);
  };

  // Prevent hydration layout mismatch by rendering children only when mounted
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={mounted ? "" : "opacity-0"}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
