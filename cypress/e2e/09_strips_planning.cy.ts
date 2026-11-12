/// <reference types="cypress" />

describe("AIspace STRIPS Planning (Blocks World) Lab", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "STRIPS Planning").click({ force: true });
    cy.contains("STRIPS Planning Lab").should("be.visible");
  });

  describe("1. Problem Building & Configuration (Blocks World Problems)", () => {
    it("switches planning problem presets and verifies blocks and goals", () => {
      cy.contains("The Sussman Anomaly").should("be.visible");
      cy.contains("TABLE").should("be.visible");
      cy.contains("Goal Specification").should("be.visible");

      // Switch to Simple Block Swap
      cy.get('select[aria-label="Select Blocks World Problem"]').select("simpleSwap");
      cy.contains("Simple Two-Block Swap").should("be.visible");

      // Switch to 5-Block Tower Stacking
      cy.get('select[aria-label="Select Blocks World Problem"]').select("fiveBlocks");
      cy.contains("Five Blocks Tower").should("be.visible");
    });
  });

  describe("2. Building Expectations of Solutions (Planners & Actions Queue)", () => {
    it("configures planner selection and inspects plan queue", () => {
      // Default algorithm is forward
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "forward");

      // Switch to Goal Regression and test stepping
      cy.get('select[aria-label="Select Algorithm"]').select("regression");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "regression");
      cy.contains("Generated Plan Steps").should("be.visible");
      cy.contains("button", "Step Action").click({ force: true });
      cy.contains("Progress:").should("be.visible");

      // Switch back to forward planner
      cy.get('select[aria-label="Select Algorithm"]').select("forward");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "forward");
    });
  });

  describe("3. Running Solutions (Step Action, Auto-Play Plan, Reset)", () => {
    it("steps action sequentially, updates gripper and table state, and resets", () => {
      cy.get('select[aria-label="Select Blocks World Problem"]').select("sussman");

      // Step Action 1
      cy.contains("button", "Step Action").should("be.visible").click({ force: true });
      cy.contains("Executed:").should("be.visible");
      cy.contains("Progress:").should("be.visible");

      // Step Action 2
      cy.contains("button", "Step Action").click({ force: true });

      // Auto-Play toggle
      cy.contains("button", "Animate Plan").click({ force: true });
      cy.contains("button", "Pause").should("be.visible");
      cy.contains("button", "Pause").click({ force: true });

      // Reset
      cy.contains("button", "Reset").click({ force: true });
      cy.contains("Steps").should("be.visible");
    });

    it("switches to Coding Area, Theory & Guide, and Log panes", () => {
      // 1. Coding Area
      cy.contains("button", "Coding Area").click({ force: true });
      cy.contains("STRIPS Planner Code").should("be.visible");
      cy.contains("The AI Space is a visual builder app").should("be.visible");

      // 2. Theory & Guide
      cy.contains("button", "Theory & Guide").click({ force: true });
      cy.contains("STRIPS Planning").should("be.visible");

      // 3. Log & Output
      cy.contains("button", "Log & Output").click({ force: true });
      cy.contains("Execution Trace").should("be.visible");

      // 4. Return to Animation Area
      cy.contains("button", "Animation Area").click({ force: true });
      cy.contains("TABLE").should("be.visible");
    });
  });
});
