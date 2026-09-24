export interface ToolAlgorithmInfo {
  name: string;
  type: string;
  time: string;
  space: string;
  optimal: string;
  complete: string;
  concept: string;
}

export interface ToolWalkthroughStep {
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

export const TOOL_TUTORIALS: Record<string, ToolTutorialData> = {
  "search": {
    "title": "Graph Searching",
    "subtitle": "Uninformed, Heuristic & Optimal Pathfinding",
    "badge": "Search",
    "summary": "Search is the foundational problem-solving paradigm in AI: finding an optimal sequence of transitions from an initial state to a goal state across a graph.",
    "algorithms": [
      {
        "name": "Depth-First Search (DFS)",
        "type": "Uninformed",
        "time": "O(b^m)",
        "space": "O(b*m)",
        "optimal": "No",
        "complete": "No (infinite graphs / cycles)",
        "concept": "Explores deepest unexplored branch first using a LIFO stack. Highly memory efficient, but can get trapped in deep infinite branches."
      },
      {
        "name": "Breadth-First Search (BFS)",
        "type": "Uninformed",
        "time": "O(b^d)",
        "space": "O(b^d)",
        "optimal": "Yes (if costs = 1)",
        "complete": "Yes",
        "concept": "Explores all nodes layer-by-layer using a FIFO queue. Guaranteed to find the shallowest goal, but consumes exponential memory."
      },
      {
        "name": "Lowest-Cost-First (Dijkstra)",
        "type": "Uninformed",
        "time": "O(b^(C*/e))",
        "space": "O(b^(C*/e))",
        "optimal": "Yes",
        "complete": "Yes",
        "concept": "Expands path with minimal accumulated cost g(p). Guaranteed to find lowest total cost solution for arbitrary non-negative edge costs."
      },
      {
        "name": "Greedy Best-First",
        "type": "Heuristic",
        "time": "O(b^m)",
        "space": "O(b^m)",
        "optimal": "No",
        "complete": "No",
        "concept": "Orders frontier purely by heuristic distance h(n) to goal. Fast in practice, but vulnerable to being misled by inaccurate heuristics into suboptimal paths."
      },
      {
        "name": "A* Search",
        "type": "Optimal Heuristic",
        "time": "O(b^d)",
        "space": "O(b^d)",
        "optimal": "Yes (if h is admissible)",
        "complete": "Yes",
        "concept": "Evaluates f(n) = g(n) + h(n), balancing cost-so-far with estimated cost-to-go. The gold standard for optimal heuristic pathfinding."
      },
      {
        "name": "Multi-Path Pruning",
        "type": "Enhancement",
        "time": "Optimized",
        "space": "O(|V|)",
        "optimal": "Yes (if h is consistent)",
        "complete": "Yes",
        "concept": "Prunes any path arriving at a previously expanded state with higher or equal cost, collapsing exponential search spaces on graphs with cycles."
      }
    ],
    "keyTakeaways": [
      "A search problem consists of States, Start State, Actions/Successor function, Path Cost, and Goal Test.",
      "The Frontier separates explored territory from unexplored possibilities. How you order the frontier determines your search strategy.",
      "Admissibility: A heuristic h(n) is admissible if it never overestimates: h(n) <= h*(n). Admissibility guarantees A* optimality on trees.",
      "Consistency (Monotonicity): h(n) <= cost(n, n') + h(n'). Consistency guarantees A* optimality on graphs with multi-path pruning."
    ],
    "walkthroughs": [
      {
        "step": "1. Choose or Create a Graph",
        "description": "Select a preloaded problem like Vancouver or Simple Tree, or add custom nodes and directed weighted edges."
      },
      {
        "step": "2. Select Search Strategy & Heuristics",
        "description": "Pick between DFS, BFS, Lowest-Cost-First, Best-First, or A*. You can toggle whether edge costs or node heuristics are taken into account."
      },
      {
        "step": "3. Step, Auto-Search & Inspect the Frontier",
        "description": "Click \"Step\" to expand the highest-priority path from the frontier. Inspect the Frontier Table showing path paths, g(n), h(n), and f(n)."
      },
      {
        "step": "4. Test Quiz Mode",
        "description": "Switch to Quiz Mode to test your understanding! Click the node you predict will be expanded next."
      }
    ]
  },
  "constraint": {
    "title": "Consistency Based CSP Solver",
    "subtitle": "Arc Consistency (AC-3) & Domain Splitting",
    "badge": "CSPs",
    "summary": "Constraint Satisfaction Problems express problems declaratively via variables with finite domains and constraints restricting allowable value combinations.",
    "algorithms": [
      {
        "name": "Arc Consistency (AC-3)",
        "type": "Propagation",
        "time": "O(c * d^3)",
        "space": "O(c)",
        "optimal": "Exact",
        "complete": "Polynomial reduction",
        "concept": "Prunes domain values from variable X that have no supporting value in constraint C with other variables. Propagates changes until a fixed point."
      },
      {
        "name": "Domain Splitting with Backtracking",
        "type": "Systematic Search",
        "time": "O(d^n)",
        "space": "O(n)",
        "optimal": "Exact",
        "complete": "Yes",
        "concept": "When AC-3 halts with multi-valued domains, select a variable, split its domain into disjoint subsets, apply AC-3 to each branch, and backtrack if a domain empties."
      },
      {
        "name": "MRV / Fail-First Heuristic",
        "type": "Variable Ordering",
        "time": "O(n)",
        "space": "O(1)",
        "optimal": "Heuristic",
        "complete": "N/A",
        "concept": "Selects the unassigned variable with Minimum Remaining Values (MRV) to branch on first, maximizing early pruning."
      }
    ],
    "keyTakeaways": [
      "Variables, Domains, and Constraints: A CSP consists of {X1...Xn}, each with domain D(Xi), and relations C_j specifying allowed tuples.",
      "Arc (X, C) is consistent if for every x in D(X), there exists compatible values for other variables in C.",
      "Local Consistency vs Global Consistency: Arc consistency alone does NOT guarantee a solution exists! It prunes values that CANNOT be part of ANY solution.",
      "Maintaining Arc Consistency (MAC) within backtracking search solves large CSPs like N-Queens and scheduling dramatically faster than pure backtracking."
    ],
    "walkthroughs": [
      {
        "step": "1. Load CSP Problem",
        "description": "Pick Simple CSP, Australia Map Coloring, 8-Queens, or Job Shop Scheduling."
      },
      {
        "step": "2. Execute Fine Step vs Auto AC",
        "description": "Click \"Fine Step\" to inspect the evaluation of a single arc (Variable, Constraint). Observe values being crossed out in red when unsupported."
      },
      {
        "step": "3. Domain Splitting",
        "description": "Click \"Domain Split\" on a variable with multiple values to create search branches. Backtrack if an empty domain is encountered."
      },
      {
        "step": "4. Explore Tree of Splits",
        "description": "Navigate the hierarchical tree of search states to view active solutions and dead ends."
      }
    ]
  },
  "hill": {
    "title": "Stochastic Local Search (SLS)",
    "subtitle": "Hill Climbing, Min-Conflicts & Annealing",
    "badge": "Local Search",
    "summary": "Stochastic Local Search algorithms navigate through the space of total assignments (every variable assigned a value) by making local adjustments to minimize violated constraints.",
    "algorithms": [
      {
        "name": "Greedy Descent / Hill Climbing",
        "type": "Local Search",
        "time": "O(k * n)",
        "space": "O(n)",
        "optimal": "Local Optima",
        "complete": "No",
        "concept": "Evaluates candidate single-variable moves and greedily picks the change that yields the largest decrease in violated constraints."
      },
      {
        "name": "Min-Conflicts Heuristic",
        "type": "Greedy SLS",
        "time": "O(k * d)",
        "space": "O(n)",
        "optimal": "Local Optima",
        "complete": "No",
        "concept": "Picks a conflicted variable at random and changes its value to the one that minimizes conflicts. Extremely effective on N-Queens (solves 1,000,000 queens in near-linear time)."
      },
      {
        "name": "Random Walk & p-Walk",
        "type": "Stochastic Escape",
        "time": "Stochastic",
        "space": "O(n)",
        "optimal": "N/A",
        "complete": "With restart",
        "concept": "With probability p, picks a random conflicting variable and assigns it a random value; with probability 1-p, takes the greedy best step."
      },
      {
        "name": "Simulated Annealing",
        "type": "Physics-Inspired",
        "time": "Schedule dependent",
        "space": "O(n)",
        "optimal": "Asymptotically optimal",
        "complete": "Probabilistic",
        "concept": "Accepts improving moves always, and accepts uphill (worse) moves with probability exp(-delta / T), where temperature T gradually cools down."
      },
      {
        "name": "Tabu Search",
        "type": "Memory-Guided",
        "time": "O(k * n)",
        "space": "O(Tabu Length)",
        "optimal": "Heuristic",
        "complete": "No",
        "concept": "Maintains a tabu list of recent variable assignments that cannot be revisited for a set tenure, preventing 2-step and 3-step cycling on plateaus."
      }
    ],
    "keyTakeaways": [
      "Total Assignments vs Partial Assignments: SLS starts with ALL variables instantiated and iterates over total states.",
      "The Error Function (Conflicts): The objective is minimizing h(assignment) = number of unsatisfied constraints.",
      "Local Optima & Plateaus: Pure hill climbing gets stuck when no single neighbor improves the score. Random walk, annealing, and tabu search escape these traps.",
      "Batch Runs: Run 100 independent trials to observe the statistical distribution of steps to solution and success probabilities."
    ],
    "walkthroughs": [
      {
        "step": "1. Choose Problem & Algorithm",
        "description": "Select Scheduling, Crossword, or N-Queens. Choose Greedy Descent, Min-Conflicts, Random Walk, or Simulated Annealing."
      },
      {
        "step": "2. Tune SLS Hyperparameters",
        "description": "Adjust Random Walk Probability p (e.g. 0.05 to 0.20), Temperature T, or Tabu Tenure."
      },
      {
        "step": "3. Step or Auto-Solve with Live Plot",
        "description": "Watch the Conflict Plot chart the number of violated constraints decrease over iterations in real time."
      },
      {
        "step": "4. Run Batch Experiments",
        "description": "Execute 50-100 random restarts to compare convergence speeds and failure rates across algorithms."
      }
    ]
  },
  "deduction": {
    "title": "Definite Clause Deduction",
    "subtitle": "Prolog & CILog Logic Programming",
    "badge": "Deduction",
    "summary": "Deduction demonstrates how logical inference and answer extraction can be cast as a systematic search problem over definite clauses using SLD resolution and unification.",
    "algorithms": [
      {
        "name": "Top-Down SLD Resolution",
        "type": "Goal-Directed Search",
        "time": "O(b^d)",
        "space": "O(b*d)",
        "optimal": "Refutation Complete",
        "complete": "Yes (with BFS/iterative deepening)",
        "concept": "Starts from user query as the initial goal clause, matches atoms with clause heads in the Knowledge Base using unification, and reduces the goal list until the empty clause is derived."
      },
      {
        "name": "Bottom-Up Fixed-Point Operator",
        "type": "Forward Chaining",
        "time": "O(|KB| * k)",
        "space": "O(|Herbrand Base|)",
        "optimal": "Least Model",
        "complete": "Yes for ground Datalog",
        "concept": "Iteratively adds consequences to the known true set by finding rules whose body conditions are all satisfied, until no new atoms can be deduced."
      },
      {
        "name": "Most General Unifier (MGU)",
        "type": "Symbolic Unification",
        "time": "O(terms)",
        "space": "O(substitutions)",
        "optimal": "Most General",
        "complete": "Yes",
        "concept": "Finds the minimal variable substitution theta such that Atom1 * theta == Atom2 * theta."
      }
    ],
    "keyTakeaways": [
      "Definite Clauses: Rules of the form Head <- Body1 & Body2. Facts are clauses with an empty body.",
      "Unification: Enables pattern-matching with variables, allowing general knowledge to be instantiated to specific individuals.",
      "Proof Tree: Every choice of which clause to resolve with branches into an OR-tree of alternate proof paths.",
      "Answer Extraction: Variables in the initial query receive values bound through successful unification along the proof path."
    ],
    "walkthroughs": [
      {
        "step": "1. Load Knowledge Base",
        "description": "Select Electrical Wiring, Family Kinship, or University Course Prerequisites."
      },
      {
        "step": "2. Enter Query",
        "description": "Type a goal query like lit(l1), ancestor(tom, Who), or requires(cs101, Target)."
      },
      {
        "step": "3. Step Through SLD Proof Tree",
        "description": "Follow the resolution steps visually on the canvas. Observe unifying substitutions displayed on each edge."
      },
      {
        "step": "4. Inspect Answers & Models",
        "description": "View all variable bindings that satisfy the query, or inspect failed branches where no rule matched."
      }
    ]
  },
  "bayes": {
    "title": "Belief & Decision Networks",
    "subtitle": "Bayesian Networks & Variable Elimination",
    "badge": "Probabilistic Reasoning",
    "summary": "Belief Networks (Bayesian Networks) provide a compact graphical representation for joint probability distributions using conditional independence, enabling diagnostic and decision reasoning under uncertainty.",
    "algorithms": [
      {
        "name": "Variable Elimination (VE)",
        "type": "Exact Inference",
        "time": "O(n * d^(w+1))",
        "space": "O(d^w)",
        "optimal": "Exact Posterior",
        "complete": "Yes",
        "concept": "Calculates marginal probabilities by multiplying factor tables and summing out unobserved variables in a chosen elimination order."
      },
      {
        "name": "D-Separation (Active Trails)",
        "type": "Graphical Criterion",
        "time": "O(|V| + |E|)",
        "space": "O(|V|)",
        "optimal": "Exact Independence",
        "complete": "Sound & Complete",
        "concept": "Determines if X is conditionally independent of Y given evidence Z by inspecting whether all trails between them are blocked by conditioned chains, forks, or unconditioned colliders."
      },
      {
        "name": "Maximum Expected Utility (MEU)",
        "type": "Decision Theory",
        "time": "VE complexity",
        "space": "Factor space",
        "optimal": "Optimal Policy",
        "complete": "Yes",
        "concept": "Evaluates expected payoff of candidate decision actions given observations: EU(d) = sum P(s|d, e) * U(s), selecting the action that maximizes utility."
      }
    ],
    "keyTakeaways": [
      "Bayes Rule: P(H|E) = P(E|H) * P(H) / P(E). Enables updating beliefs from prior probabilities to posterior probabilities.",
      "Compact Representation: A Bayes net of n variables with at most k parents requires O(n * 2^k) parameters instead of 2^n in the full joint table.",
      "Conditioning on Evidence: When a node is observed (e.g., Fire = true or Alarm = false), its probability collapses to 1.0/0.0 and probability mass propagates across the network.",
      "Decision Nodes & Utility Nodes: Extend belief networks into Influence Diagrams / Decision Networks for rational decision making."
    ],
    "walkthroughs": [
      {
        "step": "1. Select Network",
        "description": "Open Fire Alarm, Umbrella Decision, Car Diagnosis, or Medical Influenza."
      },
      {
        "step": "2. Observe Nodes (Set Evidence)",
        "description": "Click any variable node to set its observed state (e.g. Smoke = true). Watch posterior bar charts dynamically update!"
      },
      {
        "step": "3. Step-by-Step Variable Elimination",
        "description": "Open the VE tab to inspect factors being multiplied and summed out table by table."
      },
      {
        "step": "4. Test D-Separation & Independence",
        "description": "Select Node A, Node B, and Evidence set C. The visual inspector highlights active vs blocked paths and states whether A _|_ B | C."
      }
    ]
  },
  "dtree": {
    "title": "Decision Trees",
    "subtitle": "Entropy, Information Gain & ID3 Learning",
    "badge": "Supervised Learning",
    "summary": "Decision Tree induction constructs a human-interpretable hierarchical decision model by recursively partitioning examples based on the attribute that maximizes information gain.",
    "algorithms": [
      {
        "name": "ID3 / C4.5 Induction",
        "type": "Greedy Top-Down",
        "time": "O(|Attrs| * |Examples| * depth)",
        "space": "O(Tree size)",
        "optimal": "Greedy heuristic",
        "complete": "Consistent with data",
        "concept": "At each node, evaluates all remaining attributes using Shannon Entropy, selects the best split, partitions the dataset, and recurses on sub-nodes."
      },
      {
        "name": "Information Gain",
        "type": "Information Theory",
        "time": "O(|Examples|)",
        "space": "O(Classes)",
        "optimal": "Mutual Information",
        "complete": "N/A",
        "concept": "Gain(S, A) = Entropy(S) - sum (|S_v| / |S|) * Entropy(S_v). Quantifies the expected reduction in uncertainty."
      },
      {
        "name": "Pruning & Majority Voting",
        "type": "Generalization",
        "time": "O(Tree size)",
        "space": "O(1)",
        "optimal": "Cross-validation",
        "complete": "N/A",
        "concept": "Prunes noisy or overfitted leaf nodes to improve generalization accuracy on unseen test data."
      }
    ],
    "keyTakeaways": [
      "Entropy H(S) = -sum p_i * log2(p_i) measures the impurity of a dataset. Zero entropy means pure (all same class); 1.0 means maximum confusion (50/50 binary).",
      "Information Gain measures how well a given attribute separates the training examples according to their target classification.",
      "Overfitting occurs when a tree memorizes noise in the training set instead of learning the underlying distribution.",
      "Interactive Splitting: Students can choose between auto-building the full tree or manually deciding which attribute to split at each step!"
    ],
    "walkthroughs": [
      {
        "step": "1. Choose Dataset",
        "description": "Select PlayTennis, Likes Holiday, Likes TV Programs, or Matching Pennies."
      },
      {
        "step": "2. Inspect Example Data Table",
        "description": "View the training records, filter rows, and inspect class distribution."
      },
      {
        "step": "3. Step Through Node Splits",
        "description": "View candidate attributes with their calculated Information Gain. Click to split on the highest gain feature or choose manually."
      },
      {
        "step": "4. Test Predictions on New Instances",
        "description": "Trace test cases through the learned tree branches to classify unseen samples."
      }
    ]
  },
  "neural": {
    "title": "Neural Networks",
    "subtitle": "Perceptrons, MLPs & Backpropagation",
    "badge": "Connectionism",
    "summary": "Artificial Neural Networks model non-linear mappings through networks of interconnected artificial neurons parameterized by synaptic weights and trained via gradient descent.",
    "algorithms": [
      {
        "name": "Single-Layer Perceptron",
        "type": "Linear Classifier",
        "time": "O(Epochs * n)",
        "space": "O(w)",
        "optimal": "Perceptron Convergence",
        "complete": "If linearly separable",
        "concept": "Calculates y = step(w * x + b) and updates weights along error direction. Provably converges if data is linearly separable, but fails on XOR."
      },
      {
        "name": "Multi-Layer Perceptron (MLP)",
        "type": "Universal Approximator",
        "time": "O(Epochs * W)",
        "space": "O(W)",
        "optimal": "Local Minima",
        "complete": "Non-linear",
        "concept": "Feedforward architecture with hidden layers and non-linear activation functions (Sigmoid, Tanh, ReLU) capable of approximating any continuous function."
      },
      {
        "name": "Backpropagation (SGD)",
        "type": "Gradient Descent",
        "time": "O(W) per sample",
        "space": "O(W)",
        "optimal": "Gradient descent",
        "complete": "Continuous",
        "concept": "Propagates loss gradients backwards through the layers using the calculus chain rule, adjusting weights proportional to -eta * dLoss/dw."
      },
      {
        "name": "Momentum",
        "type": "Optimization",
        "time": "O(1)",
        "space": "O(W)",
        "optimal": "Accelerated",
        "complete": "N/A",
        "concept": "Adds a fraction alpha of previous weight update to dampen oscillations and accelerate through shallow plateaus."
      }
    ],
    "keyTakeaways": [
      "Non-Linear Activation: Without non-linear activation functions, any multi-layer neural network collapses into a simple linear matrix multiplication.",
      "Decision Boundaries: In 2D classification, the network generates a contour plane separating classes. Observe how the boundary bends around XOR, Moons, and Circles.",
      "Learning Rate: Too high causes loss to oscillate or explode; too low causes agonizingly slow convergence.",
      "Interactive Data Points: Click directly onto the 2D classification canvas to place new training samples and watch the network adapt live!"
    ],
    "walkthroughs": [
      {
        "step": "1. Choose Dataset & Architecture",
        "description": "Select Boolean XOR, Two Moons, Concentric Circles, or Linearly Separable."
      },
      {
        "step": "2. Adjust Learning Rate & Momentum",
        "description": "Tune hyperparameters using the sliders (e.g. Learning Rate = 0.5, Momentum = 0.8)."
      },
      {
        "step": "3. Train Step-by-Step or Run Epochs",
        "description": "Watch the 2D decision boundary dynamically morph and warp around the data points in real time!"
      },
      {
        "step": "4. Inspect Loss Curve & Weights",
        "description": "View the Mean Squared Error (MSE) curve drop and inspect synaptic weight values in the architecture canvas."
      }
    ]
  },
  "strips_to_csp": {
    "title": "STRIPS to CSP Planning",
    "subtitle": "Encoding Planning as Constraint Satisfaction",
    "badge": "Planning as CSP",
    "summary": "STRIPS-to-CSP translates classical state-space planning problems into constraint satisfaction problems across time horizons, allowing SAT/CSP solvers to find optimal plans efficiently.",
    "algorithms": [
      {
        "name": "Temporal Horizon Unfolding",
        "type": "Compilation",
        "time": "O(k * (|P| + |A|))",
        "space": "O(k * CSP)",
        "optimal": "Step-Optimal",
        "complete": "Iterative Deepening",
        "concept": "For horizon k = 0, 1, 2..., instantiates state proposition variables P_t and action variables A_t at each time step t."
      },
      {
        "name": "Explanatory Frame Axioms",
        "type": "Logical Formulation",
        "time": "O(k * |P|)",
        "space": "O(k * |P|)",
        "optimal": "Exact",
        "complete": "Yes",
        "concept": "Constrains that a proposition P can only change value from t to t+1 if an action that affects P occurred at step t."
      },
      {
        "name": "Mutex / Non-Interference",
        "type": "Concurrency Constraints",
        "time": "O(|A|^2)",
        "space": "O(|A|^2)",
        "optimal": "Exact",
        "complete": "Yes",
        "concept": "Prevents two mutually incompatible actions from executing simultaneously if one deletes the precondition or effect of the other."
      }
    ],
    "keyTakeaways": [
      "The Frame Problem: How to represent that things stay unchanged unless acted upon. Explanatory Frame Axioms solve this symmetrically.",
      "Horizon Scaling: If no plan exists of length k, arc consistency on the CSP detects a domain wipeout or exhaustion, prompting the planner to try k+1.",
      "Bi-directional Propagation: Constraints propagate both forwards from initial state and backwards from goal state simultaneously!",
      "Modern SAT-based planners (like SatPlan) use this exact compilation principle to solve planning benchmarks hundreds of times faster than classical search."
    ],
    "walkthroughs": [
      {
        "step": "1. Select Planning Domain",
        "description": "Open the Coffee Delivery Robot or Two-Floor Elevator World."
      },
      {
        "step": "2. Set Time Horizon k",
        "description": "Use the Horizon Slider to unfold the CSP across 1, 2, 3, or 4 time steps."
      },
      {
        "step": "3. Run Arc Consistency across Time",
        "description": "Observe how preconditions at step t prune illegal action choices and propagate required effects."
      },
      {
        "step": "4. Extract Satisfying Plan",
        "description": "View the sequence of instantiated actions (e.g. mc -> PUC -> mo -> DelC) that reaches the goal."
      }
    ]
  },
  "robot": {
    "title": "Robot Control & Simulation",
    "subtitle": "Perception, Reasoning & Hierarchical Control",
    "badge": "Robotics",
    "summary": "Simulates an autonomous agent perceiving and acting in a physical environment using a layered hierarchical controller architecture (high, middle, and low levels).",
    "algorithms": [
      {
        "name": "Sense-Plan-Act Cycle",
        "type": "Control Loop",
        "time": "Continuous / Tick",
        "space": "O(State)",
        "optimal": "Real-time",
        "complete": "Reactive",
        "concept": "Every cycle: 1. Read range whiskers, sonar, and compass. 2. Evaluate middle-layer rules. 3. Output motor steering and velocity."
      },
      {
        "name": "Hierarchical Controller",
        "type": "Architectural Decomposition",
        "time": "Layered",
        "space": "O(Waypoints)",
        "optimal": "Layered Decoupling",
        "complete": "Subsumption",
        "concept": "High layer manages waypoint plan; middle layer guides towards active waypoint while steering around obstacles; low layer handles motor commands."
      },
      {
        "name": "Wall-Following (P-Control)",
        "type": "Obstacle Navigation",
        "time": "O(1)",
        "space": "O(1)",
        "optimal": "Heuristic",
        "complete": "Local",
        "concept": "Maintains a constant distance from wall contours to escape concave traps and navigate narrow corridors."
      }
    ],
    "keyTakeaways": [
      "Embodied Cognition: An agent acts in real time; sensor readings have noise, and movements have geometry.",
      "Hierarchical Subsumption: Higher-level strategic decisions run at lower frequency, while low-level collision avoidance runs at high frequency.",
      "CILog / Rule-Based Controllers: Controller behaviors can be defined declaratively in logic rules.",
      "Interactive Arenas: Watch the robot drive in real-time, leave breadcrumb trails, and navigate around custom user-drawn walls!"
    ],
    "walkthroughs": [
      {
        "step": "1. Choose Map & World",
        "description": "Select Office Delivery (Book World), U-Shaped Trap Maze, or Warehouse Obstacle Course."
      },
      {
        "step": "2. Inspect Sensors & Pose",
        "description": "Observe whiskers and sonar distance rays radiating from the robot toward obstacle walls."
      },
      {
        "step": "3. Run Simulation",
        "description": "Click \"Play\" or \"Step\" to watch the robot navigate to target waypoints in sequence."
      },
      {
        "step": "4. Modify Controller Logic",
        "description": "Open the Code Sandbox to tweak steering thresholds, wall-following distances, and target acquisition rules."
      }
    ]
  },
  "planning": {
    "title": "STRIPS Planning & Blocks World",
    "subtitle": "Forward Search, Goal Regression & Partial Order Planning",
    "badge": "Classical Planning",
    "summary": "Planning enables an autonomous agent to synthesize sequences of actions to achieve complex goals by reasoning about action preconditions and effects in symbolic state spaces like Blocks World.",
    "algorithms": [
      {
        "name": "Forward State-Space Search (Progression)",
        "type": "State Search",
        "time": "O(b^d)",
        "space": "O(b*d)",
        "optimal": "With A*",
        "complete": "Yes",
        "concept": "Starts at initial state S_0, applies applicable actions whose preconditions hold, generating successor states until goal G is satisfied."
      },
      {
        "name": "Goal Regression (Backward Planning)",
        "type": "Subgoal Regression",
        "time": "O(b^d)",
        "space": "O(b*d)",
        "optimal": "With heuristic",
        "complete": "Yes",
        "concept": "Starts from goal G, regresses preconditions backwards through actions that achieve subgoals, ensuring search only visits states relevant to the goal."
      },
      {
        "name": "Partial Order Planning (POP)",
        "type": "Plan-Space Search",
        "time": "O(2^k)",
        "space": "O(Plan graph)",
        "optimal": "Least-Commitment",
        "complete": "Yes",
        "concept": "Searches through the space of partially ordered plans, adding causal links and ordering constraints only when needed to resolve threats."
      }
    ],
    "keyTakeaways": [
      "STRIPS Operators: Action(pick(B)), Preconditions: {clear(B), ontable(B), empty}, Add: {holding(B)}, Delete: {ontable(B), clear(B), empty}.",
      "The Sussman Anomaly: Demonstrates that subgoals cannot simply be achieved in isolation. Achieving on(A, B) first requires undoing it to achieve on(B, C).",
      "Least Commitment Principle: Postpone ordering decisions until necessary, avoiding arbitrary commitment that causes costly backtracking.",
      "Interactive Physical Blocks World: Watch lettered colored blocks get picked up by the robotic gripper and stacked dynamically on screen!"
    ],
    "walkthroughs": [
      {
        "step": "1. Choose Blocks World Problem",
        "description": "Select Sussman Anomaly, Five Blocks Tower, or Simple Two-Block Swap."
      },
      {
        "step": "2. Choose Planner Strategy",
        "description": "Toggle between Forward State-Space Search and Goal Regression."
      },
      {
        "step": "3. Step or Solve Plan",
        "description": "Watch the plan steps generated and follow the search tree nodes."
      },
      {
        "step": "4. Animate Physical World Execution",
        "description": "Click \"Execute Animation\" to watch the animated robotic gripper arm pick up, move, and stack blocks on the table in real time!"
      }
    ]
  }
};
