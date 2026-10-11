import React from "react";
import { useHillClimbing } from "./useHillClimbing";
import { HillMainCard } from "./HillMainCard";
import { HillParamsCard } from "./HillParamsCard";
import { HillBatchStatsCard } from "./HillBatchStatsCard";
import { HillTabs } from "./HillTabs";
import { GraphBuilder } from "../graph_builder/GraphBuilder";
import { CodeSandbox } from "../CodeSandbox";
import { StudioWorkspace } from "../workspace/StudioWorkspace";
import { HILL_PREBUILT_ITEMS, HILL_ALGORITHM_ITEMS } from "./hillWorkspaceData";
import { SLSAlgorithm } from "./hillTypes";

export function HillTool() {
  const h = useHillClimbing();

  return (
    <StudioWorkspace
      title="Stochastic Local Search (SLS)"
      category={h.tutorial.badge}
      description={h.problem.description}
      prebuiltLabel="SLS Problem"
      prebuiltItems={HILL_PREBUILT_ITEMS}
      selectedPrebuiltId={h.selectedProblemId}
      onSelectPrebuiltId={h.setSelectedProblemId}
      algorithmItems={HILL_ALGORITHM_ITEMS}
      selectedAlgorithmId={h.algorithm}
      onSelectAlgorithmId={(a) => h.setAlgorithm(a as SLSAlgorithm)}
      activeLogMessage={`Step ${h.stepCount}: Conflicts = ${h.conflicts}`}
      statsBadges={[
        { label: "Conflicts", value: h.conflicts, variant: h.conflicts === 0 ? "success" : "warning" },
        { label: "Steps", value: h.stepCount, variant: "cyan" },
      ]}
      controls={{
        onStep: h.stepSLS,
        stepLabel: "Next Step",
        isPlaying: h.isPlaying,
        onTogglePlay: () => h.setIsPlaying(!h.isPlaying),
        onReset: h.initializeAssignment,
        speed: h.speed,
        setSpeed: h.setSpeed,
        isDone: h.conflicts === 0,
      }}
      animationSlot={<HillMainCard h={h} />}
      graphBuilderSlot={<GraphBuilder />}
      codingSlot={<CodeSandbox title="SLS Algorithm Code" initialCode={h.codeTemplate} algorithmName={h.algorithm.toUpperCase()} />}
      theorySlot={<HillTabs codeTemplate={h.codeTemplate} tutorial={h.tutorial} />}
      inspectorSlot={
        <HillParamsCard
          algorithm={h.algorithm} randomWalkProb={h.randomWalkProb} setRandomWalkProb={h.setRandomWalkProb}
          temperature={h.temperature} setTemperature={h.setTemperature} tabuTenure={h.tabuTenure}
          setTabuTenure={h.setTabuTenure} speed={h.speed} setSpeed={h.setSpeed}
        />
      }
      stateSlot={h.batchStats ? <HillBatchStatsCard batchStats={h.batchStats} /> : undefined}
    />
  );
}
