import React from "react";
import { useSearchTool } from "./useSearchTool";
import { SearchCanvasCard } from "./SearchCanvasCard";
import { SearchFrontierCard } from "./SearchFrontierCard";
import { SearchInspectorCard } from "./SearchInspectorCard";
import { SearchTabs } from "./SearchTabs";
import { GraphBuilder } from "../graph_builder/GraphBuilder";
import { CodeSandbox } from "../CodeSandbox";
import { StudioWorkspace } from "../workspace/StudioWorkspace";
import { SEARCH_PREBUILT_ITEMS, SEARCH_ALGORITHM_ITEMS } from "./searchWorkspaceData";
import { AlgorithmType } from "./searchTypes";

export function SearchTool() {
  const t = useSearchTool();

  return (
    <StudioWorkspace
      title="Graph Searching Lab"
      category={t.tutorial.badge}
      description={t.graph.description}
      prebuiltLabel="Map / Graph"
      prebuiltItems={SEARCH_PREBUILT_ITEMS}
      selectedPrebuiltId={t.selectedGraphId}
      onSelectPrebuiltId={t.setSelectedGraphId}
      onOpenGraphBuilder={() => t.setActivePane("graph_builder")}
      algorithmItems={SEARCH_ALGORITHM_ITEMS}
      selectedAlgorithmId={t.algorithm}
      onSelectAlgorithmId={(a) => t.setAlgorithm(a as AlgorithmType)}
      activePane={t.activePane}
      onPaneChange={t.setActivePane}
      activeLogMessage={t.log}
      exportData={{ toolType: "search", problem: t.graph, filename: `${t.graph.id || "search"}-graph` }}
      onImportProblem={(data) => {
        if (!data.problem || !Array.isArray(data.problem.nodes)) throw new Error("Invalid search graph: missing nodes array");
        t.handleCustomGraphChange(data.problem);
      }}
      onResetProblem={t.handleResetProblem}
      statsBadges={[{ label: "Frontier", value: t.frontier.length, variant: "cyan" }, { label: "Expanded", value: t.expanded.length, variant: "success" }]}
      controls={{
        onStep: t.stepSearch, stepLabel: "Step Forward", onStepBack: t.stepBack, hasStepBack: t.history.length > 0,
        isPlaying: t.isPlaying, onTogglePlay: () => t.setIsPlaying(!t.isPlaying),
        onReset: t.initializeSearch, speed: t.speed, setSpeed: t.setSpeed,
        isDone: t.isGoalReached || (t.frontier.length === 0 && t.expanded.length > 0),
      }}
      animationSlot={<SearchCanvasCard t={t} />}
      graphBuilderSlot={<GraphBuilder initialGraph={t.graph} onGraphChange={t.handleCustomGraphChange} onSolveGraph={() => { t.setActivePane("animation"); t.initializeSearch(); }} />}
      codingSlot={<CodeSandbox title="Search Algorithm Code" initialCode={t.codeTemplate} algorithmName={t.algorithm.toUpperCase()} />}
      theorySlot={<SearchTabs codeTemplate={t.codeTemplate} tutorial={t.tutorial} graph={t.graph} />}
      inspectorSlot={<SearchInspectorCard node={t.inspectedNode} graph={t.graph} />}
      stateSlot={<SearchFrontierCard frontier={t.frontier} algorithm={t.algorithm} />}
    />
  );
}
