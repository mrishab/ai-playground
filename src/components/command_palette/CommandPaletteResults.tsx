import React from "react";
import { NavItem } from "@/components/Sidebar";
import { ExerciseItem } from "@/data/exercisesData";
import { NavResultList } from "./NavResultList";
import { ExerciseResultList } from "./ExerciseResultList";

export function CommandPaletteResults({
  query,
  filteredNav,
  filteredExercises,
  selectedIndex = 0,
  onSelect,
}: {
  query: string;
  filteredNav: NavItem[];
  filteredExercises: ExerciseItem[];
  selectedIndex?: number;
  onSelect: (id: string) => void;
}) {
  const hasResults = filteredNav.length > 0 || filteredExercises.length > 0;

  return (
    <div
      role="listbox"
      className="p-3 max-h-80 overflow-y-auto space-y-4 text-xs"
    >
      <NavResultList items={filteredNav} selectedIndex={selectedIndex} onSelect={onSelect} />
      <ExerciseResultList
        exercises={filteredExercises}
        selectedIndex={selectedIndex}
        offset={filteredNav.length}
        onSelect={onSelect}
      />
      {!hasResults && (
        <div className="text-center py-8 text-muted-foreground text-xs">
          No matching tools or exercises found for "{query}".
        </div>
      )}
    </div>
  );
}
