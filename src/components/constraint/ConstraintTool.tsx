import React, { useState } from "react";
import { useConstraintTool } from "./useConstraintTool";
import { ConstraintCanvasCard } from "./ConstraintCanvasCard";
import { ConstraintDomainsCard } from "./ConstraintDomainsCard";
import { ConstraintSplitTreeCard } from "./ConstraintSplitTreeCard";
import { ConstraintTabs } from "./ConstraintTabs";
import { getConstraintCodeTemplate } from "./constraintCodeTemplate";
import { CodeSandbox } from "../CodeSandbox";
import { StudioWorkspace } from "../workspace/StudioWorkspace";
import { CSP_PREBUILT_ITEMS, CSP_ALGORITHM_ITEMS } from "./constraintWorkspaceData";

export function ConstraintTool() {
  const c = useConstraintTool();
  const [algo, setAlgo] = useState("ac3");

  return (
    <StudioWorkspace
      title="Consistency Based CSP Solver"
      category={c.tutorial.badge}
      description={c.problem.description}
      prebuiltLabel="CSP Problem"
      prebuiltItems={CSP_PREBUILT_ITEMS}
      selectedPrebuiltId={c.selectedProblemId}
      onSelectPrebuiltId={c.setSelectedProblemId}
      algorithmItems={CSP_ALGORITHM_ITEMS}
      selectedAlgorithmId={algo}
      onSelectAlgorithmId={setAlgo}
      activeLogMessage={c.log}
      exportData={{ toolType: "constraint", problem: c.problem, filename: `${c.problem.id || "csp"}-problem` }}
      onImportProblem={(data) => {
        if (!data.problem || !Array.isArray(data.problem.variables)) throw new Error("Invalid CSP problem: missing variables array");
        c.handleImportProblem(data.problem);
      }}
      onResetProblem={c.handleResetProblem}
      statsBadges={[{ label: "Variables", value: c.problem.variables.length, variant: "cyan" }, { label: "Arc Queue", value: c.arcQueue.length, variant: "warning" }]}
      controls={{
        onStep: algo === "mac" ? (c.arcQueue.length > 0 ? c.fineStep : c.stepMacSearch) : c.fineStep,
        stepLabel: algo === "mac" ? (c.arcQueue.length > 0 ? "Advance Arc" : "Step MAC") : "Advance Arc",
        isPlaying: c.isPlaying, onTogglePlay: c.toggleAutoAC, onReset: c.initializeCSP, speed: c.speed, setSpeed: c.setSpeed, isDone: c.isCSPFullySolved,
      }}
      animationSlot={<ConstraintCanvasCard c={c} />}
      codingSlot={<CodeSandbox title="AC-3 Solver Code" initialCode={getConstraintCodeTemplate(c.problem, algo)} algorithmName={algo.toUpperCase()} />}
      theorySlot={<ConstraintTabs codeTemplate={c.codeTemplate} tutorial={c.tutorial} />}
      inspectorSlot={<ConstraintDomainsCard problem={c.problem} domains={c.domains} />}
      stateSlot={<ConstraintSplitTreeCard splitHistory={c.splitHistory} />}
    />
  );
}
