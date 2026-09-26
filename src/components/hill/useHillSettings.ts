import { useState } from "react";
import { SLSAlgorithm } from "./hillTypes";

export function useHillSettings() {
  const [selectedProblemId, setSelectedProblemId] = useState("scheduling1");
  const [algorithm, setAlgorithm] = useState<SLSAlgorithm>("min_conflicts");
  const [randomWalkProb, setRandomWalkProb] = useState(0.1);
  const [temperature, setTemperature] = useState(10.0);
  const [tabuTenure, setTabuTenure] = useState(5);
  const [speed, setSpeed] = useState(700);
  const [isPlaying, setIsPlaying] = useState(false);

  return {
    selectedProblemId,
    setSelectedProblemId,
    algorithm,
    setAlgorithm,
    randomWalkProb,
    setRandomWalkProb,
    temperature,
    setTemperature,
    tabuTenure,
    setTabuTenure,
    speed,
    setSpeed,
    isPlaying,
    setIsPlaying,
  };
}
