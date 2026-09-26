import { useState, useRef, useCallback } from "react";
import { useGlobalShortcut } from "./useGlobalShortcut";

export function useAppShell() {
  const [currentView, setCurrentView] = useState<string>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const togglePalette = useCallback(
    () => setIsPaletteOpen((prev) => !prev),
    [],
  );
  useGlobalShortcut("k", togglePalette);

  const handleOpenTool = (toolId: string) => {
    setCurrentView(toolId);
    window.scrollTo({ top: 0, behavior: "smooth" });
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    currentView,
    setCurrentView,
    isSidebarOpen,
    setIsSidebarOpen,
    isPaletteOpen,
    setIsPaletteOpen,
    mainRef,
    handleOpenTool,
  };
}
