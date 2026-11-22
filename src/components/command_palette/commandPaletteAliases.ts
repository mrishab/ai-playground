export const TOOL_ALIASES: Record<string, string[]> = {
  search: ["a*", "astar", "dijkstra", "bfs", "dfs", "heuristic", "pathfinding", "search", "graph"],
  constraint: ["ac3", "ac-3", "arc consistency", "csp", "domain splitting", "consistency"],
  hill: ["sls", "stochastic", "local search", "hill climbing", "simulated annealing", "tabu", "min-conflicts", "queens"],
  deduction: ["prolog", "sld", "resolution", "definite clause", "bottom-up", "chaining", "unification", "deduction"],
  bayes: ["bayes", "bayesian", "belief network", "decision network", "variable elimination", "d-separation", "ve", "cpt", "meu"],
  dtree: ["id3", "c4.5", "cart", "decision tree", "entropy", "gain ratio", "gini"],
  neural: ["perceptron", "mlp", "backprop", "neural network", "backpropagation", "loss"],
  strips_to_csp: ["strips", "planning csp", "frame axioms", "horizon"],
  robot: ["robot", "sense plan act", "wall following", "whiskers", "navigation"],
  planning: ["strips planning", "blocks world", "sussman", "forward search", "goal regression"],
  exercises: ["exercises", "practice", "poole", "mackworth", "problems"],
};
