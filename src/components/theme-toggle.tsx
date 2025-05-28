"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-muted/20 animate-pulse">
        <span className="sr-only">Loading theme toggle</span>
      </div>
    );
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-10 h-10 rounded-lg bg-background hover:bg-muted transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          scale: theme === "dark" ? 0 : 1,
          rotate: theme === "dark" ? -45 : 0,
          opacity: theme === "dark" ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <Sun className="w-5 h-5 text-primary" />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          scale: theme === "dark" ? 1 : 0,
          rotate: theme === "dark" ? 0 : 45,
          opacity: theme === "dark" ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <Moon className="w-5 h-5 text-primary" />
      </motion.div>

      {/* Focus ring */}
      <motion.div
        className="absolute inset-0 rounded-lg ring-2 ring-primary/20 ring-offset-2 ring-offset-background"
        initial={false}
        animate={{
          opacity: 0,
        }}
        whileFocus={{
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
      />

      <span className="sr-only">Toggle theme</span>
    </motion.button>
  );
}
