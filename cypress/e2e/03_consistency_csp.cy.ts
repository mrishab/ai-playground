/// <reference types="cypress" />

describe("AI Playground Consistency Based CSP Solver Lab", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "Consistency for CSP").click({ force: true });
    cy.contains("Consistency Based CSP Solver").should("be.visible");
  });

  describe("1. Problem Building & Configuration (CSP Problems & Domains)", () => {
    it("switches prebuilt CSP problems and verifies variables and arc queue", () => {
      cy.contains("Simple Problem 1").should("be.visible");
      cy.contains("Variable Domains").should("be.visible");
      cy.contains("Arc Queue").should("be.visible");

      // Switch to Map Coloring (Australia)
      cy.get('select[aria-label="Select CSP Problem"]').select("mapColoring");
      cy.contains("Map Coloring").should("be.visible");
      cy.contains("WA").should("be.visible");
      cy.contains("NT").should("be.visible");
      cy.contains("NSW").should("be.visible");

      // Switch to Crossword
      cy.get('select[aria-label="Select CSP Problem"]').select("crossword1");
      cy.contains("Crossword").should("be.visible");
    });
  });

  describe("2. Building Expectations of Solutions (Algorithm Selection & Domain Splitting)", () => {
    it("configures algorithm selection (AC-3, MAC, Domain Splitting) and inspects variable domains", () => {
      // Default algorithm is AC-3
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "ac3");
      cy.contains("Variable Domains").should("be.visible");
      cy.contains("Arc Queue").should("be.visible");

      // Step AC-3 multiple times to test arc pruning and dependent arcs
      for (let i = 0; i < 6; i++) {
        cy.contains("button", "Advance Arc").click({ force: true });
      }

      // Switch to MAC (Maintaining Arc Consistency)
      cy.get('select[aria-label="Select Algorithm"]').select("mac");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "mac");

      // Advance MAC arcs and search step
      for (let i = 0; i < 5; i++) {
        cy.contains("button", /Advance Arc|Step MAC/).click({ force: true });
      }

      // Switch to Domain Splitting
      cy.get('select[aria-label="Select Algorithm"]').select("split");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "split");

      // Switch back to AC-3
      cy.get('select[aria-label="Select Algorithm"]').select("ac3");
    });
  });

  describe("3. Running Solutions (Advance Arc, Domain Split, Backtrack, Reset)", () => {
    it("advances arc-by-arc, prunes domains, tests interactive domain splitting and backtrack", () => {
      // Step Forward (Advance Arc)
      cy.contains("button", "Advance Arc").should("be.enabled");
      cy.contains("button", "Advance Arc").click({ force: true });
      cy.contains("Variable Domains").should("be.visible");

      // Interactive Domain Split on selected variable
      cy.get('select[aria-label="Select variable to split"]').select("A");
      cy.contains("button", "Domain Split").should("be.enabled").click({ force: true });

      // Backtrack button should now be enabled
      cy.contains("button", "Backtrack").should("be.enabled").click({ force: true });

      // Auto-Solve toggle
      cy.contains("button", "Auto").click({ force: true });
      cy.contains("button", "Pause").should("be.visible");
      cy.contains("button", "Pause").click({ force: true });

      // Reset CSP
      cy.get('button[title="Reset"]').first().click({ force: true });
      cy.contains("button", "Advance Arc").should("be.enabled");
    });

    it("switches to Coding Area, Theory & Guide, and Log panes", () => {
      // 1. Coding Area
      cy.contains("button", "Coding Area").click({ force: true });
      cy.contains("AC-3 Solver Code").should("be.visible");
      cy.contains("AI Playground is a visual builder app").should("be.visible");

      // 2. Theory & Guide
      cy.contains("button", "Theory & Guide").click({ force: true });
      cy.contains("Consistency for CSP").should("be.visible");

      // 3. Log & Output
      cy.contains("button", "Log & Output").click({ force: true });
      cy.contains("Execution Trace").should("be.visible");

      // 4. Return to Animation Area
      cy.contains("button", "Animation Area").click({ force: true });
      cy.contains("Variable Domains").should("be.visible");
    });
  });
});
