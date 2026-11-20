import React from "react";
import { CSPVariable } from "@/data/cspProblems";
import { VariableDomains } from "./constraintTypes";
import { ConstraintStepButtons } from "./ConstraintStepButtons";
import { ConstraintSplitControls } from "./ConstraintSplitControls";
import { TimerSpeedBar } from "../ui/TimerSpeedBar";

interface ConstraintToolbarProps {
  arcQueueLength: number;
  isPlaying: boolean;
  hasBackups: boolean;
  speed: number;
  setSpeed: (v: number) => void;
  onFineStep: () => void;
  onToggleAutoAC: () => void;
  onBacktrack: () => void;
  onReset: () => void;
  variables: CSPVariable[];
  domains: VariableDomains;
  selectedVarToSplit: string;
  setSelectedVarToSplit: (v: string) => void;
  onPerformSplit: (v: string) => void;
}

export function ConstraintToolbar(props: ConstraintToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-secondary/30 border-b border-border text-xs" aria-label="Constraint Canvas Controls">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80 px-1.5 py-0.5 rounded bg-secondary/80 border border-border/50 hidden sm:inline-block">
          Canvas Controls
        </span>
        <ConstraintStepButtons {...props} />
      </div>
      <TimerSpeedBar speed={props.speed} setSpeed={props.setSpeed} />
      <ConstraintSplitControls {...props} />
    </div>
  );
}
