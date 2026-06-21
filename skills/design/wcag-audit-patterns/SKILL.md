---
name: wcag-audit-patterns
description: Conduct WCAG 2.2 accessibility audits with automated testing, manual verification, and remediation guidance. Use when auditing websites for accessibility, fixing WCAG violations, or implementing accessible design patterns.
---

# WCAG 2.2 Audit Patterns

Systematic accessibility auditing following WCAG 2.2 Level AA standards.

## Audit Process

### Phase 1: Automated Scan
- Run axe-core or Lighthouse accessibility audit
- Identify all violations and warnings
- Prioritize: Critical → Serious → Moderate → Minor

### Phase 2: Manual Testing
- Keyboard navigation: Tab through entire page
- Screen reader: Test with VoiceOver (macOS) or NVDA (Windows)
- Zoom: Test at 200% browser zoom
- Color: Verify with color blindness simulator
- Motion: Test with prefers-reduced-motion enabled

### Phase 3: Remediation
- Fix all Critical and Serious issues
- Document known limitations for Minor issues
- Retest after fixes

## WCAG 2.2 Key Requirements

### Perceivable
- 1.1.1 Non-text Content: All images have alt text
- 1.3.1 Info and Relationships: Semantic HTML structure
- 1.4.1 Use of Color: Color is not the only visual means
- 1.4.3 Contrast (Minimum): 4.5:1 text, 3:1 large text
- 1.4.11 Non-text Contrast: 3:1 for UI components
- 1.4.13 Content on Hover or Focus: Dismissible, hoverable, persistent

### Operable
- 2.1.1 Keyboard: All functionality operable via keyboard
- 2.2.2 Pause, Stop, Hide: Auto-moving content can be paused
- 2.3.1 Three Flashes or Below: No flashing content
- 2.4.3 Focus Order: Meaningful sequence
- 2.4.7 Focus Visible: Visible focus indicator
- 2.5.8 Target Size (Minimum): 24x24px touch targets

### Understandable
- 3.2.1 On Focus: No context change on focus
- 3.3.1 Error Identification: Error described in text
- 3.3.2 Labels or Instructions: Labels for all inputs

### Robust
- 4.1.2 Name, Role, Value: Proper ARIA usage
- 4.1.3 Status Messages: Status announced via aria-live

## Common Violation Fixes

```
❌ <div onclick="..." class="button">
✅ <button type="button" onclick="...">

❌ <img src="chart.png">
✅ <img src="chart.png" alt="Sales increased 25% in Q3">

❌ <input placeholder="Search">
✅ <label for="search">Search</label><input id="search">
```
