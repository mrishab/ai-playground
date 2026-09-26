import React from "react";
import { BayesHeader } from "./BayesHeader";
import { BayesCanvasCard } from "./BayesCanvasCard";
import { BayesMarginalsCard } from "./BayesMarginalsCard";
import { BayesDSeparationCard } from "./BayesDSeparationCard";
import { BayesTabs } from "./BayesTabs";
import { useBayesNetwork } from "./useBayesNetwork";

export function BayesTool() {
  const b = useBayesNetwork();
  const observedCount = Object.values(b.evidence).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <BayesHeader
        selectedNetId={b.selectedNetId}
        setSelectedNetId={b.setSelectedNetId}
        network={b.network}
        tutorial={b.tutorial}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <BayesCanvasCard
            network={b.network}
            evidence={b.evidence}
            beliefs={b.beliefs}
            observedCount={observedCount}
            onClearEvidence={b.initializeNetwork}
            onToggleEvidence={b.toggleEvidence}
          />
        </div>

        <div className="space-y-4">
          <BayesMarginalsCard
            network={b.network}
            evidence={b.evidence}
            beliefs={b.beliefs}
          />
          <BayesDSeparationCard
            network={b.network}
            dsepNodeA={b.dsepNodeA}
            setDsepNodeA={b.setDsepNodeA}
            dsepNodeB={b.dsepNodeB}
            setDsepNodeB={b.setDsepNodeB}
            dsepResult={b.dsepResult}
            onTestDSeparation={b.testDSeparation}
          />
        </div>
      </div>

      <BayesTabs
        codeTemplate={b.codeTemplate}
        tutorial={b.tutorial}
        network={b.network}
        evidence={b.evidence}
      />
    </div>
  );
}
