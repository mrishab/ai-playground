import React from "react";
import { useGraphBuilder } from "./useGraphBuilder";
import { useGraphBuilderEvents } from "./useGraphBuilderEvents";
import { GraphBuilderNodeSvg } from "./GraphBuilderNodeSvg";
import { GraphBuilderEdgeSvg } from "./GraphBuilderEdgeSvg";
import { GraphBuilderRubberband } from "./GraphBuilderRubberband";

interface GraphBuilderCanvasProps {
  gb: ReturnType<typeof useGraphBuilder>;
}

export function GraphBuilderCanvas({ gb }: GraphBuilderCanvasProps) {
  const ev = useGraphBuilderEvents(gb);
  const nodeMap = new Map(gb.graph.nodes.map((n) => [n.id, n]));
  const srcNode = gb.connectingSourceId ? nodeMap.get(gb.connectingSourceId) || null : null;

  return (
    <div className="relative w-full h-[420px] bg-slate-50 dark:bg-[#070a13] border-b border-border select-none overflow-hidden">
      <svg
        ref={gb.svgRef}
        data-testid="gb-canvas-svg"
        className="w-full h-full"
        viewBox="0 0 640 420"
        role="region"
        aria-label="Graph Builder Canvas"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") gb.handleCanvasClick(e as unknown as React.MouseEvent<SVGSVGElement>); }}
        onClick={gb.handleCanvasClick}
        onMouseMove={ev.handleMouseMove}
        onMouseUp={ev.handleMouseUp}
        onDragOver={(e) => e.preventDefault()}
        onDrop={ev.handleDrop}
      >
        <defs>
          <pattern id="gb-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" className="fill-slate-300 dark:fill-slate-700" />
          </pattern>
          <marker id="gb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#94a3b8" />
          </marker>
        </defs>
        <rect width="100%" height="100%" fill="url(#gb-grid)" />
        {gb.graph.edges.map((e) => {
          const from = nodeMap.get(e.from);
          const to = nodeMap.get(e.to);
          if (!from || !to) return null;
          return <GraphBuilderEdgeSvg key={`${e.from}->${e.to}`} edge={e} fromNode={from} toNode={to} isSelected={gb.selectedEdge?.from === e.from && gb.selectedEdge?.to === e.to} onEdgeClick={gb.setEditingEdge} />;
        })}
        <GraphBuilderRubberband sourceNode={srcNode} pointerPos={gb.pointerPos} />
        {gb.graph.nodes.map((node) => (
          <GraphBuilderNodeSvg key={node.id} node={node} isSelected={gb.selectedNodeId === node.id} isConnectingSource={gb.connectingSourceId === node.id} onMouseDown={ev.handleNodeMouseDown} onClick={gb.handleNodeClick} onDoubleClick={gb.setEditingNode} />
        ))}
      </svg>
    </div>
  );
}
