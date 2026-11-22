import React from "react";
import { Play, Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DeductionStepControls, DeductionStepControlsProps } from "./DeductionStepControls";
import { DeductionQueryPresets } from "./DeductionQueryPresets";

interface DeductionQueryCardProps extends DeductionStepControlsProps {
  queryInput: string;
  onQueryChange: (q: string) => void;
  sampleQueries: string[];
  onRunProof: () => void;
}

export function DeductionQueryCard(p: DeductionQueryCardProps) {
  const openParen = (p.queryInput.match(/\(/g) || []).length;
  const closeParen = (p.queryInput.match(/\)/g) || []).length;
  const isUnbalanced = openParen !== closeParen;

  return (
    <Card className="p-4 space-y-3 border-border/80 shadow-md">
      <DeductionQueryPresets sampleQueries={p.sampleQueries} onQueryChange={p.onQueryChange} />
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 min-w-0">
            <input
              aria-label="Query input"
              value={p.queryInput}
              onChange={(e) => p.onQueryChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isUnbalanced) p.onRunProof();
              }}
              placeholder="?- enter query (e.g. lit(l1))"
              className="w-full h-9 pl-8 pr-3 text-xs font-mono rounded-lg border border-input bg-background/60 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Search className="h-3.5 w-3.5 text-muted-foreground absolute left-2.5 top-3" />
          </div>
          <Button
            onClick={p.onRunProof}
            disabled={isUnbalanced}
            className="h-9 px-3 gap-1.5 text-xs font-semibold shrink-0"
          >
            <Play className="h-3 w-3 fill-current" />
            Prove Query
          </Button>
        </div>
        {isUnbalanced && (
          <p className="text-[10px] text-destructive font-mono">
            Unbalanced parentheses: {openParen} open '(' vs {closeParen} close ')'
          </p>
        )}
      </div>
      <div className="pt-2 border-t border-border/40"><DeductionStepControls {...p} /></div>
    </Card>
  );
}
