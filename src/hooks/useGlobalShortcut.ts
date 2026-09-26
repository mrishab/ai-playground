import { useEffect } from "react";

export function useGlobalShortcut(key: string, onTrigger: () => void) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === key.toLowerCase()
      ) {
        e.preventDefault();
        onTrigger();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [key, onTrigger]);
}
