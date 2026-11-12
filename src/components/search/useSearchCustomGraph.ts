import { useState, useCallback } from "react";
import { SEARCH_GRAPHS, SearchGraph } from "@/data/searchProblems";

export function useSearchCustomGraph() {
  const [selectedGraphId, setSelectedGraphId] = useState("vancouver");
  const [customGraph, setCustomGraph] = useState<SearchGraph | null>(null);

  const activeGraph: SearchGraph =
    selectedGraphId === "custom" && customGraph
      ? customGraph
      : SEARCH_GRAPHS[selectedGraphId] || SEARCH_GRAPHS.vancouver;

  const handleCustomGraphChange = useCallback((updated: SearchGraph) => {
    setCustomGraph({
      ...updated,
      nodes: Array.isArray(updated.nodes) ? updated.nodes : [],
      edges: Array.isArray(updated.edges) ? updated.edges : [],
      goalNodes: Array.isArray(updated.goalNodes) ? updated.goalNodes : [],
    });
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
