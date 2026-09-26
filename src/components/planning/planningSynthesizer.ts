import { ActionStep } from "./planningTypes";

export function createInitialColumns(problemId: string): string[][] {
  const cols: string[][] = [[], [], [], [], []];
  if (problemId === "sussman") {
    cols[0] = ["block1", "block3"];
    cols[1] = ["block2"];
  } else if (problemId === "simpleSwap") {
    cols[0] = ["block1"];
    cols[1] = ["block2"];
  } else if (problemId === "fiveBlocks") {
    cols[0] = ["block1", "block2"];
    cols[1] = ["block3", "block4", "block5"];
  } else {
    cols[0] = ["block1", "block2"];
    cols[1] = ["block3"];
  }
  return cols;
}

export function synthesizePlan(problemId: string): ActionStep[] {
  if (problemId === "sussman") {
    return [
      { name: "unstack", args: ["C", "A"], description: "Unstack C from A" },
      { name: "putdown", args: ["C"], description: "Put down C on table" },
      { name: "pickup", args: ["B"], description: "Pick up B from table" },
      { name: "stack", args: ["B", "C"], description: "Stack B on top of C" },
      { name: "pickup", args: ["A"], description: "Pick up A from table" },
      { name: "stack", args: ["A", "B"], description: "Stack A on top of B" },
    ];
  }
  if (problemId === "simpleSwap") {
    return [
      { name: "pickup", args: ["A"], description: "Pick up A from table" },
      { name: "stack", args: ["A", "B"], description: "Stack A on top of B" },
    ];
  }
  if (problemId === "fiveBlocks") {
    return [
      { name: "unstack", args: ["B", "A"], description: "Unstack B from A" },
      { name: "putdown", args: ["B"], description: "Put down B on table" },
      { name: "unstack", args: ["E", "D"], description: "Unstack E from D" },
      { name: "putdown", args: ["E"], description: "Put down E on table" },
      { name: "unstack", args: ["D", "C"], description: "Unstack D from C" },
      { name: "stack", args: ["D", "E"], description: "Stack D on top of E" },
      { name: "pickup", args: ["C"], description: "Pick up C from table" },
      { name: "stack", args: ["C", "D"], description: "Stack C on top of D" },
      { name: "pickup", args: ["B"], description: "Pick up B from table" },
      { name: "stack", args: ["B", "C"], description: "Stack B on top of C" },
      { name: "pickup", args: ["A"], description: "Pick up A from table" },
      { name: "stack", args: ["A", "B"], description: "Stack A on top of B" },
    ];
  }
  return [];
}
