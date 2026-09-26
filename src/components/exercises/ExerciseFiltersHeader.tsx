import React from "react";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { EXERCISES_DATA } from "@/data/exercisesData";
import { ExerciseChapterTabs } from "./ExerciseChapterTabs";

export function ExerciseFiltersHeader({
  searchQuery,
  onSearchChange,
  chapters,
  selectedChapter,
  onSelectChapter,
}: {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  chapters: string[];
  selectedChapter: string;
  onSelectChapter: (ch: string) => void;
}) {
  return (
    <div className="bg-card/60 p-6 rounded-2xl border border-border backdrop-blur shadow-sm space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl font-bold tracking-tight">
            Practice Exercises & Self-Assessment
          </span>
          <Badge variant="cyan">{EXERCISES_DATA.length} Curated Modules</Badge>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Extracted directly from David Poole and Alan Mackworth's curriculum on
          AISpace. Test your theoretical understanding with guided questions and
          verify using visual simulation tools.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-2.5" />
          <input
            aria-label="Search exercises"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search concepts, questions..."
            className="w-full h-9 pl-9 pr-3 text-xs rounded-lg border border-input bg-background/50 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <ExerciseChapterTabs
          chapters={chapters}
          selectedChapter={selectedChapter}
          onSelectChapter={onSelectChapter}
        />
      </div>
    </div>
  );
}
