import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import confetti from "canvas-confetti";
import { DTREE_DATASETS } from "@/data/dtreeProblems";
import { NEURAL_DATASETS } from "@/data/neuralProblems";
import {
  calculateEntropy,
  calculateInformationGain,
  computeCandidateGains,
} from "@/components/dtree/dtreeMath";
import {
  calculateSplitInfo,
  calculateGainRatio,
  calculateGini,
  calculateGiniReduction,
} from "@/components/dtree/dtreeMetrics";
import { DTreeTool } from "@/components/dtree/DTreeTool";
import { NeuralTool } from "@/components/neural/NeuralTool";
import {
  createInitialWeights,
  forwardPass,
  computeDatasetMse,
} from "@/components/neural/neuralMath";
import { trainEpochStep } from "@/components/neural/neuralTrainer";

vi.mock("canvas-confetti", () => ({
  default: vi.fn(),
}));

describe("P1-1 Decision Trees & Neural Networks Algorithmic & UX Fixes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("1. Decision Trees Algorithm Math & Metrics", () => {
    const tennis = DTREE_DATASETS.playTennis;

    it("computes true ID3 Information Gain for Play Tennis Outlook (0.2467)", () => {
      const ig = calculateInformationGain(tennis.examples, "Outlook", tennis.target);
      expect(ig.toFixed(4)).toBe("0.2467");
    });

    it("computes true C4.5 SplitInfo (1.5774) and Gain Ratio for Play Tennis Outlook (0.1564)", () => {
      const splitInfo = calculateSplitInfo(tennis.examples, "Outlook");
      expect(splitInfo.toFixed(4)).toBe("1.5774");

      const gainRatio = calculateGainRatio(tennis.examples, "Outlook", tennis.target);
      expect(gainRatio.toFixed(4)).toBe("0.1564");
    });

    it("computes true CART Gini (0.4592) and Gini Reduction for Play Tennis Outlook (0.1163)", () => {
      const baseGini = calculateGini(tennis.examples, tennis.target);
      expect(baseGini.toFixed(4)).toBe("0.4592");

      const giniRed = calculateGiniReduction(tennis.examples, "Outlook", tennis.target);
      expect(giniRed.toFixed(4)).toBe("0.1163");
    });

    it("switches algorithm in DTreeTool and updates ranking metric title and values", () => {
      render(<DTreeTool />);
      // Default algorithm is ID3
      expect(screen.getByText(/Information Gain Ranking/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Gain: 0.2467/i).length).toBeGreaterThan(0);

      // Switch to C4.5
      const algoSelect = screen.getByLabelText(/Select Algorithm/i);
      fireEvent.change(algoSelect, { target: { value: "c45" } });
      expect(screen.getByText(/Gain Ratio Ranking/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Gain Ratio: 0.1564/i).length).toBeGreaterThan(0);

      // Switch to CART
      fireEvent.change(algoSelect, { target: { value: "cart" } });
      expect(screen.getByText(/Gini Reduction Ranking/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Gini Red.: 0.1163/i).length).toBeGreaterThan(0);
    });
  });

  describe("2. Decision Trees Controls, Confetti & Tree Rendering", () => {
    it("renders tree layout with flex-nowrap min-w-max to prevent Rain subtree disconnection", () => {
      const { container } = render(<DTreeTool />);
      const autoBuildBtn = screen.getByRole("button", { name: /Auto-Build Full Tree/i });
      fireEvent.click(autoBuildBtn);

      const branchContainers = container.querySelectorAll(".flex-nowrap");
      expect(branchContainers.length).toBeGreaterThan(0);
      const rainBadges = screen.getAllByText("Rain");
      expect(rainBadges.length).toBeGreaterThan(0);
    });

    it("does NOT fire confetti on intermediate manual split, but fires when tree is fully built", () => {
      render(<DTreeTool />);
      expect(confetti).not.toHaveBeenCalled();

      // Manual split on root Outlook
      const splitBtn = screen.getByRole("button", { name: /Split/i });
      fireEvent.click(splitBtn);

      // Intermediate split: tree is NOT complete (Sunny and Rain need splits)
      expect(confetti).not.toHaveBeenCalled();

      // Candidate gains panel should be updated with next unexpanded node (Sunny: Humidity, Wind, Temperature)
      expect(screen.getByText(/Next unexpanded node ready/i)).toBeInTheDocument();

      // Split Sunny on Humidity
      fireEvent.click(splitBtn);
      expect(confetti).not.toHaveBeenCalled();

      // Split Rain on Wind -> completes tree!
      fireEvent.click(splitBtn);
      expect(confetti).toHaveBeenCalled();
      expect(screen.getByText(/Tree fully built. All leaves classified./i)).toBeInTheDocument();
    });

    it("resets problem cleanly without rendering Class: undefined or breaking dropdown selection", () => {
      render(<DTreeTool />);
      const autoBuildBtn = screen.getByRole("button", { name: /Auto-Build Full Tree/i });
      fireEvent.click(autoBuildBtn);

      // Click Reset Problem in IO toolbar
      const resetProblemBtn = screen.getByRole("button", { name: /Reset Problem/i });
      fireEvent.click(resetProblemBtn);

      // Verify no 'Class: undefined'
      expect(screen.queryByText(/Class: undefined/i)).toBeNull();

      // Verify dataset dropdown still selects playTennis
      const datasetSelect = screen.getByLabelText(/Select Dataset/i) as HTMLSelectElement;
      expect(datasetSelect.value).toBe("playTennis");
    });

    it("wires Play (Auto-Build) button so clicking Play automatically steps tree to completion", async () => {
      vi.useFakeTimers();
      render(<DTreeTool />);

      const playBtn = screen.getByTitle(/Play \(Auto-Build\)/i);
      expect(playBtn).toBeEnabled();
      fireEvent.click(playBtn);

      for (let i = 0; i < 6; i++) {
        act(() => {
          vi.advanceTimersByTime(500);
        });
      }

      expect(confetti).toHaveBeenCalled();
      vi.useRealTimers();
    });
  });

  describe("3. Neural Networks Initial MSE & Empty Dataset Guard", () => {
    it("computes true forward-pass sigmoid MSE on load (baseline ~0.25, not hardcoded 0.0 or 0.5)", () => {
      const weights = createInitialWeights();
      const trueMse = computeDatasetMse(NEURAL_DATASETS.xor.points, weights, "mlp_sgd");
      // Baseline sigmoid output on 50/50 binary classification is ~0.25
      expect(trueMse).toBeGreaterThan(0.20);
      expect(trueMse).toBeLessThan(0.35);

      render(<NeuralTool />);
      // Verify displayed loss is between 0.20 and 0.35, not 0.0000 or 0.5000
      const lossMatch = screen.getByText(/Loss \(MSE\):/i).parentElement?.textContent;
      const parsedLoss = parseFloat(lossMatch?.replace(/[^0-9.]/g, "") || "0");
      expect(parsedLoss).toBeGreaterThan(0.20);
      expect(parsedLoss).toBeLessThan(0.35);
    });

    it("guards empty dataset: disables train buttons and does NOT fire confetti", () => {
      render(<NeuralTool />);
      const resetProblemBtn = screen.getByRole("button", { name: /Reset Problem/i });
      fireEvent.click(resetProblemBtn);

      // Train buttons must be disabled
      const step1Btn = screen.getByRole("button", { name: /Step \(1 Epoch\)/i });
      const autoBtn = screen.getByRole("button", { name: /Auto Train/i });
      const step10Btn = screen.getByRole("button", { name: /\+10 Epochs/i });

      expect(step1Btn).toBeDisabled();
      expect(autoBtn).toBeDisabled();
      expect(step10Btn).toBeDisabled();

      // Confetti must not have been fired
      expect(confetti).not.toHaveBeenCalled();
    });
  });

  describe("4. Neural Networks MLP XOR Convergence & Perceptron Plateau", () => {
    const xorPoints = NEURAL_DATASETS.xor.points;

    it("Single-Layer Perceptron plateaus on XOR (~0.26 - 0.28 MSE)", () => {
      const weights = createInitialWeights();
      let finalMse = 0;
      for (let ep = 0; ep < 100; ep++) {
        const res = trainEpochStep(xorPoints, weights, 0.8, 0.8, "perceptron");
        finalMse = res.mse;
      }
      expect(finalMse).toBeGreaterThan(0.24);
      expect(finalMse).toBeLessThan(0.30);
    });

    it("Multi-Layer Perceptron (2-4-1) reliably converges on XOR within 100 epochs (MSE < 0.05)", () => {
      let passedTrials = 0;
      const trials = 10;
      for (let t = 0; t < trials; t++) {
        const weights = createInitialWeights();
        let mse = 0;
        for (let ep = 0; ep < 100; ep++) {
          const res = trainEpochStep(xorPoints, weights, 0.8, 0.8, "mlp_sgd");
          mse = res.mse;
        }
        if (mse < 0.05) passedTrials++;
      }
      expect(passedTrials).toBe(trials);
    });
  });
});
