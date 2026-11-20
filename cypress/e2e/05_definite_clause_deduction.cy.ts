/// <reference types="cypress" />

describe("AI Playground Definite Clause Deduction Lab", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "Definite Clause Deduction").click({ force: true });
    cy.contains("Definite Clause Deduction").should("be.visible");
  });

  describe("1. Problem Building & Configuration (Knowledge Base & Queries)", () => {
    it("switches knowledge base presets and verifies clauses and sample queries", () => {
      cy.contains("Electrical Wiring Environment").should("be.visible");
      cy.contains("SLD Proof Search Tree").should("be.visible");

      // Switch to Family Relationships
      cy.get('select[aria-label="Select Knowledge Base"]').select("family");
      cy.contains("Family Relationships & Kinship").should("be.visible");
      cy.contains("grandparent(tom, ann)").should("be.visible");

      // Switch to Courses Prerequisite
      cy.get('select[aria-label="Select Knowledge Base"]').select("courses");
      cy.contains("University Course Prerequisites").should("be.visible");
    });

    it("selects sample query pills and updates query input field", () => {
      cy.get('select[aria-label="Select Knowledge Base"]').select("elect");
      cy.contains("button", "live(w0)").click({ force: true });
      cy.get('input[aria-label="Query input"]').should("have.value", "live(w0)");
    });
  });

  describe("2. Building Expectations of Solutions (Algorithm Selection & SLD Tree)", () => {
    it("configures algorithm selection (SLD Resolution vs Bottom-Up Chaining)", () => {
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "sld");

      cy.get('select[aria-label="Select Algorithm"]').select("bottom_up");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "bottom_up");

      cy.get('select[aria-label="Select Algorithm"]').select("sld");
    });
  });

  describe("3. Running Solutions (Prove Query, Advance Steps, Step Back)", () => {
    it("runs complete proof using Prove Query and verifies success", () => {
      cy.contains("button", "Prove Query").should("be.enabled").click({ force: true });
      cy.contains("Query proven!").should("be.visible");
    });

    it("executes custom query input and verifies successful proof as well as query failure", () => {
      // 1. Enter custom provable query: ok(l1)
      cy.get('input[aria-label="Query input"]').clear({ force: true }).type("ok(l1)", { force: true });
      cy.contains("button", "Prove Query").click({ force: true });
      cy.contains("Query proven!").should("be.visible");

      // 2. Enter unprovable query
      cy.get('input[aria-label="Query input"]').clear({ force: true }).type("unknown_goal(xyz)", { force: true });
      cy.contains("button", "Prove Query").click({ force: true });
      cy.contains(/Query failed/i).should("be.visible");
    });

    it("steps forward through SLD resolution steps, steps back, and observes derivation", () => {
      // Step Forward (Advance)
      cy.contains("button", "Advance").click({ force: true });
      cy.contains("Selected query goal").should("be.visible");

      // Step Forward again
      cy.contains("button", "Advance").click({ force: true });

      // Step Back
      cy.get('button[title="Step Back"]').first().click({ force: true });
    });

    it("switches to Theory & Guide and Log panes without Coding Area", () => {
      // 1. Coding Area does not exist
      cy.contains("button", "Coding Area").should("not.exist");

      // 2. Theory & Guide
      cy.contains("button", "Theory & Guide").click({ force: true });
      cy.contains("Definite Clause Deduction").should("be.visible");

      // 3. Log & Output
      cy.contains("button", "Log & Output").click({ force: true });
      cy.contains("Execution Trace").should("be.visible");

      // 4. Return to Animation Area
      cy.contains("button", "Animation Area").click({ force: true });
      cy.contains("SLD Proof Search Tree").should("be.visible");
    });
  });
});
