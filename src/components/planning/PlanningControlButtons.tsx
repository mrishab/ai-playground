import React from "react";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PlanningControlButtons({
  isExecuting,
  isDone,
  onToggleExecute,
  onStep,
  onReset,
}: {
  isExecuting: boolean;
  isDone: boolean;
  onToggleExecute: () => void;
  onStep: () => void;
  onReset: () => void;
}) {
  return (
    // react-doctor-disable-next-line react-doctor/duplicate-jsx-subtree
    <div className="flex items-center gap-2">
      <Button
        variant={isExecuting ? "destructive" : "default"}
        size="sm"
        onClick={onToggleExecute}
        disabled={isDone}
        className="gap-1.5 h-8 font-semibold"
      >
        {isExecuting ? (
          <Pause className="h-3.5 w-3.5 fill-current" />
        ) : (
          <Play className="h-3.5 w-3.5 fill-current" />
        )}
        {isExecuting ? "Pause" : "Animate Plan"}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onStep}
        disabled={isExecuting || isDone}
        className="gap-1.5 h-8"
      >
        <SkipForward className="h-3.5 w-3.5" />
        Step Action
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        className="gap-1.5 h-8 text-xs text-muted-foreground hover:text-foreground"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset
      </Button>
    </div>
  );
}
