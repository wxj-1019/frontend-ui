---
name: changesets-release
description: Changesets version management for Frontend UI monorepo — versioning, changelogs, and npm publishing workflow. Use when releasing packages or managing versions.
---

# Changesets Release

Version management and publishing workflow using Changesets for the Frontend UI monorepo.

## When to Use

- Creating a new release
- Adding changesets for package updates
- Publishing to npm
- Generating changelogs
- Managing version bumps across packages

---

## 1. Setup

### 1.1 Installation

```bash
# Root of monorepo
pnpm add -D @changesets/cli

# Initialize changesets
pnpm changeset init
```

### 1.2 Configuration

```json
// .changeset/config.json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

### 1.3 Package.json Scripts

```json
{
  "scripts": {
    "changeset": "changeset",
    "version-packages": "changeset version",
    "release": "changeset publish"
  }
}
```

---

## 2. Workflow

### 2.1 Adding Changesets

```bash
# Interactive changeset creation
pnpm changeset

# Select packages to include
# Select bump type: patch / minor / major
# Write summary
```

### 2.2 Changeset File Structure

```markdown
<!-- .changeset/bright-hounds-bake.md -->
---
"@frontend-ui/ui": minor
"@frontend-ui/cli": patch
---

Added new GlassCard component and fixed CLI init command.
```

### 2.3 Versioning

```bash
# Update versions and changelogs
pnpm version-packages

# Review changes
# git diff

# Install to update lockfile
pnpm install

# Commit version changes
git add .
git commit -m "chore: version packages"
```

### 2.4 Publishing

```bash
# Build all packages first
pnpm build

# Publish to npm
pnpm release

# Or with OTP (2FA)
pnpm release -- --otp 123456
```

---

## 3. Bump Types

| Type | When to Use | Example |
|------|-------------|---------|
| **patch** | Bug fixes, minor changes | Fix button hover state |
| **minor** | New features, backwards compatible | Add new component |
| **major** | Breaking changes | Remove deprecated API |

---

## 4. Monorepo Considerations

### 4.1 Cross-Package Dependencies

```json
// .changeset/config.json
{
  "updateInternalDependencies": "patch"
}
```

When `@frontend-ui/ui` bumps, `@frontend-ui/cli` (which depends on it) automatically gets a patch bump.

### 4.2 Independent Versioning

```json
// .changeset/config.json
{
  "fixed": [
    ["@frontend-ui/ui", "@frontend-ui/cli"]
  ]
}
```

Fixed packages always bump together.

---

## 5. GitHub Actions Integration

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    branches: [main]

concurrency: ${{ github.workflow }}-${{ github.ref }}

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'

      - run: pnpm install
      - run: pnpm build

      - name: Create Release Pull Request or Publish
        uses: changesets/action@v1
        with:
          publish: pnpm release
          version: pnpm version-packages
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## 6. Pre-Publish Checklist

```bash
# 1. Type check
pnpm typecheck

# 2. Lint
pnpm lint

# 3. Test
pnpm test

# 4. Build
pnpm build

# 5. Add changeset
pnpm changeset

# 6. Version
pnpm version-packages

# 7. Install (update lockfile)
pnpm install

# 8. Commit
git add .
git commit -m "chore: release packages"

# 9. Publish
pnpm release
```

---

*Version: 1.0.0 | For Frontend UI Changesets Release*
