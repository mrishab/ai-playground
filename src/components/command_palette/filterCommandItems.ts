import { NAV_ITEMS, NavItem } from "@/components/Sidebar";
import { EXERCISES_DATA, ExerciseItem } from "@/data/exercisesData";
import { TOOL_ALIASES } from "./commandPaletteAliases";

export function filterNavItems(q: string): NavItem[] {
  return NAV_ITEMS.filter((item: NavItem) => {
    if (!q) return true;
    const titleMatch = item.title.toLowerCase().includes(q);
    const categoryMatch = item.category.toLowerCase().includes(q);
    const idMatch = item.id.toLowerCase().includes(q);
    const aliases = TOOL_ALIASES[item.id] || [];
    const aliasMatch = aliases.some((a) => a.includes(q) || q.includes(a));
    return titleMatch || categoryMatch || idMatch || aliasMatch;
  });
}

export function filterExerciseItems(q: string): ExerciseItem[] {
  if (!q) return [];
  return EXERCISES_DATA.filter((ex) =>
    ex.title.toLowerCase().includes(q) ||
    ex.id.toLowerCase().includes(q) ||
    ex.chapter.toLowerCase().includes(q) ||
    ex.goals.some((g) => g.toLowerCase().includes(q))
  ).slice(0, 5);
}
