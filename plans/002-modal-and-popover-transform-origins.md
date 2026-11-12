# 002 — Anchor Modal and Popover Scaling to Trigger Origins

- **Status**: DONE
- **Commit**: 4e912a6
- **Severity**: MEDIUM
- **Category**: Physicality & origin
- **Estimated scope**: 2 files (`src/components/ui/Modal.tsx`, `src/components/workspace/problem_io/ProblemImportModal.tsx`)

## Problem

Modals currently enter using Tailwind's `zoom-in-95` anchored to `transform-origin: center`, causing overlays to float in from arbitrary space rather than appearing to materialize from their trigger location. Exits also lack asymmetrical acceleration (exit should be 25-35% faster than entrance).

```tsx
/* src/components/ui/Modal.tsx:36 — current */
"relative z-50 w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-2xl transition-opacity transition-transform animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
```

## Target

Modal entrances should take `240ms cubic-bezier(0.16, 1, 0.3, 1)` with subtle initial vertical translation (`translate-y-2`) rather than abrupt scale. Exits should animate at `160ms cubic-bezier(0.4, 0, 1, 1)`:

```tsx
/* target */
"relative z-50 w-full max-w-2xl rounded-xl border border-border bg-card p-6 shadow-2xl transition-all duration-240 ease-[cubic-bezier(0.16,1,0.3,1)] animate-in fade-in zoom-in-98 slide-in-from-bottom-2 max-h-[90vh] overflow-y-auto"
```

## Repo conventions to follow

- Animation classes utilize Tailwind's `tailwindcss-animate` utilities (`animate-in`, `fade-in`, `zoom-in-95`, `slide-in-from-bottom-*`).
- Overlay backdrops utilize `bg-black/60 backdrop-blur-xs`.

## Steps

1. In `src/components/ui/Modal.tsx`, refine the dialog container animations to use `duration-200 slide-in-from-bottom-1 fade-in zoom-in-98`.
2. In `src/components/workspace/problem_io/ProblemImportModal.tsx`, apply matching entrance classes.
3. In `src/components/workspace/problem_io/ProblemExportModal.tsx`, apply matching entrance classes.

## Boundaries

- Do NOT touch modal contents, accessibility attributes (`aria-modal`, `role="dialog"`), or event propagation.
- Do NOT alter z-index stacking context (`z-50`).

## Verification

- **Mechanical**: `npm test -- --run` passes all modal export/import tests.
- **Feel check**:
  - Open Import Problem modal: ensure overlay smoothly dims in `150ms`, content rises 4px smoothly into place.
  - Close modal: ensure dismissal is instant and crisp without lingering ghost frames.
- **Done when**: Modals appear grounded and physically directional rather than zooming in from floating space.
