---
name: frontend-slides
description: Create animation-rich HTML presentations from scratch or convert PPT/PPTX files into polished web slides. Use when building presentation decks or converting slides to web format.
---

# Frontend Slides

Build animation-rich HTML presentations. Create polished slide decks as self-contained web pages.

## When to Use

- Building a presentation deck
- Converting PPT/PPTX to web format
- Creating a product demo walkthrough
- Building an onboarding slideshow

## Slide Structure Template

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Presentation Title</title>
  <style>
    /* Full-screen slide container */
    .deck { width: 100vw; height: 100vh; overflow: hidden; position: relative; }
    .slide { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; position: absolute; transition: opacity 0.5s; }
  </style>
</head>
<body>
  <div class="deck">
    <div class="slide">Slide 1</div>
    <div class="slide">Slide 2</div>
  </div>
</body>
</html>
```

## Slide Types

### Title Slide
- Large display text (60-80px)
- Subtitle (24-32px)
- Minimal decoration — let the title breathe
- Optional: subtle background gradient or image

### Content Slide
- Clear heading (32-48px)
- Bullet points max 5-7 items
- One idea per slide
- Code blocks: syntax highlighted, dark background

### Image/Media Slide
- Full-bleed image background
- Optional overlay text
- Ensure text contrast over image

### Data Slide
- One chart/visualization per slide
- Clear title explaining the insight
- Source attribution (small, bottom-right)

### Quote Slide
- Large quote mark decoration
- Quote text (32-48px, italic or serif)
- Attribution below

## Navigation

- Arrow keys: previous/next slide
- Swipe: touch devices
- Click: advance (optional)
- Progress indicator: dots or bar
- Slide counter: "3 / 12"

## Design Rules

- One font pairing max (display + body)
- Consistent color palette across all slides
- Animation: one entrance per element, staggered
- Total slides: aim for 1-2 minutes per slide
- Export as self-contained HTML (inline CSS + JS)
