import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/Card";
import { Slider } from "../ui/Slider";
import { SLSAlgorithm } from "./hillTypes";
import { HillAlgorithmSpecificSliders } from "./HillAlgorithmSpecificSliders";

interface HillParamsCardProps {
  algorithm: SLSAlgorithm;
  randomWalkProb: number;
  setRandomWalkProb: (v: number) => void;
  temperature: number;
  setTemperature: (v: number) => void;
  tabuTenure: number;
  setTabuTenure: (v: number) => void;
  speed: number;
  setSpeed: (v: number) => void;
}

export function HillParamsCard(props: HillParamsCardProps) {
  const { speed, setSpeed } = props;

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-semibold">
          Algorithm Parameters
        </CardTitle>
        <CardDescription className="text-xs">
          Fine-tune stochastic escape mechanisms
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-1 space-y-4 text-xs">
        <HillAlgorithmSpecificSliders {...props} />

        <div className="space-y-1.5">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Animation Speed:</span>
            <span className="font-mono text-primary font-bold">{speed}</span>
          </div>
          <Slider
            min={100}
            max={950}
            step={50}
            value={speed}
            onChange={setSpeed}
          />
        </div>
      </CardContent>
    </Card>
  );
}
