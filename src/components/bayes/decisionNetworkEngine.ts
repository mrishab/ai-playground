import { BayesNetwork, EvidenceMap, BayesNode } from "@/data/bayesProblems";
import { computeExactMarginal } from "./bayesEngine";
import { getCptIndex } from "./bayesCptUtils";

export interface DecisionAlternative {
  cfg: Record<string, string>;
  label: string;
  eu: number;
  isOptimal: boolean;
}

export interface DecisionAnalysisResult {
  isDecisionNetwork: boolean;
  utilityNode: BayesNode | null;
  decisionNodes: BayesNode[];
  alternatives: DecisionAlternative[];
  optimalEU: number;
  meu: number;
  optimalDecisionLabel: string;
}

function computeJointDistribution(
  network: BayesNetwork,
  vars: string[],
  fixedAssignments: Record<string, string>,
): Array<{ assignment: Record<string, string>; prob: number }> {
  if (vars.length === 0) return [{ assignment: {}, prob: 1.0 }];
  if (vars.length === 1) {
    const v = vars[0];
    const marginal = computeExactMarginal(network, v, fixedAssignments);
    return Object.entries(marginal).map(([val, prob]) => ({
      assignment: { [v]: val },
      prob,
    }));
  }

  const firstVar = vars[0];
  const rest = vars.slice(1);
  const firstMarginal = computeExactMarginal(network, firstVar, fixedAssignments);
  const result: Array<{ assignment: Record<string, string>; prob: number }> = [];

  for (const [val, pVal] of Object.entries(firstMarginal)) {
    if (pVal <= 0) continue;
    const subJoint = computeJointDistribution(network, rest, { ...fixedAssignments, [firstVar]: val });
    for (const sub of subJoint) {
      result.push({
        assignment: { [firstVar]: val, ...sub.assignment },
        prob: pVal * sub.prob,
      });
    }
  }
  return result;
}

export function computeExpectedUtilityForDecision(
  network: BayesNetwork,
  evidence: EvidenceMap,
  decisionAssignments: Record<string, string>,
): number {
  const uNode = network.nodes.find((n) => n.type === "utility");
  if (!uNode) return 0;
  const uCpt = network.cpts.find((c) => c.target === uNode.id);
  if (!uCpt) return 0;

  const parents = uCpt.parents;
  const chanceParents = parents.filter((p) => {
    const node = network.nodes.find((n) => n.id === p);
    return node && node.type === "chance";
  });

  const fixed: Record<string, string> = {};
  for (const [k, v] of Object.entries({ ...evidence, ...decisionAssignments })) {
    if (v !== null && v !== undefined) fixed[k] = v;
  }
  const joint = computeJointDistribution(network, chanceParents, fixed);

  let eu = 0;
  for (const { assignment: chanceAssign, prob } of joint) {
    const fullConfig: Record<string, string> = { ...chanceAssign, ...decisionAssignments };
    const cptIdx = getCptIndex(uNode, uCpt, fullConfig, 0, network);
    const uVal = uCpt.table[cptIdx] ?? 0;
    eu += prob * uVal;
  }
  return Number(eu.toFixed(2));
}

export function computeNetworkDecisionAnalysis(
  network: BayesNetwork,
  evidence: EvidenceMap,
): DecisionAnalysisResult {
  const decNodes = network.nodes.filter((n) => n.type === "decision");
  const uNode = network.nodes.find((n) => n.type === "utility") || null;

  if (decNodes.length === 0 || !uNode) {
    return {
      isDecisionNetwork: false,
      utilityNode: null,
      decisionNodes: [],
      alternatives: [],
      optimalEU: 0,
      meu: 0,
      optimalDecisionLabel: "N/A",
    };
  }

  function getDecConfigs(nodes: typeof decNodes): Array<Record<string, string>> {
    if (nodes.length === 0) return [{}];
    const n = nodes[0];
    const rest = getDecConfigs(nodes.slice(1));
    const configs: Array<Record<string, string>> = [];
    n.outcomes.forEach((out) => {
      rest.forEach((r) => configs.push({ [n.id]: out, ...r }));
    });
    return configs;
  }

  const decConfigs = getDecConfigs(decNodes);
  const rawAlternatives = decConfigs.map((cfg) => {
    const eu = computeExpectedUtilityForDecision(network, evidence, cfg);
    const label = Object.entries(cfg)
      .map(([k, v]) => `${k} = ${v}`)
      .join(", ");
    return { cfg, label, eu };
  });

  const maxDirectEU = Math.max(...rawAlternatives.map((a) => a.eu));

  const cptMap = new Map(network.cpts.map((c) => [c.target, c]));
  let hasInfoParents = false;
  let infoParentNodes: string[] = [];

  decNodes.forEach((dn) => {
    const cpt = cptMap.get(dn.id);
    if (cpt && cpt.parents.length > 0) {
      const unobserved = cpt.parents.filter((p) => !evidence[p] && network.nodes.find((n) => n.id === p)?.type === "chance");
      if (unobserved.length > 0) {
        hasInfoParents = true;
        infoParentNodes.push(...unobserved);
      }
    }
  });

  let totalMEU = maxDirectEU;

  if (hasInfoParents) {
    infoParentNodes = Array.from(new Set(infoParentNodes));
    const cleanEv: Record<string, string> = {};
    for (const [k, v] of Object.entries(evidence)) {
      if (v !== null && v !== undefined) cleanEv[k] = v;
    }
    const parentJoint = computeJointDistribution(network, infoParentNodes, cleanEv);
    let meuSum = 0;

    for (const { assignment: parentCfg, prob } of parentJoint) {
      if (prob <= 0) continue;
      let maxSubEU = -Infinity;
      for (const dCfg of decConfigs) {
        const subEU = computeExpectedUtilityForDecision(network, { ...evidence, ...parentCfg }, dCfg);
        if (subEU > maxSubEU) maxSubEU = subEU;
      }
      meuSum += prob * maxSubEU;
    }
    totalMEU = Number(meuSum.toFixed(2));
  }

  const alternatives: DecisionAlternative[] = rawAlternatives.map((a) => ({
    ...a,
    isOptimal: a.eu === maxDirectEU,
  }));

  const bestAlt = alternatives.find((a) => a.isOptimal) || alternatives[0];

  return {
    isDecisionNetwork: true,
    utilityNode: uNode,
    decisionNodes: decNodes,
    alternatives,
    optimalEU: maxDirectEU,
    meu: totalMEU,
    optimalDecisionLabel: bestAlt?.label || "None",
  };
}
