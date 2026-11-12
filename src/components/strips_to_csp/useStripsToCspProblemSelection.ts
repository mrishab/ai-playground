import { useState } from "react";
import { STRIPS_PROBLEMS, StripsProblem } from "@/data/stripsProblems";

export function useStripsToCspProblemSelection() {
  const [selectedProblemId, setSelectedProblemId] = useState("coffeeDelivery");
  const [customProblem, setCustomProblem] = useState<StripsProblem | null>(null);

  const problem: StripsProblem =
    selectedProblemId === "custom" && customProblem
      ? customProblem
      : STRIPS_PROBLEMS[selectedProblemId] || STRIPS_PROBLEMS.coffeeDelivery;

  const handleImportProblem = (imported: StripsProblem) => {
    setCustomProblem({
      ...imported,
      variables: Array.isArray(imported.variables) ? imported.variables : [],
      actions: Array.isArray(imported.actions) ? imported.actions : [],
    });
    setSelectedProblemId("custom");
  };

  const handleResetProblem = () => {
    setCustomProblem({
      id: "blank",
      name: "Empty STRIPS",
      description: "Reset empty STRIPS problem",
      variables: [],
      actions: [],
    });
    setSelectedProblemId("custom");
  };

  const handleSelectProblemId = (id: string) => {
    setSelectedProblemId(id);
    if (id !== "custom" && STRIPS_PROBLEMS[id]) {
      setCustomProblem(STRIPS_PROBLEMS[id]);
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
