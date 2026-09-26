import React from "react";
import { PlayCircle, ChevronDown, ChevronUp, X } from "lucide-react";

interface ExerciseStepRunnerHeaderProps {
  algorithmName: string;
  isOpen: boolean;
  onToggleOpen: () => void;
  hasActiveQuestion: boolean;
  onClearQuestion?: () => void;
}

export function ExerciseStepRunnerHeader({
  algorithmName,
  isOpen,
  onToggleOpen,
  hasActiveQuestion,
  onClearQuestion,
}: ExerciseStepRunnerHeaderProps) {
  return (
    <div className="flex items-center justify-between p-2.5 hover:bg-primary/10 transition-colors">
      <button
        onClick={onToggleOpen}
        className="flex-1 flex items-center justify-between text-xs font-semibold text-primary text-left"
      >
        <span className="flex items-center gap-1.5 truncate">
          <PlayCircle className="h-3.5 w-3.5 shrink-0" />
          Interactive Algorithm Execution: {algorithmName}
        </span>
        {isOpen ? <ChevronUp className="h-3.5 w-3.5 ml-2 shrink-0" /> : <ChevronDown className="h-3.5 w-3.5 ml-2 shrink-0" />}
      </button>
      {hasActiveQuestion && onClearQuestion && (
        <button
          onClick={onClearQuestion}
          className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-secondary text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <X className="h-3 w-3" /> Full
        </button>
      )}
    </div>
  );
}
