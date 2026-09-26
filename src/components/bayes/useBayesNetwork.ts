import { useState, useEffect, useCallback } from "react";
import {
  BAYES_NETWORKS,
  BayesNetwork,
  EvidenceMap,
  NetworkBeliefs,
} from "@/data/bayesProblems";
import { TOOL_TUTORIALS } from "@/data/toolTutorials";
import { computeBayesBeliefs } from "./bayesInference";
import { useBayesDSep } from "./useBayesDSep";
import { getBayesCodeTemplate } from "./bayesCodeTemplate";

export function useBayesNetwork() {
  const [selectedNetId, setSelectedNetId] = useState<string>("umbrella");
  const network: BayesNetwork =
    BAYES_NETWORKS[selectedNetId] || BAYES_NETWORKS.umbrella;
  const tutorial = TOOL_TUTORIALS.bayes;

  const [evidence, setEvidence] = useState<EvidenceMap>({});
  const [beliefs, setBeliefs] = useState<NetworkBeliefs>({});
  const dsep = useBayesDSep(network, evidence);

  const initializeNetwork = useCallback(() => {
    const initEvidence: EvidenceMap = {};
    for (const n of network.nodes) initEvidence[n.id] = null;
    setEvidence(initEvidence);
    dsep.resetDSep(network);
  }, [network, dsep.resetDSep]);

  useEffect(() => {
    initializeNetwork();
  }, [initializeNetwork]);

  useEffect(() => {
    setBeliefs(computeBayesBeliefs(network, evidence));
  }, [evidence, network]);

  const toggleEvidence = (nodeId: string) => {
    const node = network.nodes.find((n) => n.id === nodeId);
    if (!node || node.type === "utility") return;
    const outs = node.outcomes.length > 0 ? node.outcomes : ["true", "false"];
    const cur = evidence[nodeId];
    const next = !cur ? outs[0] : (outs[outs.indexOf(cur) + 1] ?? null);
    setEvidence((prev) => ({ ...prev, [nodeId]: next }));
  };

  return {
    selectedNetId,
    setSelectedNetId,
    network,
    tutorial,
    evidence,
    beliefs,
    ...dsep,
    initializeNetwork,
    toggleEvidence,
    codeTemplate: getBayesCodeTemplate(network, evidence),
  };
}
