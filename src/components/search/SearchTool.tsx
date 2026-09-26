import React from "react";
import { useSearchTool } from "./useSearchTool";
import { SearchHeader } from "./SearchHeader";
import { SearchCanvasCard } from "./SearchCanvasCard";
import { SearchFrontierCard } from "./SearchFrontierCard";
import { SearchInspectorCard } from "./SearchInspectorCard";
import { SearchTabs } from "./SearchTabs";

export function SearchTool() {
  const t = useSearchTool();

  return (
    <div className="space-y-6">
      <SearchHeader
        selectedGraphId={t.selectedGraphId}
        setSelectedGraphId={t.setSelectedGraphId}
        algorithm={t.algorithm}
        setAlgorithm={t.setAlgorithm}
        graph={t.graph}
        tutorial={t.tutorial}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SearchCanvasCard t={t} />
        </div>

        <div className="space-y-4">
          <SearchInspectorCard node={t.inspectedNode} graph={t.graph} />
          <SearchFrontierCard frontier={t.frontier} algorithm={t.algorithm} />
        </div>
      </div>

      <SearchTabs
        codeTemplate={t.codeTemplate}
        tutorial={t.tutorial}
        graph={t.graph}
      />
    </div>
  );
}
