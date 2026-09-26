import { AlgorithmType, SearchPath } from "./searchTypes";

export function orderFrontier(
  paths: SearchPath[],
  algo: AlgorithmType,
): SearchPath[] {
  const list = [...paths];
  switch (algo) {
    case "dfs":
    case "bfs":
      return list;
    case "lcfs":
      return list.sort((a, b) => a.cost - b.cost);
    case "best_first":
      return list.sort((a, b) => a.h - b.h);
    case "astar":
    case "mpp":
      return list.sort((a, b) => a.f - b.f);
    default:
      return list;
  }
}
