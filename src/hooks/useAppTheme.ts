import { useState, useEffect } from "react";

export function useAppTheme() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("aispace-theme");
    return saved !== null ? saved === "dark" : true;
  });

  useEffect(() => {
    localStorage.setItem("aispace-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return { isDarkMode, toggleDarkMode };
}
