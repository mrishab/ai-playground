import { useState } from "react";
import { CSP_PROBLEMS, CSPProblem } from "@/data/cspProblems";

export function useConstraintProblemSelection() {
  const [selectedProblemId, setSelectedProblemId] = useState("simple1");
  const [customProblem, setCustomProblem] = useState<CSPProblem | null>(null);

  const problem: CSPProblem =
    selectedProblemId === "custom" && customProblem
      ? customProblem
      : CSP_PROBLEMS[selectedProblemId] || CSP_PROBLEMS.simple1;

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
      name: "Empty CSP",
      description: "Reset empty CSP problem",
      variables: [],
      constraints: [],
    });
    setSelectedProblemId("custom");
  };

  const handleSelectProblemId = (id: string) => {
    setSelectedProblemId(id);
    if (id !== "custom" && CSP_PROBLEMS[id]) {
      setCustomProblem(CSP_PROBLEMS[id]);
    }
  };

  return {
    selectedProblemId,
    setSelectedProblemId: handleSelectProblemId,
    customProblem,
    problem,
    handleImportProblem,
    handleResetProblem,
  };
}
