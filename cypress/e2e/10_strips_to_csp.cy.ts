/// <reference types="cypress" />

describe("AI Playground STRIPS to CSP Planning Lab", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "STRIPS to CSP").click({ force: true });
    cy.contains("STRIPS to CSP Planning").should("be.visible");
  });

  describe("1. Problem Building & Configuration (Planning Domains & Horizons)", () => {
    it("switches domain presets and verifies state variables and initial horizon", () => {
      cy.contains("Coffee Delivery Robot").should("be.visible");
      cy.contains("Planning Horizon (k):").should("be.visible");

      // Switch to Two-Floor Elevator Delivery
      cy.get('select[aria-label="Select Planning Domain"]').select("elevator");
      cy.contains("Two-Floor Elevator World").should("be.visible");
    });
  });

  describe("2. Building Expectations of Solutions (CSP Translation & Algorithms)", () => {
    it("selects algorithm and inspects temporal grid fluents", () => {
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "bounded_csp");

      // Switch to SATPlan and step horizon
      cy.get('select[aria-label="Select Algorithm"]').select("sat_plan");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "sat_plan");
      cy.contains("button", "Step Horizon").click({ force: true });
      cy.contains("Planning Horizon (k):").should("be.visible");

      // Switch back to Bounded CSP
      cy.get('select[aria-label="Select Algorithm"]').select("bounded_csp");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "bounded_csp");
    });
  });

  describe("3. Running Solutions (Step Horizon, Auto-Play, Reset)", () => {
    it("steps planning horizon sequentially and extracts satisfying plan", () => {
      cy.get('select[aria-label="Select Planning Domain"]').select("coffeeDelivery");

      // Reset to k=0
      cy.get('button[title="Reset to k=0"]').click({ force: true });
      cy.contains("span", "Planning Horizon (k):").parent().contains("0").should("be.visible");

      // Step Horizon to k=1
      cy.contains("button", "Step Horizon").click({ force: true });
      cy.contains("span", "Planning Horizon (k):").parent().contains("1").should("be.visible");

      // Step Horizon to k=2
      cy.contains("button", "Step Horizon").click({ force: true });
      cy.contains("span", "Planning Horizon (k):").parent().contains("2").should("be.visible");

      // Verify satisfying plan extracted or steps present
      cy.contains("Satisfying Plan").should("be.visible");

      // Reset
      cy.get('button[title="Reset to k=0"]').click({ force: true });
      cy.contains("span", "Planning Horizon (k):").parent().contains("0").should("be.visible");
    });

    it("switches to Coding Area, Theory & Guide, and Log panes", () => {
      // 1. Coding Area
      cy.contains("button", "Coding Area").click({ force: true });
      cy.contains("STRIPS to CSP Compiler Code").should("be.visible");
      cy.contains("AI Playground is a visual builder app").should("be.visible");

      // 2. Theory & Guide
      cy.contains("button", "Theory & Guide").click({ force: true });
      cy.contains("STRIPS to CSP").should("be.visible");

      // 3. Log & Output
      cy.contains("button", "Log & Output").click({ force: true });
      cy.contains("Execution Trace").should("be.visible");

      // 4. Return to Animation Area
      cy.contains("button", "Animation Area").click({ force: true });
      cy.contains("Planning Horizon").should("be.visible");
    });
  });
});
