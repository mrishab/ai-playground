import React from "react";
import { ConstraintHeader } from "./ConstraintHeader";
import { ConstraintCanvasCard } from "./ConstraintCanvasCard";
import { ConstraintDomainsCard } from "./ConstraintDomainsCard";
import { ConstraintSplitTreeCard } from "./ConstraintSplitTreeCard";
import { ConstraintTabs } from "./ConstraintTabs";
import { useConstraintTool } from "./useConstraintTool";

export function ConstraintTool() {
  const c = useConstraintTool();

  return (
    <div className="space-y-6">
      <ConstraintHeader
        selectedProblemId={c.selectedProblemId}
        setSelectedProblemId={c.setSelectedProblemId}
        problem={c.problem}
        tutorial={c.tutorial}
        isCSPFullySolved={c.isCSPFullySolved}
        hasDomainWipeout={c.hasDomainWipeout}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <ConstraintCanvasCard c={c} />
        </div>

        <div className="space-y-4">
          <ConstraintDomainsCard problem={c.problem} domains={c.domains} />
          <ConstraintSplitTreeCard splitHistory={c.splitHistory} />
        </div>
      </div>

      <ConstraintTabs codeTemplate={c.codeTemplate} tutorial={c.tutorial} />
    </div>
  );
}
