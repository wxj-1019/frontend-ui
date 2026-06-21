---
name: emil-design-eng
description: Emil Kowalski's design-engineering philosophy for UI polish, components, animation, and production-ready frontend craft. Use when building animated components, refining motion design, or seeking design-engineering guidance.
---

# Emil Design Engineering

Design-engineering philosophy focused on UI polish, animation craft, and production-ready components. Inspired by the creator of motion (formerly Framer Motion).

## When to Use

- Building animated React components
- Refining motion/interaction design
- Seeking design-engineering best practices
- Creating polished, performant animation

## Core Philosophy

### Motion Is Communication
- Animation should explain what happened, not just decorate
- Every motion should answer: What changed? Where did it come from? Where is it going?
- Prefer layout animations over opacity-only transitions

### Performance First
- Always animate `transform` and `opacity` — never layout properties
- Use `will-change` sparingly and remove after animation
- Profile animations in Chrome DevTools Performance panel
- Target 60fps; 30fps minimum for complex scenes

### Component Animation Patterns

#### Enter Animation
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
/>
```

#### Hover Gesture
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
/>
```

#### Stagger Children
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};
```

#### Layout Animation
```tsx
<motion.div layout>
  {/* Content that animates position/size changes */}
</motion.div>
```

### Spring Physics
- `stiffness`: How stiff the spring is (higher = faster)
- `damping`: How much friction (higher = less bounce)
- UI defaults: stiffness 100-400, damping 10-20
- Bouncy: stiffness 300, damping 10
- Smooth: stiffness 100, damping 20

## Production Checklist
- [ ] All animations respect `prefers-reduced-motion`
- [ ] No layout thrashing (separate reads from writes)
- [ ] Exit animations complete before unmount (AnimatePresence)
- [ ] Key prop stable to avoid unnecessary re-mounts
- [ ] `layout` prop used for automatic layout animations
