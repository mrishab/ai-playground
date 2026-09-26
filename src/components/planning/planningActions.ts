export { applyStack } from "./planningActionStack";

export function applyPickup(
  newCols: string[][],
  bId: string,
  arg0: string,
  desc: string,
) {
  let newGripperCol = 2;
  for (let i = 0; i < newCols.length; i++) {
    if (newCols[i].length > 0 && newCols[i][newCols[i].length - 1] === bId) {
      newCols[i].pop();
      newGripperCol = i;
      break;
    }
  }
  return {
    newHolding: bId,
    newGripperCol,
    log: `Executed: ${desc}. Gripper is holding block ${arg0}.`,
  };
}

export function applyPutdown(
  newCols: string[][],
  bId: string,
  arg0: string,
  desc: string,
) {
  let newGripperCol = newCols.length - 1;
  let placed = false;
  for (let i = 0; i < newCols.length; i++) {
    if (newCols[i].length === 0) {
      newCols[i].push(bId);
      newGripperCol = i;
      placed = true;
      break;
    }
  }
  if (!placed) newCols[newCols.length - 1].push(bId);
  return {
    newHolding: null,
    newGripperCol,
    log: `Executed: ${desc}. Block ${arg0} placed on table.`,
  };
}
