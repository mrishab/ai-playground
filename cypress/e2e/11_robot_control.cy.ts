/// <reference types="cypress" />

describe("AI Playground Autonomous Robot Control Lab", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "Robot Control").click({ force: true });
    cy.contains("Autonomous Robot Control Lab").should("be.visible");
  });

  describe("1. Problem Building & Configuration (Worlds & Sensor Whiskers)", () => {
    it("switches world presets and verifies locations and telemetry", () => {
      cy.contains("Office Delivery Map (Book World)").should("be.visible");
      cy.contains("Sensor Telemetry").should("be.visible");
      cy.contains("High Controller Plan").should("be.visible");

      // Switch to Trap Maze Environment
      cy.get('select[aria-label="Select Robot World"]').select("trapMaze");
      cy.contains("U-Shaped Trap World").should("be.visible");

      // Switch to Industrial Warehouse
      cy.get('select[aria-label="Select Robot World"]').select("warehouse");
      cy.contains("Warehouse Obstacle Course").should("be.visible");
    });
  });

  describe("2. Building Expectations of Solutions (Controller & Telemetry)", () => {
    it("configures algorithm controller and inspects initial pose", () => {
      // Default algorithm
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "sense_plan_act");

      // Switch to Wall Following and execute step cycle
      cy.get('select[aria-label="Select Algorithm"]').select("wall_following");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "wall_following");
      cy.contains("button", "Step Cycle").click({ force: true });
      cy.contains("Left Whisker:").should("be.visible");

      // Switch back to Sense-Plan-Act
      cy.get('select[aria-label="Select Algorithm"]').select("sense_plan_act");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "sense_plan_act");
    });
  });

  describe("3. Running Solutions (Step Cycle, Auto-Run, Reset)", () => {
    it("steps simulation cycle, advances plan waypoints, and resets to start pose", () => {
      cy.get('select[aria-label="Select Robot World"]').select("bookWorld");

      // Step Cycle 1
      cy.contains("button", "Step Cycle").should("be.visible").click({ force: true });
      cy.contains("Plan Steps").should("be.visible");

      // Step Cycle 2
      cy.contains("button", "Step Cycle").click({ force: true });

      // Auto-Run toggle
      cy.contains("button", "Run Robot").click({ force: true });
      cy.contains("button", "Pause").should("be.visible");
      cy.contains("button", "Pause").click({ force: true });

      // Reset
      cy.contains("button", "Reset").click({ force: true });
      cy.contains("Plan Steps").should("be.visible");
    });

    it("switches to Theory & Guide and Log panes without Coding Area", () => {
      // 1. Coding Area does not exist
      cy.contains("button", "Coding Area").should("not.exist");

      // 2. Theory & Guide
      cy.contains("button", "Theory & Guide").click({ force: true });
      cy.contains("Autonomous Robot Control").should("be.visible");

      // 3. Log & Output
      cy.contains("button", "Log & Output").click({ force: true });
      cy.contains("Execution Trace").should("be.visible");

      // 4. Return to Animation Area
      cy.contains("button", "Animation Area").click({ force: true });
      cy.contains("Sensor Telemetry").should("be.visible");
    });
  });
});
