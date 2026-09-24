export interface BlockItem {
  id: string;
  label: string;
  color: string;
}

export interface BlockWorldState {
  table: string[];
  stacks: string[][];
  holding: string | null;
  clear: string[];
}

export interface PlanningGoal {
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

export const PLANNING_PROBLEMS: Record<string, PlanningProblem> = {
  "sussman": {
    "id": "sussman",
    "name": "The Sussman Anomaly",
    "description": "The classic planning anomaly where subgoals interact: Achieve on(A, B) and on(B, C) starting from on(C, A) and ontable(B). Non-interleaved planners fail here!",
    "initial": {
      "table": [
        "block2"
      ],
      "stacks": [
        [
          "block1",
          "block3"
        ]
      ],
      "holding": null,
      "clear": [
        "block2",
        "block3"
      ]
    },
    "goal": [
      {
        "predicate": "on",
        "args": [
          "block1",
          "block2"
        ]
      },
      {
        "predicate": "on",
        "args": [
          "block2",
          "block3"
        ]
      }
    ],
    "blocks": [
      {
        "id": "block1",
        "label": "A",
        "color": "#ef4444"
      },
      {
        "id": "block2",
        "label": "B",
        "color": "#3b82f6"
      },
      {
        "id": "block3",
        "label": "C",
        "color": "#10b981"
      }
    ]
  },
  "simpleSwap": {
    "id": "simpleSwap",
    "name": "Simple Two-Block Swap",
    "description": "Swap block A and B on the table into a stacked tower on(A, B).",
    "initial": {
      "table": [
        "block1",
        "block2"
      ],
      "stacks": [],
      "holding": null,
      "clear": [
        "block1",
        "block2"
      ]
    },
    "goal": [
      {
        "predicate": "on",
        "args": [
          "block1",
          "block2"
        ]
      }
    ],
    "blocks": [
      {
        "id": "block1",
        "label": "A",
        "color": "#ef4444"
      },
      {
        "id": "block2",
        "label": "B",
        "color": "#3b82f6"
      }
    ]
  },
  "fiveBlocks": {
    "id": "fiveBlocks",
    "name": "Five Blocks Tower",
    "description": "Construct a 5-story tower on(A, B), on(B, C), on(C, D), on(D, E) from separate distributed piles.",
    "initial": {
      "table": [
        "block1",
        "block3"
      ],
      "stacks": [
        [
          "block1",
          "block2"
        ],
        [
          "block3",
          "block4",
          "block5"
        ]
      ],
      "holding": null,
      "clear": [
        "block2",
        "block5"
      ]
    },
    "goal": [
      {
        "predicate": "on",
        "args": [
          "block1",
          "block2"
        ]
      },
      {
        "predicate": "on",
        "args": [
          "block2",
          "block3"
        ]
      },
      {
        "predicate": "on",
        "args": [
          "block3",
          "block4"
        ]
      },
      {
        "predicate": "on",
        "args": [
          "block4",
          "block5"
        ]
      }
    ],
    "blocks": [
      {
        "id": "block1",
        "label": "A",
        "color": "#ef4444"
      },
      {
        "id": "block2",
        "label": "B",
        "color": "#3b82f6"
      },
      {
        "id": "block3",
        "label": "C",
        "color": "#10b981"
      },
      {
        "id": "block4",
        "label": "D",
        "color": "#f59e0b"
      },
      {
        "id": "block5",
        "label": "E",
        "color": "#8b5cf6"
      }
    ]
  },
  "impossible": {
    "id": "impossible",
    "name": "Contradictory Goal Test",
    "description": "Tests the planner detecting dead-ends and impossible goals where A must be simultaneously on B and on C.",
    "initial": {
      "table": [
        "block1",
        "block2",
        "block3"
      ],
      "stacks": [],
      "holding": null,
      "clear": [
        "block1",
        "block2",
        "block3"
      ]
    },
    "goal": [
      {
        "predicate": "on",
        "args": [
          "block1",
          "block2"
        ]
      },
      {
        "predicate": "on",
        "args": [
          "block1",
          "block3"
        ]
      }
    ],
    "blocks": [
      {
        "id": "block1",
        "label": "A",
        "color": "#ef4444"
      },
      {
        "id": "block2",
        "label": "B",
        "color": "#3b82f6"
      },
      {
        "id": "block3",
        "label": "C",
        "color": "#10b981"
      }
    ]
  }
};
