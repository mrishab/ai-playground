# AI Playground 🧠⚡

Interactive in-browser Artificial Intelligence algorithm laboratory and learning suite. Built with React, TypeScript, and Tailwind CSS — all algorithm simulations, visual builders, and solvers execute purely client-side in the browser.

View Live site: **[https://mrishab.github.io/ai-playground/](https://mrishab.github.io/ai-playground/)**

## What this project does

- **Graph Searching & Graph Builder**: Interactive pathfinding with A*, Dijkstra, Best-First, BFS, and DFS on custom-built or prebuilt graphs.
- **Consistency for CSP**: Arc Consistency (AC-3), domain pruning, and backtracking search with visual constraint graph updates.
- **Stochastic Local Search (SLS)**: Greedy Descent (Min-Conflicts), Random Walk, and Tabu Search for constraint satisfaction.
- **Definite Clause Deduction**: SLD resolution proof trees, clause derivation, and custom knowledge base editor.
- **Belief & Decision Networks**: Bayesian network probabilistic inference with Variable Elimination and D-Separation path checks.
- **Decision Trees**: ID3 induction using Shannon Entropy reduction and Information Gain metrics.
- **Neural Networks**: Feedforward network training with live backpropagation weight adjustment and decision boundary visualization.
- **STRIPS Planning (Blocks World)**: Classical forward/backward planning with interactive gripper execution and Sussman Anomaly resolution.
- **STRIPS to CSP**: Temporal planning reduction to constraint satisfaction problems.
- **Robot Control**: Autonomous reactive navigation with whisker sensors and obstacle avoidance.
- **Universal Problem I/O**: Export and import problem states seamlessly across XML and JSON formats.

## Architecture (No Backend)

This is a static client-side frontend application:
- No server-side API calls or backend queues.
- No database requirements — configurations and themes persist via `localStorage`.
- Built and deployed automatically to GitHub Pages via GitHub Actions.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 6** — Build tool and dev server
- **Tailwind CSS** — Modern dark/light styling and design tokens
- **Lucide React** — Icons
- **Cypress & Vitest** — End-to-end and unit testing suites
- **GitHub Pages** — Production static hosting

## Getting Started

### 1. Clone and enter project

```bash
git clone https://github.com/mrishab/ai-playground.git
cd ai-playground
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

## Deployment

Changes pushed to the `main` branch automatically deploy to GitHub Pages via `.github/workflows/deploy.yml`:

- Live URL: [https://mrishab.github.io/ai-playground/](https://mrishab.github.io/ai-playground/)
- Vite base path is configured for GitHub Pages project hosting (`/ai-playground/`).
