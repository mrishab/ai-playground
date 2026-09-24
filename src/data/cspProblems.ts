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

export const CSP_PROBLEMS: Record<string, CSPProblem> = {
  "simple1": {
    "id": "simple1",
    "name": "Simple Problem 1",
    "description": "This simple CSP uses three integer variables and two constraints.",
    "variables": [
      {
        "name": "A",
        "domain": [
          "1",
          "2",
          "3",
          "4"
        ],
        "x": 70.0,
        "y": 340.0
      },
      {
        "name": "B",
        "domain": [
          "1",
          "2",
          "3",
          "4"
        ],
        "x": 313.3,
        "y": 340.0
      },
      {
        "name": "C",
        "domain": [
          "1",
          "2",
          "3",
          "4"
        ],
        "x": 550.0,
        "y": 60.0
      }
    ],
    "constraints": [
      {
        "name": "",
        "variables": [
          "A",
          "B"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "B",
          "C"
        ],
        "allowed": []
      }
    ]
  },
  "simple2": {
    "id": "simple2",
    "name": "Simple Problem 2",
    "description": "This simple CSP uses three integer variables and three constraints.",
    "variables": [
      {
        "name": "A",
        "domain": [
          "1",
          "2",
          "3",
          "4"
        ],
        "x": 70.0,
        "y": 161.4
      },
      {
        "name": "B",
        "domain": [
          "1",
          "2",
          "3",
          "4"
        ],
        "x": 371.4,
        "y": 340.0
      },
      {
        "name": "C",
        "domain": [
          "1",
          "2",
          "3",
          "4"
        ],
        "x": 550.0,
        "y": 60.0
      }
    ],
    "constraints": [
      {
        "name": "",
        "variables": [
          "A",
          "C"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "B",
          "C"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "A",
          "B"
        ],
        "allowed": []
      }
    ]
  },
  "crossword1": {
    "id": "crossword1",
    "name": "Crossword Problem 1",
    "description": "Crossword slot variables and letter intersection constraints.",
    "variables": [
      {
        "name": "A1",
        "domain": [
          "add",
          "ado",
          "age",
          "ago",
          "aid",
          "ail",
          "aim",
          "air",
          "and",
          "any",
          "ape",
          "apt",
          "arc",
          "are",
          "ark",
          "arm",
          "art",
          "ash",
          "ask",
          "auk",
          "awe",
          "awl",
          "aye",
          "bad",
          "bag",
          "ban",
          "bat",
          "bee",
          "boa",
          "ear",
          "eel",
          "eft",
          "far",
          "fat",
          "fit",
          "lee",
          "oaf",
          "rat",
          "tar",
          "tie"
        ],
        "x": 238.5,
        "y": 60.0
      },
      {
        "name": "A2",
        "domain": [
          "add",
          "ado",
          "age",
          "ago",
          "aid",
          "ail",
          "aim",
          "air",
          "and",
          "any",
          "ape",
          "apt",
          "arc",
          "are",
          "ark",
          "arm",
          "art",
          "ash",
          "ask",
          "auk",
          "awe",
          "awl",
          "aye",
          "bad",
          "bag",
          "ban",
          "bat",
          "bee",
          "boa",
          "ear",
          "eel",
          "eft",
          "far",
          "fat",
          "fit",
          "lee",
          "oaf",
          "rat",
          "tar",
          "tie"
        ],
        "x": 70.0,
        "y": 92.1
      },
      {
        "name": "A3",
        "domain": [
          "add",
          "ado",
          "age",
          "ago",
          "aid",
          "ail",
          "aim",
          "air",
          "and",
          "any",
          "ape",
          "apt",
          "arc",
          "are",
          "ark",
          "arm",
          "art",
          "ash",
          "ask",
          "auk",
          "awe",
          "awl",
          "aye",
          "bad",
          "bag",
          "ban",
          "bat",
          "bee",
          "boa",
          "ear",
          "eel",
          "eft",
          "far",
          "fat",
          "fit",
          "lee",
          "oaf",
          "rat",
          "tar",
          "tie"
        ],
        "x": 550.0,
        "y": 132.9
      },
      {
        "name": "D1",
        "domain": [
          "add",
          "ado",
          "age",
          "ago",
          "aid",
          "ail",
          "aim",
          "air",
          "and",
          "any",
          "ape",
          "apt",
          "arc",
          "are",
          "ark",
          "arm",
          "art",
          "ash",
          "ask",
          "auk",
          "awe",
          "awl",
          "aye",
          "bad",
          "bag",
          "ban",
          "bat",
          "bee",
          "boa",
          "ear",
          "eel",
          "eft",
          "far",
          "fat",
          "fit",
          "lee",
          "oaf",
          "rat",
          "tar",
          "tie"
        ],
        "x": 238.5,
        "y": 340.0
      },
      {
        "name": "D2",
        "domain": [
          "add",
          "ado",
          "age",
          "ago",
          "aid",
          "ail",
          "aim",
          "air",
          "and",
          "any",
          "ape",
          "apt",
          "arc",
          "are",
          "ark",
          "arm",
          "art",
          "ash",
          "ask",
          "auk",
          "awe",
          "awl",
          "aye",
          "bad",
          "bag",
          "ban",
          "bat",
          "bee",
          "boa",
          "ear",
          "eel",
          "eft",
          "far",
          "fat",
          "fit",
          "lee",
          "oaf",
          "rat",
          "tar",
          "tie"
        ],
        "x": 70.0,
        "y": 306.3
      },
      {
        "name": "D3",
        "domain": [
          "add",
          "ado",
          "age",
          "ago",
          "aid",
          "ail",
          "aim",
          "air",
          "and",
          "any",
          "ape",
          "apt",
          "arc",
          "are",
          "ark",
          "arm",
          "art",
          "ash",
          "ask",
          "auk",
          "awe",
          "awl",
          "aye",
          "bad",
          "bag",
          "ban",
          "bat",
          "bee",
          "boa",
          "ear",
          "eel",
          "eft",
          "far",
          "fat",
          "fit",
          "lee",
          "oaf",
          "rat",
          "tar",
          "tie"
        ],
        "x": 550.0,
        "y": 263.9
      }
    ],
    "constraints": [
      {
        "name": "",
        "variables": [
          "A3",
          "D1"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "A1",
          "D1"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "A2",
          "D1"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "A1",
          "D3"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "A2",
          "D3"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "A3",
          "D3"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "A3",
          "D2"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "A2",
          "D2"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "A1",
          "D2"
        ],
        "allowed": []
      }
    ]
  },
  "crossword2": {
    "id": "crossword2",
    "name": "Crossword Problem 2",
    "description": "Larger crossword grid matching overlapping word constraints.",
    "variables": [
      {
        "name": "oneacross",
        "domain": [
          "ant",
          "big",
          "bus",
          "car",
          "has"
        ],
        "x": 70.0,
        "y": 154.2
      },
      {
        "name": "onedown",
        "domain": [
          "book",
          "buys",
          "hold",
          "lane",
          "year"
        ],
        "x": 181.4,
        "y": 340.0
      },
      {
        "name": "twodown",
        "domain": [
          "ginger",
          "search",
          "symbol",
          "syntax"
        ],
        "x": 247.6,
        "y": 63.5
      },
      {
        "name": "threeacross",
        "domain": [
          "book",
          "buys",
          "hold",
          "land",
          "year"
        ],
        "x": 507.1,
        "y": 328.1
      },
      {
        "name": "fouracross",
        "domain": [
          "ant",
          "big",
          "bus",
          "car",
          "has"
        ],
        "x": 550.0,
        "y": 60.0
      }
    ],
    "constraints": [
      {
        "name": "",
        "variables": [
          "oneacross",
          "onedown"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "oneacross",
          "twodown"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "twodown",
          "threeacross"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "onedown",
          "threeacross"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "fouracross",
          "twodown"
        ],
        "allowed": []
      }
    ]
  },
  "scheduling1": {
    "id": "scheduling1",
    "name": "Scheduling Problem 1",
    "description": "Tasks A, B, C, D, E with precedence and resource contention constraints.",
    "variables": [
      {
        "name": "A",
        "domain": [
          "1",
          "2",
          "3",
          "4"
        ],
        "x": 70.0,
        "y": 61.8
      },
      {
        "name": "B",
        "domain": [
          "1",
          "2",
          "4"
        ],
        "x": 550.0,
        "y": 60.0
      },
      {
        "name": "D",
        "domain": [
          "1",
          "2",
          "3",
          "4"
        ],
        "x": 70.0,
        "y": 235.6
      },
      {
        "name": "E",
        "domain": [
          "1",
          "2",
          "3",
          "4"
        ],
        "x": 321.6,
        "y": 340.0
      },
      {
        "name": "C",
        "domain": [
          "1",
          "3",
          "4"
        ],
        "x": 548.7,
        "y": 235.6
      }
    ],
    "constraints": [
      {
        "name": "",
        "variables": [
          "E",
          "D"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "E",
          "A"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "E",
          "B"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "B",
          "D"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "A",
          "D"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "A",
          "B"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "E",
          "C"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "C",
          "D"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "B",
          "C"
        ],
        "allowed": []
      }
    ]
  },
  "scheduling2": {
    "id": "scheduling2",
    "name": "Scheduling Problem 2",
    "description": "Complex scheduling with deadline and precedence constraints.",
    "variables": [
      {
        "name": "A",
        "domain": [
          "1",
          "2",
          "3",
          "4"
        ],
        "x": 280.9,
        "y": 60.0
      },
      {
        "name": "B",
        "domain": [
          "1",
          "2",
          "3",
          "4"
        ],
        "x": 70.0,
        "y": 148.7
      },
      {
        "name": "C",
        "domain": [
          "1",
          "2",
          "3",
          "4"
        ],
        "x": 440.9,
        "y": 340.0
      },
      {
        "name": "D",
        "domain": [
          "1",
          "2",
          "3",
          "4"
        ],
        "x": 550.0,
        "y": 165.2
      },
      {
        "name": "E",
        "domain": [
          "1",
          "2",
          "3",
          "4"
        ],
        "x": 131.8,
        "y": 340.0
      }
    ],
    "constraints": [
      {
        "name": "",
        "variables": [
          "D",
          "C"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "A",
          "D"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "A",
          "B"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "E",
          "D"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "E",
          "C"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "E",
          "B"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "E",
          "A"
        ],
        "allowed": [
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
            "F"
          ]
        ]
      }
    ]
  },
  "fiveQueens": {
    "id": "fiveQueens",
    "name": "Five Queens Problem",
    "description": "Placing 5 queens on a 5x5 board such that no two queens attack each other.",
    "variables": [
      {
        "name": "A",
        "domain": [
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "x": 316.5,
        "y": 60.0
      },
      {
        "name": "B",
        "domain": [
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "x": 550.0,
        "y": 170.2
      },
      {
        "name": "C",
        "domain": [
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "x": 456.4,
        "y": 340.0
      },
      {
        "name": "D",
        "domain": [
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "x": 153.0,
        "y": 339.3
      },
      {
        "name": "E",
        "domain": [
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        "x": 70.0,
        "y": 168.8
      }
    ],
    "constraints": [
      {
        "name": "",
        "variables": [
          "C",
          "D"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "A",
          "D"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "B",
          "D"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "B",
          "C"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "A",
          "C"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "A",
          "B"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "D",
          "E"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "C",
          "E"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "B",
          "E"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "A",
          "E"
        ],
        "allowed": []
      }
    ]
  },
  "eightQueens": {
    "id": "eightQueens",
    "name": "Eight Queens Problem",
    "description": "Placing 8 queens on an 8x8 chessboard without conflicts.",
    "variables": [
      {
        "name": "N0",
        "domain": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8"
        ],
        "x": 307.0,
        "y": 60.0
      },
      {
        "name": "N1",
        "domain": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8"
        ],
        "x": 161.8,
        "y": 105.7
      },
      {
        "name": "N2",
        "domain": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8"
        ],
        "x": 70.0,
        "y": 206.2
      },
      {
        "name": "N3",
        "domain": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8"
        ],
        "x": 168.8,
        "y": 302.5
      },
      {
        "name": "N4",
        "domain": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8"
        ],
        "x": 312.5,
        "y": 340.0
      },
      {
        "name": "N5",
        "domain": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8"
        ],
        "x": 484.1,
        "y": 298.4
      },
      {
        "name": "N6",
        "domain": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8"
        ],
        "x": 550.0,
        "y": 207.0
      },
      {
        "name": "N7",
        "domain": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8"
        ],
        "x": 472.7,
        "y": 97.9
      }
    ],
    "constraints": [
      {
        "name": "",
        "variables": [
          "N0",
          "N1"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N0",
          "N2"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N0",
          "N3"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N0",
          "N4"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N0",
          "N5"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N0",
          "N6"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N0",
          "N7"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N1",
          "N2"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N1",
          "N3"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N1",
          "N4"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N1",
          "N5"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N1",
          "N6"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N1",
          "N7"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N2",
          "N3"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N2",
          "N4"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N2",
          "N5"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N2",
          "N6"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N2",
          "N7"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N3",
          "N4"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N3",
          "N5"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N3",
          "N6"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N3",
          "N7"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N4",
          "N5"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N4",
          "N6"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N4",
          "N7"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N5",
          "N6"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N5",
          "N7"
        ],
        "allowed": []
      },
      {
        "name": "",
        "variables": [
          "N6",
          "N7"
        ],
        "allowed": []
      }
    ]
  },
  "mapColoring": {
    "id": "mapColoring",
    "name": "Australia Map Coloring",
    "description": "Color the regions of Australia (WA, NT, SA, Q, NSW, V, T) using 3 colors (Red, Green, Blue) such that no two adjacent regions share a color.",
    "variables": [
      {
        "name": "WA",
        "domain": [
          "Red",
          "Green",
          "Blue"
        ],
        "x": 100,
        "y": 170
      },
      {
        "name": "NT",
        "domain": [
          "Red",
          "Green",
          "Blue"
        ],
        "x": 250,
        "y": 100
      },
      {
        "name": "SA",
        "domain": [
          "Red",
          "Green",
          "Blue"
        ],
        "x": 260,
        "y": 230
      },
      {
        "name": "Q",
        "domain": [
          "Red",
          "Green",
          "Blue"
        ],
        "x": 420,
        "y": 130
      },
      {
        "name": "NSW",
        "domain": [
          "Red",
          "Green",
          "Blue"
        ],
        "x": 450,
        "y": 250
      },
      {
        "name": "V",
        "domain": [
          "Red",
          "Green",
          "Blue"
        ],
        "x": 390,
        "y": 330
      },
      {
        "name": "T",
        "domain": [
          "Red",
          "Green",
          "Blue"
        ],
        "x": 460,
        "y": 370
      }
    ],
    "constraints": [
      {
        "name": "WA != NT",
        "variables": [
          "WA",
          "NT"
        ],
        "allowed": []
      },
      {
        "name": "WA != SA",
        "variables": [
          "WA",
          "SA"
        ],
        "allowed": []
      },
      {
        "name": "NT != SA",
        "variables": [
          "NT",
          "SA"
        ],
        "allowed": []
      },
      {
        "name": "NT != Q",
        "variables": [
          "NT",
          "Q"
        ],
        "allowed": []
      },
      {
        "name": "SA != Q",
        "variables": [
          "SA",
          "Q"
        ],
        "allowed": []
      },
      {
        "name": "SA != NSW",
        "variables": [
          "SA",
          "NSW"
        ],
        "allowed": []
      },
      {
        "name": "SA != V",
        "variables": [
          "SA",
          "V"
        ],
        "allowed": []
      },
      {
        "name": "Q != NSW",
        "variables": [
          "Q",
          "NSW"
        ],
        "allowed": []
      },
      {
        "name": "NSW != V",
        "variables": [
          "NSW",
          "V"
        ],
        "allowed": []
      }
    ]
  }
};
