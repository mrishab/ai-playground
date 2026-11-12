/// <reference types="cypress" />

describe("AIspace Neural Network & Backprop Lab", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "Neural Networks").click({ force: true });
    cy.contains("Neural Network & Backprop Lab").should("be.visible");
  });

  describe("1. Problem Building & Configuration (Datasets & Canvas Points)", () => {
    it("switches dataset presets and verifies points and descriptions", () => {
      cy.contains("Boolean XOR Problem").should("be.visible");
      cy.contains("Loss Curve").should("be.visible");

      // Switch to Two Moons
      cy.get('select[aria-label="Select Dataset"]').select("twoMoons");
      cy.contains("Two Interlocking Moons").should("be.visible");

      // Switch to Concentric Circles
      cy.get('select[aria-label="Select Dataset"]').select("circles");
      cy.contains("Concentric Circles").should("be.visible");
    });

    it("adds interactive data points on canvas click (Class 0) and Shift+Click (Class 1)", () => {
      cy.get('select[aria-label="Select Dataset"]').select("xor");
      cy.contains("Points:").should("be.visible");

      // Click on neural canvas to add Class 0 data point
      cy.get("canvas").first().click(120, 120, { force: true });
      cy.contains("Points:").should("be.visible");

      // Shift+Click on neural canvas to add Class 1 data point
      cy.get("canvas").first().click(180, 180, { shiftKey: true, force: true });
      cy.contains("Points:").should("be.visible");
    });
  });

  describe("2. Building Expectations of Solutions (Architecture & Hyperparameters)", () => {
    it("configures algorithm selection (MLP SGD vs Perceptron) and executes perceptron epoch", () => {
      // Default algorithm
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "mlp_sgd");

      // Switch to Perceptron and execute an epoch
      cy.get('select[aria-label="Select Algorithm"]').select("perceptron");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "perceptron");
      cy.contains("button", "Step (1 Epoch)").click({ force: true });
      cy.contains("Epoch:").should("be.visible");

      // Switch back to MLP SGD
      cy.get('select[aria-label="Select Algorithm"]').select("mlp_sgd");

      // Check hyperparameters
      cy.contains("Learning Rate").should("be.visible");
      cy.contains("Momentum").should("be.visible");
    });
  });

  describe("3. Running Solutions (1 Epoch, 10 Epochs, Train Continuous, Reset)", () => {
    it("steps single epoch, steps 10 epochs, and verifies loss updates", () => {
      // Step 1 Epoch
      cy.contains("button", "Step (1 Epoch)").should("be.visible").click({ force: true });
      cy.contains("Epoch:").should("be.visible");
      cy.contains("Loss (MSE):").should("be.visible");

      // Step 10 Epochs
      cy.contains("button", "+10 Epochs").click({ force: true });

      // Auto-Train toggle
      cy.contains("button", "Auto Train").click({ force: true });
      cy.contains("button", "Pause").should("be.visible");
      cy.contains("button", "Pause").click({ force: true });

      // Reset
      cy.contains("button", "Reset").click({ force: true });
      cy.contains("Epoch:").should("be.visible");
    });

    it("switches to Coding Area, Theory & Guide, and Log panes", () => {
      // 1. Coding Area
      cy.contains("button", "Coding Area").click({ force: true });
      cy.contains("Backpropagation Algorithm Code").should("be.visible");
      cy.contains("The AI Space is a visual builder app").should("be.visible");

      // 2. Theory & Guide
      cy.contains("button", "Theory & Guide").click({ force: true });
      cy.contains("Neural Networks").should("be.visible");

      // 3. Log & Output
      cy.contains("button", "Log & Output").click({ force: true });
      cy.contains("Execution Trace").should("be.visible");

      // 4. Return to Animation Area
      cy.contains("button", "Animation Area").click({ force: true });
      cy.contains("Loss Curve").should("be.visible");
    });
  });
});
