/// <reference types="cypress" />

describe("AI Playground Belief & Decision Networks Lab", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "Belief & Decision Networks").click({ force: true });
    cy.contains("Belief & Decision Networks Lab").should("be.visible");
  });

  describe("1. Problem Building & Configuration (Networks & Evidence)", () => {
    it("switches network presets and verifies nodes and marginals", () => {
      cy.contains("Simple Umbrella Decision").should("be.visible");
      cy.contains("Posterior Marginals").should("be.visible");

      // Switch to Basic Fire Alarm
      cy.get('select[aria-label="Select Network"]').select("basicfirealarm");
      cy.contains("Fire Alarm Belief Network").should("be.visible");
      cy.contains("tampering").should("be.visible");
      cy.contains("alarm").should("be.visible");

      // Switch to Car Diagnosis Network
      cy.get('select[aria-label="Select Network"]').select("car");
      cy.contains("Car Starting Problem").should("be.visible");
    });

    it("observes evidence by clicking variable outcomes and verifies observed counts", () => {
      cy.get('select[aria-label="Select Network"]').select("umbrella");

      // Click node Weather to observe evidence
      cy.contains("text", "Weather").parent().click({ force: true });

      // Observed badge updates
      cy.contains("Observed:").should("be.visible");

      // Clear evidence
      cy.contains("button", "Clear All Evidence").click({ force: true });
      cy.contains("0 variables").should("be.visible");
    });
  });

  describe("2. Building Expectations of Solutions (D-Separation & Algorithms)", () => {
    it("selects algorithm and runs D-Separation conditional independence test", () => {
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "ve");

      // Select D-Separation algorithm
      cy.get('select[aria-label="Select Algorithm"]').select("dsep");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "dsep");

      // Select Variable A and Variable B
      cy.get('select[aria-label="Variable A:"]').select("Weather");
      cy.get('select[aria-label="Variable B:"]').select("Forecast");

      // Test independence button in D-separation card
      cy.contains("button", "Test Independence").click({ force: true });
      cy.contains(/DEPENDENT:|D-SEPARATED:/).should("be.visible");
    });
  });

  describe("3. Running Solutions (Variable Elimination & Tabs)", () => {
    it("steps through Variable Elimination in Theory & Guide tab", () => {
      cy.contains("button", "Step VE").click({ force: true });
      cy.contains("Active Factor Pool").should("be.visible");
    });

    it("switches to Theory & Guide and Log panes without Coding Area", () => {
      // 1. Coding Area does not exist
      cy.contains("button", "Coding Area").should("not.exist");

      // 2. Theory & Guide
      cy.contains("button", "Theory & Guide").click({ force: true });
      cy.contains("Belief & Decision Networks").should("be.visible");

      // 3. Log & Output
      cy.contains("button", "Log & Output").click({ force: true });
      cy.contains("Execution Trace").should("be.visible");

      // 4. Return to Animation Area
      cy.contains("button", "Animation Area").click({ force: true });
      cy.contains("Posterior Marginals").should("be.visible");
    });
  });
});
