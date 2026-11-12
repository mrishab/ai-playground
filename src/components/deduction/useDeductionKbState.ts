import { useState } from "react";
import { DEDUCTION_KBS, DeductionKB } from "@/data/deductionProblems";

export function useDeductionKbState() {
  const [selectedKBId, setSelectedKBId] = useState<string>("elect");
  const [customKB, setCustomKB] = useState<DeductionKB | null>(null);

  const currentKB: DeductionKB =
    selectedKBId === "custom" && customKB
      ? customKB
      : DEDUCTION_KBS[selectedKBId] || DEDUCTION_KBS.elect;

  const handleImportKB = (imported: DeductionKB) => {
    const safeKB: DeductionKB = {
      ...imported,
      sampleQueries: Array.isArray(imported.sampleQueries) ? imported.sampleQueries : [],
      code: imported.code || "",
    };
    setCustomKB(safeKB);
    setSelectedKBId("custom");
  };

  const handleResetKB = () => {
    setCustomKB({
      id: "blank",
      name: "Empty KB",
      description: "Reset empty knowledge base",
      code: "",
      sampleQueries: [],
    });
    setSelectedKBId("custom");
  };

  const handleSelectKBId = (id: string) => {
    setSelectedKBId(id);
    if (id !== "custom" && DEDUCTION_KBS[id]) {
      setCustomKB(DEDUCTION_KBS[id]);
    }
  };

  return {
    selectedKBId,
    setSelectedKBId: handleSelectKBId,
    customKB,
    currentKB,
    handleImportKB,
    handleResetKB,
  };
}
