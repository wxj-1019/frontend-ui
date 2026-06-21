---
name: fixing-accessibility
description: Audit and fix HTML accessibility issues including ARIA labels, keyboard navigation, focus management, color contrast, and form errors. Use when adding interactive controls, forms, dialogs, or reviewing WCAG compliance.
---

# Fixing Accessibility

Audit and fix accessibility issues to meet WCAG 2.2 AA standards.

## When to Use

- Building forms, modals, or interactive components
- User requests accessibility audit
- Code review for accessibility compliance

## Audit Checklist

### Keyboard Navigation
- All interactive elements reachable via Tab
- Focus order matches visual order
- Visible focus indicator on all focusable elements
- Skip link for main content
- Escape closes modals/dialogs

### ARIA & Semantics
- Use native HTML elements when possible (`<button>`, not `<div role="button">`)
- Forms have associated `<label>` elements
- Images have descriptive `alt` text
- Landmarks used: `<header>`, `<main>`, `<nav>`, `<footer>`
- `aria-label` on icon-only buttons
- `aria-expanded` on toggle buttons
- `aria-live` for dynamic content updates

### Color & Contrast
- Text meets WCAG AA: 4.5:1 normal, 3:1 large text
- Non-text elements: 3:1 minimum
- Color is never the only way to convey information
- Focus indicators visible in both themes

### Forms
- Every input has a visible label
- Error messages linked via `aria-describedby`
- Required fields marked with `aria-required` AND visible indicator
- Validation feedback available to screen readers

### Screen Reader
- Page has a unique `<title>`
- Modal content trapped with focus management
- Loading states announced via `aria-busy` or `aria-live`
- Dynamic content changes announced appropriately

## Common Fixes

```html
<!-- BROKEN -->
<div class="button" onclick="save()">Save</div>
<img src="icon.svg">
<input type="text" placeholder="Enter name">

<!-- FIXED -->
<button onclick="save()">Save</button>
<img src="icon.svg" alt="Description of icon">
<label for="name">Name</label>
<input type="text" id="name" placeholder="e.g. John Doe">
```
