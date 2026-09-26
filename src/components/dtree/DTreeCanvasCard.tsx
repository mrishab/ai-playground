import React from "react";
import { Card } from "../ui/Card";
import { TreeNodeView } from "./TreeNodeView";
import { DTreeToolbar } from "./DTreeToolbar";
import { TreeNode, CandidateGain } from "./dtreeTypes";

interface DTreeCanvasCardProps {
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
  tree: TreeNode | null;
  log: string;
  speed: number;
  setSpeed: (v: number) => void;
}

export function DTreeCanvasCard(props: DTreeCanvasCardProps) {
  return (
    <Card className="overflow-hidden border-border/80 shadow-md">
      <DTreeToolbar {...props} />
      <div className="p-8 bg-slate-50 dark:bg-[#070a13] min-h-[380px] flex flex-col items-center justify-start overflow-x-auto">
        {props.tree ? (
          <div className="flex flex-col items-center w-full">
            <TreeNodeView node={props.tree} />
          </div>
        ) : (
          <div className="text-center text-xs text-muted-foreground py-16">
            Click Auto-Build to generate tree.
          </div>
        )}
      </div>
      <div className="p-3 bg-secondary/30 border-t border-border font-mono text-xs text-foreground/90">
        {props.log}
      </div>
    </Card>
  );
}
