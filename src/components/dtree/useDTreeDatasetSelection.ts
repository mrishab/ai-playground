import { useState } from "react";
import { DTREE_DATASETS, DTreeDataset } from "@/data/dtreeProblems";

export function useDTreeDatasetSelection() {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>("playTennis");
  const [customDataset, setCustomDataset] = useState<DTreeDataset | null>(null);

  const dataset: DTreeDataset =
    selectedDatasetId === "custom" && customDataset
      ? customDataset
      : DTREE_DATASETS[selectedDatasetId] || DTREE_DATASETS.playTennis;

  const handleImportDataset = (imported: DTreeDataset) => {
    setCustomDataset({
      ...imported,
      attributes: Array.isArray(imported.attributes) ? imported.attributes : [],
      examples: Array.isArray(imported.examples) ? imported.examples : [],
      attributeValues: imported.attributeValues || {},
      target: imported.target || "",
    });
    setSelectedDatasetId("custom");
  };

  const handleResetDataset = () => {
    setCustomDataset({
      id: "blank",
      name: "Empty Dataset",
      description: "Reset empty decision tree dataset",
      attributes: [],
      target: "",
      attributeValues: {},
      examples: [],
    });
    setSelectedDatasetId("custom");
  };

  const handleSelectDatasetId = (id: string) => {
    setSelectedDatasetId(id);
    if (id !== "custom" && DTREE_DATASETS[id]) {
      setCustomDataset(DTREE_DATASETS[id]);
    }
  };

  return {
    selectedDatasetId,
    setSelectedDatasetId: handleSelectDatasetId,
    customDataset,
    dataset,
    handleImportDataset,
    handleResetDataset,
  };
}
