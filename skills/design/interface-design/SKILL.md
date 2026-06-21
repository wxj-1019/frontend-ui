---
name: interface-design
description: Specialized skill for interface design: dashboards, admin panels, and SaaS apps. Focused on craft and consistency. Use when building data-heavy or enterprise interfaces.
---

# Interface Design

Specialized guidance for designing dashboards, admin panels, and SaaS applications. Focus on information density, scannability, and consistency at scale.

## When to Use

- Building admin panels or dashboards
- Designing data-heavy interfaces
- Creating enterprise SaaS UIs
- Any interface with tables, charts, and forms

## Dashboard Layout Patterns

### Top-Level Structure
```
+------------------------------------------+
|  HEADER (logo + nav + user menu)         |
+------------------------------------------+
| SIDEBAR  |  MAIN CONTENT                 |
| nav      |  +--------------------------+ |
| items    |  | KPI Cards Row            | |
|          |  +--------------------------+ |
|          |  +------------+ +-----------+ |
|          |  | Chart      | | Activity  | |
|          |  | (2/3)      | | Feed (1/3)| |
|          |  +------------+ +-----------+ |
|          |  +--------------------------+ |
|          |  | Data Table (Full Width)  | |
|          |  +--------------------------+ |
+----------+--------------------------------+
```

### Key Rules
- Sidebar: 240-280px fixed, collapsible to 64px icons-only
- KPI cards: 4 max per row, consistent height
- Charts: label axes clearly, use consistent color scheme
- Tables: sticky header, alternating row colors optional, right-align numbers

## Form Design for Enterprise

### Single-Page Form Layout
```
+------------------------------------------+
|  Form Title                    [Save]    |
+------------------------------------------+
|  ── Basic Information ──                 |
|  Label        [____________]             |
|  Label        [____________]             |
|                                           |
|  ── Details ──                            |
|  Label        [____________]             |
|  Label        [________________________] |
+------------------------------------------+
```

### Rules
- Group related fields in sections with clear headings
- One primary action button (top-right or bottom)
- Inline validation on blur, not on keystroke
- Save progress automatically when possible
- Show unsaved changes indicator

## Data Table Best Practices

- Sticky header row
- Sortable columns (click header to toggle)
- Search/filter bar above table
- Pagination or infinite scroll below
- Row hover highlight
- Bulk actions bar appears when rows selected
- Empty state with helpful message when no data
