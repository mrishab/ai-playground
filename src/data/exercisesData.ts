export interface QuestionItem {
  q: string;
  solution: string;
  hint: string;
}

export interface ExerciseItem {
  id: string;
  chapter: string;
  title: string;
  reading: string;
  goals: string[];
  questions: QuestionItem[];
  toolId: string;
  sampleId: string;
}

export const EXERCISES_DATA: ExerciseItem[] = [
  {
    "id": "2.A",
    "chapter": "Agent Architectures",
    "title": "Hierarchical Control & Autonomous Agents",
    "reading": "Poole & Mackworth Section 2.3: Hierarchical Control",
    "goals": [
      "Understand sense-plan-act control loops",
      "Design middle-layer reactive controllers that avoid obstacles",
      "Decompose high-level plans into actuator primitives"
    ],
    "questions": [
      {
        "q": "What is the role of the middle-layer controller in a robot architecture?",
        "solution": "The middle layer converts high-level goals/waypoints from the high controller into real-time steering directives while avoiding obstacles using local sensor feedback.",
        "hint": "Consider the hierarchy between strategic route planning and wheel velocity control."
      },
      {
        "q": "Why is a pure sense-act reactive agent prone to dead-ends in concave obstacles?",
        "solution": "Because it lacks internal memory or state history, causing it to bounce back and forth between repulsive sensor gradients in a limit cycle.",
        "hint": "What happens when sensor repulsive forces balance out without state memory?"
      }
    ],
    "toolId": "robot",
    "sampleId": "bookWorld"
  },
  {
    "id": "3.A",
    "chapter": "Graph Searching",
    "title": "Thinking in Discrete States & Search Graphs",
    "reading": "Poole & Mackworth Section 3.1 - 3.4: Search Spaces",
    "goals": [
      "Formulate problem domains as graphs of states and actions",
      "Distinguish between state space and search tree representations",
      "Analyze graph branching factors and path costs"
    ],
    "questions": [
      {
        "q": "What constitutes a state in a graph searching problem?",
        "solution": "A state is a complete configuration of the world at a snapshot in time containing all relevant information needed to determine future legal transitions and goal achievement.",
        "hint": "Does the history of how we reached the node need to be in the node state?"
      },
      {
        "q": "How does tree search differ from graph search?",
        "solution": "Tree search does not remember previously visited states and can re-explore the same state multiple times along different paths, leading to exponential slowdown or infinite loops in graphs with cycles.",
        "hint": "Think about an explored/visited set."
      }
    ],
    "toolId": "search",
    "sampleId": "simpletree"
  },
  {
    "id": "3.B",
    "chapter": "Graph Searching",
    "title": "Uninformed Search: DFS, BFS, and Lowest-Cost-First",
    "reading": "Poole & Mackworth Section 3.5: Uninformed Search Strategies",
    "goals": [
      "Implement frontier priority queue behaviors for LIFO, FIFO, and cost-order",
      "Analyze completeness and time/space complexity of BFS and DFS",
      "Trace Dijkstra / Lowest-Cost-First search step by step"
    ],
    "questions": [
      {
        "q": "When is Breadth-First Search guaranteed to find the optimal path?",
        "solution": "When all arc costs are equal (or uniform positive cost 1), the first goal found by BFS is guaranteed to have minimal path cost.",
        "hint": "What assumption about edge costs makes path length equal to path cost?"
      },
      {
        "q": "What is the space complexity of Depth-First Search for branching factor b and maximum depth m?",
        "solution": "O(b * m), which is linear in maximum depth, making DFS vastly more memory efficient than BFS.",
        "hint": "How many nodes are stored along the active branch on the recursion stack?"
      },
      {
        "q": "How does Lowest-Cost-First (Uniform Cost / Dijkstra) order its frontier?",
        "solution": "It always selects the path with the smallest cumulative path cost g(p) from the start node.",
        "hint": "What cost function g(n) is minimized?"
      }
    ],
    "toolId": "search",
    "sampleId": "vancouver"
  },
  {
    "id": "3.C",
    "chapter": "Graph Searching",
    "title": "Heuristic Search: Greedy Best-First and A*",
    "reading": "Poole & Mackworth Section 3.6: Heuristic Search",
    "goals": [
      "Define what an admissible heuristic is: h(n) <= h*(n)",
      "Understand monotone/consistent heuristics: h(n) <= cost(n, n') + h(n')",
      "Trace A* evaluation function f(n) = g(n) + h(n)"
    ],
    "questions": [
      {
        "q": "What is the distinction between informed and uninformed search?",
        "solution": "Uninformed search only has access to problem definition (transitions and step costs) without distance estimation. Informed search uses heuristic functions h(n) estimating the distance to the goal.",
        "hint": "Think about domain-specific knowledge."
      },
      {
        "q": "When is a heuristic function admissible?",
        "solution": "A heuristic h(n) is admissible if it never overestimates the actual minimal cost from node n to a goal state (i.e. h(n) <= h*(n) for all n, and h(goal) = 0).",
        "hint": "Can an admissible heuristic say a goal is further away than it really is?"
      },
      {
        "q": "A* can be seen as combining which two search strategies?",
        "solution": "A* combines Lowest-Cost-First search (which prioritizes past cost g(n)) and Greedy Best-First search (which prioritizes estimated future cost h(n)) by ordering paths by f(n) = g(n) + h(n).",
        "hint": "Look at the two terms g(n) and h(n)."
      },
      {
        "q": "Why might Greedy Best-First search find a suboptimal solution?",
        "solution": "Because it only considers h(n), ignoring the path cost g(n) accumulated so far; it can greedily chase a low h(n) into an expensive detour.",
        "hint": "Try the Misleading Heuristic graph in the Search tool!"
      }
    ],
    "toolId": "search",
    "sampleId": "misleadingheuristic"
  },
  {
    "id": "3.E",
    "chapter": "Graph Searching",
    "title": "Multi-Path Pruning & Cycle Checking",
    "reading": "Poole & Mackworth Section 3.7: Pruning Paths in Search",
    "goals": [
      "Detect and eliminate cycles in search trees",
      "Verify conditions for multi-path pruning optimality with consistent heuristics",
      "Compare memory overhead vs expansion savings"
    ],
    "questions": [
      {
        "q": "What is multiple-path pruning?",
        "solution": "When a path reaches a node n that has already been reached by a previous path, the new path can be pruned if its cost is greater than or equal to the previous path to n.",
        "hint": "Why continue searching from a node if we already reached it cheaper?"
      },
      {
        "q": "If the heuristic is monotone (consistent), can A* prune every node after its first expansion?",
        "solution": "Yes! With a consistent heuristic, the first time A* expands a node n, it has already found the optimal path to n, so subsequent paths reaching n can be immediately discarded.",
        "hint": "Recall the triangle inequality h(n) <= cost(n, n') + h(n')."
      }
    ],
    "toolId": "search",
    "sampleId": "multiplepathpruning"
  },
  {
    "id": "4.A",
    "chapter": "Constraint Satisfaction Problems",
    "title": "Arc Consistency (AC-3 Algorithm)",
    "reading": "Poole & Mackworth Section 4.3: Consistency Algorithms",
    "goals": [
      "Define arc consistency for directed variable-constraint arcs",
      "Trace the AC-3 queue algorithm step-by-step",
      "Identify domain reduction and detect inconsistencies early"
    ],
    "questions": [
      {
        "q": "When is an arc (X, C) arc consistent?",
        "solution": "An arc from variable X to constraint C is arc consistent if for every value x in the domain of X, there exists a value for all other variables in C that satisfies constraint C.",
        "hint": "Does every value in X have a valid partner?"
      },
      {
        "q": "If a value x is pruned from domain(X), which arcs must be added back to the AC-3 agenda?",
        "solution": "All arcs (Y, C') where Y != X and C' is a constraint involving both X and Y must be added back to the queue because pruning x might cause Y to lose support.",
        "hint": "Which neighbor variables depended on x?"
      },
      {
        "q": "Does arc consistency alone guarantee finding a solution without search?",
        "solution": "No. Arc consistency can leave domains with multiple values without guaranteeing a global solution exists (e.g. 3-coloring an impossible graph may still be arc consistent). Domain splitting or backtracking is needed.",
        "hint": "Is local consistency the same as global satisfiability?"
      }
    ],
    "toolId": "constraint",
    "sampleId": "simple1"
  },
  {
    "id": "4.B",
    "chapter": "Constraint Satisfaction Problems",
    "title": "Domain Splitting & Backtracking Search",
    "reading": "Poole & Mackworth Section 4.4: Domain Splitting",
    "goals": [
      "Combine Arc Consistency with Backtracking (MAC / AC-3 within search)",
      "Apply Most Constrained Variable (MRV) and Least Constraining Value heuristics",
      "Solve N-Queens and Map Coloring without full enumeration"
    ],
    "questions": [
      {
        "q": "What is the Domain Splitting strategy in CSPs?",
        "solution": "When arc consistency finishes but some variables have multiple domain values, we choose a variable X with domain {v1, ..., vk}, split its domain (e.g. X=v1 vs X != v1), and recursively solve each branch.",
        "hint": "How do we branch after AC stops?"
      },
      {
        "q": "What is the Fail-First / Minimum Remaining Values (MRV) heuristic?",
        "solution": "Always pick the unassigned variable with the fewest remaining legal domain values to branch on first, because it minimizes the branching factor and detects failures earliest.",
        "hint": "Which variable is most likely to fail quickly?"
      }
    ],
    "toolId": "constraint",
    "sampleId": "mapColoring"
  },
  {
    "id": "4.C",
    "chapter": "Constraint Satisfaction Problems",
    "title": "Stochastic Local Search & Min-Conflicts",
    "reading": "Poole & Mackworth Section 4.8: Local Search",
    "goals": [
      "Differentiate total assignment methods from systematic partial assignment search",
      "Implement greedy descent, random walk, and min-conflicts heuristic",
      "Overcome local optima with Simulated Annealing and Tabu Search"
    ],
    "questions": [
      {
        "q": "How does Stochastic Local Search represent a state compared to backtracking search?",
        "solution": "Backtracking search maintains a partial assignment of variables. SLS maintains a total assignment (every variable has a value assigned) and moves between total assignments to minimize unsatisfied constraints.",
        "hint": "Are all variables assigned at step 0 in SLS?"
      },
      {
        "q": "Explain the Min-Conflicts heuristic for local search.",
        "solution": "Randomly pick any variable currently involved in a conflict (violated constraint), then assign it the value from its domain that minimizes the total number of violated constraints across the entire CSP.",
        "hint": "Pick a conflicted variable and fix it greedily."
      },
      {
        "q": "What role does temperature T play in Simulated Annealing?",
        "solution": "Temperature controls the probability of accepting worse moves (exp(-delta / T)). High T allows widespread exploration to escape local minima; cooling T gradually focuses search into greedy convergence.",
        "hint": "How does annealing in metallurgy relate to optimization?"
      }
    ],
    "toolId": "hill",
    "sampleId": "scheduling1"
  },
  {
    "id": "5.A",
    "chapter": "Propositional Logic",
    "title": "Logic Syntax, Semantics, and Definite Clauses",
    "reading": "Poole & Mackworth Chapter 5: Propositions and Inference",
    "goals": [
      "Express knowledge using definite clauses: Head <- Body",
      "Verify models and interpretations in propositional logic",
      "Trace top-down SLD resolution and bottom-up consequence operators"
    ],
    "questions": [
      {
        "q": "What is a definite clause?",
        "solution": "A definite clause is an implication of the form h <- b1 & ... & bm where the head h is a single atomic proposition and the body consists of zero or more atomic propositions.",
        "hint": "How many positive literals are in a Horn clause?"
      },
      {
        "q": "What does soundness and completeness mean for a deduction procedure?",
        "solution": "Soundness means if KB proves G, then G is semantically entailed by KB (no false conclusions). Completeness means if KB semantically entails G, the procedure is guaranteed to find a proof.",
        "hint": "Truth vs derivability."
      }
    ],
    "toolId": "deduction",
    "sampleId": "elect"
  },
  {
    "id": "6.A",
    "chapter": "Reasoning under Uncertainty",
    "title": "Conditional Independence & Belief Networks",
    "reading": "Poole & Mackworth Section 6.1 - 6.3: Probability and Independence",
    "goals": [
      "Apply Bayes Rule P(A|B) = P(B|A)P(A) / P(B)",
      "Understand conditional independence (A ind B | C)",
      "Represent joint distributions compactly using Bayesian Network DAGs"
    ],
    "questions": [
      {
        "q": "If a domain has n boolean random variables, how many entries are required for full joint distribution vs a Bayes net where each node has at most k parents?",
        "solution": "The full joint distribution requires 2^n - 1 independent parameters. A Bayes net requires only n * 2^k parameters, reducing exponential explosion to linear in n!",
        "hint": "Compare 2^n to n * 2^k."
      },
      {
        "q": "What does the topological Markov property state for Bayesian Networks?",
        "solution": "Each node X is conditionally independent of its non-descendants given its direct parent nodes.",
        "hint": "Given the parents, what is screened off?"
      }
    ],
    "toolId": "bayes",
    "sampleId": "basicfirealarm"
  },
  {
    "id": "6.C",
    "chapter": "Reasoning under Uncertainty",
    "title": "Variable Elimination Algorithm",
    "reading": "Poole & Mackworth Section 6.4: Exact Inference by Variable Elimination",
    "goals": [
      "Multiply factors over common variables",
      "Sum out (marginalize) non-query, non-observed variables",
      "Understand variable elimination ordering heuristics (Min-Degree, Min-Fill)"
    ],
    "questions": [
      {
        "q": "What are the two basic operations on factors in Variable Elimination?",
        "solution": "1. Factor Multiplication: combining two factors f1 and f2 into a joint factor over the union of their variables. 2. Variable Summing Out (Marginalization): summing over all values of variable Y to eliminate Y from factor f.",
        "hint": "Multiply then marginalize."
      },
      {
        "q": "Why does the elimination order of variables matter in VE?",
        "solution": "A bad elimination order can create intermediate factors with large numbers of variables, causing exponential time and memory complexity. Finding the optimal elimination ordering is NP-hard, so heuristics like min-fill are used.",
        "hint": "Think about factor table size 2^|variables|."
      }
    ],
    "toolId": "bayes",
    "sampleId": "car"
  },
  {
    "id": "7.A",
    "chapter": "Supervised Learning",
    "title": "Decision Trees & Information Gain",
    "reading": "Poole & Mackworth Section 7.3: Supervised Learning & Decision Trees",
    "goals": [
      "Compute Shannon Entropy H(S) = -sum p_i log2(p_i)",
      "Calculate Information Gain Gain(S, A) for candidate splits",
      "Avoid overfitting with pruning and minimum leaf size"
    ],
    "questions": [
      {
        "q": "What is the entropy of a training set where all examples belong to the same class?",
        "solution": "0. Entropy measures impurity/uncertainty; when all examples have the same label, there is zero uncertainty.",
        "hint": "What is -1 * log2(1)?"
      },
      {
        "q": "How does ID3 choose which feature to split on at each node?",
        "solution": "It computes the Information Gain (reduction in entropy) for every candidate attribute and picks the attribute that achieves the maximum Information Gain.",
        "hint": "Which feature reveals the most information about the target?"
      }
    ],
    "toolId": "dtree",
    "sampleId": "playTennis"
  },
  {
    "id": "7.B",
    "chapter": "Supervised Learning",
    "title": "Neural Networks & Backpropagation",
    "reading": "Poole & Mackworth Section 7.5: Neural Networks",
    "goals": [
      "Understand single-layer perceptron vs multi-layer feedforward networks",
      "Derive gradient descent weight update rule with sigmoid activation",
      "Tune learning rate and momentum to escape shallow local minima"
    ],
    "questions": [
      {
        "q": "Why can a single-layer perceptron never classify the XOR problem?",
        "solution": "Because a single perceptron forms a linear hyperplane (decision boundary w1*x1 + w2*x2 + b = 0) in 2D space, and the XOR output points (0,1) and (1,0) cannot be separated from (0,0) and (1,1) by any straight line.",
        "hint": "Try drawing a single straight line on the XOR points."
      },
      {
        "q": "What is the purpose of the backpropagation algorithm?",
        "solution": "Backpropagation efficiently calculates the partial derivatives of the loss function with respect to every weight in the network by applying the calculus chain rule backwards from output to input layers.",
        "hint": "How does the chain rule propagate errors backwards?"
      }
    ],
    "toolId": "neural",
    "sampleId": "xor"
  },
  {
    "id": "8.A",
    "chapter": "Planning",
    "title": "STRIPS Representation & Blocks World",
    "reading": "Poole & Mackworth Section 8.1: STRIPS Representation",
    "goals": [
      "Model actions using Precondition, Add, and Delete lists",
      "Understand forward state-space progression vs backward goal regression",
      "Analyze the Sussman Anomaly and subgoal interference"
    ],
    "questions": [
      {
        "q": "What three components define a STRIPS action operator?",
        "solution": "1. Preconditions: propositions that must hold true before action can execute. 2. Add list: propositions that become true after execution. 3. Delete list: propositions that are negated/falsified by execution.",
        "hint": "What is needed before, and what changes after?"
      },
      {
        "q": "Why does the Sussman Anomaly cause trouble for simple non-interleaving planners?",
        "solution": "Because achieving subgoal 1 (putting A on B) destroys the precondition needed for subgoal 2 (putting B on C), requiring A to be unstacked again. Subgoals cannot be solved sequentially in isolation.",
        "hint": "Try solving on(A,B) first versus on(B,C) first!"
      }
    ],
    "toolId": "planning",
    "sampleId": "sussman"
  },
  {
    "id": "8.C",
    "chapter": "Planning",
    "title": "STRIPS to CSP Planning",
    "reading": "Poole & Mackworth Section 8.4: Planning as CSP",
    "goals": [
      "Unfold state and action propositions across time horizons k = 0, 1, ...",
      "Formulate Explanatory Frame Axioms to handle state persistence",
      "Solve plans using Arc Consistency and CSP solvers"
    ],
    "questions": [
      {
        "q": "What is the Frame Problem in classical planning?",
        "solution": "The challenge of representing what propositions do NOT change when an action occurs. In STRIPS-to-CSP, Explanatory Frame Axioms explicitly state that a proposition changes if and only if an action that affects it occurred.",
        "hint": "If the robot moves to the hallway, what happens to the coffee color?"
      },
      {
        "q": "How does the STRIPS-to-CSP algorithm determine plan length?",
        "solution": "It starts with time horizon k = 0 (checks if goal already holds). If inconsistent, it increments k = 1, 2, ... constructing the CSP for each horizon until arc consistency and search find a satisfying assignment.",
        "hint": "Iterative deepening over time steps."
      }
    ],
    "toolId": "strips_to_csp",
    "sampleId": "coffeeDelivery"
  },
  {
    "id": "9.A",
    "chapter": "Decision Theory",
    "title": "Decision Networks & Maximum Expected Utility",
    "reading": "Poole & Mackworth Section 9.1 - 9.3: Decision Theory",
    "goals": [
      "Distinguish between chance nodes, decision nodes, and utility nodes",
      "Calculate Expected Utility EU(d) = sum P(outcome|d) * U(outcome)",
      "Determine optimal policies that maximize expected utility (MEU)"
    ],
    "questions": [
      {
        "q": "What is the Maximum Expected Utility (MEU) decision criterion?",
        "solution": "A rational agent should choose the decision action d* that maximizes EU(d) = sum_{s} P(s|d, e) * Utility(s, d).",
        "hint": "Weighted average of payoffs."
      },
      {
        "q": "In a decision network, what do incoming edges into a decision node represent?",
        "solution": "Information availability! An arc into a decision node means that the value of the parent variable is observed and known to the agent at the exact moment the decision is made.",
        "hint": "Is it causal or informational?"
      }
    ],
    "toolId": "bayes",
    "sampleId": "umbrella"
  }
];
