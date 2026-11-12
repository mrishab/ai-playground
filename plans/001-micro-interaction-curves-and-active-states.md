# 001 — Standardize Micro-Interaction Timing and Active Press States

- **Status**: DONE
- **Commit**: 4e912a6
- **Severity**: HIGH
- **Category**: Easing & duration
- **Estimated scope**: 3 files (`src/components/ui/Button.tsx`, `src/components/ui/TabsTrigger.tsx`, `src/components/workspace/WorkspacePaneSwitcher.tsx`)

## Problem

Button and control micro-interactions currently rely on default Tailwind transitions (`transition-colors`) without explicit active-press feedback (`active:scale-[0.98]`) or tailored duration curves. Buttons hit hundreds of times per session (Step Forward, Advance Arc, Solve, Mode buttons) lack physical responsiveness on click/tap, making the workspace feel unresponsive during rapid stepping.

```tsx
/* src/components/ui/Button.tsx:28 — current */
"inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none"
```

## Target

Apply snappy micro-interaction durations (120ms), high-polish easing `cubic-bezier(0, 0, 0.2, 1)`, and subtle active compression `active:scale-[0.98]`:

```tsx
/* target */
"inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-[background-color,border-color,color,fill,stroke,transform] duration-120 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none"
```

## Repo conventions to follow

- Utility classes are combined via `cn(...)` in `src/lib/utils.ts`.
- Transitions avoid `transition-all` and specify GPU-safe composite properties or color properties.
- Exemplar: `src/components/navbar/NavbarBrand.tsx` with `transition-transform group-hover:scale-105`.

## Steps

1. In `src/components/ui/Button.tsx`, add `duration-120 ease-out active:scale-[0.98] transition-[color,background-color,border-color,transform]` to base button styles.
2. In `src/components/ui/TabsTrigger.tsx`, add `active:scale-[0.98]` to tab trigger active states.
3. In `src/components/workspace/WorkspacePaneSwitcher.tsx`, add `active:scale-[0.98]` to pane buttons.

## Boundaries

- Do NOT change markup or layout properties (`width`, `height`, `margin`, `padding`).
- Do NOT change button sizes or variant color definitions.
- Do NOT add external motion libraries.

## Verification

- **Mechanical**: `npm run build && npm test -- --run` passes cleanly.
- **Feel check**:
  - Click "Step Forward" rapidly in `SearchTool`. Confirm the button depresses instantly without sluggishness.
  - In DevTools Animation panel at 10% speed, confirm exit transition returns cleanly to scale 1 without stuttering.
- **Done when**: All interactive buttons exhibit immediate tactile feedback on pointer-down.
