export function applyStack(
  newCols: string[][],
  topId: string,
  baseId: string,
  arg0: string,
  arg1: string,
  desc: string,
) {
  for (let i = 0; i < newCols.length; i++) {
    if (newCols[i].length > 0 && newCols[i][newCols[i].length - 1] === baseId) {
      newCols[i].push(topId);
      return {
        newHolding: null,
        newGripperCol: i,
        log: `Executed: ${desc}. Block ${arg0} stacked on ${arg1}.`,
      };
    }
  }
  return {
    newHolding: topId,
    newGripperCol: 2,
    log: `Error: Could not find base block ${arg1} to stack on.`,
  };
}
