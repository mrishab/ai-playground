import React, { useState } from "react";
import { useBayesNetwork } from "./useBayesNetwork";
import { BayesCanvasCard } from "./BayesCanvasCard";
import { BayesMarginalsCard } from "./BayesMarginalsCard";
import { BayesDecisionCard } from "./BayesDecisionCard";
import { BayesDSeparationCard } from "./BayesDSeparationCard";
import { BayesTabs } from "./BayesTabs";
import { StudioWorkspace } from "../workspace/StudioWorkspace";
import { BAYES_PREBUILT_ITEMS, BAYES_ALGORITHM_ITEMS } from "./bayesWorkspaceData";

export function BayesTool() {
  const [algo, setAlgo] = useState("ve");
  const b = useBayesNetwork(algo);
  const obsCount = Object.values(b.evidence).filter(Boolean).length;

  return (
    <StudioWorkspace
      title="Belief & Decision Networks Lab"
      category={b.tutorial.badge}
      description={b.network.description}
      prebuiltLabel="Network"
      prebuiltItems={BAYES_PREBUILT_ITEMS}
      selectedPrebuiltId={b.selectedNetId}
      onSelectPrebuiltId={b.setSelectedNetId}
      algorithmItems={BAYES_ALGORITHM_ITEMS}
      selectedAlgorithmId={algo}
      onSelectAlgorithmId={setAlgo}
      activeLogMessage={algo === "dsep" ? `D-Separation analyzer active for ${b.network.name}.` : algo === "sampling" ? `Rejection Sampling active with ${obsCount} observations.` : `Exact Variable Elimination active. Observed ${obsCount} variables.`}
      exportData={{ toolType: "bayes", problem: b.network, filename: `${b.network.id || "bayes"}-network` }}
      onImportProblem={(data) => {
        if (!data.problem || !Array.isArray(data.problem.nodes)) throw new Error("Invalid Bayesian network: missing nodes array");
        b.handleImportNetwork(data.problem);
      }}
      onResetProblem={b.handleResetNetwork}
      statsBadges={[{ label: "Nodes", value: b.network.nodes.length, variant: "cyan" }, { label: "Observed", value: obsCount, variant: "success" }]}
      controls={{ onReset: b.initializeNetwork }}
      animationSlot={
        <div className="space-y-4">
          <BayesCanvasCard network={b.network} evidence={b.evidence} beliefs={b.beliefs} observedCount={obsCount} onClearEvidence={b.initializeNetwork} onToggleEvidence={b.toggleEvidence} />
          <BayesTabs tutorial={b.tutorial} network={b.network} evidence={b.evidence} />
        </div>
      }
      theorySlot={<BayesTabs tutorial={b.tutorial} network={b.network} evidence={b.evidence} />}
      inspectorSlot={
        <div className="space-y-4">
          <BayesMarginalsCard network={b.network} evidence={b.evidence} beliefs={b.beliefs} />
          <BayesDecisionCard network={b.network} evidence={b.evidence} />
        </div>
      }
      stateSlot={<BayesDSeparationCard network={b.network} dsepNodeA={b.dsepNodeA} setDsepNodeA={b.setDsepNodeA} dsepNodeB={b.dsepNodeB} setDsepNodeB={b.setDsepNodeB} dsepResult={b.dsepResult} onTestDSeparation={b.testDSeparation} />}
    />
  );
}
