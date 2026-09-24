export interface BayesNode {
  id: string;
  name: string;
  type: 'chance' | 'decision' | 'utility';
  outcomes: string[];
  x: number;
  y: number;
}

export interface BayesCPT {
  target: string;
  parents: string[];
  table: number[];
}

export interface BayesNetwork {
  id: string;
  name: string;
  description: string;
  nodes: BayesNode[];
  cpts: BayesCPT[];
}

export const BAYES_NETWORKS: Record<string, BayesNetwork> = {
  "umbrella": {
    "id": "umbrella",
    "name": "Simple Umbrella Decision",
    "description": "This is a very simple decision problem built by Ross D. Shachter modeling the decision of whether or not to bring an\n\t\t\tumbrella based on the weather forecast.",
    "nodes": [
      {
        "id": "Weather",
        "name": "Weather",
        "type": "chance",
        "outcomes": [
          "Sunshine",
          "Rain"
        ],
        "x": 82.7,
        "y": 60.0
      },
      {
        "id": "Forecast",
        "name": "Forecast",
        "type": "chance",
        "outcomes": [
          "Sunny",
          "Cloudy",
          "Rainy"
        ],
        "x": 70.0,
        "y": 217.0
      },
      {
        "id": "Umbrella",
        "name": "Umbrella",
        "type": "decision",
        "outcomes": [
          "Take_It",
          "Leave_At_Home"
        ],
        "x": 178.0,
        "y": 360.0
      },
      {
        "id": "Satisfaction",
        "name": "Satisfaction",
        "type": "utility",
        "outcomes": [
          "true",
          "false"
        ],
        "x": 570.0,
        "y": 360.0
      }
    ],
    "cpts": [
      {
        "target": "Weather",
        "parents": [],
        "table": [
          0.7,
          0.3
        ]
      },
      {
        "target": "Forecast",
        "parents": [
          "Weather"
        ],
        "table": [
          0.7,
          0.2,
          0.1,
          0.15,
          0.25,
          0.6
        ]
      },
      {
        "target": "Umbrella",
        "parents": [
          "Forecast"
        ],
        "table": []
      },
      {
        "target": "Satisfaction",
        "parents": [
          "Weather",
          "Umbrella"
        ],
        "table": [
          20.0,
          100.0,
          70.0,
          0.0
        ]
      }
    ]
  },
  "basicfirealarm": {
    "id": "basicfirealarm",
    "name": "Fire Alarm Belief Network",
    "description": "This example models the problem of whether a fire alarm went off because of tampering or a real fire.",
    "nodes": [
      {
        "id": "tampering",
        "name": "tampering",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 70.0,
        "y": 62.4
      },
      {
        "id": "fire",
        "name": "fire",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 421.6,
        "y": 60.0
      },
      {
        "id": "alarm",
        "name": "alarm",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 236.7,
        "y": 164.0
      },
      {
        "id": "smoke",
        "name": "smoke",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 570.0,
        "y": 159.2
      },
      {
        "id": "leaving",
        "name": "leaving",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 239.3,
        "y": 265.6
      },
      {
        "id": "report",
        "name": "report",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 241.9,
        "y": 360.0
      }
    ],
    "cpts": [
      {
        "target": "tampering",
        "parents": [],
        "table": [
          0.02,
          0.98
        ]
      },
      {
        "target": "fire",
        "parents": [],
        "table": [
          0.01,
          0.99
        ]
      },
      {
        "target": "alarm",
        "parents": [
          "tampering",
          "fire"
        ],
        "table": [
          0.5,
          0.5,
          0.85,
          0.15,
          0.99,
          0.01,
          0.0,
          1.0
        ]
      },
      {
        "target": "smoke",
        "parents": [
          "fire"
        ],
        "table": [
          0.9,
          0.1,
          0.01,
          0.99
        ]
      },
      {
        "target": "leaving",
        "parents": [
          "alarm"
        ],
        "table": [
          0.88,
          0.12,
          0.0,
          1.0
        ]
      },
      {
        "target": "report",
        "parents": [
          "leaving"
        ],
        "table": [
          0.75,
          0.25,
          0.01,
          0.99
        ]
      }
    ]
  },
  "decisionfirealarm": {
    "id": "decisionfirealarm",
    "name": "Fire Alarm Decision Problem",
    "description": "The fire alarm decision problem is similar to the Fire Alarm Belief Network, except that it models utilities and decisions as well as probabilities.",
    "nodes": [
      {
        "id": "tampering",
        "name": "tampering",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 70.0,
        "y": 75.8
      },
      {
        "id": "fire",
        "name": "fire",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 281.6,
        "y": 73.9
      },
      {
        "id": "alarm",
        "name": "alarm",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 170.3,
        "y": 154.6
      },
      {
        "id": "smoke",
        "name": "smoke",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 370.9,
        "y": 150.9
      },
      {
        "id": "leaving",
        "name": "leaving",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 148.2,
        "y": 230.2
      },
      {
        "id": "report",
        "name": "report",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 70.8,
        "y": 315.1
      },
      {
        "id": "checkSmoke",
        "name": "checkSmoke",
        "type": "decision",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 253.1,
        "y": 267.4
      },
      {
        "id": "SeeSmoke",
        "name": "SeeSmoke",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 424.0,
        "y": 224.4
      },
      {
        "id": "call",
        "name": "call",
        "type": "decision",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 446.6,
        "y": 360.0
      },
      {
        "id": "Utility",
        "name": "Utility",
        "type": "utility",
        "outcomes": [
          "true",
          "false"
        ],
        "x": 570.0,
        "y": 60.0
      }
    ],
    "cpts": [
      {
        "target": "tampering",
        "parents": [],
        "table": [
          0.02,
          0.98
        ]
      },
      {
        "target": "fire",
        "parents": [],
        "table": [
          0.01,
          0.99
        ]
      },
      {
        "target": "alarm",
        "parents": [
          "tampering",
          "fire"
        ],
        "table": [
          0.5,
          0.5,
          0.85,
          0.15,
          0.99,
          0.01,
          0.0001,
          0.9999
        ]
      },
      {
        "target": "smoke",
        "parents": [
          "fire"
        ],
        "table": [
          0.9,
          0.1,
          0.01,
          0.99
        ]
      },
      {
        "target": "leaving",
        "parents": [
          "alarm"
        ],
        "table": [
          0.88,
          0.12,
          0.001,
          0.999
        ]
      },
      {
        "target": "report",
        "parents": [
          "leaving"
        ],
        "table": [
          0.75,
          0.25,
          0.01,
          0.99
        ]
      },
      {
        "target": "checkSmoke",
        "parents": [
          "report"
        ],
        "table": []
      },
      {
        "target": "SeeSmoke",
        "parents": [
          "smoke",
          "checkSmoke"
        ],
        "table": [
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0
        ]
      },
      {
        "target": "call",
        "parents": [
          "SeeSmoke",
          "report",
          "checkSmoke"
        ],
        "table": []
      },
      {
        "target": "Utility",
        "parents": [
          "fire",
          "checkSmoke",
          "call"
        ],
        "table": [
          -220.0,
          -5020.0,
          -200.0,
          -5000.0,
          -220.0,
          -20.0,
          -200.0,
          0.0
        ]
      }
    ]
  },
  "car": {
    "id": "car",
    "name": "Car Starting Problem",
    "description": "The car starting problem is a larger network intended to model the behaviour of a car, based on the state of its parts.",
    "nodes": [
      {
        "id": "Alternator OK",
        "name": "Alternator OK",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 394.7,
        "y": 62.1
      },
      {
        "id": "Charging System OK",
        "name": "Charging System OK",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 543.0,
        "y": 92.5
      },
      {
        "id": "Battery Age",
        "name": "Battery Age",
        "type": "chance",
        "outcomes": [
          "new",
          "old",
          "very_old"
        ],
        "x": 251.4,
        "y": 60.0
      },
      {
        "id": "Battery Voltage",
        "name": "Battery Voltage",
        "type": "chance",
        "outcomes": [
          "strong",
          "weak",
          "dead"
        ],
        "x": 416.7,
        "y": 135.9
      },
      {
        "id": "Main Fuse OK",
        "name": "Main Fuse OK",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 80.3,
        "y": 92.8
      },
      {
        "id": "Distributer OK",
        "name": "Distributer OK",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 70.0,
        "y": 164.5
      },
      {
        "id": "Voltage at Plug",
        "name": "Voltage at Plug",
        "type": "chance",
        "outcomes": [
          "strong",
          "weak",
          "dead"
        ],
        "x": 221.3,
        "y": 131.0
      },
      {
        "id": "Starter Motor OK",
        "name": "Starter Motor OK",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 85.7,
        "y": 335.0
      },
      {
        "id": "Starter System OK",
        "name": "Starter System OK",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 245.2,
        "y": 353.3
      },
      {
        "id": "Headlights",
        "name": "Headlights",
        "type": "chance",
        "outcomes": [
          "bright",
          "dim",
          "off"
        ],
        "x": 464.1,
        "y": 184.7
      },
      {
        "id": "Spark Plugs",
        "name": "Spark Plugs",
        "type": "chance",
        "outcomes": [
          "okay",
          "too_wide",
          "fouled"
        ],
        "x": 296.7,
        "y": 183.1
      },
      {
        "id": "Car Cranks",
        "name": "Car Cranks",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 376.6,
        "y": 360.0
      },
      {
        "id": "Spark Timing",
        "name": "Spark Timing",
        "type": "chance",
        "outcomes": [
          "good",
          "bad",
          "very_bad"
        ],
        "x": 70.0,
        "y": 252.8
      },
      {
        "id": "Fuel System OK",
        "name": "Fuel System OK",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 455.4,
        "y": 256.1
      },
      {
        "id": "Air Filter Clean",
        "name": "Air Filter Clean",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 570.0,
        "y": 225.8
      },
      {
        "id": "Air System OK",
        "name": "Air System OK",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 566.3,
        "y": 288.5
      },
      {
        "id": "Car Starts",
        "name": "Car Starts",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 520.2,
        "y": 349.8
      },
      {
        "id": "Spark Quality",
        "name": "Spark Quality",
        "type": "chance",
        "outcomes": [
          "good",
          "bad",
          "very_bad"
        ],
        "x": 247.8,
        "y": 246.8
      },
      {
        "id": "Spark Adequate",
        "name": "Spark Adequate",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 365.6,
        "y": 309.3
      }
    ],
    "cpts": [
      {
        "target": "Alternator OK",
        "parents": [],
        "table": [
          0.9997,
          0.0003
        ]
      },
      {
        "target": "Charging System OK",
        "parents": [
          "Alternator OK"
        ],
        "table": [
          0.995,
          0.005,
          0.0,
          1.0
        ]
      },
      {
        "target": "Battery Age",
        "parents": [],
        "table": [
          0.4,
          0.4,
          0.2
        ]
      },
      {
        "target": "Battery Voltage",
        "parents": [
          "Charging System OK",
          "Battery Age"
        ],
        "table": [
          0.999,
          0.0008,
          0.0002,
          0.99,
          0.008,
          0.002,
          0.6,
          0.3,
          0.1,
          0.8,
          0.15,
          0.05,
          0.05,
          0.3,
          0.65,
          0.002,
          0.1,
          0.898
        ]
      },
      {
        "target": "Main Fuse OK",
        "parents": [],
        "table": [
          0.999,
          0.001
        ]
      },
      {
        "target": "Distributer OK",
        "parents": [],
        "table": [
          0.99,
          0.01
        ]
      },
      {
        "target": "Voltage at Plug",
        "parents": [
          "Battery Voltage",
          "Main Fuse OK",
          "Distributer OK"
        ],
        "table": [
          0.98,
          0.015,
          0.005,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.1,
          0.8,
          0.1,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0
        ]
      },
      {
        "target": "Starter Motor OK",
        "parents": [],
        "table": [
          0.992,
          0.008
        ]
      },
      {
        "target": "Starter System OK",
        "parents": [
          "Battery Voltage",
          "Main Fuse OK",
          "Starter Motor OK"
        ],
        "table": [
          0.998,
          0.002,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.72,
          0.28,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0
        ]
      },
      {
        "target": "Headlights",
        "parents": [
          "Voltage at Plug"
        ],
        "table": [
          0.98,
          0.015,
          0.005,
          0.05,
          0.9,
          0.05,
          0.0,
          0.0,
          1.0
        ]
      },
      {
        "target": "Spark Plugs",
        "parents": [],
        "table": [
          0.99,
          0.003,
          0.007
        ]
      },
      {
        "target": "Car Cranks",
        "parents": [
          "Starter System OK"
        ],
        "table": [
          0.98,
          0.02,
          0.0,
          1.0
        ]
      },
      {
        "target": "Spark Timing",
        "parents": [
          "Distributer OK"
        ],
        "table": [
          0.97,
          0.02,
          0.01,
          0.2,
          0.3,
          0.5
        ]
      },
      {
        "target": "Fuel System OK",
        "parents": [],
        "table": [
          0.9,
          0.1
        ]
      },
      {
        "target": "Air Filter Clean",
        "parents": [],
        "table": [
          0.9,
          0.1
        ]
      },
      {
        "target": "Air System OK",
        "parents": [
          "Air Filter Clean"
        ],
        "table": [
          0.9,
          0.1,
          0.3,
          0.7
        ]
      },
      {
        "target": "Car Starts",
        "parents": [
          "Car Cranks",
          "Fuel System OK",
          "Air System OK",
          "Spark Adequate"
        ],
        "table": [
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0
        ]
      },
      {
        "target": "Spark Quality",
        "parents": [
          "Voltage at Plug",
          "Spark Plugs"
        ],
        "table": [
          1.0,
          0.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          0.0,
          0.5,
          0.5,
          0.0,
          0.2,
          0.8,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0
        ]
      },
      {
        "target": "Spark Adequate",
        "parents": [
          "Spark Timing",
          "Spark Quality"
        ],
        "table": [
          0.99,
          0.01,
          0.5,
          0.5,
          0.1,
          0.9,
          0.5,
          0.5,
          0.05,
          0.95,
          0.01,
          0.99,
          0.1,
          0.9,
          0.01,
          0.99,
          0.0,
          1.0
        ]
      }
    ]
  },
  "carbuyer": {
    "id": "carbuyer",
    "name": "Car Buying Decision",
    "description": "The car buying decision models the decision problem of a potential car buyer.",
    "nodes": [
      {
        "id": "Car Condition",
        "name": "Car Condition",
        "type": "chance",
        "outcomes": [
          "Peach",
          "Lemon"
        ],
        "x": 152.4,
        "y": 360.0
      },
      {
        "id": "Test 1",
        "name": "Test 1",
        "type": "decision",
        "outcomes": [
          "NoTest",
          "Steering",
          "Fuel_Elect",
          "Transmission"
        ],
        "x": 70.0,
        "y": 106.0
      },
      {
        "id": "Utility",
        "name": "Utility",
        "type": "utility",
        "outcomes": [
          "true",
          "false"
        ],
        "x": 570.0,
        "y": 226.2
      },
      {
        "id": "Buy It?",
        "name": "Buy It?",
        "type": "decision",
        "outcomes": [
          "DontBuy",
          "Buy",
          "BuyGuaranteed"
        ],
        "x": 562.3,
        "y": 110.2
      },
      {
        "id": "Test 2",
        "name": "Test 2",
        "type": "decision",
        "outcomes": [
          "NoTest",
          "Differential"
        ],
        "x": 298.0,
        "y": 60.0
      },
      {
        "id": "Test 2 Result",
        "name": "Test 2 Result",
        "type": "chance",
        "outcomes": [
          "NoResult",
          "NoDefects",
          "OneDefect"
        ],
        "x": 340.1,
        "y": 226.2
      },
      {
        "id": "Test 1 Result",
        "name": "Test 1 Result",
        "type": "chance",
        "outcomes": [
          "NoResult",
          "NoDefects",
          "OneDefect",
          "TwoDefects"
        ],
        "x": 85.3,
        "y": 225.2
      }
    ],
    "cpts": [
      {
        "target": "Car Condition",
        "parents": [],
        "table": [
          0.8,
          0.2
        ]
      },
      {
        "target": "Test 1",
        "parents": [],
        "table": []
      },
      {
        "target": "Utility",
        "parents": [
          "Test 1",
          "Test 2",
          "Buy It?",
          "Car Condition"
        ],
        "table": [
          0.0,
          0.0,
          60.0,
          -100.0,
          20.0,
          40.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          -9.0,
          -9.0,
          51.0,
          -109.0,
          11.0,
          31.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          -13.0,
          13.0,
          47.0,
          -113.0,
          7.0,
          27.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          -10.0,
          -10.0,
          50.0,
          -110.0,
          10.0,
          30.0,
          -14.0,
          -14.0,
          46.0,
          -114.0,
          6.0,
          26.0
        ]
      },
      {
        "target": "Buy It?",
        "parents": [
          "Test 2",
          "Test 1",
          "Test 2 Result",
          "Test 1 Result"
        ],
        "table": []
      },
      {
        "target": "Test 2",
        "parents": [
          "Test 1",
          "Test 1 Result"
        ],
        "table": []
      },
      {
        "target": "Test 2 Result",
        "parents": [
          "Test 1",
          "Test 1 Result",
          "Test 2",
          "Car Condition"
        ],
        "table": [
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          0.0,
          0.888,
          0.112,
          0.0,
          0.666,
          0.334,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          0.444,
          0.556,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0
        ]
      },
      {
        "target": "Test 1 Result",
        "parents": [
          "Test 1",
          "Car Condition"
        ],
        "table": [
          1.0,
          0.0,
          0.0,
          0.0,
          1.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.9,
          0.1,
          0.0,
          0.0,
          0.4,
          0.6,
          0.0,
          0.0,
          0.8,
          0.2,
          0.0,
          0.0,
          0.1333,
          0.5333,
          0.3334,
          0.0,
          0.9,
          0.1,
          0.0,
          0.0,
          0.4,
          0.6,
          0.0
        ]
      }
    ]
  },
  "deliveryDecision": {
    "id": "deliveryDecision",
    "name": "Delivery Decision",
    "description": "Decision network from Figure 9.5 of Poole and Mackworth, Artificial Intelligence: foundations of computational agents.",
    "nodes": [
      {
        "id": "Accident",
        "name": "Accident",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 440.4,
        "y": 60.0
      },
      {
        "id": "Which Way",
        "name": "Which Way",
        "type": "decision",
        "outcomes": [
          "short",
          "long"
        ],
        "x": 208.0,
        "y": 140.9
      },
      {
        "id": "Wear Pads",
        "name": "Wear Pads",
        "type": "decision",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 70.0,
        "y": 360.0
      },
      {
        "id": "Utlility",
        "name": "Utlility",
        "type": "utility",
        "outcomes": [
          "true",
          "false"
        ],
        "x": 570.0,
        "y": 313.0
      }
    ],
    "cpts": [
      {
        "target": "Accident",
        "parents": [
          "Which Way"
        ],
        "table": [
          0.2,
          0.8,
          0.01,
          0.99
        ]
      },
      {
        "target": "Which Way",
        "parents": [
          "Wear Pads"
        ],
        "table": [
          0.0,
          0.0
        ]
      },
      {
        "target": "Wear Pads",
        "parents": [],
        "table": [
          0.0
        ]
      },
      {
        "target": "Utlility",
        "parents": [
          "Accident",
          "Which Way",
          "Wear Pads"
        ],
        "table": [
          35.0,
          3.0,
          30.0,
          0.0,
          95.0,
          100.0,
          75.0,
          80.0
        ]
      }
    ]
  },
  "elec": {
    "id": "elec",
    "name": "Electrical Diagnosis Problem",
    "description": "The electrical diagnosis problem is from Computational Intelligence, Chapter 10.3, and models the wiring of a house.",
    "nodes": [
      {
        "id": "outside_power",
        "name": "outside_power",
        "type": "chance",
        "outcomes": [
          "on",
          "off"
        ],
        "x": 424.0,
        "y": 60.0
      },
      {
        "id": "cb1_st",
        "name": "cb1_st",
        "type": "chance",
        "outcomes": [
          "on",
          "off"
        ],
        "x": 169.7,
        "y": 93.9
      },
      {
        "id": "w3",
        "name": "w3",
        "type": "chance",
        "outcomes": [
          "live",
          "dead"
        ],
        "x": 293.4,
        "y": 118.9
      },
      {
        "id": "cb2_st",
        "name": "cb2_st",
        "type": "chance",
        "outcomes": [
          "on",
          "off"
        ],
        "x": 570.0,
        "y": 96.6
      },
      {
        "id": "w6",
        "name": "w6",
        "type": "chance",
        "outcomes": [
          "live",
          "dead"
        ],
        "x": 463.5,
        "y": 138.6
      },
      {
        "id": "p2",
        "name": "p2",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 537.4,
        "y": 212.7
      },
      {
        "id": "p1",
        "name": "p1",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 393.0,
        "y": 210.0
      },
      {
        "id": "s1_st",
        "name": "s1_st",
        "type": "chance",
        "outcomes": [
          "ok",
          "upside_down",
          "short",
          "intermittent",
          "broken"
        ],
        "x": 193.7,
        "y": 158.2
      },
      {
        "id": "s1_pos",
        "name": "s1_pos",
        "type": "chance",
        "outcomes": [
          "up",
          "down"
        ],
        "x": 78.6,
        "y": 160.0
      },
      {
        "id": "w1",
        "name": "w1",
        "type": "chance",
        "outcomes": [
          "live",
          "dead"
        ],
        "x": 131.9,
        "y": 218.0
      },
      {
        "id": "w2",
        "name": "w2",
        "type": "chance",
        "outcomes": [
          "live",
          "dead"
        ],
        "x": 252.1,
        "y": 216.2
      },
      {
        "id": "w0",
        "name": "w0",
        "type": "chance",
        "outcomes": [
          "live",
          "dead"
        ],
        "x": 195.4,
        "y": 281.4
      },
      {
        "id": "s2_st",
        "name": "s2_st",
        "type": "chance",
        "outcomes": [
          "ok",
          "upside_down",
          "short",
          "intermittent",
          "broken"
        ],
        "x": 71.7,
        "y": 252.9
      },
      {
        "id": "s2_pos",
        "name": "s2_pos",
        "type": "chance",
        "outcomes": [
          "up",
          "down"
        ],
        "x": 70.0,
        "y": 301.1
      },
      {
        "id": "l1_lit",
        "name": "l1_lit",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 216.0,
        "y": 360.0
      },
      {
        "id": "w4",
        "name": "w4",
        "type": "chance",
        "outcomes": [
          "live",
          "dead"
        ],
        "x": 374.1,
        "y": 276.1
      },
      {
        "id": "s3_pos",
        "name": "s3_pos",
        "type": "chance",
        "outcomes": [
          "up",
          "down"
        ],
        "x": 436.0,
        "y": 243.9
      },
      {
        "id": "s3_st",
        "name": "s3_st",
        "type": "chance",
        "outcomes": [
          "ok",
          "upside_down",
          "short",
          "intermittent",
          "broken"
        ],
        "x": 545.9,
        "y": 277.9
      },
      {
        "id": "l2_lit",
        "name": "l2_lit",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 427.4,
        "y": 351.1
      },
      {
        "id": "l2_st",
        "name": "l2_st",
        "type": "chance",
        "outcomes": [
          "ok",
          "intermittent",
          "broken"
        ],
        "x": 537.4,
        "y": 324.3
      },
      {
        "id": "l1_st",
        "name": "l1_st",
        "type": "chance",
        "outcomes": [
          "ok",
          "intermittent",
          "broken"
        ],
        "x": 303.7,
        "y": 325.2
      }
    ],
    "cpts": [
      {
        "target": "outside_power",
        "parents": [],
        "table": [
          0.98,
          0.02
        ]
      },
      {
        "target": "cb1_st",
        "parents": [],
        "table": [
          0.999,
          0.001
        ]
      },
      {
        "target": "w3",
        "parents": [
          "outside_power",
          "cb1_st"
        ],
        "table": [
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0
        ]
      },
      {
        "target": "cb2_st",
        "parents": [],
        "table": [
          0.999,
          0.001
        ]
      },
      {
        "target": "w6",
        "parents": [
          "outside_power",
          "cb2_st"
        ],
        "table": [
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0
        ]
      },
      {
        "target": "p2",
        "parents": [
          "w6"
        ],
        "table": [
          1.0,
          0.0,
          0.0,
          1.0
        ]
      },
      {
        "target": "p1",
        "parents": [
          "w3"
        ],
        "table": [
          1.0,
          0.0,
          0.0,
          1.0
        ]
      },
      {
        "target": "s1_st",
        "parents": [],
        "table": [
          0.9,
          0.01,
          0.04,
          0.03,
          0.02
        ]
      },
      {
        "target": "s1_pos",
        "parents": [],
        "table": [
          0.5,
          0.5
        ]
      },
      {
        "target": "w1",
        "parents": [
          "w3",
          "s1_st",
          "s1_pos"
        ],
        "table": [
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          1.0,
          1.0,
          0.0,
          0.6,
          0.4,
          0.4,
          0.6,
          0.4,
          0.6,
          0.01,
          0.99,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0
        ]
      },
      {
        "target": "w2",
        "parents": [
          "w3",
          "s1_st",
          "s1_pos"
        ],
        "table": [
          0.0,
          1.0,
          1.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.4,
          0.6,
          0.4,
          0.6,
          0.2,
          0.8,
          0.2,
          0.8,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0
        ]
      },
      {
        "target": "w0",
        "parents": [
          "w1",
          "s2_st",
          "s2_pos",
          "w2"
        ],
        "table": [
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          0.0,
          1.0,
          1.0,
          0.0,
          0.0,
          1.0,
          1.0,
          0.0,
          1.0,
          0.0,
          0.8,
          0.2,
          0.4,
          0.6,
          0.8,
          0.2,
          0.4,
          0.6,
          0.4,
          0.6,
          0.2,
          0.8,
          0.4,
          0.6,
          0.2,
          0.8,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          1.0,
          0.0,
          0.0,
          1.0,
          1.0,
          0.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.4,
          0.6,
          0.0,
          1.0,
          0.4,
          0.6,
          0.0,
          1.0,
          0.2,
          0.8,
          0.0,
          1.0,
          0.2,
          0.8,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0
        ]
      },
      {
        "target": "s2_st",
        "parents": [],
        "table": [
          0.9,
          0.01,
          0.04,
          0.03,
          0.02
        ]
      },
      {
        "target": "s2_pos",
        "parents": [],
        "table": [
          0.5,
          0.5
        ]
      },
      {
        "target": "l1_lit",
        "parents": [
          "w0",
          "l1_st"
        ],
        "table": [
          1.0,
          0.0,
          0.7,
          0.3,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0
        ]
      },
      {
        "target": "w4",
        "parents": [
          "w3",
          "s3_pos",
          "s3_st"
        ],
        "table": [
          1.0,
          0.0,
          0.0,
          1.0,
          0.4,
          0.6,
          0.2,
          0.8,
          0.0,
          1.0,
          0.0,
          1.0,
          1.0,
          0.0,
          0.4,
          0.6,
          0.2,
          0.8,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0
        ]
      },
      {
        "target": "s3_pos",
        "parents": [],
        "table": [
          0.8,
          0.2
        ]
      },
      {
        "target": "s3_st",
        "parents": [],
        "table": [
          0.9,
          0.01,
          0.04,
          0.03,
          0.02
        ]
      },
      {
        "target": "l2_lit",
        "parents": [
          "l2_st",
          "w4"
        ],
        "table": [
          1.0,
          0.0,
          0.0,
          1.0,
          0.6,
          0.4,
          0.0,
          1.0,
          0.0,
          1.0,
          0.0,
          1.0
        ]
      },
      {
        "target": "l2_st",
        "parents": [],
        "table": [
          0.9,
          0.03,
          0.07
        ]
      },
      {
        "target": "l1_st",
        "parents": [],
        "table": [
          0.9,
          0.07,
          0.03
        ]
      }
    ]
  },
  "independence": {
    "id": "independence",
    "name": "Conditional Independence Quiz",
    "description": "The conditional independence quiz is not intended to be a network used for querying, but is a graph useful for thinking about conditional independence questions.",
    "nodes": [
      {
        "id": "A",
        "name": "A",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 70.0,
        "y": 256.6
      },
      {
        "id": "B",
        "name": "B",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 141.7,
        "y": 162.4
      },
      {
        "id": "C",
        "name": "C",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 227.1,
        "y": 60.0
      },
      {
        "id": "D",
        "name": "D",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 218.1,
        "y": 258.7
      },
      {
        "id": "E",
        "name": "E",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 294.8,
        "y": 158.8
      },
      {
        "id": "F",
        "name": "F",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 355.0,
        "y": 256.2
      },
      {
        "id": "G",
        "name": "G",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 419.6,
        "y": 158.8
      },
      {
        "id": "H",
        "name": "H",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 488.8,
        "y": 261.2
      },
      {
        "id": "I",
        "name": "I",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 416.6,
        "y": 360.0
      },
      {
        "id": "J",
        "name": "J",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 570.0,
        "y": 161.3
      }
    ],
    "cpts": [
      {
        "target": "A",
        "parents": [
          "B"
        ],
        "table": [
          0.7,
          0.3,
          0.4,
          0.6
        ]
      },
      {
        "target": "B",
        "parents": [
          "C"
        ],
        "table": [
          0.9,
          0.1,
          0.4,
          0.6
        ]
      },
      {
        "target": "C",
        "parents": [],
        "table": [
          0.5,
          0.5
        ]
      },
      {
        "target": "D",
        "parents": [
          "B",
          "E"
        ],
        "table": [
          0.3,
          0.7,
          0.5,
          0.5,
          0.2,
          0.8,
          0.9,
          0.1
        ]
      },
      {
        "target": "E",
        "parents": [
          "C"
        ],
        "table": [
          0.7,
          0.3,
          0.2,
          0.8
        ]
      },
      {
        "target": "F",
        "parents": [
          "E",
          "G"
        ],
        "table": [
          0.9,
          0.1,
          0.2,
          0.8,
          0.4,
          0.6,
          0.7,
          0.3
        ]
      },
      {
        "target": "G",
        "parents": [],
        "table": [
          0.2,
          0.8
        ]
      },
      {
        "target": "H",
        "parents": [
          "G",
          "J"
        ],
        "table": [
          0.8,
          0.2,
          0.3,
          0.7,
          0.5,
          0.5,
          0.1,
          0.9
        ]
      },
      {
        "target": "I",
        "parents": [
          "H"
        ],
        "table": [
          0.8,
          0.2,
          0.1,
          0.9
        ]
      },
      {
        "target": "J",
        "parents": [],
        "table": [
          0.3,
          0.7
        ]
      }
    ]
  },
  "simp1": {
    "id": "simp1",
    "name": "Simple graph",
    "description": "This is an example of a singly connected network.",
    "nodes": [
      {
        "id": "B",
        "name": "B",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 189.0,
        "y": 117.0
      },
      {
        "id": "A",
        "name": "A",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 70.0,
        "y": 185.7
      },
      {
        "id": "E",
        "name": "E",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 570.0,
        "y": 60.0
      },
      {
        "id": "D",
        "name": "D",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 445.5,
        "y": 126.5
      },
      {
        "id": "C",
        "name": "C",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 313.5,
        "y": 196.3
      },
      {
        "id": "F",
        "name": "F",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 425.0,
        "y": 278.7
      },
      {
        "id": "G",
        "name": "G",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 549.6,
        "y": 360.0
      }
    ],
    "cpts": [
      {
        "target": "B",
        "parents": [],
        "table": [
          0.7,
          0.3
        ]
      },
      {
        "target": "A",
        "parents": [
          "B"
        ],
        "table": [
          0.88,
          0.12,
          0.38,
          0.62
        ]
      },
      {
        "target": "E",
        "parents": [],
        "table": [
          0.91,
          0.09
        ]
      },
      {
        "target": "D",
        "parents": [
          "E"
        ],
        "table": [
          0.04,
          0.96,
          0.84,
          0.16
        ]
      },
      {
        "target": "C",
        "parents": [
          "B",
          "D"
        ],
        "table": [
          0.93,
          0.07,
          0.33,
          0.67,
          0.53,
          0.47,
          0.83,
          0.17
        ]
      },
      {
        "target": "F",
        "parents": [
          "C"
        ],
        "table": [
          0.45,
          0.55,
          0.85,
          0.15
        ]
      },
      {
        "target": "G",
        "parents": [
          "F"
        ],
        "table": [
          0.26,
          0.74,
          0.96,
          0.04
        ]
      }
    ]
  },
  "InfluenzaSmokes": {
    "id": "InfluenzaSmokes",
    "name": "Simple Diagnostic Example",
    "description": "Influenza and Smoking Example of Poole and Mackworth, Artificial Intelligence.",
    "nodes": [
      {
        "id": "Influenza",
        "name": "Influenza",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 300.0,
        "y": 60.0
      },
      {
        "id": "Sore Throat",
        "name": "Sore Throat",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 70.0,
        "y": 181.5
      },
      {
        "id": "Fever",
        "name": "Fever",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 265.7,
        "y": 192.3
      },
      {
        "id": "Bronchitis",
        "name": "Bronchitis",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 447.1,
        "y": 196.9
      },
      {
        "id": "Wheezing",
        "name": "Wheezing",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 570.0,
        "y": 360.0
      },
      {
        "id": "Smokes",
        "name": "Smokes",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 567.1,
        "y": 60.0
      },
      {
        "id": "Coughing",
        "name": "Coughing",
        "type": "chance",
        "outcomes": [
          "T",
          "F"
        ],
        "x": 355.7,
        "y": 356.9
      }
    ],
    "cpts": [
      {
        "target": "Influenza",
        "parents": [],
        "table": [
          0.05,
          0.95
        ]
      },
      {
        "target": "Sore Throat",
        "parents": [
          "Influenza"
        ],
        "table": [
          0.3,
          0.7,
          0.001,
          0.999
        ]
      },
      {
        "target": "Fever",
        "parents": [
          "Influenza"
        ],
        "table": [
          0.9,
          0.1,
          0.05,
          0.95
        ]
      },
      {
        "target": "Bronchitis",
        "parents": [
          "Influenza",
          "Smokes"
        ],
        "table": [
          0.99,
          0.01,
          0.9,
          0.1,
          0.7,
          0.3,
          0.0001,
          0.9999
        ]
      },
      {
        "target": "Wheezing",
        "parents": [
          "Bronchitis"
        ],
        "table": [
          0.6,
          0.4,
          0.001,
          0.999
        ]
      },
      {
        "target": "Smokes",
        "parents": [],
        "table": [
          0.2,
          0.8
        ]
      },
      {
        "target": "Coughing",
        "parents": [
          "Bronchitis"
        ],
        "table": [
          0.8,
          0.2,
          0.07,
          0.93
        ]
      }
    ]
  }
};
