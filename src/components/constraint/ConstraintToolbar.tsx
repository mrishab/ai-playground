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
    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-secondary/30 border-b border-border text-xs">
      <ConstraintStepButtons {...props} />
      <TimerSpeedBar speed={props.speed} setSpeed={props.setSpeed} />
      <ConstraintSplitControls {...props} />
    </div>
  );
}
