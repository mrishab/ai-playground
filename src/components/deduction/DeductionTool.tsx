import React, { useState } from "react";
import { useDeduction } from "./useDeduction";
import { DeductionQueryCard } from "./DeductionQueryCard";
import { DeductionKbEditor } from "./DeductionKbEditor";
import { ProofTreeCanvas } from "./ProofTreeCanvas";
import { DeductionTabs } from "./DeductionTabs";
import { GraphBuilder } from "../graph_builder/GraphBuilder";
import { StudioWorkspace } from "../workspace/StudioWorkspace";
import { DEDUCTION_PREBUILT_ITEMS, DEDUCTION_ALGORITHM_ITEMS } from "./deductionWorkspaceData";

export function DeductionTool() {
  const d = useDeduction();
  const [algo, setAlgo] = useState("sld");

  return (
    <StudioWorkspace
      title="Definite Clause Deduction"
      category={d.tutorial.badge}
      description={d.currentKB.description}
      prebuiltLabel="Knowledge Base"
      prebuiltItems={DEDUCTION_PREBUILT_ITEMS}
      selectedPrebuiltId={d.selectedKBId}
      onSelectPrebuiltId={d.setSelectedKBId}
      algorithmItems={DEDUCTION_ALGORITHM_ITEMS}
      selectedAlgorithmId={algo}
      onSelectAlgorithmId={setAlgo}
      activeLogMessage={d.log}
      statsBadges={[
        { label: "Answers", value: d.answers.length, variant: "success" },
        { label: "Steps", value: d.stepper.stepIndex, variant: "cyan" },
      ]}
      controls={{
        onStep: () => d.stepper.stepForward(d.queryInput, d.kbCode),
        stepLabel: "Advance",
        onStepBack: d.stepper.stepBack,
        hasStepBack: d.stepper.stepIndex > 0,
        isPlaying: d.stepper.isPlaying,
        onTogglePlay: () => d.stepper.togglePlay(d.queryInput, d.kbCode),
        speed: d.stepper.speed,
        setSpeed: d.stepper.setSpeed,
      }}
      animationSlot={<ProofTreeCanvas proofTree={d.proofTree} log={d.log} answers={d.answers} />}
      graphBuilderSlot={<GraphBuilder />}
      codingSlot={<DeductionKbEditor kbCode={d.kbCode} onChange={d.setKbCode} />}
      theorySlot={<DeductionTabs queryInput={d.queryInput} kbCode={d.kbCode} tutorial={d.tutorial} />}
      inspectorSlot={
        <DeductionQueryCard
          queryInput={d.queryInput} onQueryChange={d.setQueryInput} sampleQueries={d.currentKB.sampleQueries}
          onRunProof={d.runProof} stepIndex={d.stepper.stepIndex} totalSteps={d.stepper.steps.length}
          isPlaying={d.stepper.isPlaying} onStepForward={() => d.stepper.stepForward(d.queryInput, d.kbCode)}
          onStepBack={d.stepper.stepBack} onTogglePlay={() => d.stepper.togglePlay(d.queryInput, d.kbCode)}
          speed={d.stepper.speed} setSpeed={d.stepper.setSpeed}
        />
      }
    />
  );
}
