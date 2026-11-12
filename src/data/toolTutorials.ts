interface ToolAlgorithmInfo {
  name: string;
  type: string;
  time: string;
  space: string;
  optimal: string;
  complete: string;
  concept: string;
}

interface ToolWalkthroughStep {
  step: string;
  description: string;
}

export interface ToolTutorialData {
  title: string;
  subtitle: string;
  badge: string;
  summary: string;
  algorithms: ToolAlgorithmInfo[];
  keyTakeaways: string[];
  walkthroughs: ToolWalkthroughStep[];
}

export interface ToolTutorialMap {
  [toolId: string]: ToolTutorialData;
}

export const TOOL_TUTORIALS: ToolTutorialMap = {
  search: {
    title: "Graph Searching",
    subtitle: "Uninformed, Heuristic & Optimal Pathfinding",
    badge: "Search",
    summary:
      "Finds an optimal sequence of transitions from a start state to a goal state across a graph.",
    algorithms: [
      {
        name: "Depth-First Search (DFS)",
        type: "Uninformed",
        time: "O(b^m)",
        space: "O(b*m)",
        optimal: "No",
        complete: "No (infinite graphs / cycles)",
        concept:
          "Explores deepest unvisited paths first via a LIFO stack. Space-efficient; can loop in cycles.",
      },
      {
        name: "Breadth-First Search (BFS)",
        type: "Uninformed",
        time: "O(b^d)",
        space: "O(b^d)",
        optimal: "Yes (if unit costs)",
        complete: "Yes",
        concept:
          "Explores layer-by-layer via a FIFO queue. Finds shallowest goal; requires exponential memory.",
      },
      {
        name: "Lowest-Cost-First (Dijkstra)",
        type: "Uninformed",
        time: "O(b^(C*/e))",
        space: "O(b^(C*/e))",
        optimal: "Yes",
        complete: "Yes",
        concept:
          "Expands the path with lowest path cost g(n). Optimal for non-negative edge costs.",
      },
      {
        name: "Greedy Best-First",
        type: "Heuristic",
        time: "O(b^m)",
        space: "O(b^m)",
        optimal: "No",
        complete: "No",
        concept:
          "Orders frontier strictly by heuristic distance h(n). Fast, but can choose suboptimal paths.",
      },
      {
        name: "A* Search",
        type: "Optimal Heuristic",
        time: "O(b^d)",
        space: "O(b^d)",
        optimal: "Yes (if h is admissible)",
        complete: "Yes",
        concept:
          "Evaluates f(n) = g(n) + h(n), balancing cost-so-far and estimated cost-to-go.",
      },
      {
        name: "Multi-Path Pruning",
        type: "Enhancement",
        time: "Optimized",
        space: "O(|V|)",
        optimal: "Yes (if h is consistent)",
        complete: "Yes",
        concept:
          "Prunes redundant paths arriving at previously expanded states with higher cost.",
      },
    ],
    keyTakeaways: [
      "Problem formulation: States, Start State, Actions, Path Cost, and Goal Test.",
      "Frontier ordering defines the search strategy (LIFO, FIFO, priority queue).",
      "Admissibility: h(n) <= h*(n). Guarantees A* optimality in tree search.",
      "Consistency: h(n) <= cost(n, n') + h(n'). Guarantees A* optimality with pruning.",
    ],
    walkthroughs: [
      {
        step: "1. Select Graph",
        description: "Choose a benchmark graph or create custom nodes and edges.",
      },
      {
        step: "2. Choose Algorithm",
        description: "Select DFS, BFS, Lowest-Cost-First, Greedy, or A*.",
      },
      {
        step: "3. Step & Inspect Frontier",
        description: "Step or auto-run to inspect frontier paths, costs, and expanded nodes.",
      },
      {
        step: "4. Test Quiz Mode",
        description: "Predict the next node to expand to test understanding.",
      },
    ],
  },
  constraint: {
    title: "Consistency Based CSP Solver",
    subtitle: "Arc Consistency (AC-3) & Domain Splitting",
    badge: "CSPs",
    summary:
      "Finds variable assignments from finite domains that satisfy all problem constraints.",
    algorithms: [
      {
        name: "Arc Consistency (AC-3)",
        type: "Propagation",
        time: "O(c * d^3)",
        space: "O(c)",
        optimal: "Exact",
        complete: "Polynomial reduction",
        concept:
          "Prunes domain values lacking support in adjacent constraints until reaching a fixed point.",
      },
      {
        name: "Domain Splitting with Backtracking",
        type: "Systematic Search",
        time: "O(d^n)",
        space: "O(n)",
        optimal: "Exact",
        complete: "Yes",
        concept:
          "Recursively splits variable domains, applies AC-3, and backtracks on domain wipeout.",
      },
      {
        name: "MRV / Fail-First Heuristic",
        type: "Variable Ordering",
        time: "O(n)",
        space: "O(1)",
        optimal: "Heuristic",
        complete: "N/A",
        concept:
          "Selects the unassigned variable with Minimum Remaining Values to maximize early pruning.",
      },
    ],
    keyTakeaways: [
      "Formulation: Variables, finite domains, and constraints specifying allowed tuples.",
      "Arc (X, C) is consistent if every value in D(X) has compatible support.",
      "Arc consistency prunes impossible values; domain splitting finds complete solutions.",
      "Maintaining Arc Consistency (MAC) accelerates backtracking on combinatorial problems.",
    ],
    walkthroughs: [
      {
        step: "1. Load CSP Problem",
        description: "Select Map Coloring, N-Queens, or Scheduling problems.",
      },
      {
        step: "2. Execute AC-3",
        description: "Use Fine Step or Auto AC to observe domain pruning in real time.",
      },
      {
        step: "3. Domain Splitting",
        description: "Split multi-valued variable domains to create search branches.",
      },
      {
        step: "4. Explore Search Tree",
        description: "Navigate the tree of search states to view active solutions and dead ends.",
      },
    ],
  },
  hill: {
    title: "Stochastic Local Search (SLS)",
    subtitle: "Hill Climbing, Min-Conflicts & Annealing",
    badge: "Local Search",
    summary:
      "Modifies complete assignments via local neighborhood moves to minimize unsatisfied constraints.",
    algorithms: [
      {
        name: "Greedy Descent / Hill Climbing",
        type: "Local Search",
        time: "O(k * n)",
        space: "O(n)",
        optimal: "Local Optima",
        complete: "No",
        concept:
          "Greedily selects the single-variable assignment change that maximally reduces conflicts.",
      },
      {
        name: "Min-Conflicts Heuristic",
        type: "Greedy SLS",
        time: "O(k * d)",
        space: "O(n)",
        optimal: "Local Optima",
        complete: "No",
        concept:
          "Selects a conflicted variable and assigns the value minimizing constraint violations.",
      },
      {
        name: "Random Walk & p-Walk",
        type: "Stochastic Escape",
        time: "Stochastic",
        space: "O(n)",
        optimal: "N/A",
        complete: "With restart",
        concept:
          "Steps greedily with probability 1-p; chooses random assignments with probability p.",
      },
      {
        name: "Simulated Annealing",
        type: "Physics-Inspired",
        time: "Schedule dependent",
        space: "O(n)",
        optimal: "Asymptotically optimal",
        complete: "Probabilistic",
        concept:
          "Always accepts improvements; accepts worse moves with probability exp(-delta / T).",
      },
      {
        name: "Tabu Search",
        type: "Memory-Guided",
        time: "O(k * n)",
        space: "O(Tabu Length)",
        optimal: "Heuristic",
        complete: "No",
        concept:
          "Maintains a tabu memory of recent assignments to avoid cycling on plateaus.",
      },
    ],
    keyTakeaways: [
      "Operates on total assignments rather than incremental partial paths.",
      "Objective function: minimize total number of unsatisfied constraints.",
      "Stochastic strategies (random walk, annealing, tabu) escape local optima.",
      "Batch trials evaluate runtime distributions and solution convergence.",
    ],
    walkthroughs: [
      {
        step: "1. Choose Problem & Algorithm",
        description: "Select Scheduling, Crossword, or N-Queens with a search strategy.",
      },
      {
        step: "2. Tune Hyperparameters",
        description: "Adjust random walk probability, temperature, or tabu tenure.",
      },
      {
        step: "3. Step or Auto-Solve",
        description: "Watch the conflict plot track constraint violations over iterations.",
      },
      {
        step: "4. Run Batch Experiments",
        description: "Execute multiple restarts to compare convergence speeds and success rates.",
      },
    ],
  },
  deduction: {
    title: "Definite Clause Deduction",
    subtitle: "Prolog & CILog Logic Programming",
    badge: "Deduction",
    summary:
      "Performs logical inference and extracts variable bindings using SLD resolution and unification.",
    algorithms: [
      {
        name: "Top-Down SLD Resolution",
        type: "Goal-Directed Search",
        time: "O(b^d)",
        space: "O(b*d)",
        optimal: "Refutation Complete",
        complete: "Yes (with BFS/iterative deepening)",
        concept:
          "Unifies goal atoms with clause heads and recursively resolves subgoals until empty.",
      },
      {
        name: "Bottom-Up Fixed-Point Operator",
        type: "Forward Chaining",
        time: "O(|KB| * k)",
        space: "O(|Herbrand Base|)",
        optimal: "Least Model",
        complete: "Yes for ground Datalog",
        concept:
          "Iteratively adds consequences of satisfied rules until reaching a fixed point.",
      },
      {
        name: "Most General Unifier (MGU)",
        type: "Symbolic Unification",
        time: "O(terms)",
        space: "O(substitutions)",
        optimal: "Most General",
        complete: "Yes",
        concept:
          "Computes the most general substitution equating two atomic expressions.",
      },
    ],
    keyTakeaways: [
      "Definite clauses consist of a head atom and conjunction of body atoms.",
      "Unification matches symbolic variables with terms and constants.",
      "Proof trees visualize alternative resolution branches.",
      "Query variables are bound through successful unification along proof paths.",
    ],
    walkthroughs: [
      {
        step: "1. Load Knowledge Base",
        description: "Select Electrical Wiring, Family Kinship, or Prerequisites rules.",
      },
      {
        step: "2. Enter Query",
        description: "Input a goal query with ground terms or free variables.",
      },
      {
        step: "3. Step Through SLD Tree",
        description: "Inspect resolution branches and unifying substitutions on each edge.",
      },
      {
        step: "4. Inspect Answers",
        description: "View variable bindings satisfying the query or inspect failed branches.",
      },
    ],
  },
  bayes: {
    title: "Belief & Decision Networks",
    subtitle: "Bayesian Networks & Variable Elimination",
    badge: "Probabilistic Reasoning",
    summary:
      "Models joint probability distributions via directed acyclic graphs and conditional independence.",
    algorithms: [
      {
        name: "Variable Elimination (VE)",
        type: "Exact Inference",
        time: "O(n * d^(w+1))",
        space: "O(d^w)",
        optimal: "Exact Posterior",
        complete: "Yes",
        concept:
          "Calculates marginals by multiplying factor tables and summing out unobserved variables.",
      },
      {
        name: "D-Separation (Active Trails)",
        type: "Graphical Criterion",
        time: "O(|V| + |E|)",
        space: "O(|V|)",
        optimal: "Exact Independence",
        complete: "Sound & Complete",
        concept:
          "Determines conditional independence by testing for blocked paths given evidence.",
      },
      {
        name: "Maximum Expected Utility (MEU)",
        type: "Decision Theory",
        time: "VE complexity",
        space: "Factor space",
        optimal: "Optimal Policy",
        complete: "Yes",
        concept:
          "Computes expected utilities of actions and selects the utility-maximizing decision.",
      },
    ],
    keyTakeaways: [
      "Bayes Rule updates prior distributions into posterior distributions given evidence.",
      "Conditional independence factorizes joint distributions into compact local CPTs.",
      "Observing evidence updates network marginals across connected components.",
      "Decision and utility nodes extend belief nets into influence diagrams.",
    ],
    walkthroughs: [
      {
        step: "1. Select Network",
        description: "Open Fire Alarm, Umbrella Decision, or Diagnosis networks.",
      },
      {
        step: "2. Set Evidence",
        description: "Toggle variable node states to observe posterior probability updates.",
      },
      {
        step: "3. Run Variable Elimination",
        description: "Inspect factor multiplications and summations step-by-step.",
      },
      {
        step: "4. Test D-Separation",
        description: "Verify conditional independence between nodes given an evidence set.",
      },
    ],
  },
  dtree: {
    title: "Decision Trees",
    subtitle: "Entropy, Information Gain & ID3 Learning",
    badge: "Supervised Learning",
    summary:
      "Constructs hierarchical decision models by recursively splitting on attributes maximizing information gain.",
    algorithms: [
      {
        name: "ID3 / C4.5 Induction",
        type: "Greedy Top-Down",
        time: "O(|Attrs| * |Examples| * depth)",
        space: "O(Tree size)",
        optimal: "Greedy heuristic",
        complete: "Consistent with data",
        concept:
          "Recursively selects the attribute with highest information gain to split training subsets.",
      },
      {
        name: "Information Gain",
        type: "Information Theory",
        time: "O(|Examples|)",
        space: "O(Classes)",
        optimal: "Mutual Information",
        complete: "N/A",
        concept:
          "Quantifies expected entropy reduction achieved by partitioning on an attribute.",
      },
      {
        name: "Pruning & Majority Voting",
        type: "Generalization",
        time: "O(Tree size)",
        space: "O(1)",
        optimal: "Cross-validation",
        complete: "N/A",
        concept:
          "Simplifies tree structures to prevent overfitting and improve generalization.",
      },
    ],
    keyTakeaways: [
      "Entropy H(S) measures class impurity (0 for pure, 1 for balanced binary).",
      "Information gain measures reduction in entropy after partitioning.",
      "Overfitting occurs when trees fit sample noise rather than general patterns.",
      "Greedy top-down induction yields compact, interpretable models.",
    ],
    walkthroughs: [
      {
        step: "1. Choose Dataset",
        description: "Select PlayTennis, Holiday Preferences, or TV Programs datasets.",
      },
      {
        step: "2. Inspect Examples",
        description: "View training records, feature values, and target class distributions.",
      },
      {
        step: "3. Step Through Splits",
        description: "Evaluate candidate splits by Information Gain and expand decision nodes.",
      },
      {
        step: "4. Test Predictions",
        description: "Trace unseen test instances down the tree to predict outcomes.",
      },
    ],
  },
  neural: {
    title: "Neural Networks",
    subtitle: "Perceptrons, MLPs & Backpropagation",
    badge: "Connectionism",
    summary:
      "Parameterizes non-linear mappings with layered artificial neurons trained via gradient descent.",
    algorithms: [
      {
        name: "Single-Layer Perceptron",
        type: "Linear Classifier",
        time: "O(Epochs * n)",
        space: "O(w)",
        optimal: "Perceptron Convergence",
        complete: "If linearly separable",
        concept:
          "Updates linear weights in error direction; converges on linearly separable data.",
      },
      {
        name: "Multi-Layer Perceptron (MLP)",
        type: "Universal Approximator",
        time: "O(Epochs * W)",
        space: "O(W)",
        optimal: "Local Minima",
        complete: "Non-linear",
        concept:
          "Multi-layer architecture with non-linear activations approximating complex surfaces.",
      },
      {
        name: "Backpropagation (SGD)",
        type: "Gradient Descent",
        time: "O(W) per sample",
        space: "O(W)",
        optimal: "Gradient descent",
        complete: "Continuous",
        concept:
          "Computes loss gradients across weights via chain-rule reverse propagation.",
      },
      {
        name: "Momentum",
        type: "Optimization",
        time: "O(1)",
        space: "O(W)",
        optimal: "Accelerated",
        complete: "N/A",
        concept:
          "Accelerates gradient descent and dampens oscillations using previous updates.",
      },
    ],
    keyTakeaways: [
      "Non-linear activations enable multi-layer networks to learn non-linear boundaries.",
      "Decision boundaries partition input spaces between target classes.",
      "Learning rates govern convergence speed and numerical stability.",
      "Backpropagation distributes error responsibility across network weights.",
    ],
    walkthroughs: [
      {
        step: "1. Choose Dataset & Structure",
        description: "Select XOR, Moons, or Circles datasets and network topology.",
      },
      {
        step: "2. Tune Hyperparameters",
        description: "Configure learning rate and momentum values for training.",
      },
      {
        step: "3. Train & Visualize",
        description: "Train step-by-step or run epochs to visualize decision boundary updates.",
      },
      {
        step: "4. Inspect Convergence",
        description: "Monitor loss curve descent and inspect weight adjustments.",
      },
    ],
  },
  strips_to_csp: {
    title: "STRIPS to CSP Planning",
    subtitle: "Encoding Planning as Constraint Satisfaction",
    badge: "Planning as CSP",
    summary:
      "Encodes classical state-space planning as temporal constraint satisfaction problems.",
    algorithms: [
      {
        name: "Temporal Horizon Unfolding",
        type: "Compilation",
        time: "O(k * (|P| + |A|))",
        space: "O(k * CSP)",
        optimal: "Step-Optimal",
        complete: "Iterative Deepening",
        concept:
          "Instantiates state propositions and actions across discrete time horizons 0..k.",
      },
      {
        name: "Explanatory Frame Axioms",
        type: "Logical Formulation",
        time: "O(k * |P|)",
        space: "O(k * |P|)",
        optimal: "Exact",
        complete: "Yes",
        concept:
          "Enforces that propositions remain invariant unless explicitly altered by actions.",
      },
      {
        name: "Mutex / Non-Interference",
        type: "Concurrency Constraints",
        time: "O(|A|^2)",
        space: "O(|A|^2)",
        optimal: "Exact",
        complete: "Yes",
        concept:
          "Prohibits conflicting actions with overlapping preconditions and delete effects.",
      },
    ],
    keyTakeaways: [
      "Frame axioms resolve state persistence across time steps.",
      "Horizon scaling increments plan length k until a valid assignment exists.",
      "Constraint propagation operates bidirectionally from start and goal.",
      "Compilation to CSP leverages fast arc consistency and SAT solvers.",
    ],
    walkthroughs: [
      {
        step: "1. Select Domain",
        description: "Open the Coffee Delivery Robot or Elevator problems.",
      },
      {
        step: "2. Set Horizon k",
        description: "Adjust the horizon slider to unfold temporal time steps.",
      },
      {
        step: "3. Run AC Propagation",
        description: "Execute arc consistency to prune incompatible actions across steps.",
      },
      {
        step: "4. Extract Plan",
        description: "Read the sequence of synthesized actions satisfying the goal.",
      },
    ],
  },
  robot: {
    title: "Robot Control & Simulation",
    subtitle: "Perception, Reasoning & Hierarchical Control",
    badge: "Robotics",
    summary:
      "Simulates perception and control in an autonomous agent via layered hierarchical controllers.",
    algorithms: [
      {
        name: "Sense-Plan-Act Cycle",
        type: "Control Loop",
        time: "Continuous / Tick",
        space: "O(State)",
        optimal: "Real-time",
        complete: "Reactive",
        concept:
          "Reads range sensors, evaluates controller rules, and commands steering velocities.",
      },
      {
        name: "Hierarchical Controller",
        type: "Architectural Decomposition",
        time: "Layered",
        space: "O(Waypoints)",
        optimal: "Layered Decoupling",
        complete: "Subsumption",
        concept:
          "High level tracks waypoints; middle level avoids obstacles; low level handles motors.",
      },
      {
        name: "Wall-Following (P-Control)",
        type: "Obstacle Navigation",
        time: "O(1)",
        space: "O(1)",
        optimal: "Heuristic",
        complete: "Local",
        concept:
          "Maintains set distance from obstacles to navigate corridors and escape traps.",
      },
    ],
    keyTakeaways: [
      "Closed-loop perception updates actions in real time.",
      "Layered architectures decouple strategic planning from reactive reflexes.",
      "Rule-based logic cleanly specifies controller behaviors.",
      "Sensory whiskers and sonars provide local spatial feedback.",
    ],
    walkthroughs: [
      {
        step: "1. Choose Arena",
        description: "Select Office Delivery, Maze Trap, or Warehouse environments.",
      },
      {
        step: "2. Inspect Telemetry",
        description: "Observe sensor rays, range whiskers, and current robot pose.",
      },
      {
        step: "3. Run Simulation",
        description: "Step or play the simulation to watch waypoint navigation.",
      },
      {
        step: "4. Tune Controller",
        description: "Adjust steering thresholds and obstacle distances in the visual builder controls.",
      },
    ],
  },
  planning: {
    title: "STRIPS Planning & Blocks World",
    subtitle: "Forward Search, Goal Regression & Partial Order Planning",
    badge: "Classical Planning",
    summary:
      "Synthesizes action sequences to reach goal configurations in symbolic state spaces.",
    algorithms: [
      {
        name: "Forward State-Space Search (Progression)",
        type: "State Search",
        time: "O(b^d)",
        space: "O(b*d)",
        optimal: "With A*",
        complete: "Yes",
        concept:
          "Progresses forward from initial state S_0 by applying applicable actions.",
      },
      {
        name: "Goal Regression (Backward Planning)",
        type: "Subgoal Regression",
        time: "O(b^d)",
        space: "O(b*d)",
        optimal: "With heuristic",
        complete: "Yes",
        concept:
          "Regresses preconditions backward from goal G through relevant actions.",
      },
      {
        name: "Partial Order Planning (POP)",
        type: "Plan-Space Search",
        time: "O(2^k)",
        space: "O(Plan graph)",
        optimal: "Least-Commitment",
        complete: "Yes",
        concept:
          "Constructs partial-order plans by resolving threats and adding causal links.",
      },
    ],
    keyTakeaways: [
      "STRIPS actions specify preconditions, add lists, and delete lists.",
      "Subgoal interactions (e.g. Sussman Anomaly) require non-isolated planning.",
      "Least commitment postpones ordering decisions until necessary.",
      "Causal links protect required conditions from adverse action interference.",
    ],
    walkthroughs: [
      {
        step: "1. Choose Blocks Problem",
        description: "Select Sussman Anomaly, Five Blocks Tower, or Block Swap.",
      },
      {
        step: "2. Choose Search Strategy",
        description: "Select forward state-space progression or backward goal regression.",
      },
      {
        step: "3. Solve & Inspect Tree",
        description: "Generate plan steps and trace state progression in search tree.",
      },
      {
        step: "4. Animate Execution",
        description: "Watch the robotic gripper execute pick, move, and stack actions.",
      },
    ],
  },
};
