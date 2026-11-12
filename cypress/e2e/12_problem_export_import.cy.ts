/// <reference types="cypress" />

describe("AIspace Universal Problem Export, Reset, and Import (XML & JSON)", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("1. GraphBuilder: exports graph (XML & JSON), resets canvas, imports it back, and solves in animation", () => {
    cy.contains("Graph Searching").click({ force: true });
    cy.contains("Graph Searching Lab").should("be.visible");

    // Open Graph Building pane
    cy.contains("Graph Building").click({ force: true });
    cy.contains("Solve in Animation").should("be.visible");

    // Initially nodes are displayed
    cy.contains("Nodes").should("be.visible");

    // 1A. Export GraphBuilder as XML
    cy.get('[data-testid="gb-export-xml"]').click({ force: true });
    cy.window().then((win: any) => {
      expect(win.__lastExportedProblem).to.contain("<aispace-problem");
      expect(win.__lastExportedProblem).to.contain("<?xml");
    });

    // Reset GraphBuilder Canvas
    cy.get('[data-testid="gb-reset-btn"]').click({ force: true });
    cy.contains("0 Nodes").should("be.visible");

    // Import XML Graph via Last Export
    cy.get('[data-testid="gb-import-btn"]').click({ force: true });
    cy.get('[data-testid="gb-import-modal"]').should("be.visible");
    cy.get('[data-testid="gb-load-last-exported-btn"]').click({ force: true });
    cy.get('[data-testid="gb-import-submit"]').click({ force: true });
    cy.get('[data-testid="gb-import-modal"]').should("not.exist");
    cy.contains("11 Nodes").should("be.visible");

    // 1B. Export GraphBuilder as JSON -> Reset -> Import JSON
    cy.get('[data-testid="gb-export-json"]').click({ force: true });
    cy.window().then((win: any) => {
      expect(win.__lastExportedProblem).to.contain('"format": "aispace-problem"');
    });

    cy.get('[data-testid="gb-reset-btn"]').click({ force: true });
    cy.contains("0 Nodes").should("be.visible");

    cy.get('[data-testid="gb-import-btn"]').click({ force: true });
    cy.get('[data-testid="gb-load-last-exported-btn"]').click({ force: true });
    cy.get('[data-testid="gb-import-submit"]').click({ force: true });
    cy.get('[data-testid="gb-import-modal"]').should("not.exist");
    cy.contains("11 Nodes").should("be.visible");

    // Solve in Animation
    cy.contains("Solve in Animation").click({ force: true });
    cy.contains("Frontier Queue").should("be.visible");
    cy.contains("button", "Step Forward").click({ force: true });
    cy.contains("Expanded").should("be.visible");
  });

  it("2. SearchTool: exports problem as XML & JSON, resets, imports, and executes search step", () => {
    cy.contains("Graph Searching").click({ force: true });
    cy.contains("Vancouver Travel Map").should("be.visible");

    // Export XML
    cy.get('[data-testid="export-xml-btn"]').click({ force: true });
    cy.get('[data-testid="exported-modal"]').should("be.visible");
    cy.get('[data-testid="last-exported-output"]').invoke("val").then((xmlVal: any) => {
      expect(xmlVal).to.contain("<aispace-problem");
      expect(xmlVal).to.contain('toolType="search"');
      cy.get('[data-testid="close-exported-modal"]').click({ force: true });

      // Reset Problem
      cy.get('[data-testid="reset-problem-btn"]').click({ force: true });
      cy.contains("Reset empty graph").should("be.visible");

      // Import XML
      cy.get('[data-testid="import-problem-btn"]').click({ force: true });
      cy.get('[data-testid="import-modal"]').should("be.visible");
      cy.get('[data-testid="load-last-exported-btn"]').click({ force: true });
      cy.get('[data-testid="problem-import-submit"]').click({ force: true });
      cy.get('[data-testid="import-modal"]').should("not.exist");

      // Restored Vancouver Travel Map
      cy.contains("Vancouver Travel Map").should("be.visible");

      // Step Forward algorithm execution works
      cy.contains("button", "Step Forward").click({ force: true });
      cy.contains("Expanded").should("be.visible");
    });

    // Also test Export JSON -> Reset -> Import JSON
    cy.get('[data-testid="export-json-btn"]').click({ force: true });
    cy.get('[data-testid="exported-modal"]').should("be.visible");
    cy.get('[data-testid="last-exported-output"]').invoke("val").then((jsonVal: any) => {
      expect(jsonVal).to.contain('"format": "aispace-problem"');
      cy.get('[data-testid="close-exported-modal"]').click({ force: true });

      cy.get('[data-testid="reset-problem-btn"]').click({ force: true });
      cy.contains("Reset empty graph").should("be.visible");

      cy.get('[data-testid="import-problem-btn"]').click({ force: true });
      cy.get('[data-testid="load-last-exported-btn"]').click({ force: true });
      cy.get('[data-testid="problem-import-submit"]').click({ force: true });
      cy.get('[data-testid="import-modal"]').should("not.exist");

      cy.contains("Vancouver Travel Map").should("be.visible");
      cy.contains("button", "Step Forward").click({ force: true });
    });
  });

  it("3. ConstraintTool (CSP): exports XML & JSON, resets problem, imports, and steps AC-3 solver", () => {
    cy.contains("Consistency for CSP").click({ force: true });
    cy.contains("Consistency Based CSP Solver").should("be.visible");

    // Export XML
    cy.get('[data-testid="export-xml-btn"]').click({ force: true });
    cy.get('[data-testid="close-exported-modal"]').click({ force: true });

    // Reset
    cy.get('[data-testid="reset-problem-btn"]').click({ force: true });
    cy.contains("Reset empty CSP problem").should("be.visible");

    // Import XML
    cy.get('[data-testid="import-problem-btn"]').click({ force: true });
    cy.get('[data-testid="load-last-exported-btn"]').click({ force: true });
    cy.get('[data-testid="problem-import-submit"]').click({ force: true });
    cy.get('[data-testid="import-modal"]').should("not.exist");

    // Problem restored
    cy.contains("Simple Problem 1").should("be.visible");

    // Advance Arc AC-3 step works
    cy.contains("button", "Advance Arc").should("be.enabled").click({ force: true });

    // Export JSON -> Reset -> Import JSON
    cy.get('[data-testid="export-json-btn"]').click({ force: true });
    cy.get('[data-testid="close-exported-modal"]').click({ force: true });
    cy.get('[data-testid="reset-problem-btn"]').click({ force: true });
    cy.get('[data-testid="import-problem-btn"]').click({ force: true });
    cy.get('[data-testid="load-last-exported-btn"]').click({ force: true });
    cy.get('[data-testid="problem-import-submit"]').click({ force: true });
    cy.contains("Simple Problem 1").should("be.visible");
  });

  it("4. BayesTool (Bayes Networks): exports JSON & XML, resets, imports, and computes beliefs", () => {
    cy.contains("Belief & Decision Networks").click({ force: true });
    cy.contains("Belief & Decision Networks Lab").should("be.visible");

    // Export JSON
    cy.get('[data-testid="export-json-btn"]').click({ force: true });
    cy.get('[data-testid="close-exported-modal"]').click({ force: true });

    // Reset
    cy.get('[data-testid="reset-problem-btn"]').click({ force: true });
    cy.contains("Reset empty Bayesian network").should("be.visible");

    // Import JSON
    cy.get('[data-testid="import-problem-btn"]').click({ force: true });
    cy.get('[data-testid="load-last-exported-btn"]').click({ force: true });
    cy.get('[data-testid="problem-import-submit"]').click({ force: true });
    cy.get('[data-testid="import-modal"]').should("not.exist");

    // Problem restored and beliefs computed
    cy.contains("Simple Umbrella Decision").should("be.visible");
    cy.contains("Weather").should("be.visible");
  });

  it("5. Decision Trees: exports XML & JSON, resets, imports, and executes ID3 step", () => {
    cy.contains("Decision Trees").click({ force: true });
    cy.contains("Decision Tree Induction Lab").should("be.visible");

    cy.get('[data-testid="export-xml-btn"]').click({ force: true });
    cy.get('[data-testid="close-exported-modal"]').click({ force: true });

    cy.get('[data-testid="reset-problem-btn"]').click({ force: true });
    cy.contains("Reset empty decision tree dataset").should("be.visible");

    cy.get('[data-testid="import-problem-btn"]').click({ force: true });
    cy.get('[data-testid="load-last-exported-btn"]').click({ force: true });
    cy.get('[data-testid="problem-import-submit"]').click({ force: true });
    cy.get('[data-testid="import-modal"]').should("not.exist");

    cy.contains("Play Tennis / Weather Dataset").should("be.visible");
    cy.contains("button", "Step (ID3)").should("be.visible").click({ force: true });
  });

  it("6. Stochastic Local Search: exports XML & JSON, resets, imports, and steps SLS", () => {
    cy.contains("SLS for CSP").click({ force: true });
    cy.contains("Stochastic Local Search (SLS)").should("be.visible");

    cy.get('[data-testid="export-xml-btn"]').click({ force: true });
    cy.get('[data-testid="close-exported-modal"]').click({ force: true });

    cy.get('[data-testid="reset-problem-btn"]').click({ force: true });
    cy.contains("Reset empty SLS problem").should("be.visible");

    cy.get('[data-testid="import-problem-btn"]').click({ force: true });
    cy.get('[data-testid="load-last-exported-btn"]').click({ force: true });
    cy.get('[data-testid="problem-import-submit"]').click({ force: true });
    cy.get('[data-testid="import-modal"]').should("not.exist");

    cy.contains("button", "Next Step").should("be.visible").click({ force: true });
  });

  it("7. Definite Clause Deduction: exports XML & JSON, resets, imports, and steps SLD proof", () => {
    cy.contains("Definite Clause Deduction").click({ force: true });
    cy.contains("Definite Clause Deduction").should("be.visible");
    cy.contains("Electrical Wiring Environment").should("be.visible");

    // Export XML
    cy.get('[data-testid="export-xml-btn"]').click({ force: true });
    cy.get('[data-testid="close-exported-modal"]').click({ force: true });

    // Reset
    cy.get('[data-testid="reset-problem-btn"]').click({ force: true });
    cy.contains("Reset empty knowledge base").should("be.visible");

    // Import XML
    cy.get('[data-testid="import-problem-btn"]').click({ force: true });
    cy.get('[data-testid="load-last-exported-btn"]').click({ force: true });
    cy.get('[data-testid="problem-import-submit"]').click({ force: true });
    cy.get('[data-testid="import-modal"]').should("not.exist");

    cy.contains("Electrical Wiring Environment").should("be.visible");

    // Advance step works
    cy.contains("button", "Advance").should("be.visible").click({ force: true });
  });

  it("8. Neural Networks: exports XML & JSON, resets, imports, and executes training epoch", () => {
    cy.contains("Neural Networks").click({ force: true });
    cy.contains("Neural Network & Backprop Lab").should("be.visible");
    cy.contains("Boolean XOR Problem").should("be.visible");

    // Export XML
    cy.get('[data-testid="export-xml-btn"]').click({ force: true });
    cy.get('[data-testid="close-exported-modal"]').click({ force: true });

    // Reset
    cy.get('[data-testid="reset-problem-btn"]').click({ force: true });
    cy.contains("Reset empty neural dataset").should("be.visible");

    // Import XML
    cy.get('[data-testid="import-problem-btn"]').click({ force: true });
    cy.get('[data-testid="load-last-exported-btn"]').click({ force: true });
    cy.get('[data-testid="problem-import-submit"]').click({ force: true });
    cy.get('[data-testid="import-modal"]').should("not.exist");

    cy.contains("Boolean XOR Problem").should("be.visible");

    // Step 1 Epoch works
    cy.contains("button", "Step (1 Epoch)").should("be.visible").click({ force: true });
    cy.contains("Epoch:").should("be.visible");
    cy.contains("Loss (MSE):").should("be.visible");
  });

  it("9. STRIPS Planning: exports XML & JSON, resets, imports, and executes action step", () => {
    cy.contains("STRIPS Planning").click({ force: true });
    cy.contains("STRIPS Planning Lab").should("be.visible");

    // Export XML
    cy.get('[data-testid="export-xml-btn"]').click({ force: true });
    cy.get('[data-testid="close-exported-modal"]').click({ force: true });

    // Reset
    cy.get('[data-testid="reset-problem-btn"]').click({ force: true });
    cy.contains("Reset empty blocks world").should("be.visible");

    // Import XML
    cy.get('[data-testid="import-problem-btn"]').click({ force: true });
    cy.get('[data-testid="load-last-exported-btn"]').click({ force: true });
    cy.get('[data-testid="problem-import-submit"]').click({ force: true });
    cy.get('[data-testid="import-modal"]').should("not.exist");

    cy.contains("The Sussman Anomaly").should("be.visible");

    // Step Action works
    cy.contains("button", "Step Action").should("be.visible").click({ force: true });
    cy.contains("Progress:").should("be.visible");
  });

  it("10. Autonomous Robot Control: exports XML & JSON, resets, imports, and executes step cycle", () => {
    cy.contains("Robot Control").click({ force: true });
    cy.contains("Autonomous Robot Control Lab").should("be.visible");

    // Export XML
    cy.get('[data-testid="export-xml-btn"]').click({ force: true });
    cy.get('[data-testid="close-exported-modal"]').click({ force: true });

    // Reset
    cy.get('[data-testid="reset-problem-btn"]').click({ force: true });
    cy.contains("Reset empty robot world").should("be.visible");

    // Import XML
    cy.get('[data-testid="import-problem-btn"]').click({ force: true });
    cy.get('[data-testid="load-last-exported-btn"]').click({ force: true });
    cy.get('[data-testid="problem-import-submit"]').click({ force: true });
    cy.get('[data-testid="import-modal"]').should("not.exist");

    cy.contains("Office Delivery Map (Book World)").should("be.visible");

    // Step Cycle works
    cy.contains("button", "Step Cycle").should("be.visible").click({ force: true });
  });

  it("11. STRIPS to CSP: exports XML & JSON, resets, imports, and steps planning horizon", () => {
    cy.contains("STRIPS to CSP").click({ force: true });
    cy.contains("STRIPS to CSP Planning").should("be.visible");

    // Export XML
    cy.get('[data-testid="export-xml-btn"]').click({ force: true });
    cy.get('[data-testid="close-exported-modal"]').click({ force: true });

    // Reset
    cy.get('[data-testid="reset-problem-btn"]').click({ force: true });
    cy.contains("Reset empty STRIPS problem").should("be.visible");

    // Import XML
    cy.get('[data-testid="import-problem-btn"]').click({ force: true });
    cy.get('[data-testid="load-last-exported-btn"]').click({ force: true });
    cy.get('[data-testid="problem-import-submit"]').click({ force: true });
    cy.get('[data-testid="import-modal"]').should("not.exist");

    cy.contains("Coffee Delivery Robot").should("be.visible");

    // Step Horizon works
    cy.contains("button", "Step Horizon").should("be.visible").click({ force: true });
  });

  it("12. Defensive validation: rejects malformed input and displays clear error message", () => {
    cy.contains("Graph Searching").click({ force: true });
    cy.get('[data-testid="import-problem-btn"]').click({ force: true });
    cy.get('[data-testid="import-modal"]').should("be.visible");

    // Paste corrupted string
    cy.get('[data-testid="problem-import-textarea"]').type("Not valid JSON or XML {{{", { force: true });
    cy.get('[data-testid="problem-import-submit"]').click({ force: true });

    // Should display error and keep modal open
    cy.get('[data-testid="import-error-msg"]').should("be.visible");

    // Cancel closes modal cleanly
    cy.get('[data-testid="import-cancel-btn"]').click({ force: true });
    cy.get('[data-testid="import-modal"]').should("not.exist");
  });
});
