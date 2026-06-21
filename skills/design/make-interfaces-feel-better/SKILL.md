---
name: make-interfaces-feel-better
description: Design engineering principles for making interfaces feel polished, with focus on micro-interactions, typography, and visual details. Use when polishing UI components, adding hover states, or refining visual feedback.
---

# Make Interfaces Feel Better

Design engineering principles for polished interfaces. Focus on the small details that separate "functional" from "delightful."

## When to Use

- Refining component interactions
- Adding hover/focus/active states
- Polishing typography and spacing
- Making forms and inputs feel premium

## Micro-Interaction Rules

### Hover States
- 150-250ms ease-out transitions
- Always provide visual feedback (cursor, color shift, slight scale)
- Scale hover: 1.01-1.02 for cards, 1.03-1.05 for buttons
- Never scale above 1.05 or it looks broken

### Focus States
- Visible ring on focus (2-4px, offset)
- Use `:focus-visible` not `:focus` for keyboard-only indicators
- Color: brand accent or white with 80% opacity

### Active/Press States
- Buttons: scale(0.97) + slightly darker
- Cards: no scale change, subtle shadow reduction
- Duration: 50-100ms (instant feedback)

### Loading States
- Show after 300ms delay (avoids flash for fast loads)
- Skeleton screens > spinners for known layouts
- Animate skeleton with subtle shimmer
- Disable interaction during loading, show cursor: wait

### Empty States
- Never leave an empty container
- Illustration or icon + helpful text + CTA
- Positive framing: "Start by adding your first project" not "No projects found"

## Typography Polish

- Body text: 16px minimum (never go below 14px for running text)
- Line-height: 1.5 for body, 1.2-1.3 for headings
- Letter-spacing: -0.01em for large headings
- Maximum line length: 65-75 characters for readability

## Spacing Polish

- Internal card padding: 24px (p-6)
- Section gaps: 48-80px (gap-12 to gap-20)
- Related items gap: 8-16px
- Content max-width: 680px for text-heavy pages

## Color Polish

- Use opacity for hierarchy: text-white, text-white/80, text-white/60, text-white/40
- Borders: white/10 default, white/20 on hover
- Shadows: use colored shadows, not pure black (e.g., black/10 with brand tint)
