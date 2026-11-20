import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DeductionTool } from "../components/deduction/DeductionTool";

describe("Deduction UI Component Integration", () => {
  it("mounts and switches knowledge bases and executes preset proofs", () => {
    render(<DeductionTool />);
    expect(screen.getAllByText(/Electrical Wiring Environment/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/SLD Proof Search Tree/i)).toBeInTheDocument();

    const proveBtn = screen.getByRole("button", { name: /Prove Query/i });
    fireEvent.click(proveBtn);
    expect(screen.getByText(/Query proven!/i)).toBeInTheDocument();
  });

  it("proves ancestor(tom, jim) after switching to Family Relationships", () => {
    render(<DeductionTool />);
    const kbSelect = screen.getByLabelText(/Select Knowledge Base/i);
    fireEvent.change(kbSelect, { target: { value: "family" } });
    expect(screen.getAllByText(/Family Relationships & Kinship/i).length).toBeGreaterThan(0);

    const ancestorPill = screen.getByTitle("ancestor(tom, jim)");
    fireEvent.click(ancestorPill);

    const proveBtn = screen.getByRole("button", { name: /Prove Query/i });
    fireEvent.click(proveBtn);
    expect(screen.getByText(/Query proven!/i)).toBeInTheDocument();
    expect(screen.getByText(/Goal Proved/i)).toBeInTheDocument();
  });

  it("evaluates open query live(W) with 5 answers and stepper navigation", () => {
    render(<DeductionTool />);
    const queryInput = screen.getByLabelText(/Query input/i);
    fireEvent.change(queryInput, { target: { value: "live(W)" } });

    const proveBtn = screen.getByRole("button", { name: /Prove Query/i });
    fireEvent.click(proveBtn);
    expect(screen.getByText(/Found 5 proof derivation/i)).toBeInTheDocument();

    const advanceBtn = screen.getByRole("button", { name: /Advance/i });
    fireEvent.click(advanceBtn);
    expect(screen.getByText(/Selected query goal/i)).toBeInTheDocument();

    const nextAnsButtons = screen.getAllByRole("button", { name: /Next Ans/i });
    expect(nextAnsButtons.length).toBeGreaterThan(0);
    fireEvent.click(nextAnsButtons[0]);
    expect(screen.getByText(/Proved: live\(W\)/i)).toBeInTheDocument();
  });

  it("switches to Bottom-Up Chaining and executes forward consequence proof", () => {
    render(<DeductionTool />);
    const algoSelect = screen.getByLabelText(/Select Algorithm/i);
    fireEvent.change(algoSelect, { target: { value: "bottom_up" } });

    expect(screen.getByText(/Bottom-Up Consequence Set/i)).toBeInTheDocument();

    const proveBtn = screen.getByRole("button", { name: /Prove Query/i });
    fireEvent.click(proveBtn);
    expect(screen.getByText(/in saturated consequence set/i)).toBeInTheDocument();
  });
});
