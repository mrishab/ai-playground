import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { SyntaxHighlightEditor } from "../components/ui/SyntaxHighlightEditor";
import { CodeSandbox } from "../components/CodeSandbox";
import { DeductionKbEditor } from "../components/deduction/DeductionKbEditor";
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

// Mock canvas-confetti
vi.mock("canvas-confetti", () => ({ default: vi.fn() }));

describe("Visual Builder: Removal of custom code writing and running", () => {
  it("1. SyntaxHighlightEditor defaults to strictly readOnly and blocks keystroke input", () => {
    const handleChange = vi.fn();
    render(<SyntaxHighlightEditor value="const a = 10;" onChange={handleChange} />);

    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("readonly");
    expect(textarea).toHaveAttribute("aria-readonly", "true");

    // Simulate keydown and change attempt
    const keyDownEvent = fireEvent.keyDown(textarea, { key: "x" });
    expect(keyDownEvent).toBe(false); // preventDefault was called

    fireEvent.change(textarea, { target: { value: "const a = 999;" } });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("2. CodeSandbox displays read-only badge, guidance notice, and copy action without run or reset buttons", async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText: writeTextMock } });

    render(
      <CodeSandbox
        title="Test Algorithm Reference"
        algorithmName="A* Search"
        initialCode="function astar() { return true; }"
        notes="Heuristic guidance"
      />
    );

    // Read-only indicator and title
    expect(screen.getByText(/Test Algorithm Reference/i)).toBeInTheDocument();
    expect(screen.getByText(/Read-Only Reference/i)).toBeInTheDocument();
    expect(screen.getByText(/A\* Search/i)).toBeInTheDocument();

    // Guidance text
    expect(
      screen.getByText(/The AI Space is a visual builder app. Code writing and running are not supported./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Heuristic guidance/i)).toBeInTheDocument();

    // Absence of execution controls
    expect(screen.queryByRole("button", { name: /Run Code/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Reset/i })).not.toBeInTheDocument();

    // Copy action works
    const copyBtn = screen.getByRole("button", { name: /Copy/i });
    expect(copyBtn).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(copyBtn);
    });
    expect(writeTextMock).toHaveBeenCalledWith("function astar() { return true; }");
  });

  it("3. DeductionKbEditor is strictly read-only and displays Prolog reference badge", () => {
    render(<DeductionKbEditor kbCode="light_on :- switch_up, power_ok." />);

    expect(screen.getByText(/Knowledge Base \(Definite Clauses\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Read-Only Reference/i)).toBeInTheDocument();
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("readonly");
  });

  it("4. All 10 tools have a consistent read-only algorithm code reference in their coding pane", () => {
    // 1. Search
    const { unmount: u1 } = render(<SearchTool />);
    fireEvent.click(screen.getByText(/Coding Area/i));
    expect(screen.getByText(/Search Algorithm Code/i)).toBeInTheDocument();
    expect(screen.getByText(/Read-Only Reference/i)).toBeInTheDocument();
    u1();

    // 2. Constraint
    const { unmount: u2 } = render(<ConstraintTool />);
    fireEvent.click(screen.getByText(/Coding Area/i));
    expect(screen.getByText(/AC-3 Solver Code/i)).toBeInTheDocument();
    u2();

    // 3. Hill
    const { unmount: u3 } = render(<HillTool />);
    fireEvent.click(screen.getByText(/Coding Area/i));
    expect(screen.getByText(/SLS Algorithm Code/i)).toBeInTheDocument();
    u3();

    // 4. Deduction
    const { unmount: u4 } = render(<DeductionTool />);
    fireEvent.click(screen.getByText(/Coding Area/i));
    expect(screen.getByText(/Knowledge Base \(Definite Clauses\)/i)).toBeInTheDocument();
    u4();

    // 5. Bayes
    const { unmount: u5 } = render(<BayesTool />);
    fireEvent.click(screen.getByText(/Coding Area/i));
    expect(screen.getByText(/Variable Elimination Code/i)).toBeInTheDocument();
    u5();

    // 6. DTree
    const { unmount: u6 } = render(<DTreeTool />);
    fireEvent.click(screen.getByText(/Coding Area/i));
    expect(screen.getByText(/ID3 Decision Tree Code/i)).toBeInTheDocument();
    u6();

    // 7. Neural
    const { unmount: u7 } = render(<NeuralTool />);
    fireEvent.click(screen.getByText(/Coding Area/i));
    expect(screen.getByText(/Backpropagation Algorithm Code/i)).toBeInTheDocument();
    u7();

    // 8. Strips to CSP
    const { unmount: u8 } = render(<StripsToCspTool />);
    fireEvent.click(screen.getByText(/Coding Area/i));
    expect(screen.getByText(/STRIPS to CSP Compiler Code/i)).toBeInTheDocument();
    u8();

    // 9. Robot
    const { unmount: u9 } = render(<RobotTool />);
    fireEvent.click(screen.getByText(/Coding Area/i));
    expect(screen.getByText(/Robot Controller Code/i)).toBeInTheDocument();
    u9();

    // 10. Planning
    const { unmount: u10 } = render(<PlanningTool />);
    fireEvent.click(screen.getByText(/Coding Area/i));
    expect(screen.getByText(/STRIPS Planner Code/i)).toBeInTheDocument();
    u10();
  });

  it("5. None of the educational tabs across modules include 'Run Code' or sandbox execution tabs", () => {
    render(<SearchTool />);
    fireEvent.click(screen.getByText(/Theory & Guide/i));
    expect(screen.queryByText(/Run Algorithm Code/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Run Code/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Concepts & Lessons/i)).toBeInTheDocument();
  });
});
