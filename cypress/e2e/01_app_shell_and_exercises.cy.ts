/// <reference types="cypress" />

describe("AI Playground App Shell, Theme, Navigation, Overview, and Exercises", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("1. Shell and Global Controls", () => {
    it("renders brand, toggles dark/light theme, and verifies class changes", () => {
      // Navbar brand check
      cy.contains("AI Playground").should("be.visible");
      cy.contains("Interactive AI Algorithm Lab").should("be.visible");

      // Verify initial dark mode class on root container
      cy.get("div.min-h-screen").should("have.class", "dark");

      // Toggle to Light theme
      cy.get('button[aria-label="Switch to light theme"]').click({ force: true });
      cy.get("div.min-h-screen").should("not.have.class", "dark");

      // Toggle back to Dark theme
      cy.get('button[aria-label="Switch to dark theme"]').click({ force: true });
      cy.get("div.min-h-screen").should("have.class", "dark");
    });

    it("opens and interacts with Command Palette via button and shortcut", () => {
      // Open command palette via search input button in navbar
      cy.contains("Search algorithms, tools, exercises...").click({ force: true });
      cy.get('input[aria-label="Search tools and exercises"]').should("be.visible");

      // Filter by query 'Graph'
      cy.get('input[aria-label="Search tools and exercises"]').type("Graph", { force: true });
      cy.get('[role="listbox"]').contains("Graph Searching").should("be.visible");

      // Click the search result inside the modal listbox
      cy.get('[role="listbox"]').contains("Graph Searching").click({ force: true });
      cy.contains("Graph Searching Lab").should("be.visible");

      // Return to overview via brand click
      cy.contains("AI Playground").click({ force: true });
      cy.contains("Interactive Artificial Intelligence").should("be.visible");

      // Open command palette via Ctrl+K keyboard shortcut
      cy.window().then((win) => {
        win.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }));
      });
      cy.get('input[aria-label="Search tools and exercises"]').should("be.visible");
      cy.get('input[aria-label="Search tools and exercises"]').type("Deduction", { force: true });
      cy.get('[role="listbox"]').contains("Definite Clause Deduction").click({ force: true });
      cy.contains("Electrical Wiring Environment").should("be.visible");
    });

    it("navigates across categories using the Sidebar", () => {
      // Sidebar should display all main categories
      cy.contains("General").should("be.visible");
      cy.contains("Main Tools").should("be.visible");
      cy.contains("Prototype Tools").should("be.visible");

      // Navigate to Consistency for CSP
      cy.contains("button", "Consistency for CSP").click({ force: true });
      cy.contains("Consistency Based CSP Solver").should("be.visible");

      // Navigate to Belief & Decision Networks
      cy.contains("button", "Belief & Decision Networks").click({ force: true });
      cy.contains("Belief & Decision Networks Lab").should("be.visible");

      // Navigate to Robot Control
      cy.contains("button", "Robot Control").click({ force: true });
      cy.contains("Autonomous Robot Control Lab").should("be.visible");

      // Navigate back to Studio Overview
      cy.contains("button", "Studio Overview").click({ force: true });
      cy.contains("Interactive Artificial Intelligence").should("be.visible");
    });
  });

  describe("2. Overview Page Functionality", () => {
    it("displays all 10 tools in the interactive modules grid and launches them", () => {
      cy.contains("Interactive AI Modules").should("be.visible");

      // Verify all tools exist in overview grid
      const tools = [
        "Graph Searching",
        "Consistency for CSP",
        "SLS for CSP",
        "Definite Clause Deduction",
        "Belief & Decision Networks",
        "Decision Trees",
        "Neural Networks",
        "STRIPS to CSP",
        "Robot Control & Simulation",
        "STRIPS Planning (Blocks World)",
      ];

      tools.forEach((toolName) => {
        cy.contains(toolName).should("be.visible");
      });

      // Click on Neural Networks card to launch it
      cy.contains("h3", "Neural Networks").click({ force: true });
      cy.contains("Neural Network & Backprop Lab").should("be.visible");

      // Return to overview
      cy.contains("AI Playground").click({ force: true });

      // Click on Decision Trees card
      cy.contains("h3", "Decision Trees").click({ force: true });
      cy.contains("Decision Tree Induction Lab").should("be.visible");
    });
  });

  describe("3. Exercises View and Interactive Assessment", () => {
    beforeEach(() => {
      cy.contains("button", "Exercises").click({ force: true });
      cy.contains("Practice Exercises & Self-Assessment").should("be.visible");
    });

    it("filters exercises by AI chapters and search query", () => {
      // Filter by Chapter button
      cy.get("main").contains("button", "Graph Searching").click({ force: true });
      cy.contains("Exercise 3.A").should("be.visible");

      // Reset to All
      cy.contains("button", "All").click({ force: true });

      // Search input filter
      cy.get('input[aria-label="Search exercises"]').type("Neural", { force: true });
      cy.contains("Neural").should("be.visible");
      cy.contains("Exercise 2.A").should("not.exist");

      // Empty query shows empty state message
      cy.get('input[aria-label="Search exercises"]').clear({ force: true }).type("NonExistentQueryXYZ", { force: true });
      cy.contains("No exercises match your query").should("be.visible");
    });

    it("reveals hints and textbook solutions on directed questions", () => {
      cy.get('input[aria-label="Search exercises"]').clear({ force: true });
      cy.contains("button", "All").click({ force: true });

      // Check first exercise question
      cy.contains("Directed Assessment Questions").should("be.visible");

      // Toggle hint
      cy.contains("button", "View Hint").first().click({ force: true });
      cy.contains("Hint:").should("be.visible");
      cy.contains("button", "Hide Hint").first().click({ force: true });
      cy.contains("Hint:").should("not.exist");

      // Toggle solution
      cy.contains("button", "Reveal Solution").first().click({ force: true });
      cy.contains("Official Textbook Solution:").should("be.visible");
      cy.contains("button", "Hide Solution").first().click({ force: true });
      cy.contains("Official Textbook Solution:").should("not.exist");
    });

    it("interacts with embedded step runner and launches interactive tool", () => {
      cy.get('input[aria-label="Search exercises"]').clear({ force: true });
      cy.get("main").contains("button", "Graph Searching").click({ force: true });

      // Expand step runner
      cy.contains("Interactive Algorithm Execution:").first().click({ force: true });

      // Check initial step ratio 1/N
      cy.contains("span", /\d+\/\d+/).should("be.visible");

      // Click Step button inside exercise stepper
      cy.contains("button", "Step").first().click({ force: true });

      // Click Execute Logic on a question
      cy.contains("button", "Execute Logic").first().click({ force: true });
      cy.contains("Active in Stepper").should("be.visible");

      // Click "Try in Interactive Tool" button to transfer into full simulator
      cy.contains("button", "Try in Interactive Tool").first().click({ force: true });
      cy.contains("Graph Searching Lab").should("be.visible");
    });
  });
});
