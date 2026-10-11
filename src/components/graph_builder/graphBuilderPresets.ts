import { SearchGraph } from "@/data/searchProblems";

export const BLANK_GRAPH: SearchGraph = {
  id: "custom_blank",
  name: "Blank Canvas",
  description: "A clean slate to design your custom graph with drag and drop.",
  startNode: "",
  goalNodes: [],
  nodes: [],
  edges: [],
};

export const TRIANGLE_PRESET: SearchGraph = {
  id: "preset_triangle",
  name: "Triangle Graph",
  description: "A simple 3-node triangular graph for testing pathfinding.",
  startNode: "S",
  goalNodes: ["G"],
  nodes: [
    { id: "S", name: "S", x: 120, y: 220, isStart: true, isGoal: false, h: 4 },
    { id: "A", name: "A", x: 320, y: 100, isStart: false, isGoal: false, h: 2 },
    { id: "G", name: "G", x: 500, y: 220, isStart: false, isGoal: true, h: 0 },
  ],
  edges: [
    { from: "S", to: "A", cost: 2.0 },
    { from: "A", to: "G", cost: 3.0 },
    { from: "S", to: "G", cost: 6.0 },
  ],
};

export const GRID_PRESET: SearchGraph = {
  id: "preset_grid",
  name: "2x2 Grid Network",
  description: "A planar 4-node grid with alternative route options.",
  startNode: "A",
  goalNodes: ["D"],
  nodes: [
    { id: "A", name: "A", x: 180, y: 120, isStart: true, isGoal: false, h: 3 },
    { id: "B", name: "B", x: 440, y: 120, isStart: false, isGoal: false, h: 1 },
    { id: "C", name: "C", x: 180, y: 300, isStart: false, isGoal: false, h: 2 },
    { id: "D", name: "D", x: 440, y: 300, isStart: false, isGoal: true, h: 0 },
  ],
  edges: [
    { from: "A", to: "B", cost: 1.5 },
    { from: "A", to: "C", cost: 2.0 },
    { from: "B", to: "D", cost: 2.5 },
    { from: "C", to: "D", cost: 1.0 },
  ],
};
