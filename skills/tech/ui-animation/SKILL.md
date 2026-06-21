---
name: ui-animation
description: UI animation rules — use only transform/opacity, 200-300ms timing, prefers-reduced-motion, CSS-first principles. Use when adding animations to UI components.
---

# UI Animation Rules

Universal rules for performant, accessible UI animations.

## Core Rules

### 1. Transform + Opacity Only
```css
/* ✅ GOOD — compositor only */
.animate { transform: translateY(8px); opacity: 0; }
.animate.visible { transform: translateY(0); opacity: 1; }

/* ❌ BAD — triggers layout */
.animate { height: 0; }
```

### 2. Timing
| Type | Duration |
|------|----------|
| Micro-interaction (hover, focus) | 150-250ms |
| Page transition | 300-500ms |
| Complex reveal | 500-800ms |
| Never exceed 1000ms for UI |

### 3. Easing
```css
/* Entrance: ease-out */
transition: transform 300ms ease-out;

/* Exit: ease-in */
transition: opacity 200ms ease-in;

/* Smooth: custom cubic-bezier */
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### 4. prefers-reduced-motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 5. CSS First
- Use CSS transitions/animations for simple effects
- Use GSAP/Motion only when you need: sequencing, scroll-trigger, spring physics, or runtime control
