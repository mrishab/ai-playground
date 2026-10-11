import React, { useState } from "react";
import { useStripsToCsp } from "./useStripsToCsp";
import { StripsTemporalGrid } from "./StripsTemporalGrid";
import { StripsPlanCard } from "./StripsPlanCard";
import { StripsToCspTabs } from "./StripsToCspTabs";
import { GraphBuilder } from "../graph_builder/GraphBuilder";
import { StripsSandboxTab } from "./StripsSandboxTab";
import { StudioWorkspace } from "../workspace/StudioWorkspace";
import { STRIPS_PREBUILT_ITEMS, STRIPS_ALGORITHM_ITEMS } from "./stripsWorkspaceData";

export function StripsToCspTool() {
  const s = useStripsToCsp();
  const [algo, setAlgo] = useState("bounded_csp");

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
      statsBadges={[
        { label: "Current Horizon", value: s.horizonK, variant: "cyan" },
        { label: "Plan Length", value: s.extractedPlan.length, variant: s.isSolved ? "success" : "outline" },
      ]}
      controls={{
        onReset: s.resetHorizon,
        speed: s.speed,
        setSpeed: s.setSpeed,
      }}
      animationSlot={
        <StripsTemporalGrid
          horizonK={s.horizonK} setHorizonK={s.setHorizonK} isSolved={s.isSolved}
          extractedPlan={s.extractedPlan} problem={s.problem} log={s.log}
          onStepForward={s.stepForward} onReset={s.resetHorizon} isPlaying={s.isPlaying}
          onTogglePlay={s.togglePlay} speed={s.speed} setSpeed={s.setSpeed}
        />
      }
      graphBuilderSlot={<GraphBuilder />}
      codingSlot={<StripsSandboxTab problem={s.problem} horizonK={s.horizonK} />}
      theorySlot={<StripsToCspTabs problem={s.problem} horizonK={s.horizonK} tutorial={s.tutorial} />}
      inspectorSlot={<StripsPlanCard horizonK={s.horizonK} extractedPlan={s.extractedPlan} />}
    />
  );
}
