import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { ExerciseItem } from "@/data/exercisesData";

export function ExerciseResultList({
  exercises,
  onSelect,
}: {
  exercises: ExerciseItem[];
  onSelect: (id: string) => void;
}) {
  if (exercises.length === 0) return null;
  return (
    <div className="space-y-1 pt-2 border-t border-border/40">
      <span className="px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
        Practice Exercises
      </span>
      <div className="space-y-0.5">
        {exercises.map((ex) => (
          <button
            key={ex.id}
            onClick={() => onSelect("exercises")}
            className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary/70 transition-colors text-left"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="h-4 w-4 text-cyan-400" />
              <div>
                <span className="font-medium text-foreground">
                  Exercise {ex.id}: {ex.title}
                </span>
                <span className="text-[10px] text-muted-foreground block">
                  {ex.chapter}
                </span>
              </div>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}
