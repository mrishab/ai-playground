import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SyntaxHighlightEditor } from "../components/ui/SyntaxHighlightEditor";
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

describe("Visual Builder: Complete removal of coding sections and custom code writing", () => {
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

  it("2. All 10 tools have completely deleted Coding Area and offer only visual panes", () => {
    const toolEntries = [
      { name: "SearchTool", component: <SearchTool /> },
      { name: "ConstraintTool", component: <ConstraintTool /> },
      { name: "HillTool", component: <HillTool /> },
      { name: "DeductionTool", component: <DeductionTool /> },
      { name: "BayesTool", component: <BayesTool /> },
      { name: "DTreeTool", component: <DTreeTool /> },
      { name: "NeuralTool", component: <NeuralTool /> },
      { name: "StripsToCspTool", component: <StripsToCspTool /> },
      { name: "RobotTool", component: <RobotTool /> },
      { name: "PlanningTool", component: <PlanningTool /> },
    ];

    toolEntries.forEach(({ component }) => {
      const { unmount } = render(component);

      // Verify Coding Area is completely deleted
      expect(screen.queryByText(/Coding Area/i)).not.toBeInTheDocument();
      expect(screen.queryByRole("button", { name: /Coding Area/i })).not.toBeInTheDocument();
      expect(screen.queryByText(/Run Code/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Read-Only Reference/i)).not.toBeInTheDocument();

      // Verify default Animation Area pane is present
      expect(screen.getByText(/Animation Area/i)).toBeInTheDocument();
      expect(screen.getByText(/Log & Output/i)).toBeInTheDocument();
      expect(screen.getByText(/Theory & Guide/i)).toBeInTheDocument();

      // Verify pane switching works to Log & Output
      const logTab = screen.getByText(/Log & Output/i);
      fireEvent.click(logTab);
      expect(screen.getByText(/Execution Trace/i)).toBeInTheDocument();

      // Verify pane switching works to Theory & Guide
      const theoryTab = screen.getByText(/Theory & Guide/i);
      fireEvent.click(theoryTab);
      expect(screen.getByText(/Concepts/i)).toBeInTheDocument();

      // Verify pane switching back to Animation Area
      const animTab = screen.getByText(/Animation Area/i);
      fireEvent.click(animTab);
      expect(animTab).toBeInTheDocument();

      // If Graph Building exists (SearchTool), verify switching to it
      const gbTab = screen.queryByText(/Graph Building/i);
      if (gbTab) {
        fireEvent.click(gbTab);
        expect(screen.getByText(/Solve in Animation/i)).toBeInTheDocument();
        const animTabAgain = screen.getByText(/Animation Area/i);
        fireEvent.click(animTabAgain);
      }

      unmount();
    });
  });

  it("3. None of the educational tabs across modules include 'Run Code' or sandbox execution tabs", () => {
    render(<SearchTool />);
    fireEvent.click(screen.getByText(/Theory & Guide/i));
    expect(screen.queryByText(/Run Algorithm Code/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Run Code/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Concepts & Lessons/i)).toBeInTheDocument();
  });
});
