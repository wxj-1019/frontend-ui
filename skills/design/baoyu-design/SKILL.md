---
name: baoyu-design
description: Run Claude Design locally as an Agent Skill — Cursor, Claude Code & more. Produce polished UI mockups, prototypes, decks & wireframes as self-contained HTML. Best with Opus 4.8.
---

# Baoyu Design

Local-first design engine that produces polished UI mockups, interactive prototypes, wireframes, landing pages, dashboards, and slide decks — all as self-contained HTML artifacts.

## When to Use

- Designing new UI from scratch (pages, dashboards, apps)
- Creating interactive prototypes with real state
- Building slide decks as web pages
- Generating design system tokens and components
- Importing design context from Figma, GitHub, or existing HTML

## Core Capabilities

### Design Outputs
| Type | Description |
|------|------------|
| **Hi-fi Design** | Polished, production-grade UI mockups |
| **Interactive Prototype** | Working interactions, form validation, state management |
| **Wireframe** | Low-fidelity layout exploration |
| **Mobile Prototype** | Mobile-first designs with device frames |
| **Slide Deck** | Full presentation with speaker notes |
| **Design System** | Token-based system with components |

### Import Sources
- **Figma .fig files** — Offline decode, generate design system or extract components
- **GitHub repos** — Browse tree, sparse-checkout design files
- **Existing HTML/CSS** — Extract tokens, colors, type, spacing from live code

### Export & Handoff
- Standalone HTML (self-contained)
- PDF (print-ready)
- PPTX (editable PowerPoint)
- Video (MP4 animation recording)

## Design Process

### Phase 1: Clarify
Ask clarifying questions before designing:
1. What are we designing? (page, app, dashboard, deck)
2. Who is the audience?
3. Any existing brand/assets to use?
4. What's the ONE most important action?

### Phase 2: Gather Context
- Import Figma kits, brand guidelines, or reference screenshots
- Extract design tokens from existing codebases
- Use real content, not lorem ipsum

### Phase 3: Build
- Generate as self-contained HTML under `designs/<project>/`
- Apply design system tokens consistently
- Include all states: empty, loading, error, success

### Phase 4: Preview & Iterate
- Serve over localhost for live preview
- Point at elements to request changes
- Iterate visually, not through description

## Design System Usage

### Creating a Design System
```
Define:
- Color tokens (4-6 named colors)
- Typography scale (display + body + utility)
- Spacing scale (4/8/12/16/24/32/48/64)
- Border radius strategy
- Shadow elevation scale
- Component library (buttons, inputs, cards, etc.)
```

### Using a Design System
- System binds as a visual contract — no off-system colors/styles
- All components built from system tokens
- Changes to system propagate to all designs using it

## Component Scaffolds

Pre-built starter components available:
- Device frames (iOS, Android, macOS, browser)
- Pan-zoom design canvas
- Slide deck stage with navigation
- Timeline animation engine
- Tweaks panel for live property editing
- Fillable image slots

## Design Quality Rules

### Typography
- Pair a distinctive display font with a clean body font
- One h1 per page, clear heading hierarchy
- Line-height: 1.5 body, 1.2 headings
- Max line length: 65-75 characters

### Color
- One strong accent, used sparingly (≤3 places)
- Neutral palette first, accent for emphasis
- Never use purple/blue gradient defaults

### Layout
- Intentional asymmetry over template symmetry
- White space as active design element
- 8px grid for spacing consistency
- Responsive from mobile (375px) to desktop (1440px)

### Motion
- Orchestrated page-load sequence over scattered effects
- Scroll-triggered reveals for content below fold
- Hover micro-interactions (150-250ms)
- Respect prefers-reduced-motion

## Example Prompts

- "Design 3 hi-fi variations of a pricing page"
- "Prototype a working onboarding flow with real state"
- "Make a 10-slide deck from this PRD"
- "Wireframe layout ideas for a mobile expense tracker"
- "Turn this Figma UI kit into a design system, then build a dashboard"
