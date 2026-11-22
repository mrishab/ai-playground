import { useState, useMemo } from "react";
import { EXERCISES_DATA, ExpandedItemMap } from "@/data/exercisesData";
import { getInitialExerciseQuery, filterExercisesList } from "./exerciseFilterUtils";

export function useExercisesFilter() {
  const [searchQuery, setSearchQuery] = useState<string>(getInitialExerciseQuery);
  const [selectedChapter, setSelectedChapter] = useState<string>("All");
  const [expandedSolutions, setExpandedSolutions] = useState<ExpandedItemMap>({});
  const [expandedHints, setExpandedHints] = useState<ExpandedItemMap>({});

  const chapters = useMemo(() => ["All", ...Array.from(new Set(EXERCISES_DATA.map((e) => e.chapter)))], []);

  const filteredExercises = useMemo(() => {
    return filterExercisesList(EXERCISES_DATA, selectedChapter, searchQuery);
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
