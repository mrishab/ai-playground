# 003 — Interruptible Node State Transitions on Graph Canvas

- **Status**: DONE
- **Commit**: 4e912a6
- **Severity**: MEDIUM
- **Category**: Interruptibility & performance
- **Estimated scope**: 3 files (`src/components/search/SearchNodeSvg.tsx`, `src/components/bayes/BayesNodeShape.tsx`, `src/index.css`)

## Problem

Search and algorithm canvas nodes currently transition state via `transition-colors duration-200 ease-out` or CSS keyframe animations (`animate-node-pulse 1.5s infinite ease-in-out`). Under continuous autoplay (speed slider at maximum, 100ms per step), CSS transitions can restart mid-flight, creating visual stutter or desynchronization with the stepped algorithm state.

```css
/* src/index.css:107 — current */
.animate-node-pulse {
  animation: nodePulse 1.5s infinite ease-in-out;
}
```

## Target

Convert node highlight animations to compositor-safe opacity and scale transitions with short durations (140ms) that terminate cleanly within a single algorithm step:

```css
/* target */
.animate-node-pulse {
  animation: nodePulse 1.0s cubic-bezier(0.2, 0, 0, 1) infinite;
  will-change: transform, opacity;
}
```

## Repo conventions to follow

- Keyframes are defined under `@layer base` in `src/index.css`.
- SVG nodes use `transform-origin: center` and transform coordinates inside SVG groups (`<g transform="...">`).

## Steps

1. In `src/index.css`, update `@keyframes nodePulse` to use non-linear ease-out timing curve and `will-change: transform`.
2. In `src/components/search/SearchNodeSvg.tsx`, ensure halo pulse has `pointer-events-none`.
3. In `src/components/search/SearchCanvasCard.tsx`, ensure SVG root has `transform-gpu`.

## Boundaries

- Do NOT change SVG layout dimensions (`viewBox`, node coordinate math).
- Do NOT introduce canvas rerendering side-effects.

## Verification

- **Mechanical**: Vitest tests in `src/test/workspace_and_graph_builder.test.tsx` pass.
- **Feel check**:
  - Run A* search with fast playback (1000 steps/min).
  - Confirm node halos smoothly advance from node to node without visual artifacts or dropped frames.
- **Done when**: Continuous autoplay maintains 60fps without transition restart glitches.
