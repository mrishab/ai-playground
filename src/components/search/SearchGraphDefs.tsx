import React from "react";

export function SearchGraphDefs() {
  return (
    <defs>
      <marker
        id="arrowhead"
        markerWidth="7"
        markerHeight="7"
        refX="20"
        refY="3.5"
        orient="auto"
      >
        <polygon
          points="0 0, 7 3.5, 0 7"
          className="fill-muted-foreground"
        />
      </marker>
      <marker
        id="arrowhead-path"
        markerWidth="8"
        markerHeight="8"
        refX="22"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 8 3.5, 0 7" className="fill-primary" />
      </marker>
    </defs>
  );
}
