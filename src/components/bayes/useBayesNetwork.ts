import { useState, useEffect, useCallback } from "react";
import { EvidenceMap, NetworkBeliefs } from "@/data/bayesProblems";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { computeBayesBeliefs } from "./bayesInference";
import { useBayesDSep } from "./useBayesDSep";
import { getBayesCodeTemplate } from "./bayesCodeTemplate";
import { useBayesNetworkSelection } from "./useBayesNetworkSelection";

export function useBayesNetwork() {
  const netState = useBayesNetworkSelection();
  const tutorial = TOOL_TUTORIALS.bayes;
  const [evidence, setEvidence] = useState<EvidenceMap>({});
  const [beliefs, setBeliefs] = useState<NetworkBeliefs>({});
  const dsep = useBayesDSep(netState.network, evidence);

  const initializeNetwork = useCallback(() => {
    const initEvidence: EvidenceMap = {};
    for (const n of netState.network.nodes) initEvidence[n.id] = null;
    setEvidence(initEvidence);
    dsep.resetDSep(netState.network);
  }, [netState.network, dsep.resetDSep]);

  useEffect(() => { initializeNetwork(); }, [initializeNetwork]);
  useEffect(() => { setBeliefs(computeBayesBeliefs(netState.network, evidence)); }, [evidence, netState.network]);

  const toggleEvidence = (nodeId: string) => {
    const node = netState.network.nodes.find((n) => n.id === nodeId);
    if (!node || node.type === "utility") return;
    const outs = node.outcomes.length > 0 ? node.outcomes : ["true", "false"];
    const cur = evidence[nodeId];
    const next = !cur ? outs[0] : (outs[outs.indexOf(cur) + 1] ?? null);
    setEvidence((prev) => ({ ...prev, [nodeId]: next }));
  };

  return {
    ...netState,
    tutorial,
    evidence,
    beliefs,
    ...dsep,
    initializeNetwork,
    toggleEvidence,
    codeTemplate: getBayesCodeTemplate(netState.network, evidence),
  };
}
