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
    setCustomGraph(updated);
    setSelectedGraphId("custom");
  }, []);

  const handleSelectGraphId = useCallback((id: string) => {
    setSelectedGraphId(id);
    if (id !== "custom" && SEARCH_GRAPHS[id]) {
      setCustomGraph(SEARCH_GRAPHS[id]);
    }
  }, []);

  return {
    selectedGraphId,
    setSelectedGraphId: handleSelectGraphId,
    customGraph: customGraph || activeGraph,
    handleCustomGraphChange,
    graph: activeGraph,
  };
}
