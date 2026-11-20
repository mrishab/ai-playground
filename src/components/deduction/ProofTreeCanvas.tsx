import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProofNode, SubstitutionMap } from "./deductionTypes";
import { ProofAnswerBox } from "./ProofAnswerBox";
import { ProofBranchItem } from "./ProofBranchItem";
import { DeductionToolbar } from "./DeductionToolbar";

interface ProofCanvasProps {
  proofTree: ProofNode | null;
  log: string;
  answers: SubstitutionMap[];
  algo: string;
  onSelectAlgo: (a: string) => void;
  onNextAnswer?: () => void;
}

export function ProofTreeCanvas({ proofTree, log, answers, algo, onSelectAlgo, onNextAnswer }: ProofCanvasProps) {
  const badgeVariant = !proofTree ? "outline" : proofTree.status === "success" ? "success" : proofTree.status === "active" ? "cyan" : "destructive";
  const badgeLabel = !proofTree ? "" : proofTree.status === "success" ? "Goal Proved" : proofTree.status === "active" ? "In Progress" : "Failed";

  return (
    <Card className="overflow-hidden border-border/80 shadow-md">
      <DeductionToolbar algo={algo} onSelectAlgo={onSelectAlgo} onNextAnswer={onNextAnswer} answersCount={answers.length} />
      <div className="p-3 bg-secondary/40 border-b border-border flex items-center justify-between text-xs">
        <span className="font-semibold text-foreground">
          {algo === "bottom_up" ? "Bottom-Up Consequence Set" : "SLD Proof Search Tree"}
        </span>
        {proofTree && <Badge variant={badgeVariant} className="text-[10px]">{badgeLabel}</Badge>}
      </div>
      <div className="p-6 bg-canvas min-h-[300px] flex flex-col items-center justify-center">
        {proofTree ? (
          <div className="w-full space-y-4">
            <div className="flex flex-col items-center">
              <div className="px-4 py-2 rounded-xl bg-primary/20 border-2 border-primary text-primary font-mono font-bold text-xs shadow-lg">
                ?- {proofTree.goal}
              </div>
            </div>
            {proofTree.children.map((child, i) => (
              <ProofBranchItem key={`${child.id || i}-${child.goal}-${i}`} child={child} />
            ))}
          </div>
        ) : (
          <div className="text-center text-xs text-muted-foreground py-12">
            Enter a query in the Interactive Query Goal panel and click &quot;Prove Query&quot; to visualize the proof.
          </div>
        )}
      </div>
      <ProofAnswerBox log={log} answers={answers} />
    </Card>
  );
}
