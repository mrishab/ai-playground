import React from "react";
import { CandidateGain } from "./dtreeTypes";
import { DTreeSplitControl } from "./DTreeSplitControl";
import { DTreeActionButtons } from "./DTreeActionButtons";
import { TimerSpeedBar } from "../ui/TimerSpeedBar";

interface DTreeToolbarProps {
  onAutoBuild: () => void;
  onReset: () => void;
  onStepId3: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  canStep: boolean;
  candidateGains: CandidateGain[];
  selectedSplitAttr: string;
  setSelectedSplitAttr: (attr: string) => void;
  onSplit: (attr: string) => void;
  speed: number;
  setSpeed: (v: number) => void;
  algo?: string;
}

export function DTreeToolbar(props: DTreeToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-secondary/30 border-b border-border text-xs">
      <DTreeActionButtons
        onAutoBuild={props.onAutoBuild}
        onReset={props.onReset}
        onStepId3={props.onStepId3}
        isPlaying={props.isPlaying}
        onTogglePlay={props.onTogglePlay}
        canStep={props.canStep}
        algo={props.algo}
      />
      <TimerSpeedBar speed={props.speed} setSpeed={props.setSpeed} />
      <DTreeSplitControl
        candidateGains={props.candidateGains}
        selectedSplitAttr={props.selectedSplitAttr}
        setSelectedSplitAttr={props.setSelectedSplitAttr}
        onSplit={props.onSplit}
        algo={props.algo}
      />
    </div>
  );
}
