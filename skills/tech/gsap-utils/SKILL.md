---
name: gsap-utils
description: Official GSAP skill for utility methods — clamp, mapRange, normalize, interpolate, random, snap, toArray, selector, wrap, pipe.
license: MIT
---

# GSAP Utilities

## When to Use

These are math/selection helpers that ship with GSAP. Use them instead of writing custom utility functions.

## Key Utilities

| Method | Description |
|--------|-------------|
| `gsap.utils.clamp(min, max, value)` | Clamp a number to range |
| `gsap.utils.mapRange(inMin, inMax, outMin, outMax, value)` | Map value from one range to another |
| `gsap.utils.normalize(min, max, value)` | Normalize to 0-1 |
| `gsap.utils.interpolate(start, end, progress)` | Linear interpolation |
| `gsap.utils.random(min, max, snapIncrement?)` | Random number |
| `gsap.utils.snap(snapIncrement, value)` | Snap to grid |
| `gsap.utils.toArray(selector)` | Convert selector/NodeList to array |
| `gsap.utils.selector(scope)` | Scoped selector function |
| `gsap.utils.wrap(min, max)` | Wrap value to range |
| `gsap.utils.pipe(...funcs)` | Compose functions |

## Examples

```javascript
// Animate based on scroll position
const progress = gsap.utils.clamp(0, 1, scrollY / maxScroll);

// Map mouse position to rotation
const rot = gsap.utils.mapRange(0, window.innerWidth, -45, 45, mouseX);

// Random delay for each item
gsap.to(".item", { x: 100, delay: gsap.utils.random(0, 0.5) });

// Scoped selector (safe in React)
const q = gsap.utils.selector(containerRef.current);
gsap.to(q(".box"), { x: 100 });
```
