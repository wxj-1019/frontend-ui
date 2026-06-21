---
name: using-ui-stack
description: Enforce a design system (8px grid, color tokens, typography, dark mode, 5-state interactions) on every AI-generated component. Use when building UI components that must follow consistent design standards.
---

# Using UI Stack

Enforce consistent design system rules on every generated component. No more random spacing, arbitrary colors, or inconsistent states.

## When to Use

- Building any UI component
- User wants consistent design quality
- Working in a team with shared design standards
- Enforcing brand guidelines in generated code

## Design System Rules

### Spacing (8px Grid)
```
Base unit: 4px
Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

Tailwind equivalents:
p-1 (4px), p-2 (8px), p-3 (12px), p-4 (16px)
p-5 (20px), p-6 (24px), p-8 (32px), p-10 (40px)
```

### Color Tokens
Always use CSS variables or Tailwind theme colors — never hardcoded hex:
```css
--color-bg-primary: #ffffff;
--color-bg-secondary: #f5f5f5;
--color-text-primary: #1a1a1a;
--color-text-secondary: #666666;
--color-accent: #3b82f6;
--color-accent-hover: #2563eb;
--color-border: #e5e5e5;
--color-error: #ef4444;
--color-success: #22c55e;
```

### Typography Scale
```
h1: 36px / 2.25rem (line-height: 1.2)
h2: 30px / 1.875rem
h3: 24px / 1.5rem
h4: 20px / 1.25rem
body: 16px / 1rem (line-height: 1.5)
small: 14px / 0.875rem
caption: 12px / 0.75rem
```

### Dark Mode
- Every component must support dark mode
- Use CSS variables that swap in dark theme
- Test contrast in both modes
- System preference detection: `prefers-color-scheme: dark`

### 5-State Interaction Model
Every interactive element must define:
1. **Default** — resting state
2. **Hover** — cursor over (150-250ms transition)
3. **Focus** — keyboard focus (visible ring)
4. **Active** — being pressed (50-100ms)
5. **Disabled** — unavailable (reduced opacity 40-50%)

```css
.button { /* default */ }
.button:hover { /* hover */ }
.button:focus-visible { /* focus */ }
.button:active { /* active */ }
.button:disabled { /* disabled */ }
```

### Border Radius Strategy
Pick one and stick to it:
- **Sharp**: rounded-none (developer tools, code editors)
- **Subtle**: rounded-md / rounded-lg (SaaS, dashboards)
- **Pill**: rounded-full (buttons, badges, tags)
