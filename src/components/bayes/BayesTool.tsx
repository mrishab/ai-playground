import React, { useState } from "react";
import { useBayesNetwork } from "./useBayesNetwork";
import { BayesCanvasCard } from "./BayesCanvasCard";
import { BayesMarginalsCard } from "./BayesMarginalsCard";
import { BayesDSeparationCard } from "./BayesDSeparationCard";
import { BayesTabs } from "./BayesTabs";
import { GraphBuilder } from "../graph_builder/GraphBuilder";
import { CodeSandbox } from "../CodeSandbox";
import { StudioWorkspace } from "../workspace/StudioWorkspace";
import { BAYES_PREBUILT_ITEMS, BAYES_ALGORITHM_ITEMS } from "./bayesWorkspaceData";

export function BayesTool() {
  const b = useBayesNetwork();
  const [algo, setAlgo] = useState("ve");
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
      activeLogMessage={`Observed ${obsCount} variables. Network initialized.`}
      statsBadges={[
        { label: "Nodes", value: b.network.nodes.length, variant: "cyan" },
        { label: "Observed", value: obsCount, variant: "success" },
      ]}
      controls={{ onReset: b.initializeNetwork }}
      animationSlot={
        <div className="space-y-4">
          <BayesCanvasCard
            network={b.network} evidence={b.evidence} beliefs={b.beliefs}
            observedCount={obsCount} onClearEvidence={b.initializeNetwork}
            onToggleEvidence={b.toggleEvidence}
          />
          <BayesTabs codeTemplate={b.codeTemplate} tutorial={b.tutorial} network={b.network} evidence={b.evidence} />
        </div>
      }
      graphBuilderSlot={<GraphBuilder />}
      codingSlot={<CodeSandbox title="Variable Elimination Code" initialCode={b.codeTemplate} algorithmName="VE" />}
      theorySlot={<BayesTabs codeTemplate={b.codeTemplate} tutorial={b.tutorial} network={b.network} evidence={b.evidence} />}
      inspectorSlot={<BayesMarginalsCard network={b.network} evidence={b.evidence} beliefs={b.beliefs} />}
      stateSlot={
        <BayesDSeparationCard
          network={b.network} dsepNodeA={b.dsepNodeA} setDsepNodeA={b.setDsepNodeA}
          dsepNodeB={b.dsepNodeB} setDsepNodeB={b.setDsepNodeB} dsepResult={b.dsepResult}
          onTestDSeparation={b.testDSeparation}
        />
      }
    />
  );
}
