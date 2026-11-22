import React from "react";

interface HillConflictChartSvgProps {
  conflictHistory: number[];
}

export function HillConflictChartSvg({ conflictHistory }: HillConflictChartSvgProps) {
  const n = conflictHistory.length;
  const maxConflicts = Math.max(4, ...conflictHistory);
  const width = 360;
  const height = 120;
  const padLeft = 32;
  const padRight = 16;
  const padTop = 16;
  const padBottom = 24;
  const plotWidth = width - padLeft - padRight;
  const plotHeight = height - padTop - padBottom;

  const points = conflictHistory
    .map((c, i) => {
      const x = padLeft + (n > 1 ? (i / (n - 1)) * plotWidth : plotWidth / 2);
      const y = padTop + plotHeight - (c / maxConflicts) * plotHeight;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  if (n === 0) {
    return <div className="w-full text-center text-xs text-muted-foreground py-8">Run steps to generate conflict convergence plot.</div>;
  }

  return (
    <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`}>
      <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + plotHeight} stroke="currentColor" className="text-border" strokeWidth="1" />
      <line x1={padLeft} y1={padTop + plotHeight} x2={padLeft + plotWidth} y2={padTop + plotHeight} stroke="currentColor" className="text-border" strokeWidth="1" />
      <line x1={padLeft} y1={padTop + plotHeight / 2} x2={padLeft + plotWidth} y2={padTop + plotHeight / 2} stroke="currentColor" className="text-border/40" strokeDasharray="3 3" />
      <text x={padLeft - 5} y={padTop + 4} textAnchor="end" className="fill-muted-foreground font-mono text-[8px]">{maxConflicts}</text>
      <text x={padLeft - 5} y={padTop + plotHeight / 2 + 3} textAnchor="end" className="fill-muted-foreground font-mono text-[8px]">{Math.round(maxConflicts / 2)}</text>
      <text x={padLeft - 5} y={padTop + plotHeight + 3} textAnchor="end" className="fill-muted-foreground font-mono text-[8px]">0</text>
      <text x={padLeft - 6} y={padTop - 4} textAnchor="end" className="fill-foreground font-bold font-mono text-[8px]">Conflicts</text>
      <text x={padLeft} y={height - 8} textAnchor="middle" className="fill-muted-foreground font-mono text-[8px]">0</text>
      <text x={padLeft + plotWidth / 2} y={height - 8} textAnchor="middle" className="fill-muted-foreground font-mono text-[8px]">{Math.floor(Math.max(0, n - 1) / 2)}</text>
      <text x={padLeft + plotWidth} y={height - 8} textAnchor="middle" className="fill-muted-foreground font-mono text-[8px]">{Math.max(0, n - 1)}</text>
      <text x={width - padRight} y={height - 1} textAnchor="end" className="fill-foreground font-bold font-mono text-[8px]">Iterations</text>
      {n > 1 ? (
        <polyline fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
      ) : (
        <circle cx={padLeft} cy={padTop + plotHeight - (conflictHistory[0] / maxConflicts) * plotHeight} r="3.5" fill="hsl(var(--primary))" />
      )}
    </svg>
  );
}
