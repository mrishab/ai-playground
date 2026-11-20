import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "../App";
import { DeductionTool } from "../components/deduction/DeductionTool";
import { SearchTool } from "../components/search/SearchTool";
import { SearchFrontierCard } from "../components/search/SearchFrontierCard";
import { ConstraintTool } from "../components/constraint/ConstraintTool";
import { NeuralLossCard } from "../components/neural/NeuralLossCard";
import { DTreeDatasetTable } from "../components/dtree/DTreeDatasetTable";
import { StripsTemporalGrid } from "../components/strips_to_csp/StripsTemporalGrid";
import { ExerciseFiltersHeader } from "../components/exercises/ExerciseFiltersHeader";
import { generateSLDSteps } from "../components/deduction/sldStepRecorder";
import { executeSLDProof } from "../components/deduction/sldEngine";
import { executeFineStep } from "../components/constraint/ac3Engine";
import { CSP_PROBLEMS } from "../data/cspProblems";
import { DEDUCTION_KBS } from "../data/deductionProblems";
import { DTREE_DATASETS } from "../data/dtreeProblems";
import { STRIPS_PROBLEMS } from "../data/stripsProblems";

describe("Usability Feedback Fixes Verification", () => {
  describe("1. Definite Clause Deduction", () => {
    it("strips '?- ' prefix from queries in generateSLDSteps and executeSLDProof", () => {
      const kb = DEDUCTION_KBS.elect.code;
      const stepsWithPrefix = generateSLDSteps("?- lit(l1)", kb);
      expect(stepsWithPrefix.length).toBeGreaterThan(1);
      const lastStep = stepsWithPrefix[stepsWithPrefix.length - 1];
      expect(lastStep.log).toMatch(/Proved: lit\(l1\)/i);

      const proofWithPrefix = executeSLDProof("?- lit(l1)", kb);
      expect(proofWithPrefix.root.status).toBe("success");
      expect(proofWithPrefix.cleanQuery).toBe("lit(l1)");
    });

    it("displays 'In Progress' badge and synchronized step count on initial active step", () => {
      render(<DeductionTool />);
      // Initially, placeholder instructs students to use Interactive Query Goal panel
      expect(screen.getByText(/Enter a query in the Interactive Query Goal panel and click "Prove Query"/i)).toBeInTheDocument();

      // Click Advance in header controls or Step in panel
      const advanceBtn = screen.getByRole("button", { name: /Advance/i });
      fireEvent.click(advanceBtn);

      // On step 0, it should NOT say "Failed"
      expect(screen.queryByText(/^Failed$/i)).not.toBeInTheDocument();
      expect(screen.getByText(/In Progress/i)).toBeInTheDocument();
      expect(screen.getByText(/Selected query goal/i)).toBeInTheDocument();
      // Steps badge should display 1-indexed count (e.g. 1/6 or 1) rather than 0
      expect(screen.getAllByText(/1\//).length).toBeGreaterThan(0);
    });

    it("has a visible Prove Query button that executes the SLD proof", () => {
      render(<DeductionTool />);
      const proveBtn = screen.getByRole("button", { name: /Prove Query/i });
      expect(proveBtn).toBeInTheDocument();
      expect(proveBtn).toBeEnabled();
      fireEvent.click(proveBtn);
      expect(screen.getByText(/Goal Proved/i)).toBeInTheDocument();
      expect(screen.getByText(/Query proven!/i)).toBeInTheDocument();
    });
  });

  describe("2. Graph Searching Quiz Mode & Dense Graphs", () => {
    it("hides Next badge in Frontier Queue when Quiz Mode is active", () => {
      const sampleFrontier = [
        { nodes: ["A", "B"], cost: 2, h: 5, f: 7 },
        { nodes: ["A", "C"], cost: 3, h: 6, f: 9 },
      ];

      const { rerender } = render(
        <SearchFrontierCard frontier={sampleFrontier} algorithm="astar" isQuizMode={false} />
      );
      expect(screen.getByText(/^Next$/i)).toBeInTheDocument();

      rerender(
        <SearchFrontierCard frontier={sampleFrontier} algorithm="astar" isQuizMode={true} />
      );
      expect(screen.queryByText(/^Next$/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Quiz Active/i)).toBeInTheDocument();
      expect(screen.getByText(/Next expansion hidden for quiz/i)).toBeInTheDocument();
    });

    it("SearchTool toggles Quiz Mode and hides spoiler from frontier queue", () => {
      render(<SearchTool />);
      const quizBtn = screen.getByRole("button", { name: /Quiz Mode/i });
      fireEvent.click(quizBtn);
      expect(screen.getByText(/Exit Quiz/i)).toBeInTheDocument();
      expect(screen.queryByText(/^Next$/i)).not.toBeInTheDocument();
    });
  });

  describe("3. Consistency for CSP", () => {
    it("status bar log displays neighbor variable and constraint expression without blank names", () => {
      const problem = CSP_PROBLEMS.simple1;
      const initialQueue = [{ varName: "A", constraint: problem.constraints[0] }];
      const domains = { A: ["1", "2", "3", "4"], B: ["1", "2", "3", "4"], C: ["1", "2", "3", "4"] };

      const result = executeFineStep(initialQueue, domains, problem);
      expect(result.log).not.toMatch(/Arc \(A,\s*\)/);
      expect(result.log).toMatch(/Arc \(A,\s*B/);
      expect(result.log).toMatch(/is consistent\. No values pruned\./);
    });

    it("displays constraint expression text on edge line", () => {
      render(<ConstraintTool />);
      // simple1 has A != B and B != C
      expect(screen.getAllByText(/A ≠ B/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/B ≠ C/i).length).toBeGreaterThan(0);
    });
  });

  describe("4. Practice Exercises, Decision Trees, Neural Nets, STRIPS to CSP", () => {
    it("renders search placeholder without clipping in Practice Exercises", () => {
      render(
        <ExerciseFiltersHeader
          searchQuery=""
          onSearchChange={() => {}}
          chapters={["ch1"]}
          selectedChapter="all"
          onSelectChapter={() => {}}
        />
      );
      const input = screen.getByPlaceholderText("Search concepts, questions...");
      expect(input).toBeInTheDocument();
    });

    it("Decision Trees dataset table contains overflow-auto and min-w-full to prevent column clipping", () => {
      const dataset = DTREE_DATASETS.playTennis;
      const { container } = render(<DTreeDatasetTable dataset={dataset} />);
      const scrollWrapper = container.querySelector(".overflow-auto");
      expect(scrollWrapper).toBeInTheDocument();
      const targetHeader = screen.getByText("Play");
      expect(targetHeader).toBeInTheDocument();
      expect(targetHeader.classList.contains("whitespace-nowrap")).toBe(true);
    });

    it("Neural Loss Curve renders axis labels MSE and Epoch and numeric ticks, including single epoch", () => {
      const { rerender } = render(<NeuralLossCard lossHistory={[0.45, 0.35, 0.22, 0.15, 0.08]} />);
      expect(screen.getByText("MSE")).toBeInTheDocument();
      expect(screen.getByText("Epoch")).toBeInTheDocument();
      expect(screen.getByText("0.00")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();

      rerender(<NeuralLossCard lossHistory={[0.42]} />);
      expect(screen.getByText("MSE")).toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("STRIPS to CSP sets min-w-max on temporal grid and min-w-[240px] without truncation on columns", () => {
      const problem = STRIPS_PROBLEMS.coffeeDelivery;
      const { container } = render(
        <StripsTemporalGrid
          horizonK={2}
          setHorizonK={() => {}}
          isSolved={false}
          extractedPlan={[]}
          problem={problem}
          log="Ready"
          onStepForward={() => {}}
          onReset={() => {}}
          isPlaying={false}
          onTogglePlay={() => {}}
          speed={600}
          setSpeed={() => {}}
        />
      );
      const grid = container.querySelector(".min-w-max");
      expect(grid).toBeInTheDocument();
      expect(screen.getByText(/Time Step t = 2/i)).toBeInTheDocument();
      // Domain text D={cs, hallway, office} should be rendered without truncate class
      expect(screen.getAllByText(/D=\{cs, hallway, office\}/i).length).toBeGreaterThan(0);
      const domainSpan = screen.getAllByText(/D=\{cs, hallway, office\}/i)[0];
      expect(domainSpan.classList.contains("truncate")).toBe(false);
      expect(domainSpan.classList.contains("break-words")).toBe(true);
    });
  });

  describe("5. Hash Routing & Deep Linking", () => {
    it("loads tool view from URL hash, updates view on hashchange, and returns to overview on empty hash", () => {
      window.location.hash = "#deduction";
      const { unmount } = render(<App />);
      expect(screen.getAllByText(/Definite Clause Deduction/i).length).toBeGreaterThan(0);

      // Navigate to neural via hash
      window.location.hash = "#neural";
      fireEvent(window, new HashChangeEvent("hashchange"));
      expect(screen.getAllByText(/Neural Network & Backprop Lab/i).length).toBeGreaterThan(0);

      // Navigate back to root / overview via empty hash
      window.location.hash = "";
      fireEvent(window, new HashChangeEvent("hashchange"));
      expect(screen.getAllByText(/Interactive Artificial Intelligence/i).length).toBeGreaterThan(0);

      unmount();
    });
  });
});
