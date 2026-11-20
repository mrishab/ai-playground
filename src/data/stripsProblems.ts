interface StripsVariable {
  name: string;
  type: string;
  domain: string[];
  initial: string;
  goal: string;
}

interface StripsConditionMap {
  [variableName: string]: string;
}

interface StripsAction {
  name: string;
  label: string;
  preconditions: StripsConditionMap;
  effects: StripsConditionMap;
}

export interface StripsProblem {
  id: string;
  name: string;
  description: string;
  variables: StripsVariable[];
  actions: StripsAction[];
}

export interface StripsProblemMap {
  [problemId: string]: StripsProblem;
}

export const STRIPS_PROBLEMS: StripsProblemMap = {
  coffeeDelivery: {
    id: "coffeeDelivery",
    name: "Coffee Delivery Robot",
    description:
      "Robot navigates between rooms to pick up coffee and deliver it to the user.",
    variables: [
      {
        name: "location",
        type: "discrete",
        domain: ["cs", "hallway", "office"],
        initial: "cs",
        goal: "office",
      },
      {
        name: "hasCoffee",
        type: "boolean",
        domain: ["true", "false"],
        initial: "false",
        goal: "true",
      },
      {
        name: "userHasCoffee",
        type: "boolean",
        domain: ["true", "false"],
        initial: "false",
        goal: "true",
      },
    ],
    actions: [
      {
        name: "PUC",
        label: "Pick Up Coffee",
        preconditions: {
          location: "cs",
          hasCoffee: "false",
        },
        effects: {
          hasCoffee: "true",
        },
      },
      {
        name: "DelC",
        label: "Deliver Coffee to User",
        preconditions: {
          location: "office",
          hasCoffee: "true",
        },
        effects: {
          hasCoffee: "false",
          userHasCoffee: "true",
        },
      },
      {
        name: "mc",
        label: "Move to Computer Science lab",
        preconditions: {
          location: "hallway",
        },
        effects: {
          location: "cs",
        },
      },
      {
        name: "mcc",
        label: "Move from CS to Hallway",
        preconditions: {
          location: "cs",
        },
        effects: {
          location: "hallway",
        },
      },
      {
        name: "mo",
        label: "Move to Office",
        preconditions: {
          location: "hallway",
        },
        effects: {
          location: "office",
        },
      },
      {
        name: "mco",
        label: "Move from Office to Hallway",
        preconditions: {
          location: "office",
        },
        effects: {
          location: "hallway",
        },
      },
    ],
  },
  elevator: {
    id: "elevator",
    name: "Two-Floor Elevator World",
    description:
      "Control elevator cabin and passenger board/unboard actions mapped to CSP time steps.",
    variables: [
      {
        name: "liftFloor",
        type: "discrete",
        domain: ["floor1", "floor2"],
        initial: "floor1",
        goal: "floor2",
      },
      {
        name: "passengerLoc",
        type: "discrete",
        domain: ["floor1", "floor2", "inLift"],
        initial: "floor1",
        goal: "floor2",
      },
    ],
    actions: [
      {
        name: "board",
        label: "Passenger boards elevator at floor 1",
        preconditions: {
          liftFloor: "floor1",
          passengerLoc: "floor1",
        },
        effects: {
          passengerLoc: "inLift",
        },
      },
      {
        name: "moveUp",
        label: "Elevator moves from floor 1 to floor 2",
        preconditions: {
          liftFloor: "floor1",
        },
        effects: {
          liftFloor: "floor2",
        },
      },
      {
        name: "unboard",
        label: "Passenger departs elevator at floor 2",
        preconditions: {
          liftFloor: "floor2",
          passengerLoc: "inLift",
        },
        effects: {
          passengerLoc: "floor2",
        },
      },
    ],
  },
};
