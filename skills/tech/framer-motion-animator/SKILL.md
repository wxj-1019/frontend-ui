---
name: framer-motion-animator
description: Full Framer Motion guide — variants, stagger, page transitions, scroll, gestures, accessibility. Use when building React animations with motion (framer-motion).
---

# Framer Motion Animator

Complete guide to building animations with `motion` (formerly Framer Motion) in React.

## Installation

```bash
npm install motion
```

## Core Patterns

### Basic Animation
```tsx
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
/>
```

### Variants
```tsx
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
};

<motion.div variants={variants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={variants}>{item.text}</motion.div>
  ))}
</motion.div>
```

### Gestures
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  Click me
</motion.button>
```

### Scroll-Triggered
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5 }}
/>
```

### Page Transitions
```tsx
// layout.tsx
<motion.div
  key={pathname}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  {children}
</motion.div>
```

### Layout Animations
```tsx
<motion.div layout>
  {/* Automatically animates position/size changes */}
</motion.div>
```

## Accessibility
- Wrap animations in `prefers-reduced-motion` check
- Use `useReducedMotion()` hook
- Set `duration: 0` when reduced motion is preferred
