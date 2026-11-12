import React from "react";
import { SkipForward, RotateCcw, ArrowLeft } from "lucide-react";
import { Button } from "../ui/Button";
import { ConstraintAutoAcButton } from "./ConstraintAutoAcButton";
import { ConstraintStepButtonsProps } from "./constraintTypes";

export function ConstraintStepButtons(props: ConstraintStepButtonsProps) {
  const {
    arcQueueLength,
    isPlaying,
    hasBackups,
    onFineStep,
    onToggleAutoAC,
    onBacktrack,
    onReset,
  } = props;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="default"
        size="sm"
        onClick={onFineStep}
        className="gap-1.5 h-8 font-semibold"
      >
        <SkipForward className="h-3.5 w-3.5" />
        {arcQueueLength > 0 ? "Fine Step (Arc)" : "Step MRV Split"}
      </Button>

      <ConstraintAutoAcButton
        isPlaying={isPlaying}
        disabled={arcQueueLength === 0}
        onToggleAutoAC={onToggleAutoAC}
      />

      <Button
        variant="ghost"
        size="sm"
        onClick={onBacktrack}
        disabled={!hasBackups}
        className="gap-1.5 h-8 text-xs"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Backtrack
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        className="gap-1.5 h-8 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset
      </Button>
    </div>
  );
}
