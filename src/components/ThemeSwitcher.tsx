"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, Theme } from "./ThemeProvider";
import { Sun, Moon, Zap, Sparkles } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes: { id: Theme; name: string; icon: React.ReactNode; color: string; glow: string }[] = [
    {
      id: "dark-neon",
      name: "Dark Neon",
      icon: <Moon className="h-4 w-4 text-[#00f2fe]" />,
      color: "bg-[#0d0f14] border-[#00f2fe]/30",
      glow: "shadow-[0_0_15px_rgba(0,242,254,0.3)]",
    },
    {
      id: "light-minimal",
      name: "Light Minimal",
      icon: <Sun className="h-4 w-4 text-[#2563eb]" />,
      color: "bg-white border-slate-200",
      glow: "shadow-[0_0_15px_rgba(37,99,235,0.15)]",
    },
    {
      id: "cyber-gradient",
      name: "Cyber Gradient",
      icon: <Zap className="h-4 w-4 text-[#ff007f]" />,
      color: "bg-[#0b001a] border-[#ff007f]/30",
      glow: "shadow-[0_0_15px_rgba(255,0,127,0.4)]",
    },
  ];

  const currentThemeObj = themes.find((t) => t.id === theme) || themes[0];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 mb-2 flex flex-col gap-2 p-2 rounded-2xl bg-card border border-card-border backdrop-blur-xl shadow-2xl min-w-[150px]"
          >
            <div className="text-[10px] uppercase tracking-wider font-bold text-muted px-2 py-1">
              Select Theme
            </div>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-3 py-2 text-sm rounded-xl transition-all ${
                  theme === t.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-foreground/5 text-muted hover:text-foreground"
                }`}
              >
                <div className={`p-1.5 rounded-lg border ${t.color}`}>
                  {t.icon}
                </div>
                <span>{t.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className={`p-4 rounded-full border bg-card border-card-border backdrop-blur-xl cursor-pointer ${currentThemeObj.glow} flex items-center justify-center text-foreground transition-all duration-300`}
      >
        <Sparkles className="h-6 w-6 animate-pulse text-primary" />
      </motion.button>
    </div>
  );
}
