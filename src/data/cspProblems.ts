export interface CSPVariable {
  name: string;
  domain: string[];
  x: number;
  y: number;
}

export interface CSPConstraint {
  name: string;
  variables: string[];
  allowed: string[][];
}

export interface CSPProblem {
  id: string;
  name: string;
  description: string;
  variables: CSPVariable[];
  constraints: CSPConstraint[];
}

export interface CSPProblemMap {
  [problemId: string]: CSPProblem;
}

export function nqueensConstraints(variables: CSPVariable[]): CSPConstraint[] {
  const constraints: CSPConstraint[] = [];
  for (let i = 0; i < variables.length; i++) {
    for (let j = i + 1; j < variables.length; j++) {
      const v1 = variables[i];
      const v2 = variables[j];
      const colDiff = Math.abs(i - j);
      const allowed: string[][] = [];
      for (const r1 of v1.domain) {
        for (const r2 of v2.domain) {
          const row1 = parseInt(r1, 10);
          const row2 = parseInt(r2, 10);
          if (row1 !== row2 && Math.abs(row1 - row2) !== colDiff) {
            allowed.push([r1, r2]);
          }
        }
      }
      constraints.push({
        name: `${v1.name} ≠ ${v2.name}`,
        variables: [v1.name, v2.name],
        allowed,
      });
    }
  }
  return constraints;
}

export function buildCrosswordConstraint(
  var1: CSPVariable,
  var2: CSPVariable,
  idx1: number,
  idx2: number,
): CSPConstraint {
  const allowed: string[][] = [];
  for (const w1 of var1.domain) {
    for (const w2 of var2.domain) {
      if (w1[idx1] && w2[idx2] && w1[idx1] === w2[idx2]) {
        allowed.push([w1, w2]);
      }
    }
  }
  return {
    name: `${var1.name}[${idx1}] == ${var2.name}[${idx2}]`,
    variables: [var1.name, var2.name],
    allowed,
  };
}

const crossword1Domain = [
  "add", "ado", "age", "ago", "aid", "ail", "aim", "air", "and", "any",
  "ape", "apt", "arc", "are", "ark", "arm", "art", "ash", "ask", "auk",
  "awe", "awl", "aye", "bad", "bag", "ban", "bat", "bee", "boa", "ear",
  "eel", "eft", "far", "fat", "fit", "lee", "oaf", "rat", "tar", "tie",
];

const crossword1Variables: CSPVariable[] = [
  { name: "A1", domain: crossword1Domain, x: 238.5, y: 60.0 },
  { name: "A2", domain: crossword1Domain, x: 70.0, y: 92.1 },
  { name: "A3", domain: crossword1Domain, x: 550.0, y: 132.9 },
  { name: "D1", domain: crossword1Domain, x: 238.5, y: 340.0 },
  { name: "D2", domain: crossword1Domain, x: 70.0, y: 306.3 },
  { name: "D3", domain: crossword1Domain, x: 550.0, y: 263.9 },
];

const crossword2Variables: CSPVariable[] = [
  { name: "oneacross", domain: ["ant", "big", "bus", "car", "has"], x: 70.0, y: 154.2 },
  { name: "onedown", domain: ["book", "buys", "hold", "lane", "year"], x: 181.4, y: 340.0 },
  { name: "twodown", domain: ["ginger", "search", "symbol", "syntax"], x: 247.6, y: 63.5 },
  { name: "threeacross", domain: ["book", "buys", "hold", "land", "year"], x: 507.1, y: 328.1 },
  { name: "fouracross", domain: ["ant", "big", "bus", "car", "has"], x: 550.0, y: 60.0 },
];

const fiveQueensVariables: CSPVariable[] = [
  { name: "A", domain: ["1", "2", "3", "4", "5"], x: 316.5, y: 60.0 },
  { name: "B", domain: ["1", "2", "3", "4", "5"], x: 550.0, y: 170.2 },
  { name: "C", domain: ["1", "2", "3", "4", "5"], x: 456.4, y: 340.0 },
  { name: "D", domain: ["1", "2", "3", "4", "5"], x: 153.0, y: 339.3 },
  { name: "E", domain: ["1", "2", "3", "4", "5"], x: 70.0, y: 168.8 },
];

