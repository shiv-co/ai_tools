"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);

    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDark(isDark);
  };

  // 🔑 THIS LINE PREVENTS HYDRATION ERROR
  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-md
        border border-[var(--border)]
        text-sm
        text-[var(--text-secondary)]
        hover:text-[var(--text-primary)]
        transition"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
