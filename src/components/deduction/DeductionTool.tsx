import React from "react";
import { useDeduction } from "./useDeduction";
import { DeductionHeader } from "./DeductionHeader";
import { DeductionQueryCard } from "./DeductionQueryCard";
import { DeductionKbEditor } from "./DeductionKbEditor";
import { ProofTreeCanvas } from "./ProofTreeCanvas";
import { DeductionTabs } from "./DeductionTabs";

export function DeductionTool() {
  const d = useDeduction();

  return (
    <div className="space-y-6">
      <DeductionHeader
        currentKB={d.currentKB}
        selectedKBId={d.selectedKBId}
        onSelectKBId={d.setSelectedKBId}
        badgeText={d.tutorial.badge}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <DeductionQueryCard
            queryInput={d.queryInput}
            onQueryChange={d.setQueryInput}
            sampleQueries={d.currentKB.sampleQueries}
            onRunProof={d.runProof}
            stepIndex={d.stepper.stepIndex}
            totalSteps={d.stepper.steps.length}
            isPlaying={d.stepper.isPlaying}
            onStepForward={() => d.stepper.stepForward(d.queryInput, d.kbCode)}
            onStepBack={d.stepper.stepBack}
            onTogglePlay={() => d.stepper.togglePlay(d.queryInput, d.kbCode)}
            speed={d.stepper.speed}
            setSpeed={d.stepper.setSpeed}
          />
          <DeductionKbEditor kbCode={d.kbCode} onChange={d.setKbCode} />
        </div>
        <div className="space-y-4">
          <ProofTreeCanvas
            proofTree={d.proofTree}
            log={d.log}
            answers={d.answers}
          />
        </div>
      </div>
      <DeductionTabs
        queryInput={d.queryInput}
        kbCode={d.kbCode}
        tutorial={d.tutorial}
      />
    </div>
  );
}
