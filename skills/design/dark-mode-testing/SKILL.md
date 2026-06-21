---
name: dark-mode-testing
description: Toggle between light and dark mode in the browser, screenshot both, and flag missing token mappings or contrast issues. Use when implementing or testing dark mode support.
---

# Dark Mode Testing

Systematic dark mode verification for web interfaces.

## When to Use

- Implementing dark mode
- Adding new components that should support both themes
- Auditing existing dark mode implementation
- User reports visual bugs in dark/light mode

## Test Process

### 1. Visual Comparison
Toggle between light and dark mode and compare:
- Are all text elements readable?
- Do borders and shadows adapt correctly?
- Are images/icons visible in both modes?
- Is the background consistent (no light leaks)?

### 2. Color Token Audit
Check that all colors use CSS variables or theme tokens, not hardcoded values:
```
❌ bg-white text-black (hardcoded, won't adapt)
✅ bg-bg-primary text-text-primary (token-based)
```

### 3. Contrast Verification
- WCAG AA: 4.5:1 for normal text, 3:1 for large text
- Interactive elements: 3:1 minimum against adjacent colors
- Focus indicators: visible in both modes

### 4. System Preference
Verify the site respects `prefers-color-scheme`:
```css
@media (prefers-color-scheme: dark) {
  /* applied when system is in dark mode */
}
```

### 5. Manual Toggle
Verify manual toggle overrides system preference and persists across page loads.

## Common Dark Mode Bugs

| Bug | Fix |
|-----|-----|
| White flash on load | Set background-color on `<html>` element |
| Images too bright | Reduce opacity: `dark:opacity-90` |
| Shadows invisible | Use lighter shadows or glow effects in dark mode |
| Form inputs unreadable | Ensure input background contrasts with text |
| Hardcoded white backgrounds | Replace with CSS variables |
| SVG icons invisible | Use `currentColor` or switch to white icons |
| Border invisible | Use `dark:border-white/10` |
| Focus ring invisible | Use lighter focus ring in dark mode |

## Quick Audit Script

```javascript
// Check for hardcoded color values (run in browser console)
const all = document.querySelectorAll('*');
const hardcoded = [];
all.forEach(el => {
  const style = getComputedStyle(el);
  const bg = style.backgroundColor;
  const color = style.color;
  if (bg !== 'rgba(0, 0, 0, 0)' && !bg.startsWith('var(')) hardcoded.push({el, prop: 'bg', val: bg});
  if (color && !color.startsWith('var(')) hardcoded.push({el, prop: 'color', val: color});
});
console.table(hardcoded.slice(0, 20));
```
