import React, { useState } from "react";
import { useStripsToCsp } from "./useStripsToCsp";
import { StripsTemporalGrid } from "./StripsTemporalGrid";
import { StripsPlanCard } from "./StripsPlanCard";
import { StripsToCspTabs } from "./StripsToCspTabs";
import { CodeSandbox } from "../CodeSandbox";
import { getStripsCodeTemplate } from "./stripsCodeTemplate";
import { StudioWorkspace } from "../workspace/StudioWorkspace";
import { STRIPS_PREBUILT_ITEMS, STRIPS_ALGORITHM_ITEMS } from "./stripsWorkspaceData";

export function StripsToCspTool() {
  const [algo, setAlgo] = useState("bounded_csp");
  const s = useStripsToCsp(algo);

  return (
    <StudioWorkspace
      title="STRIPS to CSP Planning"
      category={s.tutorial.badge}
      description={s.problem.description}
      prebuiltLabel="Planning Domain"
      prebuiltItems={STRIPS_PREBUILT_ITEMS}
      selectedPrebuiltId={s.selectedProblemId}
      onSelectPrebuiltId={s.setSelectedProblemId}
      algorithmItems={STRIPS_ALGORITHM_ITEMS}
      selectedAlgorithmId={algo}
      onSelectAlgorithmId={setAlgo}
      activeLogMessage={s.log}
      exportData={{ toolType: "strips_to_csp", problem: s.problem, filename: `${s.problem.id || "strips"}-problem` }}
      onImportProblem={(data) => {
        if (!data.problem || !Array.isArray(data.problem.variables)) throw new Error("Invalid STRIPS problem: missing variables array");
        s.handleImportProblem(data.problem);
      }}
      onResetProblem={s.handleResetProblem}
      statsBadges={[{ label: "Horizon", value: s.horizonK, variant: "cyan" }, { label: "Plan", value: s.extractedPlan.length, variant: s.isSolved ? "success" : "outline" }]}
      controls={{ onReset: s.resetHorizon, speed: s.speed, setSpeed: s.setSpeed }}
      animationSlot={
        <StripsTemporalGrid
          horizonK={s.horizonK} setHorizonK={s.setHorizonK} isSolved={s.isSolved}
          extractedPlan={s.extractedPlan} stepFluents={s.stepFluents} problem={s.problem} log={s.log}
          onStepForward={s.stepForward} onReset={s.resetHorizon} isPlaying={s.isPlaying}
          onTogglePlay={s.togglePlay} speed={s.speed} setSpeed={s.setSpeed}
        />
      }
      codingSlot={<CodeSandbox title="STRIPS to CSP Compiler Code" initialCode={getStripsCodeTemplate(s.problem, s.horizonK, algo)} algorithmName={algo === "sat_plan" ? "SATPlan Reduction" : "STRIPS-to-CSP Compiler"} notes="Unfolding temporal horizons compiles planning into arc consistency constraints or propositional SAT clauses." />}
      theorySlot={<StripsToCspTabs problem={s.problem} horizonK={s.horizonK} tutorial={s.tutorial} />}
      inspectorSlot={<StripsPlanCard horizonK={s.horizonK} extractedPlan={s.extractedPlan} />}
    />
  );
}
