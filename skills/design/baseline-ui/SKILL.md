---
name: baseline-ui
description: Quickly deslop UI code by fixing spacing, hierarchy, typography, and small layout issues. Use when the interface needs a fast cleanup or polish pass.
---

# Baseline UI

Fix common UI issues that make interfaces feel "sloppy" — spacing inconsistencies, type scale problems, hierarchy errors, and small layout misalignments.

## When to Use

- User says "clean this up" or "make it look better"
- Components feel misaligned or inconsistent
- Typography hierarchy is broken
- Spacing feels off between sections

## Fixes Applied

### Spacing
- Enforce 8px grid (Tailwind: p-2, p-4, p-6, p-8, etc.)
- Remove negative margins and magic number paddings
- Consistent gap between related sections (gap-8 or gap-12)
- Section padding: py-16 md:py-24

### Typography
- Enforce heading hierarchy: h1 → h2 → h3 → h4
- Set reasonable font sizes: 14px minimum body, headings scale up by 1.25×
- Consistent line-height: 1.5 body, 1.2 headings
- Remove excessive font-weight variants

### Layout
- Fix overflow/scroll issues
- Center content with max-w-* containers
- Remove duplicate or conflicting CSS
- Ensure z-index stacking order makes sense

### Visual Polish
- Add subtle border-radius consistency (rounded-lg default)
- Fix inconsistent shadow usage
- Normalize icon sizes (4/5/6/8 scale)
- Remove orphaned decorative elements
