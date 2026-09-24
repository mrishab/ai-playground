export interface RobotLocation {
  name: string;
  x: number;
  y: number;
}

export interface RobotWall {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface RobotPose {
  x: number;
  y: number;
  angle: number;
}

export interface RobotWorld {
  id: string;
  name: string;
  description: string;
  locations: RobotLocation[];
  walls: RobotWall[];
  robot: RobotPose;
  plan: string[];
}

export const ROBOT_WORLDS: Record<string, RobotWorld> = {
  "bookWorld": {
    "id": "bookWorld",
    "name": "Office Delivery Map (Book World)",
    "description": "The classic robot environment from Computational Intelligence: mail room, offices o103 and o109, and storage room with separating walls.",
    "locations": [
      {
        "name": "mail",
        "x": 50,
        "y": 80
      },
      {
        "name": "o103",
        "x": 250,
        "y": 80
      },
      {
        "name": "o109",
        "x": 450,
        "y": 80
      },
      {
        "name": "storage",
        "x": 450,
        "y": 280
      }
    ],
    "walls": [
      {
        "x1": 150,
        "y1": 20,
        "x2": 150,
        "y2": 180
      },
      {
        "x1": 350,
        "y1": 50,
        "x2": 350,
        "y2": 200
      },
      {
        "x1": 50,
        "y1": 330,
        "x2": 550,
        "y2": 330
      }
    ],
    "robot": {
      "x": 60,
      "y": 90,
      "angle": 0
    },
    "plan": [
      "o103",
      "storage",
      "o109",
      "mail"
    ]
  },
  "trapMaze": {
    "id": "trapMaze",
    "name": "U-Shaped Trap World",
    "description": "Tests the robot middle controller navigating out of local minima concave dead-ends using wall-following routines.",
    "locations": [
      {
        "name": "start",
        "x": 100,
        "y": 250
      },
      {
        "name": "goal",
        "x": 500,
        "y": 80
      }
    ],
    "walls": [
      {
        "x1": 200,
        "y1": 50,
        "x2": 200,
        "y2": 280
      },
      {
        "x1": 200,
        "y1": 280,
        "x2": 380,
        "y2": 280
      },
      {
        "x1": 380,
        "y1": 50,
        "x2": 380,
        "y2": 280
      }
    ],
    "robot": {
      "x": 290,
      "y": 220,
      "angle": 270
    },
    "plan": [
      "goal"
    ]
  },
  "warehouse": {
    "id": "warehouse",
    "name": "Warehouse Obstacle Course",
    "description": "Multi-room warehouse with pallet obstacles and dynamic pickup dropoff zones.",
    "locations": [
      {
        "name": "dockA",
        "x": 60,
        "y": 60
      },
      {
        "name": "aisle1",
        "x": 260,
        "y": 60
      },
      {
        "name": "aisle2",
        "x": 260,
        "y": 280
      },
      {
        "name": "dockB",
        "x": 480,
        "y": 280
      }
    ],
    "walls": [
      {
        "x1": 160,
        "y1": 10,
        "x2": 160,
        "y2": 200
      },
      {
        "x1": 360,
        "y1": 120,
        "x2": 360,
        "y2": 340
      }
    ],
    "robot": {
      "x": 60,
      "y": 70,
      "angle": 45
    },
    "plan": [
      "aisle1",
      "aisle2",
      "dockB"
    ]
  }
};
