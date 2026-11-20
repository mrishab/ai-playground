import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProofNode, SubstitutionMap } from "./deductionTypes";
import { ProofAnswerBox } from "./ProofAnswerBox";
import { ProofBranchItem } from "./ProofBranchItem";

export function ProofTreeCanvas({
  proofTree,
  log,
  answers,
}: {
  proofTree: ProofNode | null;
  log: string;
  answers: SubstitutionMap[];
}) {
  return (
    <Card className="overflow-hidden border-border/80 shadow-md">
      <div className="p-3 bg-secondary/40 border-b border-border flex items-center justify-between text-xs">
        <span className="font-semibold text-foreground">
          SLD Proof Search Tree
        </span>
        {proofTree && (
          <Badge
            variant={proofTree.status === "success" ? "success" : proofTree.status === "active" ? "cyan" : "destructive"}
            className="text-[10px]"
          >
            {proofTree.status === "success" ? "Goal Proved" : proofTree.status === "active" ? "In Progress" : "Failed"}
          </Badge>
        )}
      </div>

      <div className="p-6 bg-canvas min-h-[300px] flex flex-col items-center justify-center">
        {proofTree ? (
          <div className="w-full space-y-4">
            <div className="flex flex-col items-center">
              <div className="px-4 py-2 rounded-xl bg-primary/20 border-2 border-primary text-primary font-mono font-bold text-xs shadow-lg">
                ?- {proofTree.goal}
              </div>
            </div>
            {proofTree.children.map((child) => (
              <ProofBranchItem
                key={`${child.ruleMatched}-${child.goal}-${child.substitution}`}
                child={child}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-xs text-muted-foreground py-12">
            Enter a query in the Interactive Query Goal panel and click &quot;Prove Query&quot; to visualize the SLD proof tree.
          </div>
        )}
      </div>

      <ProofAnswerBox log={log} answers={answers} />
    </Card>
  );
}
