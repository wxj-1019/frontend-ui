---
name: 12-principles-of-animation
description: Apply Disney's 12 animation principles to web interfaces to make motion feel natural, organic, and human. Use when designing page transitions, micro-interactions, or animated components.
---

# 12 Principles of Animation for Web

Apply Disney's 12 principles of animation to web interfaces for motion that feels natural and polished.

## The 12 Principles

### 1. Squash & Stretch
- Use `scaleX/scaleY` transforms to give objects weight
- Buttons compress slightly on press, stretch on release
- Cards stretch when expanding

### 2. Anticipation
- Small reverse motion before main action
- Button text shifts up 1-2px before click
- Modal slides back 10px before opening

### 3. Staging
- One motion at a time dominates
- Animate the primary element first, then supporting ones
- Use opacity/scale to direct attention

### 4. Straight Ahead & Pose to Pose
- **Straight ahead**: Frame-by-frame for fluid, unpredictable motion (particle effects, drawing animations)
- **Pose to pose**: Define keyframes, let the browser interpolate (page transitions, UI state changes)

### 5. Follow Through & Overlapping Action
- Elements don't stop at once
- Main content stops → shadows/particles settle after
- List items stagger with decreasing delays

### 6. Slow In & Slow Out (Easing)
- NEVER use `linear` for UI animations
- Default to `ease-out` for entering, `ease-in` for exiting
- Custom cubic-beziers: `cubic-bezier(0.16, 1, 0.3, 1)` for bouncy, `cubic-bezier(0.4, 0, 0.2, 1)` for smooth

### 7. Arcs
- Natural motion follows curved paths, not straight lines
- Menu items swing in on arc paths
- Floating elements bob in elliptical orbits

### 8. Secondary Action
- Supporting motion that reinforces the primary action
- Card lifts (primary) + shadow deepens (secondary)
- Button pressed + ripple effect spreads

### 9. Timing
- UI micro-interactions: 150-300ms
- Page transitions: 300-500ms
- Complex reveals: 500-800ms
- Never exceed 1s for UI — users feel the delay

### 10. Exaggeration
- Subtle exaggeration makes interactions feel satisfying
- Button hover: scale(1.02) not scale(1.0)
- Notification badge: bounce with spring physics

### 11. Solid Drawing
- Elements maintain consistent volume and mass
- Don't squash in one dimension only
- Maintain 3D perspective in transforms

### 12. Appeal
- Motion should feel "tuned" — not generic
- Spring physics over linear transitions
- Character in micro-interactions (dismiss feels different from confirm)

## CSS Implementation Quick Reference

```css
/* Smooth entrance */
.enter {
  animation: enter 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes enter {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Spring bounce */
.spring {
  transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Subtle hover lift */
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
```
