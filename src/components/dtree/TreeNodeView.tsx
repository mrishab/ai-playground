import React from "react";
import { TreeNode } from "./dtreeTypes";
import { Badge } from "../ui/Badge";

export const TreeNodeView = ({
  node,
  depth = 0,
}: {
  node: TreeNode;
  depth?: number;
}) => (
  <div className="flex flex-col items-center space-y-2">
    <div
      className={`p-3 rounded-xl border text-center shadow min-w-[120px] transition-colors duration-200 ease-out ${
        node.isLeaf
          ? "bg-primary/10 border-primary/30 text-primary"
          : "bg-card border-border text-foreground"
      }`}
    >
      <div className="font-bold text-xs">
        {node.isLeaf
          ? `Class: ${node.prediction}`
          : node.attribute || "Intermediate"}
      </div>
      <div className="text-[9px] text-muted-foreground font-mono mt-0.5">
        Entropy: {node.entropy.toFixed(3)}
      </div>
      <div className="flex justify-center gap-1 mt-1">
        {Object.entries(node.classCounts).map(([cls, cnt]) => (
          <span
            key={cls}
            className="text-[9px] px-1 py-0.5 rounded bg-card/60 font-mono"
          >
            {cls}:{cnt}
          </span>
        ))}
      </div>
    </div>
    {node.children && node.children.length > 0 && (
      <div className="flex flex-wrap items-start justify-center gap-6 pt-4 border-t border-border/40 relative">
        {node.children.map((child) => (
          <div key={child.value} className="flex flex-col items-center space-y-2">
            <Badge variant="outline" className="text-[10px]">
              {child.value}
            </Badge>
            <TreeNodeView node={child.node} depth={depth + 1} />
          </div>
        ))}
      </div>
    )}
  </div>
);
