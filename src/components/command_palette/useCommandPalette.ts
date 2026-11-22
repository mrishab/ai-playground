import { useState, useCallback, useEffect } from "react";
import { filterNavItems, filterExerciseItems } from "./filterCommandItems";

export function useCommandPalette(onClose: () => void, onSelectView: (view: string) => void) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClose = useCallback(() => {
    setQuery("");
    setSelectedIndex(0);
    onClose();
  }, [onClose]);

  const handleSelect = useCallback((id: string) => {
    onSelectView(id);
    handleClose();
  }, [onSelectView, handleClose]);

  const q = query.trim().toLowerCase();
  const filteredNav = filterNavItems(q);
  const filteredExercises = filterExerciseItems(q);
  const totalCount = filteredNav.length + filteredExercises.length;

  useEffect(() => { setSelectedIndex(0); }, [query]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => (totalCount > 0 ? (i + 1) % totalCount : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => (totalCount > 0 ? (i - 1 + totalCount) % totalCount : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex < filteredNav.length) {
        const item = filteredNav[selectedIndex];
        if (item) handleSelect(item.id);
      } else {
        const ex = filteredExercises[selectedIndex - filteredNav.length];
        if (ex) handleSelect(`exercises?id=${encodeURIComponent(ex.id)}`);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleClose();
    }
  }, [totalCount, selectedIndex, filteredNav, filteredExercises, handleSelect, handleClose]);

  return { query, setQuery, filteredNav, filteredExercises, selectedIndex, handleKeyDown, handleSelect, handleClose };
}
