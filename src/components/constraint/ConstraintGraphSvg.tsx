import React from "react";
import { ConstraintGraphSvgProps } from "./constraintTypes";
import { ConstraintNodeSvg } from "./ConstraintNodeSvg";
import { ConstraintGraphEdges } from "./ConstraintGraphEdges";
import { ConstraintGraphHeader } from "./ConstraintGraphHeader";
import { ConstraintGraphFooter } from "./ConstraintGraphFooter";

export function ConstraintGraphSvg(props: ConstraintGraphSvgProps) {
  const {
    problem,
    domains,
    currentArc,
    arcQueueLength,
    activeSplitId,
    log,
    hasDomainWipeout,
    isCSPFullySolved,
  } = props;

  return (
    <>
      <div className="relative w-full h-[400px] bg-canvas border-b border-border select-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 620 400">
          <ConstraintGraphEdges problem={problem} currentArc={currentArc} />
          {problem.variables.map((v) => (
            <ConstraintNodeSvg
              key={v.name}
              variable={v}
              currentDomain={domains[v.name] || []}
              isBeingEvaluated={currentArc?.varName === v.name}
            />
          ))}
        </svg>
        <ConstraintGraphHeader
          arcQueueLength={arcQueueLength}
          activeSplitId={activeSplitId}
        />
      </div>
      <ConstraintGraphFooter
        log={log}
        hasDomainWipeout={hasDomainWipeout}
        isCSPFullySolved={isCSPFullySolved}
      />
    </>
  );
}
