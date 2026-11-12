# Animation & Motion Improvement Roadmap

This directory contains prioritized animation improvement plans adhering to Emil Kowalski's animation philosophy and crafted via the `improve-animations` skill.

## Plan Summary

| Plan | Title | Severity | Category | Status |
| :--- | :--- | :--- | :--- | :--- |
| [001](001-micro-interaction-curves-and-active-states.md) | Standardize Micro-Interaction Timing and Active Press States | HIGH | Easing & duration | DONE |
| [002](002-modal-and-popover-transform-origins.md) | Anchor Modal and Popover Scaling to Trigger Origins | MEDIUM | Physicality & origin | DONE |
| [003](003-spring-physics-on-canvas-and-graph-nodes.md) | Interruptible Node State Transitions on Graph Canvas | MEDIUM | Interruptibility & performance | DONE |

## Recommended Execution Order

1. **001 (Micro-Interactions)**: Highest leverage. Affects every button click and step interaction across all 10 tools.
2. **002 (Modals & Overlays)**: Ensures dialogues and file import/export modals feel grounded and physically cohesive.
3. **003 (Canvas & Graph Nodes)**: Ensures high-speed algorithm execution remains smooth and interruptible on SVG graphs.

## Dependencies

- None: Each plan is self-contained and independently executable.
