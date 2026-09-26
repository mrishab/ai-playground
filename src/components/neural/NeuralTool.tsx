import React from "react";
import { useNeuralNetwork } from "./useNeuralNetwork";
import { NeuralHeader } from "./NeuralHeader";
import { NeuralMainCard } from "./NeuralMainCard";
import { NeuralHyperparamsCard } from "./NeuralHyperparamsCard";
import { NeuralLossCard } from "./NeuralLossCard";
import { NeuralTabs } from "./NeuralTabs";

export function NeuralTool() {
  const d = useNeuralNetwork();
  const step10 = () => {
    for (let i = 0; i < 10; i++) d.trainEpoch();
  };

  return (
    <div className="space-y-6">
      <NeuralHeader
        initialDataset={d.initialDataset}
        selectedDatasetId={d.selectedDatasetId}
        onSelectDatasetId={d.setSelectedDatasetId}
        loss={d.loss}
        epoch={d.epoch}
        badgeText={d.tutorial.badge}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <NeuralMainCard
            isPlaying={d.isPlaying}
            onTogglePlay={() => d.setIsPlaying(!d.isPlaying)}
            onStep1={d.trainEpoch}
            onStep10={step10}
            onReset={d.resetNetwork}
            weightsRef={d.weightsRef}
            points={d.points}
            onAddPoint={(p) => d.setPoints((prev) => [...prev, p])}
            epoch={d.epoch}
            loss={d.loss}
            selectedDatasetId={d.selectedDatasetId}
            speed={d.speed}
            setSpeed={d.setSpeed}
          />
        </div>
        <div className="space-y-4">
          <NeuralHyperparamsCard
            learningRate={d.learningRate}
            onLearningRateChange={d.setLearningRate}
            momentum={d.momentum}
            onMomentumChange={d.setMomentum}
          />
          <NeuralLossCard lossHistory={d.lossHistory} />
        </div>
      </div>
      <NeuralTabs points={d.points} tutorial={d.tutorial} />
    </div>
  );
}
