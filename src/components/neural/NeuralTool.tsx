import React, { useState } from "react";
import { useNeuralNetwork } from "./useNeuralNetwork";
import { NeuralMainCard } from "./NeuralMainCard";
import { NeuralHyperparamsCard } from "./NeuralHyperparamsCard";
import { NeuralLossCard } from "./NeuralLossCard";
import { NeuralTabs } from "./NeuralTabs";
import { GraphBuilder } from "../graph_builder/GraphBuilder";
import { StudioWorkspace } from "../workspace/StudioWorkspace";
import { CodeSandbox } from "../CodeSandbox";
import { getNeuralCodeTemplate } from "./neuralCodeTemplate";
import { NEURAL_PREBUILT_ITEMS, NEURAL_ALGORITHM_ITEMS } from "./neuralWorkspaceData";

export function NeuralTool() {
  const d = useNeuralNetwork();
  const [algo, setAlgo] = useState("mlp_sgd");
  const step10 = () => { for (let i = 0; i < 10; i++) d.trainEpoch(); };

  return (
    <StudioWorkspace
      title="Neural Network & Backprop Lab"
      category={d.tutorial.badge}
      description={d.initialDataset.description}
      prebuiltLabel="Dataset"
      prebuiltItems={NEURAL_PREBUILT_ITEMS}
      selectedPrebuiltId={d.selectedDatasetId}
      onSelectPrebuiltId={d.setSelectedDatasetId}
      algorithmItems={NEURAL_ALGORITHM_ITEMS}
      selectedAlgorithmId={algo}
      onSelectAlgorithmId={setAlgo}
      activeLogMessage={`Epoch ${d.epoch}: Loss = ${d.loss.toFixed(4)}`}
      exportData={{ toolType: "neural", problem: { id: d.selectedDatasetId, name: d.initialDataset.name, description: d.initialDataset.description, points: d.points }, filename: `${d.selectedDatasetId || "neural"}-dataset` }}
      onImportProblem={(data) => {
        if (!data.problem || !Array.isArray(data.problem.points)) throw new Error("Invalid neural dataset: missing points array");
        d.handleImportDataset(data.problem);
      }}
      onResetProblem={d.handleResetDataset}
      statsBadges={[{ label: "Points", value: d.points.length, variant: "cyan" }, { label: "Loss", value: d.loss.toFixed(4), variant: d.loss < 0.1 ? "success" : "warning" }]}
      controls={{ onReset: d.resetNetwork, speed: d.speed, setSpeed: d.setSpeed }}
      animationSlot={
        <NeuralMainCard
          isPlaying={d.isPlaying} onTogglePlay={() => d.setIsPlaying(!d.isPlaying)}
          onStep1={d.trainEpoch} onStep10={step10} onReset={d.resetNetwork}
          weightsRef={d.weightsRef} points={d.points} onAddPoint={(p) => d.setPoints((prev) => [...prev, p])}
          epoch={d.epoch} loss={d.loss} selectedDatasetId={d.selectedDatasetId} speed={d.speed} setSpeed={d.setSpeed}
        />
      }
      graphBuilderSlot={<GraphBuilder />}
      codingSlot={<CodeSandbox title="Backpropagation Algorithm Code" initialCode={getNeuralCodeTemplate(d.points)} algorithmName="Backprop (SGD)" />}
      theorySlot={<NeuralTabs points={d.points} tutorial={d.tutorial} />}
      inspectorSlot={<NeuralHyperparamsCard learningRate={d.learningRate} onLearningRateChange={d.setLearningRate} momentum={d.momentum} onMomentumChange={d.setMomentum} />}
      stateSlot={<NeuralLossCard lossHistory={d.lossHistory} />}
    />
  );
}
