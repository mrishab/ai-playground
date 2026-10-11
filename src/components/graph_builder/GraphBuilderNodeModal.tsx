import React, { useState } from "react";
import { SearchNode } from "@/data/searchProblems";
import { Button } from "../ui/Button";

interface GraphBuilderNodeModalProps {
  node: SearchNode;
  onSave: (updated: Partial<SearchNode>) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function GraphBuilderNodeModal({
  node, onSave, onDelete, onClose,
}: GraphBuilderNodeModalProps) {
  const [name, setName] = useState(node.name);
  const [h, setH] = useState(() => node.h.toString());
  const [isStart, setIsStart] = useState(node.isStart);
  const [isGoal, setIsGoal] = useState(node.isGoal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, h: parseFloat(h) || 0, isStart, isGoal });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-card border border-border p-5 rounded-xl shadow-xl w-full max-w-xs space-y-4">
        <h3 className="font-bold text-sm">Edit Node: {node.id}</h3>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label htmlFor="gb-node-name" className="text-muted-foreground block mb-1">Node Name</label>
            <input id="gb-node-name" aria-label="Node Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-2.5 py-1.5 rounded border border-input bg-background" />
          </div>
          <div>
            <label htmlFor="gb-node-h" className="text-muted-foreground block mb-1">Heuristic Value h(n)</label>
            <input id="gb-node-h" aria-label="Heuristic Value h(n)" type="number" step="0.5" value={h} onChange={(e) => setH(e.target.value)} className="w-full px-2.5 py-1.5 rounded border border-input bg-background" />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={isStart} onChange={(e) => setIsStart(e.target.checked)} /> Start Node
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={isGoal} onChange={(e) => setIsGoal(e.target.checked)} /> Goal Node
            </label>
          </div>
          <div className="flex justify-between pt-2">
            <Button type="button" variant="destructive" size="sm" onClick={() => { onDelete(node.id); onClose(); }}>Delete</Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="default" size="sm" onClick={handleSubmit}>Save</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
