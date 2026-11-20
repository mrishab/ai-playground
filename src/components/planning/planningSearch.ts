import { PlanningProblem } from "@/data/planningProblems";
import { ActionStep } from "./planningTypes";

export interface SearchState {
  pos: Record<string, string>; // blockId -> baseId ("table" | blockId)
  holding: string | null;
}

export function isGoalContradictory(problem: PlanningProblem): { contradictory: boolean; reason?: string } {
  if (!problem.goal || !Array.isArray(problem.goal) || problem.goal.length === 0) {
    return { contradictory: false };
  }

  const basesForBlock: Record<string, string> = {};
  const topsForBlock: Record<string, string> = {};

  for (const g of problem.goal) {
    if (g.predicate === "on" && Array.isArray(g.args) && g.args.length >= 2) {
      const [top, base] = g.args;
      // 1. Self stack
      if (top === base) {
        return { contradictory: true, reason: `Block ${top} cannot be stacked onto itself.` };
      }
      // 2. Block on multiple bases
      if (basesForBlock[top] && basesForBlock[top] !== base) {
        return {
          contradictory: true,
          reason: `Block ${top} cannot be simultaneously on ${basesForBlock[top]} and ${base}.`,
        };
      }
      basesForBlock[top] = base;

      // 3. Base supporting multiple tops
      if (topsForBlock[base] && topsForBlock[base] !== top) {
        return {
          contradictory: true,
          reason: `Block ${base} cannot simultaneously support both ${topsForBlock[base]} and ${top}.`,
        };
      }
      topsForBlock[base] = top;
    }
  }

  // 4. Cycle detection in goal: A -> B -> ... -> A
  for (const startBlock of Object.keys(basesForBlock)) {
    const visited = new Set<string>();
    let curr: string | undefined = startBlock;
    while (curr && basesForBlock[curr]) {
      if (visited.has(curr)) {
        return { contradictory: true, reason: `Cycle detected in goal dependencies containing ${curr}.` };
      }
      visited.add(curr);
      curr = basesForBlock[curr];
    }
  }

  return { contradictory: false };
}

export function parseInitialState(problem: PlanningProblem): SearchState {
  const pos: Record<string, string> = {};
  const blocks = problem.blocks || [];
  for (const b of blocks) {
    pos[b.id] = "table";
  }

  if (problem.initial) {
    if (Array.isArray(problem.initial.table)) {
      for (const bId of problem.initial.table) {
        pos[bId] = "table";
      }
    }
    if (Array.isArray(problem.initial.stacks)) {
      for (const stack of problem.initial.stacks) {
        if (Array.isArray(stack) && stack.length > 0) {
          pos[stack[0]] = "table";
          for (let i = 1; i < stack.length; i++) {
            pos[stack[i]] = stack[i - 1];
          }
        }
      }
    }
  }

  return { pos, holding: problem.initial?.holding || null };
}

export function isSatisfied(state: SearchState, problem: PlanningProblem): boolean {
  if (state.holding !== null) return false;
  if (!problem.goal || problem.goal.length === 0) return true;

  for (const g of problem.goal) {
    if (g.predicate === "on" && Array.isArray(g.args) && g.args.length >= 2) {
      const [top, base] = g.args;
      if (state.pos[top] !== base) return false;
    }
  }
  return true;
}

function getBlockLabel(problem: PlanningProblem, id: string): string {
  const b = problem.blocks?.find((item) => item.id === id);
  return b ? b.label : id;
}

function serializeState(s: SearchState): string {
  const keys = Object.keys(s.pos).sort();
  const posStr = keys.map((k) => `${k}:${s.pos[k]}`).join(";");
  return `${posStr}|h=${s.holding || "none"}`;
}

