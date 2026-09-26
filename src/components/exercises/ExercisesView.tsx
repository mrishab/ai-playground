import React from "react";
import { useExercisesFilter } from "./useExercisesFilter";
import { ExerciseFiltersHeader } from "./ExerciseFiltersHeader";
import { ExerciseCard } from "./ExerciseCard";

export function ExercisesView({
  onOpenTool,
}: {
  onOpenTool: (toolId: string, sampleId?: string) => void;
}) {
  const {
    searchQuery,
    setSearchQuery,
    selectedChapter,
    setSelectedChapter,
    chapters,
    filteredExercises,
    expandedSolutions,
    expandedHints,
    toggleSolution,
    toggleHint,
  } = useExercisesFilter();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <ExerciseFiltersHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        chapters={chapters}
        selectedChapter={selectedChapter}
        onSelectChapter={setSelectedChapter}
      />

      <div className="space-y-4">
        {filteredExercises.map((ex) => (
          <ExerciseCard
            key={ex.id}
            exercise={ex}
            expandedHints={expandedHints}
            expandedSolutions={expandedSolutions}
            onToggleHint={toggleHint}
            onToggleSolution={toggleSolution}
            onOpenTool={onOpenTool}
          />
        ))}

        {filteredExercises.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">
            No exercises match your query. Try searching for "heuristic", "arc
            consistency", or "bayes".
          </div>
        )}
      </div>
    </div>
  );
}
