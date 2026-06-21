---
name: fixing-motion-performance
description: Audit and fix animation performance issues including layout thrashing, compositor properties, scroll-linked motion, and blur effects. Use when animations stutter, transitions jank, or reviewing CSS/JS animation performance.
---

# Fixing Motion Performance

Diagnose and fix animation performance issues in web interfaces. Use when animations stutter, transitions feel janky, or frame rates drop.

## When to Use

- User reports animation lag or jank
- Scroll-based animations are choppy
- Hover effects have visible delay
- Page feels sluggish during transitions

## Performance Rules

### Compositor-Only Properties

Only animate these properties to stay on the compositor thread:
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (when already composited)

**Never** animate these without explicit approval:
- `width` / `height`
- `top` / `left` / `right` / `bottom`
- `margin` / `padding`
- `border-width`

### Scroll-Linked Animation

- Use `will-change: transform` sparingly (remove when done)
- Debounce scroll handlers with `requestAnimationFrame`
- Use CSS `scroll-driven-animations` or IntersectionObserver where possible
- Never call `getBoundingClientRect()` inside scroll handlers

### Hardware Acceleration

- Add `transform: translateZ(0)` or `will-change: transform` for heavy elements
- Remove `will-change` after animation completes
- Limit the number of composited layers (< 30 per page)

### Blur and Filters

- `backdrop-filter` is expensive — use only on fixed-position elements
- `filter: blur()` triggers repaint — prefer pre-blurred images
- `box-shadow` with large spread radius hurts performance — use borders or pseudo-elements

### Animation Frame Budget

- Aim for 60fps (16.67ms per frame)
- Profile with React DevTools or Chrome Performance panel
- Batch DOM reads and writes separately (avoid layout thrashing)
- Use `requestAnimationFrame` for continuous animations
