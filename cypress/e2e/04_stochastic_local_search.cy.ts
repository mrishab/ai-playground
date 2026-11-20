/// <reference types="cypress" />

describe("AI Playground Stochastic Local Search (SLS) Lab", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "SLS for CSP").click({ force: true });
    cy.contains("Stochastic Local Search (SLS)").should("be.visible");
  });

  describe("1. Problem Building & Configuration (SLS Problems & Variables)", () => {
    it("switches prebuilt SLS problems and verifies assignment tables and conflicts", () => {
      cy.contains("Total Assignment State").should("be.visible");
      cy.contains("Conflicts").should("be.visible");

      // Switch to Eight Queens
      cy.get('select[aria-label="Select SLS Problem"]').select("eightQueens");
      cy.contains("Eight Queens Problem").should("be.visible");

      // Switch to Map Coloring
      cy.get('select[aria-label="Select SLS Problem"]').select("mapColoring");
      cy.contains("Map Coloring").should("be.visible");
    });
  });

  describe("2. Building Expectations of Solutions (Algorithm & Hyperparameters)", () => {
    it("selects SLS algorithm variants, configures parameters, and steps execution", () => {
      // Default algorithm is min_conflicts
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "min_conflicts");
      cy.contains("button", "Next Step").click({ force: true });
      cy.contains("Conflicts").should("be.visible");

      // Switch to Random Walk and step
      cy.get('select[aria-label="Select Algorithm"]').select("random_walk");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "random_walk");
      cy.contains("Random Walk Prob").should("be.visible");
      cy.contains("button", "Next Step").click({ force: true });
      cy.contains("button", "Next Step").click({ force: true });

      // Switch to Simulated Annealing and step
      cy.get('select[aria-label="Select Algorithm"]').select("annealing");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "annealing");
      cy.contains("Temperature").should("be.visible");
      cy.contains("button", "Next Step").click({ force: true });
      cy.contains("button", "Next Step").click({ force: true });

      // Switch to Tabu Search and step
      cy.get('select[aria-label="Select Algorithm"]').select("tabu");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "tabu");
      cy.contains("Tabu Tenure").should("be.visible");
      cy.contains("button", "Next Step").click({ force: true });
      cy.contains("button", "Next Step").click({ force: true });

      // Switch to Greedy Descent and step
      cy.get('select[aria-label="Select Algorithm"]').select("greedy");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "greedy");
      cy.contains("button", "Next Step").click({ force: true });
      cy.contains("button", "Next Step").click({ force: true });

      // Switch back to min_conflicts
      cy.get('select[aria-label="Select Algorithm"]').select("min_conflicts");
    });
  });

  describe("3. Running Solutions (Next Step, Auto-Run, Random Restart)", () => {
    it("steps SLS algorithm, observes conflict updates, tests auto-run and reset", () => {
      // 1. Initial problem state has conflicts > 0 and 0 steps
      cy.contains("Total Assignment State").should("be.visible");
      cy.contains(/Step:\s*0/).should("be.visible");

      // 2. Auto Search & Pause test
      cy.contains("button", "Auto Search").click({ force: true });
      cy.contains("button", "Pause").should("be.visible");
      cy.contains("button", "Pause").click({ force: true });
      cy.contains("button", "Auto Search").should("be.visible");

      // 3. Step SLS
      cy.contains("button", "Next Step").click({ force: true });
      cy.contains("Conflicts").should("be.visible");

      // 4. Random Restart resets steps to 0
      cy.contains("button", "Random Restart").click({ force: true });
      cy.contains(/Step:\s*0/).should("be.visible");

      // 5. Run Batch 50 Trials and verify statistics
      cy.contains("button", "Batch 50 Trials").click({ force: true });
      cy.contains(/Batch Run Statistics.*50 Trials/i).should("be.visible");
      cy.contains("Success Rate:").should("be.visible");
      cy.contains("Average Steps to Solve:").should("be.visible");
    });

    it("switches to Theory & Guide and Log panes without Coding Area", () => {
      // 1. Coding Area does not exist
      cy.contains("button", "Coding Area").should("not.exist");

      // 2. Theory & Guide
      cy.contains("button", "Theory & Guide").click({ force: true });
      cy.contains("Stochastic Local Search").should("be.visible");

      // 3. Log & Output
      cy.contains("button", "Log & Output").click({ force: true });
      cy.contains("Execution Trace").should("be.visible");

      // 4. Return to Animation Area
      cy.contains("button", "Animation Area").click({ force: true });
      cy.contains("Total Assignment State").should("be.visible");
    });
  });
});
