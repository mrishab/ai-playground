import React from "react";
import { LabeledSlider } from "./LabeledSlider";

interface HillTabuSliderProps {
  tabuTenure: number;
  setTabuTenure: (v: number) => void;
}

export function HillTabuSlider({
  tabuTenure,
  setTabuTenure,
}: HillTabuSliderProps) {
  return (
    <LabeledSlider
      label="Tabu Tenure:"
      value={String(tabuTenure)}
      colorClass="text-primary"
      min={1}
      max={20}
      step={1}
      numValue={tabuTenure}
      onChange={setTabuTenure}
    />
  );
}
