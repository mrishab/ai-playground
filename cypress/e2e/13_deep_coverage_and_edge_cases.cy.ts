/// <reference types="cypress" />

describe("13. AI Playground Deep Code Coverage and Comprehensive Edge Cases", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.window().then((win) => {
      try {
        if (!win.navigator.clipboard) {
          Object.defineProperty(win.navigator, "clipboard", {
            value: { writeText: () => Promise.resolve() },
            configurable: true,
            writable: true,
          });
        } else {
          cy.stub(win.navigator.clipboard, "writeText").resolves();
        }
      } catch {}
    });
  });

  const getTestExports = () => {
    return cy.window().then((win) => {
      return new Cypress.Promise((resolve) => {
        const check = () => {
          if ((win as any).__AI_PLAYGROUND_TEST_EXPORTS__) {
            resolve((win as any).__AI_PLAYGROUND_TEST_EXPORTS__);
          } else {
            setTimeout(check, 50);
          }
        };
        check();
      });
    });
  };

  describe("A. App Shell, Mobile Layout, and Keyboard Navigation", () => {
    it("handles mobile viewport sidebar toggle, backdrop close, and brand keydown", () => {
      // 1. Mobile Viewport sidebar toggle
      cy.viewport(375, 667);
      cy.get('button[aria-label="Toggle sidebar"]').should("be.visible").click({ force: true });
      cy.contains("Main Tools").should("be.visible");

      // Close mobile sidebar via backdrop
      cy.get('button[aria-label="Close sidebar"]').click({ force: true });

      // Reopen and close via toggle
      cy.get('button[aria-label="Toggle sidebar"]').click({ force: true });
      cy.contains("Main Tools").should("be.visible");
      cy.get('button[aria-label="Toggle sidebar"]').click({ force: true });

      // Reset to desktop viewport
      cy.viewport(1440, 900);

      // 2. Brand keydown (Enter and Space)
      cy.contains("AI Playground").trigger("keydown", { key: "Enter", force: true });
      cy.contains("Interactive Artificial Intelligence").should("be.visible");
      cy.contains("AI Playground").trigger("keydown", { key: " ", force: true });
      cy.contains("Interactive Artificial Intelligence").should("be.visible");

      // 3. Command palette exercise selection
      cy.contains("Search algorithms, tools, exercises...").click({ force: true });
      cy.get('input[aria-label="Search tools and exercises"]').type("2.A", { force: true });
      cy.contains("Exercise 2.A").click({ force: true });
      cy.contains("Practice Exercises & Self-Assessment").should("be.visible");
    });
  });

  describe("B. Graph Searching & Graph Builder Deep Features", () => {
    it("interacts with Quiz Mode, Node Inspector, and Search Algorithms", () => {
      cy.contains("button", "Graph Searching").click({ force: true });

      // 1. Toggle Quiz Mode & click nodes
      cy.contains("button", "Quiz Mode").click({ force: true });
      cy.contains("Quiz Mode Active").should("be.visible");
      cy.get("svg text").first().click({ force: true });
      cy.get("svg circle").last().click({ force: true });
      cy.contains("button", "Exit Quiz").click({ force: true });
      cy.contains("Quiz Mode Active").should("not.exist");

      // 2. Inspect node in SVG canvas
      cy.get('div.relative svg[viewBox="0 0 640 420"] g.cursor-pointer').first().click({ force: true });
      cy.contains("Node Inspector:").should("be.visible");
      cy.contains("Outgoing:").should("be.visible");

      // 3. Search toolbar auto-step and pause
      cy.contains("button", "Auto Search").click({ force: true });
      cy.wait(600);
      cy.contains("button", "Pause").click({ force: true });

      // 4. Bottom dock / workspace controls speed slider & View Full Log
      cy.get('input[aria-label="Speed"]').first().invoke("val", 750).trigger("change");
      cy.contains("button", "View Full Log").click({ force: true });
      cy.contains("Execution Trace & Output Log").should("be.visible");
      cy.contains("button", "Animation Area").click({ force: true });

      // 5. Test various search algorithms
      const algorithms = ["bfs", "dfs", "lcfs", "astar", "best_first", "mpp"];
      algorithms.forEach((algo) => {
        cy.get('select[aria-label="Select Algorithm"]').select(algo, { force: true });
        cy.contains("button", "Step Forward").click({ force: true });
      });

      // 6. Select custom graph from prebuilt dropdown
      cy.get('select[aria-label="Select Map / Graph"]').select("__custom_graph__", { force: true });
      cy.contains("Graph Building").should("be.visible");

      // Reset Graph Builder
      cy.get('[data-testid="gb-reset-btn"]').click({ force: true });

      // Add two nodes and connect
      cy.contains("button", "Add Node").click({ force: true });
      cy.get('[data-testid="gb-canvas-svg"]').click(150, 150, { force: true });
      cy.get('[data-testid="gb-canvas-svg"]').click(350, 150, { force: true });

      // Connect nodes
      cy.contains("button", "Add Edge").click({ force: true });
      cy.get('[data-testid="gb-node-N1"]').click({ force: true });
      cy.get('[data-testid="gb-node-N2"]').click({ force: true });

      // Mode: Move node drag
      cy.contains("button", "Move").click({ force: true });
      cy.get('[data-testid="gb-node-N1"]').trigger("mousedown", { which: 1, force: true });
      cy.get('[data-testid="gb-canvas-svg"]').trigger("mousemove", { clientX: 200, clientY: 200, force: true });
      cy.get('[data-testid="gb-canvas-svg"]').trigger("mouseup", { force: true });

      // Mode: Add Node keyboard enter & dragover
      cy.contains("button", "Add Node").click({ force: true });
      cy.get('[data-testid="gb-canvas-svg"]').focus().trigger("keydown", { key: "Enter", force: true });
      cy.get('[data-testid="gb-canvas-svg"]').trigger("dragover", { force: true });

      // Mode: Add Edge rubberband and canvas click cancel
      cy.contains("button", "Add Edge").click({ force: true });
      cy.get('[data-testid="gb-node-N1"]').click({ force: true });
      cy.get('[data-testid="gb-canvas-svg"]').trigger("mousemove", { clientX: 300, clientY: 250, force: true });
      cy.get('[data-testid="gb-canvas-svg"]').click(20, 20, { force: true });

      // Mode: Edit Node modal and delete
      cy.contains("button", "Move").click({ force: true });
      cy.get('[data-testid="gb-node-N1"]').dblclick({ force: true });
      cy.get('#gb-node-name').clear({ force: true }).type("UpdatedN1", { force: true });
      cy.get('input[aria-label="Start Node"]').check({ force: true });
      cy.contains("button", "Delete").click({ force: true });

      // Preset selection in GraphBuilder
      cy.get('select[aria-label="Load Graph Preset"]').select("triangle", { force: true });
      cy.contains("button", "Solve in Animation").click({ force: true });
    });

    it("tests Graph Builder XML/JSON exports, file uploads, and paste last", () => {
      cy.contains("button", "Graph Searching").click({ force: true });
      cy.contains("button", "Graph Building").click({ force: true });

      // 1. Export XML & JSON
      cy.get('[data-testid="gb-export-xml"]').click({ force: true });
      cy.get('[data-testid="gb-export-json"]').click({ force: true });

      // 2. Import modal: verify disabled submit on empty text
      cy.get('[data-testid="gb-import-btn"]').click({ force: true });
      cy.get('[data-testid="gb-import-modal"]').should("be.visible");
      cy.get('[data-testid="gb-import-submit"]').should("be.disabled");

      // 3. File upload into GraphBuilder modal
      const validGraphJson = JSON.stringify({
        format: "ai-playground-problem",
        toolType: "search",
        problem: {
          id: "GX",
          name: "GX",
          description: "GX Graph",
          nodes: [{ id: "GX", name: "GX", x: 120, y: 120, isGoal: true }],
          edges: [],
        },
      });
      cy.get('[data-testid="gb-file-input"]').selectFile(
        { contents: Cypress.Buffer.from(validGraphJson), fileName: "graph.json", mimeType: "application/json" },
        { force: true },
      );
      cy.get('[data-testid="gb-import-textarea"]').should("not.have.value", "");
      cy.get('[data-testid="gb-import-submit"]').click({ force: true });
      cy.get('[data-testid="gb-import-modal"]').should("not.exist");

      // 4. Paste Last Export into GraphBuilder modal
      cy.get('[data-testid="gb-export-json"]').click({ force: true });
      cy.get('[data-testid="gb-import-btn"]').click({ force: true });
      cy.get('[data-testid="gb-load-last-exported-btn"]').click({ force: true });
      cy.get('[data-testid="gb-import-textarea"]').should("not.have.value", "");
      cy.get('[data-testid="gb-import-submit"]').click({ force: true });

      // 5. Import modal: invalid format missing nodes error
      cy.get('[data-testid="gb-import-btn"]').click({ force: true });
      cy.get('[data-testid="gb-import-textarea"]').clear({ force: true }).type('{"id":"bad"}', { force: true, parseSpecialCharSequences: false });
      cy.get('[data-testid="gb-import-submit"]').should("be.enabled").click({ force: true });
      cy.contains("Invalid graph format: missing nodes array").should("be.visible");

      // Cancel import modal
      cy.contains("button", "Cancel").click({ force: true });
      cy.get('[data-testid="gb-import-modal"]').should("not.exist");
    });
  });

  describe("C. CSP & SLS Advanced Solver Paths", () => {
    it("exercises AC-3 arc pruning, MAC MRV search, split controls, and auto AC-3 timer", () => {
      cy.contains("button", "Consistency for CSP").click({ force: true });

      // Select mapColoring first
      cy.get('select[aria-label="Select CSP Problem"]').select("mapColoring", { force: true });

      // Split variable dropdown change
      cy.get('select[aria-label="Select Algorithm"]').select("split", { force: true });
      cy.get('select[aria-label="Select variable to split"]').select("NT", { force: true });
      cy.contains("button", "Domain Split").click({ force: true });
      cy.contains("button", "Backtrack").click({ force: true });

      // Auto Arc Consistency timer
      cy.get('select[aria-label="Select Algorithm"]').select("ac3", { force: true });
      cy.contains("button", "Auto Arc Consistency").click({ force: true });
      cy.wait(600);
      cy.contains("button", "Pause").click({ force: true });

      // Step AC-3 multiple times on Australia map
      cy.contains("button", "Advance Arc").click({ force: true });
      cy.contains("button", "Advance Arc").click({ force: true });

      // Switch to MAC algorithm and step through MRV
      cy.get('select[aria-label="Select Algorithm"]').select("mac", { force: true });
      for (let i = 0; i < 8; i++) {
        cy.get("body").then(($body) => {
          const btn = $body.find('button:contains("Advance Arc"), button:contains("Step MAC")');
          if (btn.length > 0 && !btn.is(":disabled")) {
            cy.wrap(btn.first()).click({ force: true });
          }
        });
      }
    });

    it("exercises SLS random walk, annealing, tabu, greedy descent, auto search timer, and conflict steps", () => {
      cy.contains("button", "SLS for CSP").click({ force: true });

      // Auto Search timer
      cy.contains("button", "Auto Search").click({ force: true });
      cy.wait(350);
      cy.get("body").then(($body) => {
        const pauseBtn = $body.find('button:contains("Pause")');
        if (pauseBtn.length > 0) {
          cy.wrap(pauseBtn.first()).click({ force: true });
        }
      });

      // Greedy Descent
      cy.get('select[aria-label="Select Algorithm"]').select("greedy");
      cy.contains("button", "Next Step").click({ force: true });

      // Random Walk
      cy.get('select[aria-label="Select Algorithm"]').select("random_walk");
      cy.contains("button", "Next Step").click({ force: true });

      // Simulated Annealing
      cy.get('select[aria-label="Select Algorithm"]').select("annealing");
      cy.contains("button", "Next Step").click({ force: true });

      // Tabu Search
      cy.get('select[aria-label="Select Algorithm"]').select("tabu");
      cy.contains("button", "Next Step").click({ force: true });

      // Min Conflicts
      cy.get('select[aria-label="Select Algorithm"]').select("min_conflicts");
      for (let i = 0; i < 8; i++) {
        cy.contains("button", "Next Step").click({ force: true });
      }
    });
  });

  describe("D. Deduction Bottom-Up & Bayes Network VE & D-Separation", () => {
    it("exercises Bottom-Up Chaining and SLD resolution stepper with play/pause, step controls, and editable KB", () => {
      cy.contains("button", "Definite Clause Deduction").click({ force: true });

      // Switch to Bottom-Up Chaining
      cy.get('select[aria-label="Select Algorithm"]').select("bottom_up");
      cy.contains("button", "Advance").click({ force: true });

      // Switch back to SLD
      cy.get('select[aria-label="Select Algorithm"]').select("sld");

      // Step controls inside DeductionQueryCard
      cy.get('button[title="Step"]').first().click({ force: true });
      cy.get('button[title="Step Back"]').first().click({ force: true });
      cy.get('button[title="Auto-run"]').first().click({ force: true });
      cy.wait(600);
      cy.get('button[title="Pause"]').first().click({ force: true });

      // Coding Area is completely removed
      cy.contains("button", "Coding Area").should("not.exist");
    });

    it("exercises Bayes VE stepper to completion, query selector, step back, play/pause, and D-Separation", () => {
      cy.contains("button", "Belief & Decision Networks").click({ force: true });

      // D-Separation with test independence
      cy.get('select[aria-label="Select Algorithm"]').select("dsep");
      cy.get('select[aria-label="Variable A:"]').select("Forecast", { force: true });
      cy.get('select[aria-label="Variable B:"]').select("Weather", { force: true });
      cy.contains("button", "Test Independence").click({ force: true });

      // Select Variable Elimination
      cy.get('select[aria-label="Select Algorithm"]').select("ve");
      cy.get('select[aria-label="Query Variable"]').select("Forecast", { force: true });

      // Step VE until finished
      cy.get('button:has(svg.lucide-step-forward)').first().click({ force: true });
      cy.get('button:has(svg.lucide-step-forward)').first().click({ force: true });
      cy.get('button:has(svg.lucide-step-forward)').first().click({ force: true });
      cy.contains("Exact Posterior Distribution").should("be.visible");

      // Click Step VE when finished to exercise stepForward at end
      cy.get('button:has(svg.lucide-step-forward)').first().click({ force: true });

      // Click Auto-run when finished to exercise togglePlay reset & play at end
      cy.get('button:has(svg.lucide-play)').first().click({ force: true });
      cy.wait(100);
      cy.get('button:has(svg.lucide-pause)').first().click({ force: true });

      // Step back and play toggle
      cy.get('button:has(svg.lucide-rotate-ccw)').first().click({ force: true });
      cy.get('button:has(svg.lucide-play)').first().click({ force: true });
      cy.wait(100);
      cy.get('button:has(svg.lucide-pause)').first().click({ force: true });

      // Switch to Theory & Guide and click How To Use tab
      cy.contains("button", "Theory & Guide").click({ force: true });
      cy.contains("button", "How To Use").click({ force: true });
      cy.contains("1. Select Network").should("be.visible");
      cy.contains("button", "Concepts").click({ force: true });
      cy.contains("button", "Animation Area").click({ force: true });
    });
  });

  describe("E. Planning, Robot, Neural, DTree, Exercises, and STRIPS-to-CSP Steppers", () => {
    it("steps through Planning problems simpleSwap and fiveBlocks until complete", () => {
      cy.contains("button", "STRIPS Planning").click({ force: true });

      cy.get('select[aria-label="Select Blocks World Problem"]').select("simpleSwap");
      for (let i = 0; i < 5; i++) {
        cy.contains("button", "Step Action").click({ force: true });
      }
      // Step once more to trigger completed branch
      cy.contains("button", "Step Action").click({ force: true });

      cy.get('select[aria-label="Select Blocks World Problem"]').select("fiveBlocks");
      cy.contains("button", "Step Action").click({ force: true });
      cy.contains("button", "Step Action").click({ force: true });
    });

    it("exercises Decision Tree ID3 auto-build, step, and split attribute selector", () => {
      cy.contains("button", "Decision Trees").click({ force: true });
      cy.get('select[aria-label="Select Attribute to Split"]').select("Humidity", { force: true });
      cy.contains("button", "Split").click({ force: true });
      cy.contains("button", "Step (ID3)").click({ force: true });
      cy.get('button[title="Auto-split tree"]').click({ force: true });
      cy.get('button[title="Pause auto-split"]').click({ force: true });
    });

    it("exercises Neural Network point manipulation, canvas keydown/contextmenu, and training epochs", () => {
      cy.contains("button", "Neural Networks").click({ force: true });
      cy.get('canvas[aria-label="Neural network visualization canvas"]').focus().trigger("keydown", { key: "Enter", force: true });
      cy.get('canvas[aria-label="Neural network visualization canvas"]').rightclick(150, 150, { force: true });
      cy.contains("button", "Reset").click({ force: true });
      cy.get('[data-testid="reset-problem-btn"]').click({ force: true });
      cy.contains("button", "Step (1 Epoch)").click({ force: true });
      cy.contains("button", "+10 Epochs").click({ force: true });
      cy.contains("button", "Auto Train").click({ force: true });
      cy.contains("button", "Pause").click({ force: true });
    });

    it("exercises Robot Control simulation step and run", () => {
      cy.contains("button", "Robot Control").click({ force: true });
      cy.contains("button", "Step Cycle").click({ force: true });
      cy.contains("button", "Run Robot").click({ force: true });
      cy.contains("button", "Pause").click({ force: true });
    });

    it("exercises STRIPS to CSP play/pause, reset, and solved state", () => {
      cy.contains("button", "STRIPS to CSP").click({ force: true });

      cy.get('button[title="Reset to k=0"]').click({ force: true });
      cy.contains("button", "Step Horizon").click({ force: true });
      cy.contains("button", "Step Horizon").click({ force: true });
      cy.contains("button", "Step Horizon").click({ force: true });
      cy.get('.lucide-play').first().parent().click({ force: true });
    });

    it("exercises Practice Exercises step runner and clear active question", () => {
      cy.contains("button", "Practice Exercises").click({ force: true });
      cy.contains("Exercise 2.A").click({ force: true });
      cy.contains("Interactive Algorithm Execution").click({ force: true });
      cy.get('.lucide-play').first().parent().click({ force: true });
      cy.wait(350);
      cy.get('.lucide-pause, .lucide-play').first().parent().click({ force: true });
      cy.contains("Interactive Algorithm Execution").click({ force: true });
    });
  });

  describe("F. ProblemIO File Upload, Copy, and Validation Edge Cases", () => {
    it("tests file upload, clipboard copy, mismatched toolType, and SyntaxHighlightEditor", () => {
      cy.contains("button", "Graph Searching").click({ force: true });

      // 1. Export modal & clipboard copy
      cy.get('[data-testid="export-json-btn"]').click({ force: true });
      cy.get('[data-testid="copy-exported-btn"]').click({ force: true });
      cy.get('[data-testid="close-exported-modal"]').click({ force: true });

      // 2. File upload in import modal
      cy.get('[data-testid="import-problem-btn"]').click({ force: true });
      const testJson = JSON.stringify({
        format: "ai-playground-problem",
        toolType: "search",
        problem: { id: "customUpload", name: "Uploaded Graph", nodes: [{ id: "A", x: 100, y: 100, h: 0 }], edges: [] },
      });
      cy.get('[data-testid="problem-file-input"]').selectFile(
        { contents: Cypress.Buffer.from(testJson), fileName: "problem.json", mimeType: "application/json" },
        { force: true },
      );
      cy.get('[data-testid="problem-import-textarea"]').should("have.value", testJson);
      cy.get('[data-testid="problem-import-submit"]').click({ force: true });
      cy.get('[data-testid="import-modal"]').should("not.exist");

      // 3. Mismatched toolType rejection
      cy.get('[data-testid="import-problem-btn"]').click({ force: true });
      const mismatchedJson = JSON.stringify({
        format: "ai-playground-problem",
        toolType: "csp",
        problem: { id: "mismatched", name: "CSP Problem" },
      });
      cy.get('[data-testid="problem-import-textarea"]').clear({ force: true }).type(mismatchedJson, { force: true, parseSpecialCharSequences: false });
      cy.get('[data-testid="problem-import-submit"]').click({ force: true });
      cy.contains(/Imported data is for "csp", but this workspace expects a "search" problem/i).should("be.visible");
      cy.get('[data-testid="import-cancel-btn"]').click({ force: true });

      // 4. Log & Output: Copy Trace button and Speed slider
      cy.contains("button", "Log & Output").click({ force: true });
      cy.contains("button", "Copy Trace").click({ force: true });
      cy.contains("button", "Animation Area").click({ force: true });

      // 5. Coding Area is completely removed
      cy.contains("button", "Coding Area").should("not.exist");
    });

    it("verifies problemIO library comprehensive edge cases directly in browser context", () => {
      getTestExports().then((exports: any) => {
        cy.window().then((win) => {
          const problemIO = exports.problemIO;

          // 1. Array and Object XML serialization (empty array, nested array, empty obj, primitive, symbol)
          const xmlArr = problemIO.exportProblemXml({ list: [], items: [1, "two", false, null], nested: { empty: {} } }, "generic");
          expect(xmlArr).to.include('type="array"');

          const xmlSym = problemIO.exportProblemXml({ s: Symbol("symVal") }, "generic");
          expect(xmlSym).to.include("Symbol(symVal)");

          // 2. parseProblemJson variations (without ai-playground format, with problem prop, primitive)
          const parsed1 = problemIO.parseProblemJson('{"problem":{"a":1},"toolType":"search"}');
          expect(parsed1.toolType).to.equal("search");
          expect(parsed1.problem.a).to.equal(1);

          const parsed2 = problemIO.parseProblemJson('{"toolType":"hill","variables":[]}');
          expect(parsed2.toolType).to.equal("hill");

          const parsed3 = problemIO.parseProblemJson("null");
          expect(parsed3.problem).to.be.null;

          // 3. parseProblemXml variations with root tags from ROOT_TAG_TOOL_MAP
          const tags = [
            "search-graph", "bayes-network", "sls", "decision-tree",
            "neural-network", "strips-csp", "knowledge-base",
          ];
          tags.forEach((tag) => {
            const res = problemIO.parseProblemXml(`<${tag}><val>10</val></${tag}>`);
            expect(res.toolType).to.be.a("string");
          });

          // 4. XML with duplicate keys (identical scalars and array expansion)
          const dupKeyXml = `
            <problem toolType="search">
              <val>first</val>
              <val>first</val>
              <val>second</val>
              <val>third</val>
              <node id="N1" tag="val">Some text</node>
              <node2 id="N2"/>
              <nested type="array">
                <item>A</item>
                <item>B</item>
              </nested>
              <typedNull type="null"/>
              <typedBool type="boolean">true</typedBool>
              <typedNum type="number">123.45</typedNum>
              <typedStr type="string">custom string</typedStr>
            </problem>
          `;
          const dupRes = problemIO.parseProblemXml(dupKeyXml);
          expect(Array.isArray(dupRes.problem.val)).to.be.true;
          expect(dupRes.problem.typedNull).to.be.null;
          expect(dupRes.problem.typedBool).to.be.true;
          expect(dupRes.problem.typedNum).to.equal(123.45);
          expect(dupRes.problem.typedStr).to.equal("custom string");
          expect(dupRes.problem.node.value).to.equal("Some text");
          expect(dupRes.problem.node2.id).to.equal("N2");

          // 5. Empty input error and invalid XML error
          let caughtEmpty = false;
          try { problemIO.importProblemAny("   "); } catch { caughtEmpty = true; }
          expect(caughtEmpty).to.be.true;

          let caughtXml = false;
          try { problemIO.parseProblemXml("<invalid>"); } catch { caughtXml = true; }
          expect(caughtXml).to.be.true;

          // 6. triggerFileDownload test environment branch and catch branch
          (win as any).process = { env: { NODE_ENV: "test" } };
          problemIO.triggerFileDownload("hello", "test.txt", "text/plain");
          delete (win as any).process;

          const origCreateObjectURL = win.URL.createObjectURL;
          win.URL.createObjectURL = () => { throw new Error("download error"); };
          problemIO.triggerFileDownload("hello", "test.txt", "text/plain");
          win.URL.createObjectURL = origCreateObjectURL;

          // 7. DOMParser fallback branches
          const origWinDOM = (win as any).DOMParser;
          try {
            // First: test fallback to global DOMParser (line 67-68)
            let checkCount = 0;
            Object.defineProperty(win, "DOMParser", {
              get() {
                checkCount++;
                if (checkCount === 1) return undefined;
                return origWinDOM;
              },
              configurable: true,
            });
            const parsedFallback = problemIO.parseProblemXml("<problem id=\"test\" name=\"Test\"/>");
            expect(parsedFallback.problem.id).to.equal("test");

            // Second: test DOMParser unavailable error (line 70)
            Object.defineProperty(win, "DOMParser", {
              get() { return undefined; },
              configurable: true,
            });
            let caught = false;
            try {
              problemIO.parseProblemXml("<problem/>");
            } catch (err: any) {
              caught = true;
            }
            expect(caught).to.be.true;
          } finally {
            Object.defineProperty(win, "DOMParser", {
              value: origWinDOM,
              writable: true,
              configurable: true,
            });
          }
        });
      });
    });

    it("verifies constraint AC-3 inequality, support table constraints, and MRV edge cases", () => {
      getTestExports().then((exports: any) => {
        const { isInequalitySupported } = exports.ac3Inequality;
        const { filterSupportedValues } = exports.ac3Support;
        const { findMrvVariable, isCspFullySolved, hasAnyWipeout } = exports.ac3MacStep;
        const { executeFineStep } = exports.ac3Engine;

        // 1. ac3Inequality: < with var0 === varX and var1 === varX and !=
        expect(isInequalitySupported("<", "A", "B", "A", "1", "B", { B: ["2", "0"] })).to.be.true;
        expect(isInequalitySupported("<", "A", "B", "B", "1", "A", { A: ["2", "0"] })).to.be.true;
        expect(isInequalitySupported("<", "A", "B", "A", "5", "B", { B: ["2", "0"] })).to.be.false;
        expect(isInequalitySupported("<", "A", "B", "B", "0", "A", { A: ["2", "3"] })).to.be.false;
        expect(isInequalitySupported(">", "A", "B", "A", "1", "B", { B: ["2"] })).to.be.true;

        // 2. ac3Support: table constraint with allowed tuples and missing otherVar
        const cTable = { id: "c1", name: "table", variables: ["A", "B"], allowed: [["red", "blue"], ["green", "blue"]] };
        const resTable = filterSupportedValues(["red", "yellow"], "A", cTable, { A: ["red", "yellow"], B: ["blue"] });
        expect(resTable.remaining).to.deep.equal(["red"]);
        expect(resTable.pruned).to.deep.equal(["yellow"]);

        // varIndex === -1 in allowed constraint
        const resMissingVar = filterSupportedValues(["red"], "C", cTable, { A: ["red"], B: ["blue"] });
        expect(resMissingVar.remaining).to.deep.equal(["red"]);

        // otherVar not in domains
        const cOtherMissing = { id: "c2", name: "!=", variables: ["A", "Z"], allowed: [] };
        const resOther = filterSupportedValues(["red"], "A", cOtherMissing, { A: ["red"] });
        expect(resOther.remaining).to.deep.equal(["red"]);

        // 3. ac3MacStep
        expect(isCspFullySolved({ A: ["1"], B: ["2"] })).to.be.true;
        expect(isCspFullySolved({ A: ["1", "2"], B: ["2"] })).to.be.false;
        expect(hasAnyWipeout({ A: [], B: ["1"] })).to.be.true;
        expect(hasAnyWipeout({ A: ["1"], B: ["2"] })).to.be.false;

        const dummyProblem = { id: "p", name: "P", description: "", variables: [{ name: "A", domain: ["1", "2"] }, { name: "B", domain: ["1"] }], constraints: [] };
        expect(findMrvVariable(dummyProblem, { A: ["1", "2"], B: ["1"] })).to.equal("A");

        // 4. ac3Engine: executeFineStep causing wipeout
        const resWipeout = executeFineStep(
          [{ varName: "WA", constraint: { id: "c1", name: "!=", variables: ["WA", "NT"], allowed: [] } }],
          { WA: ["red"], NT: ["red"] },
          { id: "p", name: "P", description: "", variables: [], constraints: [] },
        );
        expect(resWipeout.isWipeout).to.be.true;
      });
    });

    it("verifies planning synthesizer, action stack, executor, and strips solver edge cases", () => {
      getTestExports().then((exports: any) => {
        const { createInitialColumns, synthesizePlan } = exports.planningSynthesizer;
        const { applyStack } = exports.planningActionStack;
        const { executeStepOnWorld } = exports.planningExecutor;
        const { solveStripsCsp } = exports.stripsCspSolver;

        // 1. planningSynthesizer
        const colsBlank = createInitialColumns("blank");
        expect(colsBlank.every((c: string[]) => c.length === 0)).to.be.true;

        const colsCustom = createInitialColumns({
          id: "custom",
          name: "C",
          description: "",
          blocks: [],
          initial: { stacks: [["b1", "b2"]], table: ["b3"] },
          goal: { stacks: [] },
        });
        expect(colsCustom[0]).to.deep.equal(["b1", "b2"]);
        expect(colsCustom[1]).to.deep.equal(["b3"]);

        const colsFallback = createInitialColumns({ id: "other", name: "", description: "", blocks: [], goal: { stacks: [] } });
        expect(colsFallback[0].length).to.be.greaterThan(0);

        expect(synthesizePlan("unknownPlanId")).to.deep.equal([]);

        // 2. planningActionStack error path
        const stackErr = applyStack([["b1"]], "top", "nonexistent", "A", "B", "stack A on B");
        expect(stackErr.log).to.include("Error: Could not find base block");

        // 3. planningExecutor unknown step fallback
        const execFallback = executeStepOnWorld(
          { name: "unknownAction" as any, args: ["A"], description: "unknown" },
          [["b1"]],
          null,
          { id: "p", name: "P", description: "", blocks: [], goal: { stacks: [] } },
        );
        expect(execFallback.newCols).to.deep.equal([["b1"]]);

        // 4. stripsCspSolver insufficient horizon
        const resShort = solveStripsCsp("passengerDelivery", 1);
        expect(resShort.isSolved).to.be.false;
        expect(resShort.log).to.include("insufficient");
      });
    });

    it("verifies Bayes active trails, d-separation, and metaheuristic edge cases", () => {
      getTestExports().then((exports: any) => {
        const { getEvidenceDescendants, isTrailActive } = exports.dSeparationTrails;
        const { testDSeparationEngine } = exports.dSeparation;
        const { normalizeQueryFactor, multiplyFactorList } = exports.bayesVeEngineHelper;
        const { stepGreedyDescent } = exports.stepGreedyDescent;
        const { stepTabu } = exports.stepTabu;
        const { stepRandomWalk } = exports.stepRandomWalk;
        const { executeSLSStep } = exports.hillStepEngine;
        const { isConstraintViolated, evaluateConflicts, generateRandomAssignment } = exports.hillEvaluation;

        // 1. Bayes active trails & d-separation engine
        const dummyNet = {
          id: "testNet",
          name: "Test",
          description: "",
          nodes: [
            { id: "A", name: "A", type: "chance" as const, domain: ["t", "f"] },
            { id: "B", name: "B", type: "chance" as const, domain: ["t", "f"] },
            { id: "C", name: "C", type: "chance" as const, domain: ["t", "f"] },
          ],
          cpts: [
            { target: "A", parents: [], table: {} },
            { target: "B", parents: ["A"], table: {} },
            { target: "C", parents: ["B"], table: {} },
          ],
        };

        const evDesc = getEvidenceDescendants(dummyNet, new Set(["A"]));
        expect(evDesc.has("B")).to.be.true;
        expect(evDesc.has("C")).to.be.true;

        const active = isTrailActive(dummyNet, "A", "C", new Set(), evDesc);
        expect(active).to.be.true;

        const blocked = isTrailActive(dummyNet, "A", "C", new Set(["B"]), evDesc);
        expect(blocked).to.be.false;

        const dsepErr = testDSeparationEngine(dummyNet as any, {}, "", "");
        expect(dsepErr).to.include("Please choose two distinct variables");

        const dsepEv = testDSeparationEngine(dummyNet as any, { A: "t" }, "A", "C");
        expect(dsepEv).to.be.a("string");

        // 2. bayesVeEngineHelper
        const norm = normalizeQueryFactor({ id: "f1", name: "f1", variables: ["A"], table: [{ assignment: { A: "t" }, value: 0.8 }, { assignment: { A: "f" }, value: 0.2 }] }, "A");
        expect(norm["t"]).to.equal(0.8);
        const emptyFactors = multiplyFactorList([], "empty");
        expect(emptyFactors.id).to.equal("f-empty");

        // 3. hillEvaluation
        expect(isConstraintViolated({ id: "c1", name: "table", variables: ["X", "Y"], allowed: [["1", "2"]] }, { X: "1", Y: "3" })).to.be.true;
        expect(isConstraintViolated({ id: "c2", name: "X < Y", variables: ["X", "Y"], allowed: [] }, { X: "5", Y: "2" })).to.be.true;
        expect(isConstraintViolated({ id: "c2", name: "X < Y", variables: ["X", "Y"], allowed: [] }, { X: "1", Y: "2" })).to.be.false;
        expect(evaluateConflicts({ id: "p", name: "", description: "", variables: [], constraints: [{ id: "c1", name: "table", variables: ["X", "Y"], allowed: [["1", "2"]] }] }, { X: "1", Y: "3" })).to.equal(1);
        expect(generateRandomAssignment({ id: "p", name: "", description: "", variables: [{ name: "A", domain: ["1", "2"] }], constraints: [] })).to.have.property("A");

        // 4. stepGreedyDescent improving move and plateau
        const cspProblem = {
          id: "csp",
          name: "CSP",
          description: "",
          variables: [
            { name: "X", domain: ["1", "2"] },
            { name: "Y", domain: ["1", "2"] },
          ],
          constraints: [
            { id: "c1", name: "!=", variables: ["X", "Y"] },
          ],
        };
        const descentBetter = stepGreedyDescent(cspProblem, { X: "1", Y: "1" }, 1);
        expect(descentBetter.plateau).to.be.false;
        expect(descentBetter.newConflicts).to.equal(0);

        const descentPlateau = stepGreedyDescent(cspProblem, { X: "1", Y: "2" }, 0);
        expect(descentPlateau.plateau).to.be.true;

        // 5. stepTabu minConf === 9999 when all values are tabu
        const tabuAll = stepTabu(
          cspProblem,
          { X: "1", Y: "2" },
          [
            { varName: "X", val: "1" }, { varName: "X", val: "2" },
            { varName: "Y", val: "1" }, { varName: "Y", val: "2" },
          ],
          5,
        );
        expect(tabuAll.nextAssign).to.be.an("object");

        // 6. stepRandomWalk with prob 1.0
        const rwRes = stepRandomWalk(cspProblem, { X: "1", Y: "1" }, 1.0);
        expect(rwRes.nextAssign).to.be.an("object");

        // 7. executeSLSStep with empty problem
        const slsEmpty = executeSLSStep({
          problem: { id: "empty", name: "", description: "", variables: [], constraints: [] },
          assignment: {},
          conflicts: 0,
          algorithm: "min_conflicts",
          randomWalkProb: 0.1,
          temperature: 1,
          tabuList: [],
          tabuTenure: 3,
        });
        expect(slsEmpty.stopped).to.be.true;
      });
    });

    it("verifies robot simulation, decision tree, deduction, and UI helper edge cases", () => {
      getTestExports().then((exports: any) => {
        const { advanceRobotSimulation } = exports.robotStepHandler;
        const { applyRobotStep } = exports.robotStepApply;
        const { isWallCollision, computeMinWallDist } = exports.robotSensors;
        const { buildId3Tree } = exports.dtreeBuildId3;
        const { proveRuleBody } = exports.sldProveBody;
        const { generateSLDSteps } = exports.sldStepRecorder;
        const { getExerciseStepsA } = exports.exerciseStepsA;
        const { orderFrontier } = exports.searchOrdering;
        const { executeSearchStep } = exports.searchEngine;
        const { getSearchNodeStyle } = exports.searchNodeStyles;
        const { getSyntaxTokenClass } = exports.syntaxTokenizer;

        // 1. Robot simulation steps & sensors
        const robotWorld = {
          id: "w",
          name: "W",
          description: "",
          startPose: { x: 50, y: 50, theta: 0 },
          locations: [{ name: "LocA", x: 50, y: 50 }],
          plan: ["LocA"],
          obstacles: [],
          deliveryPoint: { x: 50, y: 50 },
        };
        const robotRes = advanceRobotSimulation(
          robotWorld as any,
          0,
          { x: 50, y: 50, theta: 0 },
        );
        expect(robotRes).to.not.be.null;

        let logMsg = "";
        applyRobotStep(
          { ...robotRes!, isComplete: true, arrived: true, nextIdx: 1 },
          { setLog: (m: string) => { logMsg = m; }, setSensorWhiskers: () => {}, setRobotPose: () => {}, addBreadcrumb: () => {}, robotPose: { x: 0, y: 0, theta: 0 } } as any,
          () => {},
          () => {},
        );
        expect(logMsg).to.include("Final destination");

        expect(isWallCollision(5, 5, [{ x1: 0, y1: 5, x2: 10, y2: 5 }])).to.be.true;
        expect(isWallCollision(5, 50, [{ x1: 0, y1: 5, x2: 10, y2: 5 }])).to.be.false;
        expect(computeMinWallDist(5, 5, [{ x1: 0, y1: 5, x2: 10, y2: 5 }])).to.be.lessThan(50);

        // 2. Decision Tree ID3 with empty attribute subset
        const dtreeData = {
          id: "dtreeTest",
          name: "Test",
          target: "play",
          attributes: ["outlook"],
          attributeValues: { outlook: ["sunny", "rainy", "overcast"] },
          examples: [
            { outlook: "sunny", play: "yes" },
            { outlook: "rainy", play: "no" },
          ],
        };
        const treeNode = buildId3Tree(dtreeData);
        expect(treeNode.attribute).to.equal("outlook");

        // 3. Deduction proveRuleBody with substitution & failure branch
        const proveResult = proveRuleBody(
          ["parent(tom, Y)"],
          {},
          0,
          [],
          [],
          [],
          () => ({
            id: "node-1",
            goal: "parent(tom, Y)",
            depth: 1,
            clauseUsed: "fact",
            status: "proved",
            substitution: "Y=ann",
            children: [],
          }),
        );
        expect(proveResult.allSucceeded).to.be.true;

        const proveFail = proveRuleBody(
          ["atom"],
          {},
          0,
          [],
          [],
          [],
          () => ({ status: "failed", id: "1", goal: "atom", depth: 1, clauseUsed: "", substitution: "", children: [] }),
        );
        expect(proveFail.allSucceeded).to.be.false;

        const stepsFail = generateSLDSteps("unprovable", "rule(X) :- other(X).");
        expect(stepsFail.length).to.be.greaterThan(0);

        // 4. Exercise steps fallback
        expect(getExerciseStepsA("unknownTool")).to.be.an("object");
        expect(getExerciseStepsA("robot")).to.be.an("object");

        // 5. Search ordering unknown algo fallback
        expect(orderFrontier([], "unknown" as any)).to.deep.equal([]);

        // 6. Search engine empty frontier and MPP pruned node
        const searchStepEmpty = executeSearchStep([], [], { id: "g", name: "", description: "", nodes: [], edges: [], startNode: "", goalNodes: [] }, "bfs");
        expect(searchStepEmpty.done).to.be.true;

        const searchStepMpp = executeSearchStep(
          [{ nodes: ["A"], cost: 1, h: 0, f: 1 }],
          ["A"],
          { id: "g", name: "", description: "", nodes: [{ id: "A", name: "A", x: 0, y: 0, h: 0 }], edges: [], startNode: "A", goalNodes: [] },
          "mpp",
        );
        expect(searchStepMpp.log).to.include("Multi-path pruning");

        const styleSol = getSearchNodeStyle({ node: { id: "N", name: "N", x: 0, y: 0, h: 0, isStart: false, isGoal: false }, isInSolution: true, isCurrent: false, isFrontierNode: false, isExpandedNode: false });
        expect(styleSol.strokeWidth).to.equal(4);

        // 7. Syntax tokenizer classes
        expect(getSyntaxTokenClass("unknownToken")).to.equal("text-foreground");
        expect(getSyntaxTokenClass("variable")).to.include("text-foreground font-medium");
        expect(getSyntaxTokenClass("property")).to.include("text-foreground font-medium");
      });
    });

    it("verifies component render branches and hook steppers across all algorithms", () => {
      getTestExports().then((exports: any) => {
        const { React, renderComponent, runHook } = exports;

        // 1. ToolViewRouter default fallback branch
        const unmountRouter = renderComponent(
          React.createElement(exports.ToolViewRouter.ToolViewRouter, {
            activeTool: "unknownTool" as any,
            onOpenTool: () => {},
          }),
        );
        unmountRouter();

        // 2. ModalHeader title branch
        const unmountModal = renderComponent(
          React.createElement(exports.ModalHeader.ModalHeader, {
            title: "Test Dialog",
            onClose: () => {},
          }),
        );
        unmountModal();

        // 3. BayesNodeShape null return fallback
        const unmountNodeShape = renderComponent(
          React.createElement("svg", {},
            React.createElement(exports.BayesNodeShape.BayesNodeShape, {
              type: "unknownType" as any,
              isObserved: false,
            }),
          ),
        );
        unmountNodeShape();

        // 4. Slider onChange branch
        let sliderVal = 0;
        const sliderElem = exports.Slider.Slider({
          min: 0,
          max: 100,
          value: 50,
          onChange: (v: number) => { sliderVal = v; },
        });
        sliderElem.props.onChange({ target: { value: "75" } });
        expect(sliderVal).to.equal(75);

        // 5. SyntaxHighlightEditor editable onChange branch
        let editorText = "";
        const editorRes = renderComponent(
          React.createElement(exports.SyntaxHighlightEditor.SyntaxHighlightEditor, {
            value: "initial",
            onChange: (t: string) => { editorText = t; },
            readOnly: false,
            ariaLabel: "Test Syntax Area",
          }),
        );
        const editorTextarea = editorRes.container.querySelector('textarea[aria-label="Test Syntax Area"]') as HTMLTextAreaElement;
        if (editorTextarea) {
          const tracker = (editorTextarea as any)._valueTracker;
          if (tracker) tracker.setValue("different");
          const proto = Object.getPrototypeOf(editorTextarea);
          const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
          if (setter) {
            setter.call(editorTextarea, "updated code");
          } else {
            editorTextarea.value = "updated code";
          }
          editorTextarea.dispatchEvent(new Event("input", { bubbles: true }));
          editorTextarea.dispatchEvent(new Event("change", { bubbles: true }));
        }
        editorRes.unmount();
        expect(editorText).to.equal("updated code");

        // 6. WorkspaceControls Speed slider onChange
        let wsSpeed = 500;
        const wsElem = exports.WorkspaceControls.WorkspaceControls({
          controls: {
            speed: 500,
            setSpeed: (s: number) => { wsSpeed = s; },
            onReset: () => {},
          },
        });
        const speedDiv = React.Children.toArray(wsElem.props.children).find((c: any) => c?.props?.className?.includes("sm:flex")) as any;
        const speedInputElem = React.Children.toArray(speedDiv?.props?.children).find((c: any) => c?.type === "input") as any;
        if (speedInputElem?.props?.onChange) {
          speedInputElem.props.onChange({ target: { value: "750" } });
        }
        expect(wsSpeed).to.equal(750);

        // 7. GraphBuilderRubberband valid line rendering
        const unmountRubberband = renderComponent(
          React.createElement("svg", {},
            React.createElement(exports.GraphBuilderRubberband.GraphBuilderRubberband, {
              sourceNode: { id: "A", name: "A", x: 10, y: 10, h: 0 },
              pointerPos: { x: 50, y: 50 },
            }),
          ),
        );
        unmountRubberband();

        // 8. GraphBuilderNodeModal Start Node checkbox toggle and Delete
        let deletedNodeId = "";
        const nodeModalRes = renderComponent(
          React.createElement(exports.GraphBuilderNodeModal.GraphBuilderNodeModal, {
            node: { id: "N1", name: "Node 1", x: 10, y: 10, h: 2 },
            isOpen: true,
            isStart: false,
            isGoal: false,
            onClose: () => {},
            onDelete: (id: string) => { deletedNodeId = id; },
            onSave: () => {},
          }),
        );
        const startCheckbox = nodeModalRes.container.querySelector('input[aria-label="Start Node"]') as HTMLInputElement;
        if (startCheckbox) startCheckbox.click();
        const delNodeBtn = Array.from(nodeModalRes.container.querySelectorAll("button")).find((b: any) => b.textContent?.trim() === "Delete") as HTMLButtonElement | undefined;
        if (delNodeBtn) delNodeBtn.click();
        nodeModalRes.unmount();
        expect(deletedNodeId).to.equal("N1");

        // 9. GraphBuilderEdgeModal Delete
        let deletedEdge: any = null;
        const edgeModalRes = renderComponent(
          React.createElement(exports.GraphBuilderEdgeModal.GraphBuilderEdgeModal, {
            edge: { from: "A", to: "B", cost: 3 },
            isOpen: true,
            onClose: () => {},
            onDelete: (e: any) => { deletedEdge = e; },
            onSave: () => {},
          }),
        );
        const delEdgeBtn = Array.from(edgeModalRes.container.querySelectorAll("button")).find((b: any) => b.textContent?.trim() === "Delete") as HTMLButtonElement | undefined;
        if (delEdgeBtn) delEdgeBtn.click();
        edgeModalRes.unmount();
        expect(deletedEdge?.from).to.equal("A");

        // 10. DTreeSplitControl select onChange
        let selectedSplit = "";
        const dtElem = exports.DTreeSplitControl.DTreeSplitControl({
          candidateGains: [{ attr: "Outlook", gain: 0.246 }, { attr: "Humidity", gain: 0.151 }],
          selectedSplitAttr: "Outlook",
          setSelectedSplitAttr: (attr: string) => { selectedSplit = attr; },
          onSplit: () => {},
        });
        const splitSelectElem = React.Children.toArray(dtElem.props.children).find((c: any) => c?.type === "select") as any;
        if (splitSelectElem?.props?.onChange) {
          splitSelectElem.props.onChange({ target: { value: "Humidity" } });
        }
        expect(selectedSplit).to.equal("Humidity");

        // 11. useBayesVe stepForward and togglePlay at end
        let refVe: any = null;
        const VeTestComp = () => {
          const dummyBayesNet = {
            id: "n", name: "", description: "",
            nodes: [{ id: "A", name: "A", type: "chance", domain: ["t", "f"], outcomes: ["true", "false"] }],
            cpts: [{ target: "A", parents: [], table: [0.5, 0.5] }],
          };
          refVe = exports.useBayesVe.useBayesVe(dummyBayesNet as any, {});
          return null;
        };
        const veRes = renderComponent(React.createElement(VeTestComp));
        expect(refVe.stepIndex).to.equal(0);
        exports.flushSync(() => {
          refVe.stepForward();
        });
        expect(refVe.stepIndex).to.equal(1);
        exports.flushSync(() => {
          refVe.stepForward();
          refVe.togglePlay();
        });
        veRes.unmount();

        // 12. Hook Steppers & State Handlers executed inside real React hook lifecycle
        runHook(() => {
          // A. useConstraintStepper: solved MAC confetti, solved AC alone confetti, wipeout backtrack, wipeout no backup, no MRV
          const dummyProblem = {
            id: "p", name: "P", description: "",
            variables: [{ name: "A", domain: ["1", "2"] }, { name: "B", domain: ["1"] }],
            constraints: [],
          };
          const mockStateSolved = {
            arcQueue: [], domains: { A: ["1"], B: ["1"] }, domainBackups: [],
            setArcQueue: () => {}, setDomains: () => {}, setCurrentArc: () => {}, setLog: () => {},
            backtrack: () => {}, performDomainSplit: () => {},
          };
          const stepperSolved = exports.useConstraintStepper.useConstraintStepper(mockStateSolved as any, dummyProblem as any);

          const acAloneProblem = {
            id: "pSingle", name: "P", description: "",
            variables: [{ name: "A", domain: ["1"] }],
            constraints: [],
          };
          const mockStateAcAlone = {
            arcQueue: [{ varName: "A", constraint: { id: "c1", name: "!=", variables: ["A"], allowed: [] } }],
            domains: { A: ["1"] }, domainBackups: [],
            setArcQueue: () => {}, setDomains: () => {}, setCurrentArc: () => {}, setLog: () => {},
            backtrack: () => {}, performDomainSplit: () => {},
          };
          const stepperAcAlone = exports.useConstraintStepper.useConstraintStepper(mockStateAcAlone as any, acAloneProblem as any);

          const mockStateWipeoutBackups = {
            arcQueue: [], domains: { A: [], B: ["1"] }, domainBackups: [{ domains: { A: ["1"] }, arcQueue: [], splitVar: "A" }],
            setArcQueue: () => {}, setDomains: () => {}, setCurrentArc: () => {}, setLog: () => {},
            backtrack: () => {}, performDomainSplit: () => {},
          };
          const stepperBacktrack = exports.useConstraintStepper.useConstraintStepper(mockStateWipeoutBackups as any, dummyProblem as any);

          const mockStateWipeoutNoBackups = {
            arcQueue: [], domains: { A: [], B: ["1"] }, domainBackups: [],
            setArcQueue: () => {}, setDomains: () => {}, setCurrentArc: () => {}, setLog: () => {},
            backtrack: () => {}, performDomainSplit: () => {},
          };
          const stepperNoBackups = exports.useConstraintStepper.useConstraintStepper(mockStateWipeoutNoBackups as any, dummyProblem as any);

          const emptyProblem = { id: "p", name: "", description: "", variables: [], constraints: [] };
          const mockStateNoMrv = {
            arcQueue: [], domains: { A: ["1", "2"] }, domainBackups: [],
            setArcQueue: () => {}, setDomains: () => {}, setCurrentArc: () => {}, setLog: () => {},
            backtrack: () => {}, performDomainSplit: () => {},
          };
          const stepperNoMrv = exports.useConstraintStepper.useConstraintStepper(mockStateNoMrv as any, emptyProblem as any);

          // B. useHillStepper: conflicts === 0
          const hillStepper = exports.useHillStepper.useHillStepper({
            problem: dummyProblem as any, assignment: { A: "1" }, conflicts: 0, tabuList: [],
            algorithm: "min_conflicts", randomWalkProb: 0.1, temperature: 1, tabuTenure: 3,
            setIsPlaying: () => {}, applyStepResult: () => {},
          });

          // C. useGraphBuilderActions: moveNode and deleteEdge
          const mockSetGraph = (cb: any) => { cb({ nodes: [{ id: "N1", x: 0, y: 0 }], edges: [{ from: "N1", to: "N2", cost: 1 }] }); };
          const gbActions = exports.useGraphBuilderActions.useGraphBuilderActions({
            setGraph: mockSetGraph, setSelectedNodeId: () => {}, setSelectedEdge: () => {},
          });

          // D. useClipboardCopy: copy call & rejection
          const clip = exports.useClipboardCopy.useClipboardCopy(100);
          const clipCatch = exports.useClipboardCopy.useClipboardCopy(100);

          // E. useBayesVe: stepForward at end, togglePlay at end, reset
          const dummyBayesNet = {
            id: "n", name: "", description: "",
            nodes: [{ id: "A", name: "A", type: "chance", domain: ["t", "f"], outcomes: ["true", "false"] }],
            cpts: [{ target: "A", parents: [], table: [0.5, 0.5] }],
          };
          const ve = exports.useBayesVe.useBayesVe(dummyBayesNet as any, {});

          // F. useDeductionStepper: togglePlay with steps.length === 0
          const deductionStepper = exports.useDeductionStepper.useDeductionStepper();

          // G. useExerciseStepper: togglePlay when at end
          const exerciseStepper = exports.useExerciseStepper.useExerciseStepper("search", "search_simple");

          // H. usePlanningExecution: stepExecution when complete
          const mockWorld = {
            resetWorld: () => {}, setLog: () => {}, applyStep: () => {},
            columns: [], heldBlock: null, log: "", isPlanComplete: false,
          };
          const planningExec = exports.usePlanningExecution.usePlanningExecution(
            { id: "simpleSwap", name: "", description: "", blocks: [], goal: { stacks: [] } } as any,
            mockWorld as any,
            "forward",
          );

          // I. useNeuralTraining: trainEpoch with empty points
          const neuralTraining = exports.useNeuralTraining.useNeuralTraining([], 0.1, 0.9);

          // J. useNeuralNetwork: resetNetwork
          const neuralNet = exports.useNeuralNetwork.useNeuralNetwork();

          // K. useStripsToCsp: togglePlay when horizonK >= 4
          const stripsCsp = exports.useStripsToCsp.useStripsToCsp();

          return () => {
            stepperSolved.stepMacSearch();
            stepperSolved.fineStep();
            stepperSolved.resetSolved();

            stepperAcAlone.fineStep();

            stepperBacktrack.stepMacSearch();
            stepperNoBackups.stepMacSearch();
            stepperNoMrv.stepMacSearch();

            hillStepper();

            gbActions.moveNode("N1", 100, 200);
            gbActions.deleteEdge({ from: "N1", to: "N2", cost: 1 });

            clip.copy("copied text");

            const origWrite = navigator.clipboard?.writeText;
            if (navigator.clipboard) {
              navigator.clipboard.writeText = () => Promise.reject(new Error("denied"));
            }
            clipCatch.copy("fail text");
            if (origWrite && navigator.clipboard) {
              navigator.clipboard.writeText = origWrite;
            }

            ve.stepForward();
            ve.togglePlay();
            ve.reset();

            deductionStepper.togglePlay("a", "b");
            exerciseStepper.togglePlay();
            planningExec.stepExecution();
            neuralTraining.trainEpoch();
            neuralNet.resetNetwork();

            stripsCsp.setHorizonK(4);
            stripsCsp.togglePlay();
          };
        });
      });
    });
  });
});
