import React from "react";
import { HillHeader } from "./HillHeader";
import { HillMainCard } from "./HillMainCard";
import { HillParamsCard } from "./HillParamsCard";
import { HillBatchStatsCard } from "./HillBatchStatsCard";
import { HillTabs } from "./HillTabs";
import { useHillClimbing } from "./useHillClimbing";

export function HillTool() {
  const h = useHillClimbing();

  return (
    <div className="space-y-6">
      <HillHeader
        selectedProblemId={h.selectedProblemId}
        setSelectedProblemId={h.setSelectedProblemId}
        algorithm={h.algorithm}
        setAlgorithm={h.setAlgorithm}
        problem={h.problem}
        tutorial={h.tutorial}
        conflicts={h.conflicts}
        stepCount={h.stepCount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <HillMainCard h={h} />
        </div>

        <div className="space-y-4">
          <HillParamsCard
            algorithm={h.algorithm}
            randomWalkProb={h.randomWalkProb}
            setRandomWalkProb={h.setRandomWalkProb}
            temperature={h.temperature}
            setTemperature={h.setTemperature}
            tabuTenure={h.tabuTenure}
            setTabuTenure={h.setTabuTenure}
            speed={h.speed}
            setSpeed={h.setSpeed}
          />
          {h.batchStats && <HillBatchStatsCard batchStats={h.batchStats} />}
        </div>
      </div>

      <HillTabs codeTemplate={h.codeTemplate} tutorial={h.tutorial} />
    </div>
  );
}
