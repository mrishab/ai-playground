import { ExerciseStepData, ExerciseStepItem } from "@/components/exercises/exerciseStepTypes";

export const EXERCISE_ALGORITHMS: Record<string, ExerciseStepData> = {
  "2.A": {
    algorithmName: "Sense-Plan-Act Robot Controller",
    steps: [
      { step: 1, label: "Sample Proximity Sensors", detail: "Read 8 sonar/laser distance sensors. Lowest reading 1.4m at front-left sensor.", stateBadge: "Sensors Active", queueOrFrontier: "Sensors: [1.4m, 2.1m, 3.0m]", metric: "Clearance: 1.4m" },
      { step: 2, label: "Synthesize Repulsive Vector", detail: "Middle-layer controller calculates obstacle repulsion vector away from front-left obstacle.", stateBadge: "Vector Calc", queueOrFrontier: "Repulsion: (-0.4, -0.6)", metric: "Avoidance Heading: +25°" },
      { step: 3, label: "Combine Goal & Avoidance Vectors", detail: "Fuses target waypoint attraction with repulsive vector to compute target heading.", stateBadge: "Heading Blend", queueOrFrontier: "Target Heading: +18°", metric: "Velocity: 0.5 m/s" },
      { step: 4, label: "Execute Wheel Actuation", detail: "Low-layer controller sets left wheel = 0.45 m/s, right wheel = 0.55 m/s. Robot advances.", stateBadge: "Motor Drive", queueOrFrontier: "Wheels: (0.45, 0.55)", metric: "Pose: (4.2, 5.8, 18°)" },
    ],
    questionSteps: {
      0: [
        { step: 1, label: "High-Layer Issues Waypoint", detail: "High-level strategic planner emits goal: Navigate to target coordinate (6, 8).", stateBadge: "High Layer", queueOrFrontier: "Goal: (6.0, 8.0)", metric: "Dist: 4.2m" },
        { step: 2, label: "Middle-Layer Receives Goal", detail: "Middle-layer monitors real-time sensors and maps path toward waypoint.", stateBadge: "Middle Layer", queueOrFrontier: "Path: straight-line", metric: "Obstacle Detected" },
        { step: 3, label: "Dynamic Obstacle Steering", detail: "Middle-layer overrides direct path to skirt around obstacle while tracking goal.", stateBadge: "Reactive Steer", queueOrFrontier: "Turn: +30°", metric: "Safety Margin: 1.2m" },
        { step: 4, label: "Low-Layer Motor Primitives", detail: "Middle-layer outputs velocity (v=0.6m/s, w=0.2rad/s) executed by wheel motors.", stateBadge: "Actuators", queueOrFrontier: "Motors: v=0.6, w=0.2", metric: "Goal Progress: OK" },
      ],
      1: [
        { step: 1, label: "Concave Obstacle Approach", detail: "Reactive agent without memory enters U-shaped trap heading toward goal behind wall.", stateBadge: "Approaching", queueOrFrontier: "Heading: 0°", metric: "Dist to Wall: 2.0m" },
        { step: 2, label: "Repulsion Clashes with Goal", detail: "Front wall exerts backward repulsion; target goal exerts forward attraction.", stateBadge: "Force Balance", queueOrFrontier: "F_att = -F_rep", metric: "Net Force: 0" },
        { step: 3, label: "Oscillation Cycle", detail: "Agent bounces left, hits corner, bounces right, repeats endlessly due to no internal state.", stateBadge: "Limit Cycle", queueOrFrontier: "State: Oscillation", metric: "Cycles: Infinite" },
        { step: 4, label: "Need for State Memory", detail: "Adding state memory allows wall-following mode to escape concave traps.", stateBadge: "Memory Needed", queueOrFrontier: "Mode: Wall-Follow", metric: "Trap Escaped" },
      ],
    },
  },
  "3.A": {
    algorithmName: "State Space Graph Exploration",
    steps: [
      { step: 1, label: "Define Root State S0", detail: "Initialize start configuration. Successors computed using legal actions.", stateBadge: "Start State", queueOrFrontier: "State: S0", metric: "Depth: 0" },
      { step: 2, label: "Expand Legal Transitions", detail: "Generated successors: S1 (cost=1), S2 (cost=2), S3 (cost=3). Added to search tree.", stateBadge: "Expanded", queueOrFrontier: "Tree Nodes: 4", metric: "Branching: 3" },
      { step: 3, label: "Detect Cyclic Path S3 -> S1", detail: "State S1 reached again via S3. Identified graph cycle.", stateBadge: "Cycle Detected", queueOrFrontier: "Cycle: S0->S3->S1", metric: "Redundant Path" },
      { step: 4, label: "Apply Visited Filter", detail: "Graph search prunes duplicate state S1. Tree search would loop infinitely.", stateBadge: "Pruned", queueOrFrontier: "Explored: {S0, S1, S2, S3}", metric: "Cycles Blocked" },
    ],
    questionSteps: {
      0: [
        { step: 1, label: "World Snapshot", detail: "A state captures full snapshot of variables: agent location, object positions, battery level.", stateBadge: "Configuration", metric: "Vars: 4" },
        { step: 2, label: "Abstract Path History", detail: "Previous sequence of steps taken to arrive at node is discarded from state definition.", stateBadge: "Abstraction", metric: "Markov Property" },
        { step: 3, label: "Evaluate Legal Moves", detail: "State contains all information required to evaluate applicable actions and goal test.", stateBadge: "Transition", metric: "Legal Actions: 3" },
        { step: 4, label: "State Equivalence", detail: "Two identical configurations map to the same state in the graph representation.", stateBadge: "Canonical State", metric: "Duplicate check" },
      ],
      1: [
        { step: 1, label: "Tree Search Without Memory", detail: "Tree search expands nodes blindly without checking if state was visited before.", stateBadge: "Tree Search", queueOrFrontier: "Explored set: NONE", metric: "Repeated States" },
        { step: 2, label: "Exponential Tree Duplication", detail: "Multiple paths to state N generate exponential number of identical subtrees.", stateBadge: "Blowup", queueOrFrontier: "Tree size: O(b^d)", metric: "High Redundancy" },
        { step: 3, label: "Graph Search Explored Set", detail: "Graph search maintains visited hash set of explored states.", stateBadge: "Graph Search", queueOrFrontier: "Visited: {A, B, C}", metric: "O(|V|) states" },
        { step: 4, label: "Cycle & Duplicate Elimination", detail: "Duplicate visits pruned immediately upon expansion. Completeness guaranteed.", stateBadge: "Pruned", queueOrFrontier: "Linear branches", metric: "Finite Graph" },
      ],
    },
  },
  "3.B": {
    algorithmName: "Uninformed Search (BFS, DFS, LCFS)",
    steps: [
      { step: 1, label: "Initialize Frontier", detail: "Pushed start node to frontier queue. Explored set initialized empty.", stateBadge: "Init Frontier", queueOrFrontier: "Frontier: [Start]", metric: "Cost: 0" },
      { step: 2, label: "Expand Start Node", detail: "Removed Start. Evaluated successors A (cost=1) and B (cost=2).", stateBadge: "Expanding", queueOrFrontier: "Frontier: [A, B]", metric: "Explored: 1" },
      { step: 3, label: "Order by Strategy", detail: "Ordered candidates based on active strategy (LIFO, FIFO, or path cost g).", stateBadge: "Ordering", queueOrFrontier: "Sorted Queue", metric: "Next: A" },
      { step: 4, label: "Goal Recognition", detail: "Popped goal state from head of frontier. Solution path reconstructed.", stateBadge: "Goal Popped", queueOrFrontier: "Frontier: []", metric: "Solution Found" },
    ],
    questionSteps: {
      0: [
        { step: 1, label: "Uniform Arc Costs (c = 1)", detail: "Assume all graph transitions have identical positive step cost c > 0.", stateBadge: "Uniform Costs", metric: "Step cost = 1" },
        { step: 2, label: "Layer-by-Layer FIFO Queue", detail: "BFS expands all nodes at depth d before any node at depth d+1.", stateBadge: "Layered FIFO", queueOrFrontier: "Depth 1 -> Depth 2", metric: "Breadth-First" },
        { step: 3, label: "First Goal Encountered", detail: "The first time a goal node is popped from the queue, it has minimal depth d*.", stateBadge: "Minimal Depth", metric: "d* = min depth" },
        { step: 4, label: "Cost Optimality Proved", detail: "Since Path Cost = d* * c, minimal depth guarantees minimal total path cost!", stateBadge: "Optimal", metric: "g(goal) = d* * c" },
      ],
      1: [
        { step: 1, label: "LIFO Recursion Stack", detail: "DFS explores down a single path to maximum depth m using a LIFO stack.", stateBadge: "LIFO Stack", queueOrFrontier: "Stack: depth 0..m", metric: "Max Depth: m" },
        { step: 2, label: "Branching Storage per Level", detail: "At each depth level k, at most b candidate child nodes are stored on stack.", stateBadge: "Branching b", queueOrFrontier: "b nodes / level", metric: "b candidates" },
        { step: 3, label: "Linear Stack Memory O(b*m)", detail: "Once a branch finishes, stack memory is reclaimed immediately.", stateBadge: "Linear Space", metric: "Memory: O(b * m)" },
        { step: 4, label: "Comparison with BFS", detail: "BFS requires O(b^d) exponential memory; DFS requires only O(b*m) linear memory.", stateBadge: "Memory Efficient", metric: "O(b*m) << O(b^d)" },
      ],
      2: [
        { step: 1, label: "Cumulative Path Cost g(p)", detail: "Compute exact accumulated edge cost g(p) = sum of all arc costs from start.", stateBadge: "Cost g(p)", queueOrFrontier: "g(A)=1, g(B)=4", metric: "Cumulative" },
        { step: 2, label: "Priority Queue Head Selection", detail: "Lowest-Cost-First (Dijkstra) always pops path with smallest g(p).", stateBadge: "Min g(p)", queueOrFrontier: "Pop: min g(p)", metric: "Priority Queue" },
        { step: 3, label: "Uniform Contour Expansion", detail: "Search boundary expands outwards along contours of equal cumulative cost.", stateBadge: "Cost Contours", metric: "Monotone g" },
        { step: 4, label: "Guaranteed Cost Optimality", detail: "First goal popped is guaranteed to have minimal path cost across varying weights.", stateBadge: "Optimal Cost", metric: "Optimal g*" },
      ],
    },
  },
  "3.C": {
    algorithmName: "Heuristic Search: Greedy & A*",
    steps: [
      { step: 1, label: "Compute Heuristic h(n)", detail: "Evaluated heuristic estimate h(n) from start node to goal.", stateBadge: "Heuristic Calc", queueOrFrontier: "h(start) = 6", metric: "f = 0 + 6" },
      { step: 2, label: "Evaluate f(n) = g(n) + h(n)", detail: "A* scores candidate paths combining path cost g with heuristic estimate h.", stateBadge: "f-Evaluation", queueOrFrontier: "Frontier: [A(f=5), B(f=7)]", metric: "Best f: 5" },
      { step: 3, label: "Guided Goal Traversal", detail: "Heuristic pulls search directly toward target, pruning branches pointing away.", stateBadge: "Goal Directed", metric: "Expansions Saved" },
      { step: 4, label: "Optimal Goal Extraction", detail: "Popped goal from priority queue. Admissible heuristic ensures optimal path.", stateBadge: "A* Optimal", queueOrFrontier: "Path: Start->A->Goal", metric: "Cost: 5" },
    ],
    questionSteps: {
      0: [
        { step: 1, label: "Uninformed Search (Blind)", detail: "Uninformed methods have only graph connectivity and step costs, searching blindly.", stateBadge: "Blind Search", metric: "No Goal Hint" },
        { step: 2, label: "Domain Heuristic h(n)", detail: "Informed search incorporates problem-specific estimate of distance to goal.", stateBadge: "Informed", metric: "h(n) available" },
        { step: 3, label: "Pruning Unpromising Branches", detail: "Heuristic guidance prunes large portions of the search space facing away from goal.", stateBadge: "Pruned", metric: "Fewer Expansions" },
        { step: 4, label: "Guided Convergence", detail: "Informed search converges significantly faster while preserving completeness.", stateBadge: "Fast Search", metric: "Efficiency Gain" },
      ],
      1: [
        { step: 1, label: "True Minimal Cost h*(n)", detail: "Let h*(n) denote the exact shortest path cost from node n to the goal.", stateBadge: "Ground Truth", metric: "h*(n) exact" },
        { step: 2, label: "Admissibility Criterion", detail: "A heuristic is admissible if h(n) <= h*(n) for all nodes n in the graph.", stateBadge: "Never Overestimates", metric: "h(n) <= h*(n)" },
        { step: 3, label: "Goal Condition h(goal) = 0", detail: "At the goal node itself, heuristic estimate must equal zero.", stateBadge: "Goal Zero", metric: "h(goal) = 0" },
        { step: 4, label: "Optimality Guarantee", detail: "Admissibility ensures A* never overestimates true cost, guaranteeing optimal solution.", stateBadge: "A* Optimal", metric: "Optimal Solution" },
      ],
      2: [
        { step: 1, label: "Lowest-Cost-First (g-term)", detail: "LCFS looks backwards at past accumulated path cost g(n) from start.", stateBadge: "Past Cost", queueOrFrontier: "g(n) = past", metric: "Backward Look" },
        { step: 2, label: "Greedy Best-First (h-term)", detail: "Greedy Best-First looks forwards at estimated remaining cost h(n) to goal.", stateBadge: "Future Estimate", queueOrFrontier: "h(n) = future", metric: "Forward Look" },
        { step: 3, label: "A* Synthesis: f = g + h", detail: "A* combines both perspectives into total estimated path cost f(n) = g(n) + h(n).", stateBadge: "Unified Sum", queueOrFrontier: "f(n) = g(n) + h(n)", metric: "Balanced Search" },
        { step: 4, label: "Guaranteed Best Path", detail: "Combines fast goal-directed guidance with the optimality of Dijkstra's algorithm.", stateBadge: "Optimal & Fast", metric: "Best of Both" },
      ],
      3: [
        { step: 1, label: "Greedy Ignores g(n)", detail: "Greedy Best-First orders frontier solely by h(n), ignoring cost accumulated so far.", stateBadge: "Greedy Blindness", queueOrFrontier: "Order: min h(n)", metric: "g(n) ignored" },
        { step: 2, label: "Alluring Low Heuristic", detail: "Node X has alluring low h(X) = 1, but reaching X required an expensive g(X) = 20.", stateBadge: "Trap Encountered", metric: "g=20, h=1" },
        { step: 3, label: "Expensive Detour Chosen", detail: "Greedy plunges down branch X because h is lowest, ignoring cheaper alternative.", stateBadge: "Detour Taken", metric: "Total Cost: 21" },
        { step: 4, label: "Suboptimal Solution Found", detail: "Discovers path with total cost 21 when an optimal path with cost 10 was available.", stateBadge: "Suboptimal", metric: "Cost: 21 > 10" },
      ],
    },
  },
  "3.E": {
    algorithmName: "Multi-Path Pruning & Cycle Checking",
    steps: [
      { step: 1, label: "Maintain Visited Cost Map", detail: "Track dictionary mapping state -> lowest g(state) cost discovered so far.", stateBadge: "Cost Map", queueOrFrontier: "Visited: {}", metric: "Initial" },
      { step: 2, label: "First Path to Node N", detail: "Path 1 reaches N with cost g1 = 5. Recorded in visited table: visited[N] = 5.", stateBadge: "Recorded", queueOrFrontier: "visited[N] = 5", metric: "Best cost: 5" },
      { step: 3, label: "Subsequent Path to Node N", detail: "Path 2 reaches N with cost g2 = 8. Checked against visited table: 8 >= 5.", stateBadge: "Duplicate Check", queueOrFrontier: "8 >= 5 (Worse)", metric: "Pruning Triggered" },
      { step: 4, label: "Prune Inferior Path", detail: "Path 2 discarded immediately from frontier, preventing exponential redundant exploration.", stateBadge: "Pruned", queueOrFrontier: "Path 2 dropped", metric: "Expansions Saved" },
    ],
    questionSteps: {
      0: [
        { step: 1, label: "Multiple Paths to Same State", detail: "In loopy graphs, different action sequences frequently reach the same state N.", stateBadge: "Multi-Paths", metric: "Multiple routes" },
        { step: 2, label: "Compare Path Costs", detail: "Compare path 1 cost g1 against path 2 cost g2 arriving at state N.", stateBadge: "Comparison", metric: "g1 vs g2" },
        { step: 3, label: "Discard Longer Path", detail: "Any continuation from the longer path will always cost more than from the shorter path.", stateBadge: "Pruning", metric: "Prune if g2 >= g1" },
        { step: 4, label: "Search Space Compression", detail: "Multi-path pruning shrinks search space from tree of paths to graph of states.", stateBadge: "State Space", metric: "Exponential Savings" },
      ],
      1: [
        { step: 1, label: "Monotone / Consistent Heuristic", detail: "Consistency: h(n) <= cost(n, n') + h(n') for all transitions n -> n'.", stateBadge: "Triangle Ineq", metric: "Consistent h" },
        { step: 2, label: "Non-Decreasing f-Values", detail: "Under consistency, sequence of f-values expanded by A* is monotonically non-decreasing.", stateBadge: "Monotone f", metric: "f1 <= f2 <= f3" },
        { step: 3, label: "First Expansion is Optimal", detail: "The first time node N is expanded from priority queue, optimal path to N is found!", stateBadge: "First is Best", metric: "Optimal g*(N)" },
        { step: 4, label: "Zero Re-openings Needed", detail: "Any later path reaching N can be discarded without re-opening N. Maximum 1 expansion per state.", stateBadge: "Prune All Encounters", metric: "Expansions: 1 per state" },
      ],
    },
  },
  "4.A": {
    algorithmName: "AC-3 Arc Consistency Algorithm",
    steps: [
      { step: 1, label: "Initialize Directed Arcs", detail: "Created agenda containing all directed arcs (Xi, C) for all variables and constraints.", stateBadge: "Agenda Init", queueOrFrontier: "Queue: 8 binary arcs", metric: "Domains: full" },
      { step: 2, label: "Pop Arc (X1, C12)", detail: "Evaluate variable X1 with constraint C12: X1 != X2.", stateBadge: "Checking Arc", queueOrFrontier: "Current: (X1, C12)", metric: "dom(X1) = {R, G, B}" },
      { step: 3, label: "Check Value Support", detail: "Tested each value in dom(X1): every value has a distinct supporting partner in dom(X2).", stateBadge: "Supported", queueOrFrontier: "All values valid", metric: "Pruned: 0" },
      { step: 4, label: "Prune Unsupported Values", detail: "For arc (X3, C34), value 'Red' has no support in dom(X4)={Red}. Pruned 'Red' from dom(X3).", stateBadge: "Pruned", queueOrFrontier: "Queue: 3 arcs left", metric: "dom(X3): {Green, Blue}" },
    ],
    questionSteps: {
      0: [
        { step: 1, label: "Directed Arc (X, C)", detail: "Consider directed arc from variable X to constraint C involving variables {X, Y}.", stateBadge: "Arc Selected", metric: "Arc: X -> C" },
        { step: 2, label: "Iterate Domain Values of X", detail: "For each candidate value x in dom(X), inspect domain of partner variable dom(Y).", stateBadge: "Testing Values", metric: "Test all x in dom(X)" },
        { step: 3, label: "Find Supporting Value y", detail: "Arc is consistent if there exists at least one y in dom(Y) such that C(x, y) is true.", stateBadge: "Support Search", metric: "Support Found" },
        { step: 4, label: "Arc Consistency Definition", detail: "Arc (X, C) is consistent iff every value in dom(X) has a supporting assignment in C.", stateBadge: "Arc Consistent", metric: "All x supported" },
      ],
      1: [
        { step: 1, label: "Value x Pruned from dom(X)", detail: "Value x is removed from dom(X) because it had no valid support in constraint C.", stateBadge: "Value Deleted", metric: "dom(X) shrinks" },
        { step: 2, label: "Identify Dependent Variables", detail: "Other variables Y connected to X via other constraints C' relied on value x.", stateBadge: "Neighbor Check", metric: "Neighbors of X" },
        { step: 3, label: "Enqueue Arcs (Y, C')", detail: "Add back all arcs (Y, C') where Y != X and C' involves both X and Y to the AC-3 queue.", stateBadge: "Re-enqueue", queueOrFrontier: "Queue: +2 arcs", metric: "Agenda updated" },
        { step: 4, label: "Propagate Domain Reductions", detail: "AC-3 re-evaluates dependent arcs to ensure cascading consistency throughout CSP.", stateBadge: "Cascading", metric: "Quiescence search" },
      ],
      2: [
        { step: 1, label: "Test 3-Coloring Impossible Graph", detail: "Apply AC-3 to an impossible graph (e.g. 4-clique with 3 colors).", stateBadge: "Impossible Graph", metric: "3 colors / 4 nodes" },
        { step: 2, label: "Run AC-3 to Quiescence", detail: "Every pair of neighbors has valid distinct color pairs. No single domain value is pruned.", stateBadge: "AC-3 Quiescent", metric: "Queue: empty" },
        { step: 3, label: "Local Consistency vs Global Solution", detail: "Every arc is pairwise consistent, yet no global assignment can satisfy all 4 nodes.", stateBadge: "Incomplete", metric: "No global solution" },
        { step: 4, label: "Search / Domain Splitting Required", detail: "Proves arc consistency alone does not guarantee a solution without backtracking search.", stateBadge: "Search Needed", metric: "MAC required" },
      ],
    },
  },
  "4.B": {
    algorithmName: "Domain Splitting & Backtracking Search",
    steps: [
      { step: 1, label: "AC-3 Preprocessing", detail: "Reduced initial domains using arc consistency. 4 variables remain with multiple values.", stateBadge: "Filtered", metric: "Unassigned: 4" },
      { step: 2, label: "Select MRV Variable", detail: "Variable 'NT' has smallest domain size (|dom|=2). Chosen for domain splitting.", stateBadge: "MRV Selected", queueOrFrontier: "Var: NT (size=2)", metric: "Fail-First" },
      { step: 3, label: "Branch Left: NT = Red", detail: "Assert NT = Red. Propagate arc consistency down left search branch.", stateBadge: "Branch Left", queueOrFrontier: "NT = Red", metric: "Propagating" },
      { step: 4, label: "Wipeout & Backtrack", detail: "Domain wipeout detected at SA. Backtrack to root; branch right: NT != Red.", stateBadge: "Backtracking", queueOrFrontier: "NT != Red", metric: "Recovered" },
    ],
    questionSteps: {
      0: [
        { step: 1, label: "Quiescence with Multi-Values", detail: "Arc consistency stops when all arcs are consistent, but variables still have >1 value.", stateBadge: "AC Quiescent", metric: "Multiple values" },
        { step: 2, label: "Split Variable Domain", detail: "Choose variable X with domain {v1, v2, ..., vk}. Partition domain into branches.", stateBadge: "Domain Split", metric: "Branch: X=v1 vs X!=v1" },
        { step: 3, label: "Recursive Search Branches", detail: "Recursively solve left branch (X = v1). If unsatisfiable, solve right branch.", stateBadge: "Recursion", metric: "Binary Split" },
        { step: 4, label: "Complete Search Tree", detail: "Domain splitting guarantees completeness by systematically exploring all legal assignments.", stateBadge: "Complete", metric: "Global solution" },
      ],
      1: [
        { step: 1, label: "Inspect Remaining Legal Domains", detail: "Evaluate remaining legal domain sizes: dom(A)=4, dom(B)=2, dom(C)=3.", stateBadge: "Inspect Domains", metric: "Sizes: [4, 2, 3]" },
        { step: 2, label: "Pick Minimum Remaining Values", detail: "MRV selects variable B with only 2 choices remaining.", stateBadge: "Min Domain Size", metric: "Selected: Var B" },
        { step: 3, label: "Minimize Branching Factor", detail: "Branching on B creates branching factor 2 instead of 4, keeping tree small.", stateBadge: "Small Branching", metric: "Branch factor: 2" },
        { step: 4, label: "Fail-First Detection", detail: "If no solution exists in branch, MRV detects failure earliest, pruning dead subtrees.", stateBadge: "Fail-First", metric: "Pruned Earliest" },
      ],
    },
  },
  "4.C": {
    algorithmName: "Min-Conflicts Local Search & SLS",
    steps: [
      { step: 1, label: "Initial Total Assignment", detail: "Assigned all variables initial values randomly. Evaluated total constraint conflicts: 7.", stateBadge: "Total Assignment", metric: "Conflicts: 7" },
      { step: 2, label: "Identify Conflicted Variables", detail: "Variables Queen-1 and Queen-4 violate row/diagonal constraints. Selected Queen-1.", stateBadge: "Conflicted Var", metric: "Selected: Q1" },
      { step: 3, label: "Evaluate Value Flips", detail: "Evaluated conflicts for all row positions of Q1: pos 1 -> 5, pos 3 -> 2, pos 5 -> 1.", stateBadge: "Min-Conflicts", metric: "Best pos: 5 (c=1)" },
      { step: 4, label: "Greedy Move Execution", detail: "Flipped Queen-1 to position 5. Total conflicts dropped from 7 to 3.", stateBadge: "Move Applied", metric: "Conflicts: 3" },
    ],
    questionSteps: {
      0: [
        { step: 1, label: "Partial vs Total Assignment", detail: "Backtracking builds partial assignment from 0 variables up. SLS starts with total assignment.", stateBadge: "Total State", metric: "All vars assigned" },
        { step: 2, label: "Search Space Topology", detail: "State space is the set of all complete assignments. A neighbor differs by 1 variable's value.", stateBadge: "Neighborhood", metric: "1-flip neighbors" },
        { step: 3, label: "Heuristic Objective Function", detail: "Objective function to minimize is the number of unsatisfied/conflicted constraints.", stateBadge: "Objective", metric: "Min Violated Arcs" },
        { step: 4, label: "Zero-Conflict Goal", detail: "Goal reached when objective function reaches 0. No backtracking tree memory needed.", stateBadge: "Solution Found", metric: "Conflicts = 0" },
      ],
      1: [
        { step: 1, label: "Pick Violating Variable", detail: "Filter variables involved in at least 1 unsatisfied constraint. Pick one uniformly at random.", stateBadge: "Violating Var", metric: "Var: Queen-3" },
        { step: 2, label: "Scan All Domain Values", detail: "Compute total board conflicts if variable is assigned value v1, v2, ..., vk.", stateBadge: "Scan Domain", metric: "Evaluate k values" },
        { step: 3, label: "Greedy Value Selection", detail: "Select the value that yields the minimum number of total constraint conflicts.", stateBadge: "Minimizing Value", metric: "Min conflicts" },
        { step: 4, label: "Break Ties Randomly", detail: "If multiple values tie for minimum conflicts, pick randomly among best candidates.", stateBadge: "Random Tiebreak", metric: "Stochastic step" },
      ],
      2: [
        { step: 1, label: "Compute Conflict Delta", detail: "Calculate change in conflicts: delta = new_conflicts - current_conflicts.", stateBadge: "Delta Calc", metric: "delta = cost change" },
        { step: 2, label: "Accept Downhill Moves", detail: "If delta <= 0 (move improves or maintains cost), move is accepted with probability 1.0.", stateBadge: "Greedy Step", metric: "P(accept) = 1.0" },
        { step: 3, label: "Probabilistic Uphill Moves", detail: "If delta > 0, move is accepted with probability P = exp(-delta / Temperature).", stateBadge: "Metropolis", metric: "P = exp(-d/T)" },
        { step: 4, label: "Cooling Temperature Schedule", detail: "High T escapes local minima early; low T freezes search into global optimum.", stateBadge: "Annealing", metric: "T decays to 0" },
      ],
    },
  },
  "5.A": {
    algorithmName: "SLD Definite Clause Resolution",
    steps: [
      { step: 1, label: "Initialize Goal Resolvent", detail: "Set top-level goal from query: ?- live(w1). Resolvent contains single subgoal.", stateBadge: "Query Goal", queueOrFrontier: "?- live(w1)", metric: "Subgoals: 1" },
      { step: 2, label: "Select Clause in KB", detail: "Found rule: live(W) <- connected_to(W, P) & live(P). Clause head unifies with MGU {W/w1}.", stateBadge: "MGU Unify", queueOrFrontier: "Clause: live(w1) <- ...", metric: "Unified" },
      { step: 3, label: "Substitute Rule Body", detail: "Replaced goal with body subgoals: ?- connected_to(w1, P) & live(P).", stateBadge: "Resolvent", queueOrFrontier: "?- connected_to(w1, p1) & live(p1)", metric: "Subgoals: 2" },
      { step: 4, label: "Derive Empty Clause (Box)", detail: "Resolved all subgoals against axioms. Derived empty clause. Proof successful!", stateBadge: "Proof Succeeded", queueOrFrontier: "Box []", metric: "Proved True" },
    ],
    questionSteps: {
      0: [
        { step: 1, label: "Implication Syntax", detail: "A definite clause is an implication of form: Head <- Body1 & Body2 & ... & Bodym.", stateBadge: "Horn Clause", metric: "Head <- Body" },
        { step: 2, label: "Single Head Literal", detail: "Head consists of exactly ONE positive atomic proposition.", stateBadge: "Single Head", metric: "Positive literal = 1" },
        { step: 3, label: "Conjunctive Body", detail: "Body is a conjunction (AND) of zero or more atomic propositions.", stateBadge: "Body Conjunction", metric: "m >= 0 literals" },
        { step: 4, label: "Fact Special Case", detail: "When body is empty (m=0), clause represents an unconditional fact: Head <- true.", stateBadge: "Axiom Fact", metric: "Unconditional" },
      ],
      1: [
        { step: 1, label: "Semantic Entailment (KB |= G)", detail: "KB |= G means in every interpretation/model where KB is true, G is also true.", stateBadge: "Truth in Models", metric: "Entailment" },
        { step: 2, label: "Soundness Guarantee (KB |- G => KB |= G)", detail: "Soundness means proof procedure only derives conclusions that are semantically entailed (no false theorems).", stateBadge: "Soundness", metric: "Truth Preserving" },
        { step: 3, label: "Completeness Guarantee (KB |= G => KB |- G)", detail: "Completeness means if G is semantically entailed by KB, the deduction engine is guaranteed to find a proof.", stateBadge: "Completeness", metric: "Finds all truths" },
        { step: 4, label: "SLD Resolution Properties", detail: "SLD resolution is both sound and complete for definite clause knowledge bases.", stateBadge: "Sound & Complete", metric: "Guaranteed Proof" },
      ],
    },
  },
  "6.A": {
    algorithmName: "Bayesian Network Conditional Independence",
    steps: [
      { step: 1, label: "Construct DAG Structure", detail: "Network DAG defines conditional factorization: P(Fire, Smoke, Alarm) = P(F)P(S|F)P(A|S).", stateBadge: "DAG Factorization", metric: "3 Nodes, 2 Arcs" },
      { step: 2, label: "Condition on Observed Node", detail: "Observed evidence: Smoke = true. Fixes value in intermediate node.", stateBadge: "Evidence Fixed", queueOrFrontier: "Evidence: {Smoke: true}", metric: "Observed: 1" },
      { step: 3, label: "D-Separation Trail Check", detail: "Evaluating trail Fire -> Smoke -> Alarm. Smoke is an observed linear chain node, blocking trail.", stateBadge: "Blocked Trail", queueOrFrontier: "Trail: F -> S -> A (Blocked)", metric: "Blocked at S" },
      { step: 4, label: "Conditional Independence", detail: "Conclude Fire is conditionally independent of Alarm given observed Smoke.", stateBadge: "Independent", queueOrFrontier: "Fire ind Alarm | Smoke", metric: "D-Separated" },
    ],
    questionSteps: {
      0: [
        { step: 1, label: "Full Joint Distribution Size", detail: "Full joint table for n boolean variables requires 2^n configurations.", stateBadge: "Joint Table", metric: "2^n cells" },
        { step: 2, label: "Independent Parameters Needed", detail: "Since probabilities sum to 1, requires 2^n - 1 independent numbers (exponential in n).", stateBadge: "Exponential", metric: "2^n - 1 params" },
        { step: 3, label: "Bayes Net Factorization", detail: "Each node with at most k parents specifies a CPT requiring at most 2^k values.", stateBadge: "Compact CPTs", metric: "2^k per node" },
        { step: 4, label: "Linear Parameter Reduction", detail: "Total parameters = n * 2^k, converting exponential explosion into linear in n!", stateBadge: "Linear in n", metric: "n * 2^k << 2^n" },
      ],
      1: [
        { step: 1, label: "Topological Order in DAG", detail: "Order nodes such that parent nodes appear before child nodes in sequence.", stateBadge: "Topological Sort", metric: "Parents -> Children" },
        { step: 2, label: "Given Direct Parents", detail: "Condition variable X on the values of all its immediate parent nodes Parents(X).", stateBadge: "Given Parents", metric: "Condition on Parents(X)" },
        { step: 3, label: "Screening Off Non-Descendants", detail: "Parents screen off all incoming ancestor influence from non-descendant nodes.", stateBadge: "Screened Off", metric: "Non-Descendants ind" },
        { step: 4, label: "Markov Property Established", detail: "Every node X is conditionally independent of its non-descendants given its parents.", stateBadge: "Markov Property", metric: "Local Independence" },
      ],
    },
  },
  "6.C": {
    algorithmName: "Variable Elimination (VE) Engine",
    steps: [
      { step: 1, label: "Initialize Factors from CPTs", detail: "Created initial factors f1(B), f2(E), f3(A, B, E), f4(J, A), f5(M, A).", stateBadge: "Factor Pool", queueOrFrontier: "Pool: 5 factors", metric: "CPTs loaded" },
      { step: 2, label: "Observe Evidence J=true", detail: "Restricted factor f4(J, A) by fixing J=true: reduced to f4_obs(A).", stateBadge: "Restricting", queueOrFrontier: "Evidence: J=true", metric: "Variables: A" },
      { step: 3, label: "Multiply Factors Containing A", detail: "Pointwise product: f_prod(A, B, E) = f3(A, B, E) * f4_obs(A) * f5(M, A).", stateBadge: "Pointwise Product", queueOrFrontier: "Product over {A, B, E, M}", metric: "Joined on A" },
      { step: 4, label: "Sum Out Hidden Variable A", detail: "Marginalize A: f_new(B, E, M) = sum_A f_prod(A, B, E, M). Variable A eliminated!", stateBadge: "Summing Out", queueOrFrontier: "A eliminated", metric: "Remaining: B, E, M" },
    ],
    questionSteps: {
      0: [
        { step: 1, label: "Pointwise Multiplication", detail: "Multiply factors f1(X, Y) and f2(Y, Z) over common variable Y.", stateBadge: "Pointwise Mult", metric: "f3(X, Y, Z) = f1 * f2" },
        { step: 2, label: "Match Common Variable Values", detail: "Probabilities are multiplied for matching values of shared variable Y.", stateBadge: "Union Variables", metric: "Vars: {X, Y, Z}" },
        { step: 3, label: "Summing Out (Marginalization)", detail: "Sum over all possible outcomes of variable Y to eliminate Y from factor f3.", stateBadge: "Summing Out", metric: "f4(X, Z) = sum_Y f3" },
        { step: 4, label: "Elimination Complete", detail: "Factor table shrinks: variable Y is completely removed from remaining inference.", stateBadge: "Marginalized", metric: "Reduced Factor" },
      ],
      1: [
        { step: 1, label: "Factor Size Growth", detail: "Eliminating variable V combines all factors containing V into a single joint factor.", stateBadge: "Intermediate Factor", metric: "Union of scopes" },
        { step: 2, label: "Exponential Memory Blowup", detail: "If combined factor has m variables, its table requires 2^m rows.", stateBadge: "2^m Memory", metric: "Exponential table" },
        { step: 3, label: "Min-Fill / Min-Degree Heuristic", detail: "Min-fill selects variable that introduces fewest new edges into moral graph.", stateBadge: "Heuristic Ordering", metric: "Smallest intermediate" },
        { step: 4, label: "NP-Hard Optimal Order", detail: "Finding optimal elimination order is NP-hard, so greedy heuristics are critical.", stateBadge: "Greedy Heuristics", metric: "Tractable inference" },
      ],
    },
  },
  "7.A": {
    algorithmName: "ID3 Decision Tree Induction",
    steps: [
      { step: 1, label: "Compute Sample Entropy H(S)", detail: "Calculated target class entropy across 14 examples (9 Yes, 5 No): H(S) = 0.940.", stateBadge: "Base Entropy", metric: "H(S) = 0.940" },
      { step: 2, label: "Evaluate Candidate Attributes", detail: "Computed Gain(Outlook)=0.246, Gain(Humidity)=0.151, Gain(Wind)=0.048.", stateBadge: "Info Gain Calc", queueOrFrontier: "Best: Outlook (0.246)", metric: "Max Gain: 0.246" },
      { step: 3, label: "Create Root Split on Outlook", detail: "Split dataset into 3 child subsets: Sunny (5), Overcast (4), Rain (5).", stateBadge: "Tree Split", metric: "3 Child Branches" },
      { step: 4, label: "Pure Leaf Termination", detail: "Overcast subset contains 4 Yes, 0 No (H=0.0). Created pure leaf: Play = Yes.", stateBadge: "Pure Leaf", metric: "Entropy = 0.0" },
    ],
    questionSteps: {
      0: [
        { step: 1, label: "Single Class Probability", detail: "When all examples belong to same class, probability p_majority = 1.0, others = 0.", stateBadge: "Single Class", metric: "p1 = 1.0, p2 = 0.0" },
        { step: 2, label: "Apply Shannon Formula", detail: "Entropy H(S) = -sum p_i * log2(p_i) = - (1.0 * log2(1.0) + 0).", stateBadge: "Formula", metric: "-1 * log2(1)" },
        { step: 3, label: "Logarithm of 1 Equals 0", detail: "Since log2(1.0) = 0, product evaluates to - (1.0 * 0) = 0.", stateBadge: "Zero Uncertainty", metric: "H(S) = 0" },
        { step: 4, label: "Pure Node Classification", detail: "Entropy = 0 signifies zero impurity; node terminates as pure leaf without splitting.", stateBadge: "Pure Leaf", metric: "Impurity: 0.0" },
      ],
      1: [
        { step: 1, label: "Calculate Information Gain", detail: "Gain(S, A) = H(S) - sum (|S_v| / |S|) * H(S_v) for all candidate features.", stateBadge: "Gain Formula", metric: "Entropy Reduction" },
        { step: 2, label: "Compare Candidate Features", detail: "Gain(Outlook) = 0.246, Gain(Humidity) = 0.151, Gain(Wind) = 0.048, Gain(Temp) = 0.029.", stateBadge: "Compare Gains", metric: "Ranked list" },
        { step: 3, label: "Pick Max Information Gain", detail: "ID3 picks Outlook because it maximizes the reduction in class uncertainty.", stateBadge: "Max Gain Picked", metric: "Selected: Outlook" },
        { step: 4, label: "Recurse on Subsets", detail: "Partitions training instances along Outlook values and recurses on child nodes.", stateBadge: "Branch Subsets", metric: "Next Level" },
      ],
    },
  },
  "7.B": {
    algorithmName: "Backpropagation & Gradient Descent",
    steps: [
      { step: 1, label: "Forward Pass Activations", detail: "Fed input (0, 1) through hidden layer: h = sigmoid(W1 * x + b1). Output y_hat = 0.62.", stateBadge: "Forward Pass", metric: "y_hat = 0.62" },
      { step: 2, label: "Compute Output Error", detail: "Target y = 1. Output error delta_out = (y - y_hat) * dSigmoid(y_hat) = 0.089.", stateBadge: "Output Error", metric: "delta_out = 0.089" },
      { step: 3, label: "Backpropagate Hidden Gradients", detail: "Propagated delta backwards using chain rule: delta_h = (delta_out * W2) * dSigmoid(h).", stateBadge: "Backpropagation", metric: "Chain Rule" },
      { step: 4, label: "Update Weights & Loss Drops", detail: "Adjusted weights W <- W + lr * delta * activations. Loss decreased from 0.144 to 0.128.", stateBadge: "Weights Updated", metric: "Loss: -0.016" },
    ],
    questionSteps: {
      0: [
        { step: 1, label: "XOR Truth Table Points", detail: "XOR inputs: (0,0)->0, (0,1)->1, (1,0)->1, (1,1)->0 in 2D coordinate plane.", stateBadge: "XOR Points", metric: "4 Points in 2D" },
        { step: 2, label: "Single Perceptron Hyperplane", detail: "A single perceptron forms linear decision boundary: w1*x1 + w2*x2 + b = 0.", stateBadge: "Straight Line", metric: "Linear Boundary" },
        { step: 3, label: "Non-Linear Separability", detail: "No single straight line can separate (0,1) and (1,0) from (0,0) and (1,1).", stateBadge: "Line Impossible", metric: "Inseparable" },
        { step: 4, label: "Need for Hidden Layer", detail: "A multi-layer network with non-linear activations warps feature space to solve XOR.", stateBadge: "Hidden Layer", metric: "MLP Solution" },
      ],
      1: [
        { step: 1, label: "Loss Function Derivative", detail: "Objective: compute partial derivative dLoss / dW for every weight parameter.", stateBadge: "Gradient Goal", metric: "dLoss / dW" },
        { step: 2, label: "Calculus Chain Rule", detail: "Decomposes dLoss/dW into product: (dLoss/dy_hat) * (dy_hat/d_z) * (d_z/dW).", stateBadge: "Chain Rule", metric: "Local Derivatives" },
        { step: 3, label: "Backward Error Propagation", detail: "Propagates error gradient vector backwards layer by layer in O(weights) time.", stateBadge: "Backward Flow", metric: "O(|W|) time" },
        { step: 4, label: "Gradient Descent Step", detail: "Weights updated in opposite direction of gradient: W <- W - learning_rate * dLoss/dW.", stateBadge: "Descent Step", metric: "Loss Minimization" },
      ],
    },
  },
  "8.A": {
    algorithmName: "STRIPS Blocks World Plan Execution",
    steps: [
      { step: 1, label: "Initial Blocks World State", detail: "State: on(C, A), ontable(A), ontable(B), clear(C), clear(B), handempty.", stateBadge: "Initial State", metric: "Arm: Empty" },
      { step: 2, label: "Action: Unstack(C, A)", detail: "Preconditions clear(C) & on(C, A) hold. Del on(C, A), Add holding(C).", stateBadge: "Unstack", queueOrFrontier: "Holding: Block C", metric: "Arm: Holding(C)" },
      { step: 3, label: "Action: Putdown(C)", detail: "Placed C on table. Add ontable(C), clear(C), handempty. Clears block A.", stateBadge: "Putdown", queueOrFrontier: "Table: A, B, C", metric: "Clear: A, B, C" },
      { step: 4, label: "Action: Stack(A, B)", detail: "Picked up A and stacked onto B. Preconditions and Add/Delete lists satisfied.", stateBadge: "Stack", queueOrFrontier: "on(A, B)", metric: "Goal Achieved" },
    ],
    questionSteps: {
      0: [
        { step: 1, label: "Precondition List", detail: "Logical propositions that must hold true in the world before action can execute.", stateBadge: "Preconditions", metric: "Required State" },
        { step: 2, label: "Add List", detail: "Positive propositions that become true in the world after the action completes.", stateBadge: "Add List", metric: "Propositions Added" },
        { step: 3, label: "Delete List", detail: "Propositions that are negated/falsified and removed from state after execution.", stateBadge: "Delete List", metric: "Propositions Removed" },
        { step: 4, label: "State Transition Function", detail: "Successor State = (Current State \\ Delete List) union Add List.", stateBadge: "Transition", metric: "Next = (S \\ Del) U Add" },
      ],
      1: [
        { step: 1, label: "Sussman Initial State", detail: "Initial: on(C, A), ontable(A), ontable(B). Goal: on(A, B) and on(B, C).", stateBadge: "Sussman Init", metric: "Goal: A on B on C" },
        { step: 2, label: "Subgoal 1 Solved in Isolation", detail: "If we solve on(A, B) first: clear A by putting C on table, then stack A on B.", stateBadge: "Subgoal 1 Solved", metric: "on(A, B) achieved" },
        { step: 3, label: "Subgoal 2 Conflict", detail: "Now to achieve on(B, C), B must be moved. But A is sitting on B, blocking it!", stateBadge: "Subgoal Clashed", metric: "A blocks B" },
        { step: 4, label: "Interleaved Plan Required", detail: "Must unstack A again to move B onto C first. Proves linear non-interleaving fails.", stateBadge: "Interleaved", metric: "Subgoal Interference" },
      ],
    },
  },
  "8.C": {
    algorithmName: "STRIPS to CSP Horizon Unfolding",
    steps: [
      { step: 1, label: "Test Horizon k=0", detail: "Tested goal conditions against initial propositions at t=0. Unsatisfied.", stateBadge: "Horizon k=0", metric: "Unsatisfiable" },
      { step: 2, label: "Unfold Horizon k=1", detail: "Created action variables A0 and frame axioms S0 -> S1. Goal still unsatisfied.", stateBadge: "Horizon k=1", metric: "Unsatisfiable" },
      { step: 3, label: "Unfold Horizon k=2", detail: "Added action transitions A1 and mutex constraints. CSP solver found no satisfying model.", stateBadge: "Horizon k=2", metric: "Unsatisfiable" },
      { step: 4, label: "Satisfying Plan at k=3", detail: "Unfolded to k=3. CSP solver satisfied all frame axioms and goal clauses with plan length 3.", stateBadge: "Horizon k=3", metric: "Plan Length: 3" },
    ],
    questionSteps: {
      0: [
        { step: 1, label: "The Persistence Challenge", detail: "When robot moves from Hallway to Office, how to represent that Coffee remains Hot?", stateBadge: "Persistence", metric: "Non-effects" },
        { step: 2, label: "Naive Frame Axioms Blowup", detail: "Naive logic requires writing an axiom for every proposition unaffected by every action.", stateBadge: "Axiom Explosion", metric: "O(Actions * Props)" },
        { step: 3, label: "Explanatory Frame Axioms", detail: "State changes from true to false iff an action occurred that had it in its Delete list.", stateBadge: "Explanatory Axiom", metric: "Change iff Cause" },
        { step: 4, label: "Compact CSP Encoding", detail: "Explanatory frame axioms allow encoding state persistence as compact binary CSP constraints.", stateBadge: "Compact CSP", metric: "Solves Frame Problem" },
      ],
      1: [
        { step: 1, label: "Iterative Deepening on Horizon k", detail: "Start with horizon k = 0. Check if goal is already satisfied in initial state.", stateBadge: "k = 0 Check", metric: "Init Goal Check" },
        { step: 2, label: "Increment Horizon k = 1, 2...", detail: "If unsatisfiable, expand time horizon by 1, instantiating new action and state variables.", stateBadge: "Increment k", metric: "k <- k + 1" },
        { step: 3, label: "Apply CSP Solver at Each k", detail: "Use arc consistency and backtracking search on propositional CSP for current horizon.", stateBadge: "Solve CSP(k)", metric: "Constraint Propagation" },
        { step: 4, label: "Minimal Length Solution", detail: "First horizon k with a satisfying assignment yields the provably shortest sequential plan.", stateBadge: "Shortest Plan", metric: "Minimal Horizon k*" },
      ],
    },
  },
  "9.A": {
    algorithmName: "Decision Networks & Maximum Expected Utility",
    steps: [
      { step: 1, label: "Formulate Decision Network", detail: "Graph contains chance node Weather, decision node Umbrella, and utility node Payoff.", stateBadge: "Decision DAG", metric: "Chance + Decision + Utility" },
      { step: 2, label: "Evaluate Action: Take Umbrella", detail: "EU(Take) = P(Rain) * U(Take, Rain) + P(NoRain) * U(Take, NoRain) = 0.7*80 + 0.3*70 = 77.", stateBadge: "EU(Take)", queueOrFrontier: "EU(Take) = 77", metric: "Expected Utility: 77" },
      { step: 3, label: "Evaluate Action: Leave Umbrella", detail: "EU(Leave) = P(Rain) * U(Leave, Rain) + P(NoRain) * U(Leave, NoRain) = 0.7*0 + 0.3*100 = 30.", stateBadge: "EU(Leave)", queueOrFrontier: "EU(Leave) = 30", metric: "Expected Utility: 30" },
      { step: 4, label: "Select Optimal Decision (MEU)", detail: "Optimal decision d* = Take Umbrella because EU(Take) = 77 > EU(Leave) = 30.", stateBadge: "MEU Policy", queueOrFrontier: "Best: Take Umbrella", metric: "Max EU: 77" },
    ],
    questionSteps: {
      0: [
        { step: 1, label: "Rational Choice Objective", detail: "A rational agent chooses the decision action that maximizes expected utility (MEU).", stateBadge: "MEU Objective", metric: "Max EU" },
        { step: 2, label: "Formula for Expected Utility", detail: "EU(d) = sum_{states s} P(s | d, evidence) * Utility(s, d).", stateBadge: "EU Formula", metric: "sum P(s|d) * U(s,d)" },
        { step: 3, label: "Weigh Probabilities by Payoffs", detail: "Combines belief uncertainty (probabilities) with agent preferences (utilities).", stateBadge: "Beliefs x Values", metric: "Expected Payoff" },
        { step: 4, label: "Select Optimal Policy d*", detail: "d* = argmax_{d} EU(d). Guarantees optimal decision under von Neumann-Morgenstern axioms.", stateBadge: "Optimal Action", metric: "Policy: d*" },
      ],
      1: [
        { step: 1, label: "Chance Arcs vs Information Arcs", detail: "Arcs between chance nodes represent conditional probabilistic dependencies.", stateBadge: "Causal vs Info", metric: "Edge Semantics" },
        { step: 2, label: "Incoming Edge to Decision Node", detail: "An arc pointing directly into a decision node D represents information availability.", stateBadge: "Information Edge", metric: "Parent -> Decision" },
        { step: 3, label: "Observation Timing", detail: "Means parent variable is observed and its true value is known before decision D is taken.", stateBadge: "Known Before Action", metric: "Observed at Decision" },
        { step: 4, label: "Policy Conditioned on Parents", detail: "Optimal policy maps each observed configuration of parent values to best decision.", stateBadge: "Conditional Policy", metric: "pi(parents) -> action" },
      ],
    },
  },
};
