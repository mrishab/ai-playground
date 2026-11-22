import React from "react";
import { HillAlgorithmSpecificSlidersProps } from "./hillTypes";
import { LabeledSlider } from "./LabeledSlider";
import { HillTabuSlider } from "./HillTabuSlider";

export function HillAlgorithmSpecificSliders(
  props: HillAlgorithmSpecificSlidersProps,
) {
  const {
    algorithm,
    randomWalkProb,
    setRandomWalkProb,
    temperature,
    setTemperature,
    tabuTenure,
    setTabuTenure,
  } = props;

  if (algorithm === "random_walk") {
    return (
      <LabeledSlider
        label="Random Walk Prob (p):"
        value={randomWalkProb.toFixed(2)}
        colorClass="text-primary"
        min={0.01}
        max={0.9}
        step={0.05}
        numValue={randomWalkProb}
        onChange={setRandomWalkProb}
      />
    );
  }

  if (algorithm === "annealing") {
    return (
      <LabeledSlider
        label="Temperature (T):"
        value={temperature.toFixed(2)}
        colorClass="text-destructive"
        min={0.1}
        max={50}
        step={0.5}
        numValue={temperature}
        onChange={setTemperature}
      />
    );
  }

  if (algorithm === "tabu") {
    return (
      <HillTabuSlider tabuTenure={tabuTenure} setTabuTenure={setTabuTenure} />
    );
  }

  return null;
}
