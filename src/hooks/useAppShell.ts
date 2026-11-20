import { useState, useRef, useCallback, useEffect } from "react";
import { useGlobalShortcut } from "./useGlobalShortcut";

function getInitialView(): string {
  if (typeof window !== "undefined" && window.location.hash) {
    const hash = window.location.hash.replace(/^#\/?/, "").trim();
    if (hash) return hash;
  }
  return "overview";
}

export function useAppShell() {
  const [currentView, setCurrentViewInternal] = useState<string>(getInitialView);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const setCurrentView = useCallback((view: string) => {
    setCurrentViewInternal(view);
    if (typeof window !== "undefined" && window.location.hash.replace(/^#\/?/, "") !== view) {
      window.location.hash = `#${view}`;
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, "").trim();
      setCurrentViewInternal(hash || "overview");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const togglePalette = useCallback(() => setIsPaletteOpen((prev) => !prev), []);
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
