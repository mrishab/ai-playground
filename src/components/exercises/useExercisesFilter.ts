import { useState, useMemo } from "react";
import {
  EXERCISES_DATA,
  ExerciseItem,
  ExpandedItemMap,
} from "@/data/exercisesData";

export function useExercisesFilter() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("All");
  const [expandedSolutions, setExpandedSolutions] = useState<ExpandedItemMap>(
    {},
  );
  const [expandedHints, setExpandedHints] = useState<ExpandedItemMap>({});

  const chapters = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(EXERCISES_DATA.map((e) => e.chapter))),
    ];
  }, []);

  const filteredExercises = useMemo(() => {
    return EXERCISES_DATA.filter((ex: ExerciseItem) => {
      const matchesChapter =
        selectedChapter === "All" || ex.chapter === selectedChapter;
      const q = searchQuery.toLowerCase();
      const matchesQuery =
        ex.title.toLowerCase().includes(q) ||
        ex.id.toLowerCase().includes(q) ||
        ex.goals.some((g) => g.toLowerCase().includes(q)) ||
        ex.questions.some((item) => item.q.toLowerCase().includes(q));
      return matchesChapter && matchesQuery;
    });
  }, [searchQuery, selectedChapter]);

  const toggleSolution = (key: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleHint = (key: string) => {
    setExpandedHints((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return {
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
  };
}
