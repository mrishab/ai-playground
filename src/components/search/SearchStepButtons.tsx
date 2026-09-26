import React from "react";
import { SkipForward, RotateCcw } from "lucide-react";
import { Button } from "../ui/Button";
import { SearchStepButtonsProps } from "./searchTypes";
import { SearchAutoPlayButton } from "./SearchAutoPlayButton";

export function SearchStepButtons(props: SearchStepButtonsProps) {
  const {
    isPlaying,
    isGoalReached,
    isFrontierEmpty,
    isQuizMode,
    hasHistory,
    onTogglePlay,
    onStep,
    onStepBack,
    onReset,
  } = props;
  const disableStep =
    isPlaying || isGoalReached || isFrontierEmpty || isQuizMode;

  return (
    <div className="flex items-center gap-2">
      <SearchAutoPlayButton
        isPlaying={isPlaying}
        disabled={isGoalReached || isFrontierEmpty || isQuizMode}
        onTogglePlay={onTogglePlay}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={onStep}
        disabled={disableStep}
        className="gap-1.5 h-8"
      >
        <SkipForward className="h-3.5 w-3.5" /> Step
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onStepBack}
        disabled={isPlaying || !hasHistory}
        className="h-8 text-xs"
      >
        Step Back
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        className="gap-1.5 h-8 text-xs text-muted-foreground hover:text-foreground"
      >
        <RotateCcw className="h-3.5 w-3.5" /> Reset
      </Button>
    </div>
  );
}
