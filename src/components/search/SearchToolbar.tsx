import React from "react";
import { HelpCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { Slider } from "../ui/Slider";
import { SearchStepButtons } from "./SearchStepButtons";

interface SearchToolbarProps {
  isPlaying: boolean;
  isGoalReached: boolean;
  isFrontierEmpty: boolean;
  isQuizMode: boolean;
  hasHistory: boolean;
  speed: number;
  setSpeed: (v: number) => void;
  onTogglePlay: () => void;
  onStep: () => void;
  onStepBack: () => void;
  onReset: () => void;
  onToggleQuiz: () => void;
}

export function SearchToolbar(props: SearchToolbarProps) {
  const { isQuizMode, speed, setSpeed, onToggleQuiz } = props;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-secondary/30 border-b border-border text-xs">
      <SearchStepButtons {...props} />

      <div className="flex items-center gap-2 w-36">
        <span className="text-[11px] text-muted-foreground whitespace-nowrap">
          Speed:
        </span>
        <Slider
          min={100}
          max={950}
          step={50}
          value={speed}
          onChange={setSpeed}
          className="h-1.5"
        />
      </div>

      <Button
        variant={isQuizMode ? "accent" : "outline"}
        size="sm"
        onClick={onToggleQuiz}
        className="gap-1.5 h-8 text-xs"
      >
        <HelpCircle className="h-3.5 w-3.5" />
        {isQuizMode ? "Exit Quiz" : "Quiz Mode"}
      </Button>
    </div>
  );
}
