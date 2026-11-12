import { useState } from "react";
import { BAYES_NETWORKS, BayesNetwork } from "@/data/bayesProblems";

export function useBayesNetworkSelection() {
  const [selectedNetId, setSelectedNetId] = useState<string>("umbrella");
  const [customNetwork, setCustomNetwork] = useState<BayesNetwork | null>(null);

  const network: BayesNetwork =
    selectedNetId === "custom" && customNetwork
      ? customNetwork
      : BAYES_NETWORKS[selectedNetId] || BAYES_NETWORKS.umbrella;

  const handleImportNetwork = (imported: BayesNetwork) => {
    setCustomNetwork({
      ...imported,
      nodes: Array.isArray(imported.nodes) ? imported.nodes : [],
      cpts: Array.isArray(imported.cpts) ? imported.cpts : [],
    });
    setSelectedNetId("custom");
  };

  const handleResetNetwork = () => {
    setCustomNetwork({
      id: "blank",
      name: "Empty Network",
      description: "Reset empty Bayesian network",
      nodes: [],
      cpts: [],
    });
    setSelectedNetId("custom");
  };

  const handleSelectNetId = (id: string) => {
    setSelectedNetId(id);
    if (id !== "custom" && BAYES_NETWORKS[id]) {
      setCustomNetwork(BAYES_NETWORKS[id]);
    }
  };

  return {
    selectedNetId,
    setSelectedNetId: handleSelectNetId,
    customNetwork,
    network,
    handleImportNetwork,
    handleResetNetwork,
  };
}
