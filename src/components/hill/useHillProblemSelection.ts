import { useState } from "react";
import { CSP_PROBLEMS, CSPProblem } from "@/data/cspProblems";

export function useHillProblemSelection(selectedProblemId: string, setSelectedProblemId: (id: string) => void) {
  const [customProblem, setCustomProblem] = useState<CSPProblem | null>(null);

  const problem: CSPProblem =
    selectedProblemId === "custom" && customProblem
      ? customProblem
      : CSP_PROBLEMS[selectedProblemId] || CSP_PROBLEMS.scheduling1;

  const handleImportProblem = (imported: CSPProblem) => {
    setCustomProblem({
      ...imported,
      variables: Array.isArray(imported.variables) ? imported.variables : [],
      constraints: Array.isArray(imported.constraints) ? imported.constraints : [],
    });
    setSelectedProblemId("custom");
  };

  const handleResetProblem = () => {
    setCustomProblem({
      id: "blank",
      name: "Empty Problem",
      description: "Reset empty SLS problem",
      variables: [],
      constraints: [],
    });
    setSelectedProblemId("custom");
  };

  return {
    problem,
    customProblem,
    handleImportProblem,
    handleResetProblem,
  };
}
