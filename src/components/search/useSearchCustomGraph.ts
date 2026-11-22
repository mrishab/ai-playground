import { useState, useCallback } from "react";
import { SEARCH_GRAPHS, SearchGraph } from "@/data/searchProblems";
import { normalizeSearchGraph } from "./searchGraphNormalize";

export function useSearchCustomGraph() {
  const [selectedGraphId, setSelectedGraphId] = useState("vancouver");
  const [customGraph, setCustomGraph] = useState<SearchGraph | null>(null);

  const activeGraph: SearchGraph =
    selectedGraphId === "custom" && customGraph
      ? customGraph
      : SEARCH_GRAPHS[selectedGraphId] || SEARCH_GRAPHS.vancouver;

  const handleCustomGraphChange = useCallback((updated: SearchGraph) => {
    setCustomGraph(normalizeSearchGraph(updated));
    setSelectedGraphId("custom");
  }, []);

  const handleSelectGraphId = useCallback((id: string) => {
    setSelectedGraphId(id);
    if (id !== "custom" && SEARCH_GRAPHS[id]) {
      setCustomGraph(SEARCH_GRAPHS[id]);
    }
  }, []);

  const handleResetProblem = useCallback(() => {
    setCustomGraph({
      id: "blank",
      name: "Blank Canvas",
      description: "Reset empty graph",
      startNode: "",
      goalNodes: [],
      nodes: [],
      edges: [],
    });
    setSelectedGraphId("custom");
  }, []);

  return {
    selectedGraphId,
    setSelectedGraphId: handleSelectGraphId,
    customGraph: customGraph || activeGraph,
    handleCustomGraphChange,
    handleResetProblem,
    graph: activeGraph,
  };
}
