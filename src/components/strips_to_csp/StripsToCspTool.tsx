import React from "react";
import { useStripsToCsp } from "./useStripsToCsp";
import { StripsToCspHeader } from "./StripsToCspHeader";
import { StripsTemporalGrid } from "./StripsTemporalGrid";
import { StripsPlanCard } from "./StripsPlanCard";
import { StripsToCspTabs } from "./StripsToCspTabs";

export function StripsToCspTool() {
  const s = useStripsToCsp();

  return (
    <div className="space-y-6">
      <StripsToCspHeader
        problem={s.problem}
        selectedProblemId={s.selectedProblemId}
        onSelectProblemId={s.setSelectedProblemId}
        isSolved={s.isSolved}
        planLength={s.extractedPlan.length}
        badgeText={s.tutorial.badge}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <StripsTemporalGrid
            horizonK={s.horizonK}
            setHorizonK={s.setHorizonK}
            isSolved={s.isSolved}
            extractedPlan={s.extractedPlan}
            problem={s.problem}
            log={s.log}
            onStepForward={s.stepForward}
            onReset={s.resetHorizon}
            isPlaying={s.isPlaying}
            onTogglePlay={s.togglePlay}
            speed={s.speed}
            setSpeed={s.setSpeed}
          />
        </div>
        <StripsPlanCard horizonK={s.horizonK} extractedPlan={s.extractedPlan} />
      </div>

      <StripsToCspTabs
        problem={s.problem}
        horizonK={s.horizonK}
        tutorial={s.tutorial}
      />
    </div>
  );
}
