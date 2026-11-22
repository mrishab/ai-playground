import { EXERCISES_DATA, ExerciseItem } from "@/data/exercisesData";

export function getInitialExerciseQuery(): string {
  if (typeof window !== "undefined") {
    const hash = window.location.hash;
    const match = hash.match(/[?&](?:id|q)=([^&]+)/);
    if (match) return decodeURIComponent(match[1]);
  }
  return "";
}

export function filterExercisesList(
  exercises: ExerciseItem[],
  selectedChapter: string,
  searchQuery: string,
): ExerciseItem[] {
  const q = searchQuery.toLowerCase();
  return exercises.filter((ex: ExerciseItem) => {
    const matchesChapter = selectedChapter === "All" || ex.chapter === selectedChapter;
    const matchesQuery =
      ex.title.toLowerCase().includes(q) ||
      ex.id.toLowerCase().includes(q) ||
      ex.goals.some((g) => g.toLowerCase().includes(q)) ||
      ex.questions.some((item) => item.q.toLowerCase().includes(q));
    return matchesChapter && matchesQuery;
  });
}