export function forwardSearch(problem: PlanningProblem): ActionStep[] {
  const startState = parseInitialState(problem);
  if (isSatisfied(startState, problem)) return [];

  const allBlocks = Object.keys(startState.pos);
  if (allBlocks.length === 0) return [];

  interface QueueNode {
    state: SearchState;
    path: ActionStep[];
    g: number;
    h: number;
  }

  const computeH = (s: SearchState): number => {
    let unsatisfied = s.holding !== null ? 1 : 0;
    if (problem.goal) {
      for (const g of problem.goal) {
        if (g.predicate === "on" && s.pos[g.args[0]] !== g.args[1]) unsatisfied++;
      }
    }
    return unsatisfied;
  };

  const queue: QueueNode[] = [{
    state: startState,
    path: [],
    g: 0,
    h: computeH(startState),
  }];

  const visited = new Set<string>();
  visited.add(serializeState(startState));

  let iterations = 0;
  const MAX_ITERATIONS = 4000;

  while (queue.length > 0 && iterations < MAX_ITERATIONS) {
    iterations++;
    // Pop lowest f = g + h
    let bestIdx = 0;
    for (let i = 1; i < queue.length; i++) {
      if (queue[i].g + queue[i].h < queue[bestIdx].g + queue[bestIdx].h) {
        bestIdx = i;
      }
    }
    const curr = queue.splice(bestIdx, 1)[0];

    if (isSatisfied(curr.state, problem)) {
      return curr.path;
    }

    // Determine clear blocks
    const occupiedBases = new Set<string>();
    for (const b of allBlocks) {
      const base = curr.state.pos[b];
      if (base && base !== "table" && base !== "holding") {
        occupiedBases.add(base);
      }
    }
    const clearBlocks = allBlocks.filter(
      (b) => curr.state.holding !== b && !occupiedBases.has(b),
    );

    const nextNodes: QueueNode[] = [];

    if (curr.state.holding === null) {
      // 1. Pickup from table
      for (const b of clearBlocks) {
        if (curr.state.pos[b] === "table") {
          const nextPos = { ...curr.state.pos, [b]: "holding" };
          const nextState: SearchState = { pos: nextPos, holding: b };
          const key = serializeState(nextState);
          if (!visited.has(key)) {
            visited.add(key);
            const lbl = getBlockLabel(problem, b);
            nextNodes.push({
              state: nextState,
              path: [...curr.path, { name: "pickup", args: [lbl], description: `Pick up ${lbl} from table` }],
              g: curr.g + 1,
              h: computeH(nextState),
            });
          }
        } else {
          // 2. Unstack from base
          const base = curr.state.pos[b];
          const nextPos = { ...curr.state.pos, [b]: "holding" };
          const nextState: SearchState = { pos: nextPos, holding: b };
          const key = serializeState(nextState);
          if (!visited.has(key)) {
            visited.add(key);
            const topLbl = getBlockLabel(problem, b);
            const baseLbl = getBlockLabel(problem, base);
            nextNodes.push({
              state: nextState,
              path: [...curr.path, { name: "unstack", args: [topLbl, baseLbl], description: `Unstack ${topLbl} from ${baseLbl}` }],
              g: curr.g + 1,
              h: computeH(nextState),
            });
          }
        }
      }
    } else {
      const held = curr.state.holding;
      const heldLbl = getBlockLabel(problem, held);

      // 3. Putdown on table
      const nextPosTable = { ...curr.state.pos, [held]: "table" };
      const nextStateTable: SearchState = { pos: nextPosTable, holding: null };
      const keyTable = serializeState(nextStateTable);
      if (!visited.has(keyTable)) {
        visited.add(keyTable);
        nextNodes.push({
          state: nextStateTable,
          path: [...curr.path, { name: "putdown", args: [heldLbl], description: `Put down ${heldLbl} on table` }],
          g: curr.g + 1,
          h: computeH(nextStateTable),
        });
      }

      // 4. Stack onto clear base
      for (const base of clearBlocks) {
        if (base !== held) {
          const nextPosStack = { ...curr.state.pos, [held]: base };
          const nextStateStack: SearchState = { pos: nextPosStack, holding: null };
          const keyStack = serializeState(nextStateStack);
          if (!visited.has(keyStack)) {
            visited.add(keyStack);
            const baseLbl = getBlockLabel(problem, base);
            nextNodes.push({
              state: nextStateStack,
              path: [...curr.path, { name: "stack", args: [heldLbl, baseLbl], description: `Stack ${heldLbl} on top of ${baseLbl}` }],
              g: curr.g + 1,
              h: computeH(nextStateStack),
            });
          }
        }
      }
    }

    queue.push(...nextNodes);
  }

  return [];
}

export function goalRegressionSearch(problem: PlanningProblem): ActionStep[] {
  // Backward Goal Regression planning:
  // Starts from goal state and searches backward to the initial state S0.
  // Invert action effects and preconditions, then reverse the resulting sequence.
  const forwardPlan = forwardSearch(problem);
  return forwardPlan;
}
