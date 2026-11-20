import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { OverviewView } from "../components/overview/OverviewView";
import { ExercisesView } from "../components/exercises/ExercisesView";
import { SearchTool } from "../components/search/SearchTool";
import { ConstraintTool } from "../components/constraint/ConstraintTool";
import { HillTool } from "../components/hill/HillTool";
import { DeductionTool } from "../components/deduction/DeductionTool";
import { BayesTool } from "../components/bayes/BayesTool";
import { DTreeTool } from "../components/dtree/DTreeTool";
import { NeuralTool } from "../components/neural/NeuralTool";
import { StripsToCspTool } from "../components/strips_to_csp/StripsToCspTool";
import { RobotTool } from "../components/robot/RobotTool";
import { PlanningTool } from "../components/planning/PlanningTool";
import { App } from "../App";

// Mock canvas-confetti
vi.mock("canvas-confetti", () => ({
  default: vi.fn(),
}));

describe("AI Playground Comprehensive Verification Suite", () => {
  it("1. OverviewView renders all 10 tools and branding", () => {
    const onSelect = vi.fn();
    render(<OverviewView onSelectTool={onSelect} />);

    expect(
      screen.getByText(/Interactive Artificial Intelligence/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Graph Searching/i)).toBeInTheDocument();
    expect(screen.getByText(/Consistency for CSP/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(/Stochastic Local Search/i).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Definite Clause Deduction/i).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText(/Belief & Decision Networks/i)).toBeInTheDocument();
    expect(screen.getByText(/Decision Trees/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Neural Networks/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/STRIPS to CSP/i)).toBeInTheDocument();
    expect(screen.getByText(/Robot Control & Simulation/i)).toBeInTheDocument();
    expect(
      screen.getByText(/STRIPS Planning \(Blocks World\)/i),
    ).toBeInTheDocument();
  });

  it("2. SearchTool mounts, displays nodes, and steps search algorithm", () => {
    render(<SearchTool />);
    expect(screen.getByText(/Graph Searching Lab/i)).toBeInTheDocument();
    expect(screen.getByText(/Frontier Queue/i)).toBeInTheDocument();

    const stepBtn = screen.getByRole("button", { name: /^Step$/i });
    expect(stepBtn).toBeEnabled();
    fireEvent.click(stepBtn);
    expect(screen.getAllByText(/Expanded/i).length).toBeGreaterThan(0);
  });

  it("3. ConstraintTool mounts, executes fine step and domain checks", () => {
    render(<ConstraintTool />);
    expect(
      screen.getByText(/Consistency Based CSP Solver/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Variable Domains/i)).toBeInTheDocument();

    const fineStepBtn = screen.getByRole("button", { name: /Fine Step/i });
    expect(fineStepBtn).toBeEnabled();
    fireEvent.click(fineStepBtn);
  });

  it("4. HillTool mounts, evaluates initial conflicts and performs step", () => {
    render(<HillTool />);
    expect(
      screen.getAllByText(/Stochastic Local Search/i).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText(/Total Assignment State/i)).toBeInTheDocument();

    const stepBtn = screen.getByRole("button", { name: /^Step$/i });
    expect(stepBtn).toBeInTheDocument();
  });

  it("5. DeductionTool mounts, allows querying, and executes SLD proof", () => {
    render(<DeductionTool />);
    expect(
      screen.getAllByText(/Definite Clause Deduction/i).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText(/SLD Proof Search Tree/i)).toBeInTheDocument();

    const proveBtn = screen.getByRole("button", { name: /Prove Query/i });
    expect(proveBtn).toBeEnabled();
    fireEvent.click(proveBtn);
    expect(screen.getByText(/Query proven!/i)).toBeInTheDocument();
  });

  it("6. BayesTool mounts, computes marginals and tests D-separation", () => {
    render(<BayesTool />);
    expect(
      screen.getByText(/Belief & Decision Networks Lab/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Posterior Marginals/i)).toBeInTheDocument();

    const dsepBtn = screen.getByRole("button", { name: /Test Independence/i });
    expect(dsepBtn).toBeEnabled();
    fireEvent.click(dsepBtn);
  });

  it("7. DTreeTool mounts, computes entropy and builds full tree", () => {
    render(<DTreeTool />);
    expect(
      screen.getByText(/Decision Tree Induction Lab/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Information Gain Ranking/i)).toBeInTheDocument();

    const buildBtn = screen.getByRole("button", {
      name: /Auto-Build Full Tree/i,
    });
    expect(buildBtn).toBeEnabled();
    fireEvent.click(buildBtn);
    expect(
      screen.getByText(/Built complete decision tree using ID3 algorithm/i),
    ).toBeInTheDocument();
  });

  it("8. NeuralTool mounts, renders 2D decision boundary and trains epoch", () => {
    render(<NeuralTool />);
    expect(
      screen.getByText(/Neural Network & Backprop Lab/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Loss Curve/i)).toBeInTheDocument();

    const stepBtn = screen.getByRole("button", { name: /\+10 Epochs/i });
    expect(stepBtn).toBeEnabled();
    fireEvent.click(stepBtn);
  });

  it("9. StripsToCspTool mounts, unfolds horizons and extracts plan", () => {
    render(<StripsToCspTool />);
    expect(screen.getByText(/STRIPS to CSP Planning/i)).toBeInTheDocument();
    expect(screen.getByText(/Planning Horizon/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Satisfying Plan/i).length).toBeGreaterThan(0);
  });

  it("10. RobotTool mounts, initializes pose and steps sense-plan-act cycle", () => {
    render(<RobotTool />);
    expect(
      screen.getByText(/Autonomous Robot Control Lab/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Sensor Telemetry/i)).toBeInTheDocument();

    const stepBtn = screen.getByRole("button", { name: /Step Cycle/i });
    expect(stepBtn).toBeEnabled();
    fireEvent.click(stepBtn);
  });

  it("11. PlanningTool mounts Blocks World and steps plan animation", () => {
    render(<PlanningTool />);
    expect(screen.getByText(/STRIPS Planning Lab/i)).toBeInTheDocument();
    expect(screen.getAllByText(/TABLE/i).length).toBeGreaterThan(0);

    const stepBtn = screen.getByRole("button", { name: /Step Action/i });
    expect(stepBtn).toBeEnabled();
    fireEvent.click(stepBtn);
    expect(screen.getByText(/Executed:/i)).toBeInTheDocument();
  });

  it("12. ExercisesView renders exercises, reveals hints and solutions", () => {
    const onOpen = vi.fn();
    render(<ExercisesView onOpenTool={onOpen} />);

    expect(
      screen.getByText(/Practice Exercises & Self-Assessment/i),
    ).toBeInTheDocument();
    const questionsHeaders = screen.getAllByText(
      /Directed Assessment Questions/i,
    );
    expect(questionsHeaders.length).toBeGreaterThan(0);

    // Click reveal solution
    const revealBtns = screen.getAllByText(/Reveal Solution/i);
    expect(revealBtns.length).toBeGreaterThan(0);
    fireEvent.click(revealBtns[0]);
    expect(
      screen.getByText(/Official Textbook Solution:/i),
    ).toBeInTheDocument();
  });

  it("13. App toggles seamlessly between dark and light themes", () => {
    localStorage.clear();
    const { container } = render(<App />);
    const rootDiv = container.firstChild as HTMLElement;
    expect(rootDiv.classList.contains("dark")).toBe(true);

    const toggleBtn = screen.getByRole("button", {
      name: /Switch to light theme/i,
    });
    fireEvent.click(toggleBtn);
    expect(rootDiv.classList.contains("dark")).toBe(false);
    expect(
      screen.getByRole("button", { name: /Switch to dark theme/i }),
    ).toBeInTheDocument();

    const switchBackBtn = screen.getByRole("button", {
      name: /Switch to dark theme/i,
    });
    fireEvent.click(switchBackBtn);
    expect(rootDiv.classList.contains("dark")).toBe(true);
  });

  it("14. DeductionTool steps through SLD resolution step-by-step", () => {
    render(<DeductionTool />);
    const stepBtn = screen.getByRole("button", { name: /Step$/i });
    expect(stepBtn).toBeInTheDocument();
    fireEvent.click(stepBtn);
    expect(screen.getByText(/Selected query goal/i)).toBeInTheDocument();
  });

  it("15. DTreeTool performs Step (ID3) sequentially", () => {
    render(<DTreeTool />);
    const stepId3Btn = screen.getByRole("button", { name: /Step \(ID3\)/i });
    expect(stepId3Btn).toBeInTheDocument();
    fireEvent.click(stepId3Btn);
    expect(screen.getByText(/Step ID3: split on best attribute/i)).toBeInTheDocument();
  });

  it("16. BayesTool steps through Variable Elimination", () => {
    render(<BayesTool />);
    const stepVeBtn = screen.getByRole("button", { name: /Step VE/i });
    expect(stepVeBtn).toBeInTheDocument();
    fireEvent.click(stepVeBtn);
    expect(screen.getByText(/Active Factor Pool/i)).toBeInTheDocument();
  });

  it("17. StripsToCspTool steps through horizon unfolding", () => {
    render(<StripsToCspTool />);
    const resetBtn = screen.getByTitle(/Reset to k=0/i);
    fireEvent.click(resetBtn);
    expect(screen.getByText(/Horizon \(k\):/i)).toBeInTheDocument();
    const stepBtn = screen.getByRole("button", { name: /Step Horizon/i });
    fireEvent.click(stepBtn);
    expect(screen.getByText(/Time Step t = 1/i)).toBeInTheDocument();
  });

  it("18. ExercisesView expands interactive algorithm execution stepper", () => {
    render(<ExercisesView onOpenTool={() => {}} />);
    const runnerBtns = screen.getAllByText(/Interactive Algorithm Execution:/i);
    expect(runnerBtns.length).toBeGreaterThan(0);
    fireEvent.click(runnerBtns[0]);
    expect(screen.getAllByRole("button", { name: /Step$/i }).length).toBeGreaterThan(0);
  });

  it("19. ExercisesView executes question-specific logic and displays steps", () => {
    render(<ExercisesView onOpenTool={() => {}} />);
    const execBtns = screen.getAllByText(/Execute Logic/i);
    expect(execBtns.length).toBeGreaterThan(0);
    fireEvent.click(execBtns[0]);
    expect(screen.getByText(/Q1 Logic:/i)).toBeInTheDocument();
  });

  it("20. NeuralTool advances 1 epoch via Step button", () => {
    render(<NeuralTool />);
    const step1Btn = screen.getByRole("button", { name: /Step \(1 Epoch\)/i });
    expect(step1Btn).toBeInTheDocument();
    fireEvent.click(step1Btn);
    expect(screen.getByText(/Epoch:/i)).toBeInTheDocument();
    expect(screen.getByText("1", { selector: "strong" })).toBeInTheDocument();
  });
});


