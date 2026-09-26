import React from "react";

interface ExerciseChapterTabsProps {
  chapters: string[];
  selectedChapter: string;
  onSelectChapter: (ch: string) => void;
}

export function ExerciseChapterTabs({
  chapters,
  selectedChapter,
  onSelectChapter,
}: ExerciseChapterTabsProps) {
  return (
    <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
      {chapters.map((ch) => (
        <button
          key={ch}
          onClick={() => onSelectChapter(ch)}
          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
            selectedChapter === ch
              ? "bg-primary text-primary-foreground font-semibold shadow-sm"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          {ch}
        </button>
      ))}
    </div>
  );
}
