import React, { useState } from "react";
import { GraphBuilderEdge } from "./graphBuilderTypes";
import { Button } from "../ui/Button";

interface GraphBuilderEdgeModalProps {
  edge: GraphBuilderEdge;
  onSave: (edge: GraphBuilderEdge, newCost: number) => void;
  onDelete: (edge: GraphBuilderEdge) => void;
  onClose: () => void;
}

export function GraphBuilderEdgeModal({
  edge, onSave, onDelete, onClose,
}: GraphBuilderEdgeModalProps) {
  const [cost, setCost] = useState(() => edge.cost.toString());
  const isSubmitting = React.useRef(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    onSave(edge, Math.max(0.1, parseFloat(cost) || 1.0));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-card border border-border p-5 rounded-xl shadow-xl w-full max-w-xs space-y-4">
        <h3 className="font-bold text-sm">
          Edit Edge: {edge.from} &rarr; {edge.to}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label htmlFor="gb-edge-cost" className="text-muted-foreground block mb-1">Edge Cost / Weight</label>
            <input id="gb-edge-cost" aria-label="Edge Cost / Weight" type="number" step="0.5" min="0.1" value={cost} onChange={(e) => setCost(e.target.value)} className="w-full px-2.5 py-1.5 rounded border border-input bg-background" />
          </div>
          <div className="flex justify-between pt-2">
            <Button type="button" variant="destructive" size="sm" onClick={() => { onDelete(edge); onClose(); }}>Delete</Button>
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
