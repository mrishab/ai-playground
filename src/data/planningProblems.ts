export interface BlockItem {
  id: string;
  label: string;
  color: string;
}

interface BlockWorldState {
  table: string[];
  stacks: string[][];
  holding: string | null;
  clear: string[];
}

interface PlanningGoal {
  predicate: string;
  args: string[];
}

export interface PlanningProblem {
  id: string;
  name: string;
  description: string;
  initial: BlockWorldState;
  goal: PlanningGoal[];
  blocks: BlockItem[];
}

export interface PlanningProblemMap {
  [problemId: string]: PlanningProblem;
}

export const PLANNING_PROBLEMS: PlanningProblemMap = {
  sussman: {
    id: "sussman",
    name: "The Sussman Anomaly",
    description:
      "Subgoals interact when stacking blocks: achieving on(A, B) and on(B, C) from on(C, A) and ontable(B).",
    initial: {
      table: ["block2"],
      stacks: [["block1", "block3"]],
      holding: null,
      clear: ["block2", "block3"],
    },
    goal: [
      {
        predicate: "on",
        args: ["block1", "block2"],
      },
      {
        predicate: "on",
        args: ["block2", "block3"],
      },
    ],
    blocks: [
      {
        id: "block1",
        label: "A",
        color: "hsl(var(--destructive))",
      },
      {
        id: "block2",
        label: "B",
        color: "hsl(var(--primary))",
      },
      {
        id: "block3",
        label: "C",
        color: "hsl(var(--accent-foreground))",
      },
    ],
  },
  simpleSwap: {
    id: "simpleSwap",
    name: "Simple Two-Block Stacking",
    description:
      "Stack block A onto block B from the table to achieve on(A, B).",
    initial: {
      table: ["block1", "block2"],
      stacks: [],
      holding: null,
      clear: ["block1", "block2"],
    },
    goal: [
      {
        predicate: "on",
        args: ["block1", "block2"],
      },
    ],
    blocks: [
      {
        id: "block1",
        label: "A",
        color: "hsl(var(--destructive))",
      },
      {
        id: "block2",
        label: "B",
        color: "hsl(var(--primary))",
      },
    ],
  },
  fiveBlocks: {
    id: "fiveBlocks",
    name: "Five Blocks Tower",
    description:
      "Construct a 5-block vertical tower from separate distributed piles.",
    initial: {
      table: ["block1", "block3"],
      stacks: [
        ["block1", "block2"],
        ["block3", "block4", "block5"],
      ],
      holding: null,
      clear: ["block2", "block5"],
    },
    goal: [
      {
        predicate: "on",
        args: ["block1", "block2"],
      },
      {
        predicate: "on",
        args: ["block2", "block3"],
      },
      {
        predicate: "on",
        args: ["block3", "block4"],
      },
      {
        predicate: "on",
        args: ["block4", "block5"],
      },
    ],
    blocks: [
      {
        id: "block1",
        label: "A",
        color: "hsl(var(--destructive))",
      },
      {
        id: "block2",
        label: "B",
        color: "hsl(var(--primary))",
      },
      {
        id: "block3",
        label: "C",
        color: "hsl(var(--accent-foreground))",
      },
      {
        id: "block4",
        label: "D",
        color: "hsl(var(--muted-foreground))",
      },
      {
        id: "block5",
        label: "E",
        color: "hsl(var(--secondary-foreground))",
      },
    ],
  },
  impossible: {
    id: "impossible",
    name: "Contradictory Goal Test",
    description:
      "Tests planner detecting dead-ends and impossible goals where A must be on B and C simultaneously.",
    initial: {
      table: ["block1", "block2", "block3"],
      stacks: [],
      holding: null,
      clear: ["block1", "block2", "block3"],
    },
    goal: [
      {
        predicate: "on",
        args: ["block1", "block2"],
      },
      {
        predicate: "on",
        args: ["block1", "block3"],
      },
    ],
    blocks: [
      {
        id: "block1",
        label: "A",
        color: "hsl(var(--destructive))",
      },
      {
        id: "block2",
        label: "B",
        color: "hsl(var(--primary))",
      },
      {
        id: "block3",
        label: "C",
        color: "hsl(var(--accent-foreground))",
      },
    ],
  },
};