const eightQueensDomain = ["1", "2", "3", "4", "5", "6", "7", "8"];
const eightQueensVariables: CSPVariable[] = [
  { name: "N0", domain: eightQueensDomain, x: 307.0, y: 60.0 },
  { name: "N1", domain: eightQueensDomain, x: 161.8, y: 105.7 },
  { name: "N2", domain: eightQueensDomain, x: 70.0, y: 206.2 },
  { name: "N3", domain: eightQueensDomain, x: 168.8, y: 302.5 },
  { name: "N4", domain: eightQueensDomain, x: 312.5, y: 340.0 },
  { name: "N5", domain: eightQueensDomain, x: 484.1, y: 298.4 },
  { name: "N6", domain: eightQueensDomain, x: 550.0, y: 207.0 },
  { name: "N7", domain: eightQueensDomain, x: 472.7, y: 97.9 },
];

export const CSP_PROBLEMS: CSPProblemMap = {
  simple1: {
    id: "simple1",
    name: "Simple Problem 1",
    description:
      "This simple CSP uses three integer variables and two constraints.",
    variables: [
      {
        name: "A",
        domain: ["1", "2", "3", "4"],
        x: 70.0,
        y: 340.0,
      },
      {
        name: "B",
        domain: ["1", "2", "3", "4"],
        x: 313.3,
        y: 340.0,
      },
      {
        name: "C",
        domain: ["1", "2", "3", "4"],
        x: 550.0,
        y: 60.0,
      },
    ],
    constraints: [
      {
        name: "A ≠ B",
        variables: ["A", "B"],
        allowed: [],
      },
      {
        name: "B ≠ C",
        variables: ["B", "C"],
        allowed: [],
      },
    ],
  },
  simple2: {
    id: "simple2",
    name: "Simple Problem 2",
    description:
      "This simple CSP uses three integer variables and three constraints.",
    variables: [
      {
        name: "A",
        domain: ["1", "2", "3", "4"],
        x: 70.0,
        y: 161.4,
      },
      {
        name: "B",
        domain: ["1", "2", "3", "4"],
        x: 371.4,
        y: 340.0,
      },
      {
        name: "C",
        domain: ["1", "2", "3", "4"],
        x: 550.0,
        y: 60.0,
      },
    ],
    constraints: [
      {
        name: "A ≠ C",
        variables: ["A", "C"],
        allowed: [],
      },
      {
        name: "B ≠ C",
        variables: ["B", "C"],
        allowed: [],
      },
      {
        name: "A ≠ B",
        variables: ["A", "B"],
        allowed: [],
      },
    ],
  },
  crossword1: {
    id: "crossword1",
    name: "Crossword Problem 1",
    description:
      "Crossword slot variables and letter intersection constraints.",
    variables: crossword1Variables,
    constraints: [
      buildCrosswordConstraint(crossword1Variables[2], crossword1Variables[3], 0, 2),
      buildCrosswordConstraint(crossword1Variables[0], crossword1Variables[3], 0, 0),
      buildCrosswordConstraint(crossword1Variables[1], crossword1Variables[3], 0, 1),
      buildCrosswordConstraint(crossword1Variables[0], crossword1Variables[5], 2, 0),
      buildCrosswordConstraint(crossword1Variables[1], crossword1Variables[5], 2, 1),
      buildCrosswordConstraint(crossword1Variables[2], crossword1Variables[5], 2, 2),
      buildCrosswordConstraint(crossword1Variables[2], crossword1Variables[4], 1, 2),
      buildCrosswordConstraint(crossword1Variables[1], crossword1Variables[4], 1, 1),
      buildCrosswordConstraint(crossword1Variables[0], crossword1Variables[4], 1, 0),
    ],
  },
  crossword2: {
    id: "crossword2",
    name: "Crossword Problem 2",
    description: "Larger crossword grid matching overlapping word constraints.",
    variables: crossword2Variables,
    constraints: [
      buildCrosswordConstraint(crossword2Variables[0], crossword2Variables[1], 0, 0),
      buildCrosswordConstraint(crossword2Variables[0], crossword2Variables[2], 2, 0),
      buildCrosswordConstraint(crossword2Variables[2], crossword2Variables[3], 2, 2),
      buildCrosswordConstraint(crossword2Variables[1], crossword2Variables[3], 2, 0),
      buildCrosswordConstraint(crossword2Variables[4], crossword2Variables[2], 0, 4),
    ],
  },
  scheduling1: {
    id: "scheduling1",
    name: "Scheduling Problem 1",
    description:
      "Tasks A, B, C, D, E with precedence and resource contention constraints.",
    variables: [
      {
        name: "A",
        domain: ["1", "2", "3", "4"],
        x: 70.0,
        y: 61.8,
      },
      {
        name: "B",
        domain: ["1", "2", "4"],
        x: 550.0,
        y: 60.0,
      },
      {
        name: "D",
        domain: ["1", "2", "3", "4"],
        x: 70.0,
        y: 235.6,
      },
      {
        name: "E",
        domain: ["1", "2", "3", "4"],
        x: 321.6,
        y: 340.0,
      },
      {
        name: "C",
        domain: ["1", "3", "4"],
        x: 548.7,
        y: 235.6,
      },
    ],
    constraints: [
      {
        name: "E ≠ D",
        variables: ["E", "D"],
        allowed: [],
      },
      {
        name: "E ≠ A",
        variables: ["E", "A"],
        allowed: [],
      },
      {
        name: "E ≠ B",
        variables: ["E", "B"],
        allowed: [],
      },
      {
        name: "B ≠ D",
        variables: ["B", "D"],
        allowed: [],
      },
      {
        name: "A ≠ D",
        variables: ["A", "D"],
        allowed: [],
      },
      {
        name: "A ≠ B",
        variables: ["A", "B"],
        allowed: [],
      },
      {
        name: "E ≠ C",
        variables: ["E", "C"],
        allowed: [],
      },
      {
        name: "C ≠ D",
        variables: ["C", "D"],
        allowed: [],
      },
      {
        name: "B ≠ C",
        variables: ["B", "C"],
        allowed: [],
      },
    ],
  },
  scheduling2: {
    id: "scheduling2",
    name: "Scheduling Problem 2",
    description: "Complex scheduling with deadline and precedence constraints.",
    variables: [
      {
        name: "A",
        domain: ["1", "2", "3", "4"],
        x: 280.9,
        y: 60.0,
      },
      {
        name: "B",
        domain: ["1", "2", "3", "4"],
        x: 70.0,
        y: 148.7,
      },
      {
        name: "C",
        domain: ["1", "2", "3", "4"],
        x: 440.9,
        y: 340.0,
      },
      {
        name: "D",
        domain: ["1", "2", "3", "4"],
        x: 550.0,
        y: 165.2,
      },
      {
        name: "E",
        domain: ["1", "2", "3", "4"],
        x: 131.8,
        y: 340.0,
      },
    ],
    constraints: [
      {
        name: "D ≠ C",
        variables: ["D", "C"],
        allowed: [],
      },
      {
        name: "A ≠ D",
        variables: ["A", "D"],
        allowed: [],
      },
      {
        name: "A ≠ B",
        variables: ["A", "B"],
        allowed: [],
      },
      {
        name: "E ≠ D",
        variables: ["E", "D"],
        allowed: [],
      },
      {
        name: "E ≠ C",
        variables: ["E", "C"],
        allowed: [],
      },
      {
        name: "E ≠ B",
        variables: ["E", "B"],
        allowed: [],
      },
      {
        name: "E ≠ A",
        variables: ["E", "A"],
        allowed: [
          [
            "F",
            "T",
            "F",
            "T",
            "T",
            "F",
            "T",
            "F",
            "F",
            "T",
            "F",
            "T",
            "T",
            "F",
            "T",
            "F",
          ],
        ],
      },
    ],
  },
  fiveQueens: {
    id: "fiveQueens",
    name: "Five Queens Problem",
    description:
      "Placing 5 queens on a 5x5 board such that no two queens attack each other.",
    variables: [
      {
        name: "A",
        domain: ["1", "2", "3", "4", "5"],
        x: 316.5,
        y: 60.0,
      },
      {
        name: "B",
        domain: ["1", "2", "3", "4", "5"],
        x: 550.0,
        y: 170.2,
      },
      {
        name: "C",
        domain: ["1", "2", "3", "4", "5"],
        x: 456.4,
        y: 340.0,
      },
      {
        name: "D",
        domain: ["1", "2", "3", "4", "5"],
        x: 153.0,
        y: 339.3,
      },
      {
        name: "E",
        domain: ["1", "2", "3", "4", "5"],
        x: 70.0,
        y: 168.8,
      },
    ],
    constraints: [
      {
        name: "",
        variables: ["C", "D"],
        allowed: [],
      },
      {
        name: "",
        variables: ["A", "D"],
        allowed: [],
      },
      {
        name: "",
        variables: ["B", "D"],
        allowed: [],
      },
      {
        name: "",
        variables: ["B", "C"],
        allowed: [],
      },
      {
        name: "",
        variables: ["A", "C"],
        allowed: [],
      },
      {
        name: "",
        variables: ["A", "B"],
        allowed: [],
      },
      {
        name: "",
        variables: ["D", "E"],
        allowed: [],
      },
      {
        name: "",
        variables: ["C", "E"],
        allowed: [],
      },
      {
        name: "",
        variables: ["B", "E"],
        allowed: [],
      },
      {
        name: "",
        variables: ["A", "E"],
        allowed: [],
      },
    ],
  },
  eightQueens: {
    id: "eightQueens",
    name: "Eight Queens Problem",
    description: "Placing 8 queens on an 8x8 chessboard without conflicts.",
    variables: [
      {
        name: "N0",
        domain: ["1", "2", "3", "4", "5", "6", "7", "8"],
        x: 307.0,
        y: 60.0,
      },
      {
        name: "N1",
        domain: ["1", "2", "3", "4", "5", "6", "7", "8"],
        x: 161.8,
        y: 105.7,
      },
      {
        name: "N2",
        domain: ["1", "2", "3", "4", "5", "6", "7", "8"],
        x: 70.0,
        y: 206.2,
      },
      {
        name: "N3",
        domain: ["1", "2", "3", "4", "5", "6", "7", "8"],
        x: 168.8,
        y: 302.5,
      },
      {
        name: "N4",
        domain: ["1", "2", "3", "4", "5", "6", "7", "8"],
        x: 312.5,
        y: 340.0,
      },
      {
        name: "N5",
        domain: ["1", "2", "3", "4", "5", "6", "7", "8"],
        x: 484.1,
        y: 298.4,
      },
      {
        name: "N6",
        domain: ["1", "2", "3", "4", "5", "6", "7", "8"],
        x: 550.0,
        y: 207.0,
      },
      {
        name: "N7",
        domain: ["1", "2", "3", "4", "5", "6", "7", "8"],
        x: 472.7,
        y: 97.9,
      },
    ],
    constraints: [
      {
        name: "",
        variables: ["N0", "N1"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N0", "N2"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N0", "N3"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N0", "N4"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N0", "N5"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N0", "N6"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N0", "N7"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N1", "N2"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N1", "N3"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N1", "N4"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N1", "N5"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N1", "N6"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N1", "N7"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N2", "N3"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N2", "N4"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N2", "N5"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N2", "N6"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N2", "N7"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N3", "N4"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N3", "N5"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N3", "N6"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N3", "N7"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N4", "N5"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N4", "N6"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N4", "N7"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N5", "N6"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N5", "N7"],
        allowed: [],
      },
      {
        name: "",
        variables: ["N6", "N7"],
        allowed: [],
      },
    ],
  },
  mapColoring: {
    id: "mapColoring",
    name: "Australia Map Coloring",
    description:
      "Color the regions of Australia (WA, NT, SA, Q, NSW, V, T) using 3 colors (Red, Green, Blue) such that no two adjacent regions share a color.",
    variables: [
      {
        name: "WA",
        domain: ["Red", "Green", "Blue"],
        x: 100,
        y: 170,
      },
      {
        name: "NT",
        domain: ["Red", "Green", "Blue"],
        x: 250,
        y: 100,
      },
      {
        name: "SA",
        domain: ["Red", "Green", "Blue"],
        x: 260,
        y: 230,
      },
      {
        name: "Q",
        domain: ["Red", "Green", "Blue"],
        x: 420,
        y: 130,
      },
      {
        name: "NSW",
        domain: ["Red", "Green", "Blue"],
        x: 450,
        y: 250,
      },
      {
        name: "V",
        domain: ["Red", "Green", "Blue"],
        x: 390,
        y: 330,
      },
      {
        name: "T",
        domain: ["Red", "Green", "Blue"],
        x: 460,
        y: 370,
      },
    ],
    constraints: [
      {
        name: "WA != NT",
        variables: ["WA", "NT"],
        allowed: [],
      },
      {
        name: "WA != SA",
        variables: ["WA", "SA"],
        allowed: [],
      },
      {
        name: "NT != SA",
        variables: ["NT", "SA"],
        allowed: [],
      },
      {
        name: "NT != Q",
        variables: ["NT", "Q"],
        allowed: [],
      },
      {
        name: "SA != Q",
        variables: ["SA", "Q"],
        allowed: [],
      },
      {
        name: "SA != NSW",
        variables: ["SA", "NSW"],
        allowed: [],
      },
      {
        name: "SA != V",
        variables: ["SA", "V"],
        allowed: [],
      },
      {
        name: "Q != NSW",
        variables: ["Q", "NSW"],
        allowed: [],
      },
      {
        name: "NSW != V",
        variables: ["NSW", "V"],
        allowed: [],
      },
    ],
  },
};
