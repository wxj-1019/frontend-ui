---
name: react-doctor
description: Run React Doctor to detect regressions in security, performance, correctness, and architecture, with score-based quality checks. Use for React component audit and quality assessment.
---

# React Doctor

Automated quality audit for React codebases. Detects issues across four dimensions: security, performance, correctness, and architecture.

## When to Use

- After completing a feature
- Before code review
- Periodic codebase health check
- Investigating performance issues

## Audit Dimensions

### Security (Weight: High)
- No dangerouslySetInnerHTML without sanitization
- No eval() or Function() in component code
- No secrets/hardcoded API keys
- Proper CORS and CSP headers
- Dependency vulnerabilities (npm audit)

### Performance (Weight: High)
- No unnecessary re-renders (React.memo, useMemo, useCallback)
- Large component trees without code splitting
- Images without lazy loading
- Missing key props in lists
- Expensive computations in render (move to useMemo)
- useEffect dependencies accurate

### Correctness (Weight: Critical)
- Missing dependency arrays in hooks
- Conditional hook calls (against Rules of Hooks)
- Unhandled promise rejections
- Missing error boundaries
- State updates on unmounted components
- Incorrect use of useRef vs useState

### Architecture (Weight: Medium)
- Component file exceeds 300 lines
- Circular dependencies
- Deeply nested component structure (>4 levels)
- Inconsistent patterns (class + functional components)
- Missing TypeScript strict mode

## Score System

```
Overall: 0-100 (weighted average)
  Security:    0-100 (×0.30)
  Performance: 0-100 (×0.25)
  Correctness: 0-100 (×0.35)
  Architecture: 0-100 (×0.10)

Thresholds:
  < 50: Critical — fix immediately
  50-70: Warning — address before next release
  70-85: Good — minor improvements possible
  > 85: Excellent — production ready
```
