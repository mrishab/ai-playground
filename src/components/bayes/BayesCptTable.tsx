import React from "react";
import { BayesNetwork, BayesNode, BayesCPT, ParentConfig } from "@/data/bayesProblems";
import { getCptIndex } from "./bayesCptUtils";
import { BayesCptTableHead } from "./BayesCptTableHead";

interface BayesCptTableProps {
  selectedNode: BayesNode;
  cpt: BayesCPT;
  parents: string[];
  outcomes: string[];
  parentConfigs: ParentConfig[];
  isUtility: boolean;
  network: BayesNetwork;
}

export function BayesCptTable(p: BayesCptTableProps) {
  const { selectedNode, cpt, parents, outcomes, parentConfigs, isUtility, network } = p;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs border border-border rounded-lg overflow-hidden font-mono">
        <BayesCptTableHead parents={parents} isUtility={isUtility} outcomes={outcomes} nodeId={selectedNode.id} />
        <tbody className="divide-y divide-border">
          {parentConfigs.map((cfg, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-secondary/20 transition-colors">
              {parents.map((parent) => (
                <td key={parent} className="p-2 border-r border-border font-medium">{cfg[parent]}</td>
              ))}
              {isUtility ? (
                <td className="p-2 font-bold text-primary">{cpt.table[rowIdx] !== undefined ? cpt.table[rowIdx].toFixed(1) : "—"}</td>
              ) : (
                outcomes.map((_, oIdx) => {
                  const val = cpt.table[getCptIndex(selectedNode, cpt, cfg, oIdx, network)];
                  return (
                    <td key={oIdx} className="p-2 border-r last:border-r-0 border-border font-semibold text-foreground/90">
                      {val !== undefined ? `${val.toFixed(4)} (${(val * 100).toFixed(1)}%)` : "—"}
                    </td>
                  );
                })
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
