import { useState } from "react";
import { NAV_ITEMS, NavItem } from "@/components/Sidebar";
import { EXERCISES_DATA } from "@/data/exercisesData";

export function useCommandPalette(
  onClose: () => void,
  onSelectView: (view: string) => void,
) {
  const [query, setQuery] = useState("");

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  const handleSelect = (id: string) => {
    onSelectView(id);
    handleClose();
  };

  const filteredNav = NAV_ITEMS.filter(
    (item: NavItem) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()),
  );

  const filteredExercises = EXERCISES_DATA.filter(
    (ex) =>
      ex.title.toLowerCase().includes(query.toLowerCase()) ||
      ex.id.toLowerCase().includes(query.toLowerCase()) ||
      ex.chapter.toLowerCase().includes(query.toLowerCase()),
  ).slice(0, 5);

  return { query, setQuery, filteredNav, filteredExercises, handleSelect, handleClose };
}
