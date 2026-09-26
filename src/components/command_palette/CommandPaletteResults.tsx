import React from "react";
import { NavItem } from "@/components/Sidebar";
import { ExerciseItem } from "@/data/exercisesData";
import { NavResultList } from "./NavResultList";
import { ExerciseResultList } from "./ExerciseResultList";

export function CommandPaletteResults({
  query,
  filteredNav,
  filteredExercises,
  onSelect,
}: {
  query: string;
  filteredNav: NavItem[];
  filteredExercises: ExerciseItem[];
  onSelect: (id: string) => void;
}) {
  const hasResults = filteredNav.length > 0 || filteredExercises.length > 0;

  return (
    <div
      role="listbox"
      className="p-3 max-h-80 overflow-y-auto space-y-4 text-xs"
    >
      <NavResultList items={filteredNav} onSelect={onSelect} />
      <ExerciseResultList exercises={filteredExercises} onSelect={onSelect} />
      {!hasResults && (
        <div className="text-center py-8 text-muted-foreground text-xs">
          No matching tools or exercises found for "{query}".
        </div>
      )}
    </div>
  );
}
