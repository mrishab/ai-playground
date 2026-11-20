import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { GraphBuilder } from "../components/graph_builder/GraphBuilder";
import { SearchTool } from "../components/search/SearchTool";
import { ConstraintTool } from "../components/constraint/ConstraintTool";
import { HillTool } from "../components/hill/HillTool";
import { DeductionTool } from "../components/deduction/DeductionTool";
import { BayesTool } from "../components/bayes/BayesTool";
import { DTreeTool } from "../components/dtree/DTreeTool";
import { NeuralTool } from "../components/neural/NeuralTool";
import { StripsToCspTool } from "../components/strips_to_csp/StripsToCspTool";
import { RobotTool } from "../components/robot/RobotTool";
import { PlanningTool } from "../components/planning/PlanningTool";
import { executeSearchStep } from "../components/search/searchEngine";
import { BLANK_GRAPH } from "../components/graph_builder/graphBuilderPresets";
import { SearchGraph } from "../data/searchProblems";

// Mock canvas-confetti
vi.mock("canvas-confetti", () => ({ default: vi.fn() }));

describe("AI Playground Consistent Workspace & Drag-and-Drop Graph Builder", () => {
  it("1. GraphBuilder renders canvas, toolbar, node presets, and summary footer", () => {
    render(<GraphBuilder />);

    expect(screen.getByRole("button", { name: /Move/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add Node/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add Edge/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument();
    expect(screen.getByTestId("gb-drag-node-source")).toBeInTheDocument();
    expect(screen.getByText(/3 Nodes/i)).toBeInTheDocument();
    expect(screen.getByText(/3 Edges/i)).toBeInTheDocument();
  });

  it("2. GraphBuilder adds nodes on canvas click in add_node mode", () => {
    render(<GraphBuilder />);
    const addNodeBtn = screen.getByRole("button", { name: /Add Node/i });
    fireEvent.click(addNodeBtn);

    const svg = screen.getByTestId("gb-canvas-svg");
    expect(svg).toBeInTheDocument();
    fireEvent.click(svg, { clientX: 250, clientY: 180 });
    expect(screen.getByTestId("gb-node-N4")).toBeInTheDocument();
  });

  it("3. GraphBuilder loads presets dynamically", () => {
    render(<GraphBuilder />);
    const select = screen.getByLabelText(/Load Graph Preset/i);
    fireEvent.change(select, { target: { value: "grid" } });

    expect(screen.getByTestId("gb-node-A")).toBeInTheDocument();
    expect(screen.getByTestId("gb-node-B")).toBeInTheDocument();
    expect(screen.getByTestId("gb-node-C")).toBeInTheDocument();
    expect(screen.getByTestId("gb-node-D")).toBeInTheDocument();
  });

  it("4. GraphBuilder opens node modal and updates properties", () => {
    render(<GraphBuilder />);
    const startNode = screen.getByTestId("gb-node-S");
    fireEvent.doubleClick(startNode);

    expect(screen.getByText(/Edit Node: S/i)).toBeInTheDocument();
    const saveBtn = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(saveBtn);
  });

  it("5. GraphBuilder handles HTML5 drag and drop of new nodes onto canvas", () => {
    render(<GraphBuilder />);
    const dragSource = screen.getByTestId("gb-drag-node-source");
    const svg = screen.getByTestId("gb-canvas-svg");

    fireEvent.dragStart(dragSource, {
      dataTransfer: { setData: vi.fn(), getData: () => "new-node" },
    });
    fireEvent.dragOver(svg);
    fireEvent.drop(svg, { clientX: 300, clientY: 200, dataTransfer: { getData: () => "new-node" } });
    expect(screen.getByTestId("gb-node-N4")).toBeInTheDocument();
  });

  it("6. SearchTool seamlessly switches between Animation, Graph Building, and Coding panes", () => {
    render(<SearchTool />);

    // 1. Initial Animation Area
    expect(screen.getByText(/Graph Searching Lab/i)).toBeInTheDocument();
    expect(screen.getByText(/Frontier Queue/i)).toBeInTheDocument();

    // 2. Switch to Graph Building Area
    const graphBuilderTab = screen.getByText(/Graph Building/i);
    fireEvent.click(graphBuilderTab);
    expect(screen.getByText(/Solve in Animation/i)).toBeInTheDocument();

    // 3. Switch back to Animation Area via Solve in Animation
    const solveBtn = screen.getByText(/Solve in Animation/i);
    fireEvent.click(solveBtn);
    expect(screen.getByText(/Frontier Queue/i)).toBeInTheDocument();

    // 4. Switch to Coding Area
    const codingTab = screen.getByText(/Coding Area/i);
    fireEvent.click(codingTab);
    expect(screen.getByText(/Search Algorithm Code/i)).toBeInTheDocument();

    // 5. Switch to Log & Output
    const logTab = screen.getByText(/Log & Output/i);
    fireEvent.click(logTab);
    expect(screen.getByText(/Execution Trace & Output Log/i)).toBeInTheDocument();
  });

  it("7. ConstraintTool has consistent header, algorithms menu, and pane switching", () => {
    render(<ConstraintTool />);
    expect(screen.getByText(/Consistency Based CSP Solver/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select CSP Problem/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Algorithm/i)).toBeInTheDocument();

    const codingTab = screen.getByText(/Coding Area/i);
    fireEvent.click(codingTab);
    expect(screen.getByText(/AC-3 Solver Code/i)).toBeInTheDocument();
  });

  it("8. HillTool has consistent header, algorithm options, and Code area", () => {
    render(<HillTool />);
    expect(screen.getByText(/Stochastic Local Search/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select SLS Problem/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Algorithm/i)).toBeInTheDocument();

    const codingTab = screen.getByText(/Coding Area/i);
    fireEvent.click(codingTab);
    expect(screen.getByText(/SLS Algorithm Code/i)).toBeInTheDocument();
  });

  it("9. DeductionTool, BayesTool, and DTreeTool have uniform multi-pane structure", () => {
    const { unmount: u1 } = render(<DeductionTool />);
    expect(screen.getByText(/Definite Clause Deduction/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Knowledge Base/i)).toBeInTheDocument();
    u1();

    const { unmount: u2 } = render(<BayesTool />);
    expect(screen.getByText(/Belief & Decision Networks Lab/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Network/i)).toBeInTheDocument();
    u2();

    const { unmount: u3 } = render(<DTreeTool />);
    expect(screen.getByText(/Decision Tree Induction Lab/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Dataset/i)).toBeInTheDocument();
    u3();
  });

  it("10. NeuralTool, StripsToCspTool, RobotTool, PlanningTool render unified panes", () => {
    const { unmount: u1 } = render(<NeuralTool />);
    expect(screen.getByText(/Neural Network & Backprop Lab/i)).toBeInTheDocument();
    u1();

    const { unmount: u2 } = render(<StripsToCspTool />);
    expect(screen.getByText(/STRIPS to CSP Planning/i)).toBeInTheDocument();
    u2();

    const { unmount: u3 } = render(<RobotTool />);
    expect(screen.getByText(/Autonomous Robot Control Lab/i)).toBeInTheDocument();
    u3();

    const { unmount: u4 } = render(<PlanningTool />);
    expect(screen.getByText(/STRIPS Planning Lab/i)).toBeInTheDocument();
    u4();
  });

  it("11. GraphBuilder connects nodes with edges and edits edge weight", () => {
    render(<GraphBuilder />);
    const addEdgeBtn = screen.getByRole("button", { name: /Add Edge/i });
    fireEvent.click(addEdgeBtn);

    const nodeS = screen.getByTestId("gb-node-S");
    const nodeA = screen.getByTestId("gb-node-A");
    fireEvent.click(nodeS);
    fireEvent.click(nodeA);

    // Click edge label to open edge modal
    const edgeLabel = screen.getByText("2");
    fireEvent.click(edgeLabel);
    expect(screen.getByText(/Edit Edge: S → A/i)).toBeInTheDocument();

    const costInput = screen.getByLabelText(/Edge Cost \/ Weight/i);
    fireEvent.change(costInput, { target: { value: "5.5" } });
    const saveBtn = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(saveBtn);

    expect(screen.getByText("5.5")).toBeInTheDocument();
  });

  it("12. GraphBuilder deletes nodes in delete mode", () => {
    render(<GraphBuilder />);
    const deleteBtn = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteBtn);

    const nodeG = screen.getByTestId("gb-node-G");
    fireEvent.click(nodeG);
    expect(screen.queryByTestId("gb-node-G")).not.toBeInTheDocument();
    expect(screen.getByText(/2 Nodes/i)).toBeInTheDocument();
  });

  it("13. SearchTool handles custom blank graph without throwing", () => {
    render(<SearchTool />);
    const graphBuilderTab = screen.getByText(/Graph Building/i);
    fireEvent.click(graphBuilderTab);

    const select = screen.getByLabelText(/Load Graph Preset/i);
    fireEvent.change(select, { target: { value: "blank" } });
    expect(screen.getByText(/0 Nodes/i)).toBeInTheDocument();

    const solveBtn = screen.getByText(/Solve in Animation/i);
    fireEvent.click(solveBtn);
    expect(screen.getByText(/No nodes in graph/i)).toBeInTheDocument();
  });

  it("14. StudioWorkspace bottom dock opens full log view and copies trace", () => {
    const writeTextMock = vi.fn();
    Object.assign(navigator, { clipboard: { writeText: writeTextMock } });

    render(<SearchTool />);
    const viewLogBtn = screen.getByRole("button", { name: /View Full Log/i });
    fireEvent.click(viewLogBtn);

    expect(screen.getByText(/Execution Trace & Output Log/i)).toBeInTheDocument();
    const copyBtn = screen.getByRole("button", { name: /Copy Trace/i });
    fireEvent.click(copyBtn);
    expect(writeTextMock).toHaveBeenCalled();
  });

  it("15. GraphBuilder generates unique IDs without collision after node deletion", () => {
    render(<GraphBuilder />);
    // Triangle preset starts with S, A, G (3 nodes)
    const addNodeBtn = screen.getByRole("button", { name: /Add Node/i });
    fireEvent.click(addNodeBtn);

    const svg = screen.getByTestId("gb-canvas-svg");
    fireEvent.click(svg, { clientX: 200, clientY: 100 });
    // Should add N4
    expect(screen.getByTestId("gb-node-N4")).toBeInTheDocument();

    // Now delete node A (leaving S, G, N4 -> length 3)
    const deleteBtn = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteBtn);
    fireEvent.click(screen.getByTestId("gb-node-A"));
    expect(screen.queryByTestId("gb-node-A")).not.toBeInTheDocument();

    // Now add another node - must NOT be N4 (which already exists), must be N5
    fireEvent.click(addNodeBtn);
    fireEvent.click(svg, { clientX: 220, clientY: 120 });
    expect(screen.getByTestId("gb-node-N5")).toBeInTheDocument();
    expect(screen.getByTestId("gb-node-N4")).toBeInTheDocument();
  });

  it("16. GraphBuilder promotes remaining node as start when start node is deleted", () => {
    render(<GraphBuilder />);
    // Start node is S
    expect(screen.getByText(/Start:\s*S/i)).toBeInTheDocument();

    // Delete S
    const deleteBtn = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteBtn);
    fireEvent.click(screen.getByTestId("gb-node-S"));

    expect(screen.queryByTestId("gb-node-S")).not.toBeInTheDocument();
    // Next remaining node (A) becomes the new start node
    expect(screen.getByText(/Start:\s*A/i)).toBeInTheDocument();
  });

  it("17. GraphBuilder cancels edge connection when canvas is clicked", () => {
    render(<GraphBuilder />);
    const addEdgeBtn = screen.getByRole("button", { name: /Add Edge/i });
    fireEvent.click(addEdgeBtn);

    // Click source node S to start connecting
    const nodeS = screen.getByTestId("gb-node-S");
    fireEvent.click(nodeS);

    // Click empty canvas to cancel
    const svg = screen.getByTestId("gb-canvas-svg");
    fireEvent.click(svg);

    // Clicking node A now should not create an edge from S to A, but start a new source or select
    fireEvent.click(addEdgeBtn);
    const nodeA = screen.getByTestId("gb-node-A");
    fireEvent.click(nodeA);
    // Clicking canvas cancels again
    fireEvent.click(svg);
  });

  it("18. GraphBuilder enforces single start node when updated in modal", () => {
    render(<GraphBuilder />);
    // Initial start node is S
    expect(screen.getByText(/Start:\s*S/i)).toBeInTheDocument();

    // Double-click node A to make it start
    const nodeA = screen.getByTestId("gb-node-A");
    fireEvent.doubleClick(nodeA);

    const startCheckbox = screen.getByRole("checkbox", { name: /Start Node/i });
    fireEvent.click(startCheckbox);

    const saveBtn = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(saveBtn);

    // Now A is start node and S is no longer start node
    expect(screen.getByText(/Start:\s*A/i)).toBeInTheDocument();
  });

  it("19. executeSearchStep safely handles empty frontier and flags exhausted search", () => {
    const resEmpty = executeSearchStep([], [], BLANK_GRAPH, "astar");
    expect(resEmpty.done).toBe(true);
    expect(resEmpty.isGoalReached).toBe(false);
    expect(resEmpty.log).toMatch(/frontier is empty/i);

    const testGraph: SearchGraph = {
      id: "test",
      name: "Test",
      description: "Test",
      nodes: [
        { id: "A", name: "A", x: 100, y: 100, isStart: true, isGoal: false, h: 5 },
        { id: "B", name: "B", x: 200, y: 100, isStart: false, isGoal: true, h: 0 },
      ],
      edges: [],
      startNode: "A",
      goalNodes: ["B"],
    };
    const resStep = executeSearchStep([{ nodes: ["A"], cost: 0, h: 5, f: 5 }], [], testGraph, "astar");
    expect(resStep.done).toBe(true);
    expect(resStep.updatedFrontier.length).toBe(0);
    expect(resStep.log).toMatch(/Frontier exhausted: no path to goal/i);
  });

  it("20. GraphBuilder clamps negative heuristic in node modal", () => {
    render(<GraphBuilder />);
    const nodeS = screen.getByTestId("gb-node-S");
    fireEvent.doubleClick(nodeS);

    const hInput = screen.getByLabelText(/Heuristic Value h\(n\)/i);
    fireEvent.change(hInput, { target: { value: "-10" } });
    const saveBtn = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(saveBtn);

    expect(within(nodeS).getByText("h=0")).toBeInTheDocument();
  });
});

