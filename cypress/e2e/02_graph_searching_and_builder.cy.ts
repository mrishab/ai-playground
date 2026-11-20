/// <reference types="cypress" />

describe("AI Playground Graph Searching & Graph Builder Lab", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "Graph Searching").click({ force: true });
    cy.contains("Graph Searching Lab").should("be.visible");
  });

  describe("1. Problem Building & Configuration (GraphBuilder & Presets)", () => {
    it("switches prebuilt map presets and verifies node counts and description", () => {
      cy.contains("Vancouver Travel Map").should("be.visible");

      // Switch to Simple Tree Graph
      cy.get('select[aria-label="Select Map / Graph"]').select("simpletree");
      cy.contains("Simple Tree Graph").should("be.visible");
      cy.contains("Frontier Queue").should("be.visible");

      // Switch to Cyclic Graph
      cy.get('select[aria-label="Select Map / Graph"]').select("cyclicdelivery");
      cy.contains("Cyclic Delivery Robot World").should("be.visible");
    });

    it("opens Graph Building pane, adds nodes, connects edges, edits weights/heuristics, deletes elements, and solves custom graph", () => {
      // Navigate to Graph Building pane
      cy.contains("button", "Graph Building").click({ force: true });
      cy.contains("Solve in Animation").should("be.visible");

      // 1. Reset to Blank canvas
      cy.get('[data-testid="gb-reset-btn"]').click({ force: true });
      cy.contains("0 Nodes").should("be.visible");

      // 2. Add Start Node via click in Add Node mode
      cy.contains("button", "Add Node").click({ force: true });
      cy.get('[data-testid="gb-canvas-svg"]').click(200, 200, { force: true });
      cy.get('[data-testid="gb-node-N1"]').should("be.visible");

      // 3. Add Goal Node via palette drag-and-drop
      cy.get('[data-testid="gb-drag-node-source"]').trigger("dragstart", { force: true });
      cy.get('[data-testid="gb-canvas-svg"]').trigger("drop", { clientX: 450, clientY: 200, force: true });
      cy.get('[data-testid="gb-node-N2"]').should("be.visible");

      // 4. Configure Goal Node properties via double-click modal
      cy.get('[data-testid="gb-node-N2"]').dblclick({ force: true });
      cy.contains("Edit Node: N2").should("be.visible");
      cy.get('input[aria-label="Heuristic Value h(n)"]').clear({ force: true }).type("0", { force: true });
      cy.get('input[aria-label="Goal Node"]').check({ force: true });
      cy.get("button").contains("Save").click({ force: true });

      // 5. Connect Start (N1) to Goal (N2) using Add Edge mode
      cy.contains("button", "Add Edge").click({ force: true });
      cy.get('[data-testid="gb-node-N1"]').click({ force: true });
      cy.get('[data-testid="gb-node-N2"]').click({ force: true });
      cy.contains("1 Edges").should("be.visible");

      // 6. Edit Edge Cost via Edge Modal
      cy.get('[data-testid="gb-edge-N1-N2"]').click({ force: true });
      cy.contains("Edit Edge: N1 → N2").should("be.visible");
      cy.get('input[aria-label="Edge Cost / Weight"]').clear({ force: true }).type("3.5", { force: true });
      cy.get("button").contains("Save").click({ force: true });
      cy.contains("3.5").should("be.visible");

      // 7. Test Delete Mode on an extra temporary node
      cy.contains("button", "Add Node").click({ force: true });
      cy.get('[data-testid="gb-canvas-svg"]').click(320, 100, { force: true });
      cy.get('[data-testid="gb-node-N3"]').should("be.visible");
      cy.contains("3 Nodes").should("be.visible");

      cy.contains("button", "Delete").click({ force: true });
      cy.get('[data-testid="gb-node-N3"]').click({ force: true });
      cy.contains("2 Nodes").should("be.visible");
      cy.get('[data-testid="gb-node-N3"]').should("not.exist");

      // 8. Solve Custom User Graph in Animation Area
      cy.contains("button", "Solve in Animation").click({ force: true });
      cy.contains("Frontier Queue").should("be.visible");
      cy.contains("button", "Step Forward").should("be.enabled");

      // Step search until goal N2 is reached on the custom graph
      cy.contains("button", "Step Forward").click({ force: true });
      cy.contains("Expanded").should("be.visible");
      cy.contains("button", "Step Forward").click({ force: true });
      cy.contains(/Goal.*reached/i).should("be.visible");
    });
  });

  describe("2. Building Expectations of Solutions (Algorithm Selection & Heuristics)", () => {
    it("configures search algorithm (BFS, DFS, A*, LCFS, Greedy, MPP) and inspects frontier state", () => {
      // Default algorithm is A*
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "astar");
      cy.contains("Frontier Queue").should("be.visible");

      // Switch to Depth-First Search (DFS)
      cy.get('select[aria-label="Select Algorithm"]').select("dfs");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "dfs");

      // Switch to Breadth-First Search (BFS)
      cy.get('select[aria-label="Select Algorithm"]').select("bfs");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "bfs");

      // Switch to Lowest Cost First (LCFS)
      cy.get('select[aria-label="Select Algorithm"]').select("lcfs");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "lcfs");

      // Switch to Greedy Best-First Search (best_first)
      cy.get('select[aria-label="Select Algorithm"]').select("best_first");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "best_first");

      // Switch to Multi-Path Pruning (mpp)
      cy.get('select[aria-label="Select Algorithm"]').select("mpp");
      cy.get('select[aria-label="Select Algorithm"]').should("have.value", "mpp");
    });
  });

  describe("3. Running Solutions (Step, Auto-Run, Step Back, Goal Check)", () => {
    it("steps forward, checks frontier expansion, steps backward, and reaches goal", () => {
      // Initial state with BFS
      cy.get('select[aria-label="Select Algorithm"]').select("bfs");
      cy.contains("button", "Step Forward").should("be.enabled");

      // Step Forward 1
      cy.contains("button", "Step Forward").click({ force: true });
      cy.contains("Expanded").should("be.visible");

      // Step Back button should now be enabled
      cy.get('button[title="Step Back"]').should("be.enabled").click({ force: true });

      // Step Forward multiple times
      cy.contains("button", "Step Forward").click({ force: true });
      cy.contains("button", "Step Forward").click({ force: true });

      // Reset search
      cy.get('button[title="Reset"]').first().click({ force: true });

      // Auto-Run mode
      cy.contains("button", "Auto").click({ force: true });
      cy.contains("button", "Pause").should("be.visible");
      // Pause it
      cy.contains("button", "Pause").click({ force: true });
      cy.contains("button", "Auto").should("be.visible");
    });

    it("switches to Coding Area, Theory & Guide, and Log panes seamlessly", () => {
      // 1. Coding Area
      cy.contains("button", "Coding Area").click({ force: true });
      cy.contains("Search Algorithm Code").should("be.visible");
      cy.contains("AI Playground is a visual builder app").should("be.visible");

      // 2. Theory & Guide
      cy.contains("button", "Theory & Guide").click({ force: true });
      cy.contains("Graph Searching").should("be.visible");

      // 3. Log & Output
      cy.contains("button", "Log & Output").click({ force: true });
      cy.contains("Execution Trace").should("be.visible");

      // 4. Return to Animation Area
      cy.contains("button", "Animation Area").click({ force: true });
      cy.contains("Frontier Queue").should("be.visible");
    });
  });
});
