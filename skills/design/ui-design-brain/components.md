# UI Component Reference

Complete reference for 60 UI components with best practices, common layouts, and aliases.
Sourced from [component.gallery](https://component.gallery) and enriched with production-grade guidance.

---

## Contents

- [Accordion](#accordion)
- [Alert](#alert)
- [Avatar](#avatar)
- [Badge](#badge)
- [Breadcrumbs](#breadcrumbs)
- [Button](#button)
- [Button group](#button-group)
- [Card](#card)
- [Carousel](#carousel)
- [Checkbox](#checkbox)
- [Color picker](#color-picker)
- [Combobox](#combobox)
- [Date input](#date-input)
- [Datepicker](#datepicker)
- [Drawer](#drawer)
- [Dropdown menu](#dropdown-menu)
- [Empty state](#empty-state)
- [Fieldset](#fieldset)
- [File](#file)
- [File upload](#file-upload)
- [Footer](#footer)
- [Form](#form)
- [Header](#header)
- [Heading](#heading)
- [Hero](#hero)
- [Icon](#icon)
- [Image](#image)
- [Label](#label)
- [Link](#link)
- [List](#list)
- [Modal](#modal)
- [Navigation](#navigation)
- [Pagination](#pagination)
- [Popover](#popover)
- [Progress bar](#progress-bar)
- [Progress indicator](#progress-indicator)
- [Quote](#quote)
- [Radio button](#radio-button)
- [Rating](#rating)
- [Rich text editor](#rich-text-editor)
- [Search input](#search-input)
- [Segmented control](#segmented-control)
- [Select](#select)
- [Separator](#separator)
- [Skeleton](#skeleton)
- [Skip link](#skip-link)
- [Slider](#slider)
- [Spinner](#spinner)
- [Stack](#stack)
- [Stepper](#stepper)
- [Table](#table)
- [Tabs](#tabs)
- [Text input](#text-input)
- [Textarea](#textarea)
- [Toast](#toast)
- [Toggle](#toggle)
- [Tooltip](#tooltip)
- [Tree view](#tree-view)
- [Video](#video)
- [Visually hidden](#visually-hidden)

---

## Accordion

**Also known as:** Arrow toggle  ·  Collapse  ·  Collapsible sections  ·  Collapsible  ·  Details  ·  Disclosure  ·  Expandable  ·  Expander

A vertically stacked set of collapsible sections — each heading toggles between showing a short label and revealing the full content beneath it.

**Best practices:**
- Use for long-form content that benefits from progressive disclosure
- Keep headings concise and scannable — they are the primary navigation
- Allow multiple sections open simultaneously unless space is critically limited
- Include a subtle expand/collapse icon (chevron) aligned consistently on the right
- Animate open/close with a short ease-out transition (150–250 ms)
- Ensure keyboard navigation: Enter/Space toggles, arrow keys move between headers

**Common layouts:**
- FAQ page with stacked question/answer pairs
- Settings panel with grouped preference sections
- Sidebar filter groups in e-commerce or dashboards
- Mobile navigation with expandable menu sections

---

## Alert

**Also known as:** Notification  ·  Feedback  ·  Message  ·  Banner  ·  Callout

A prominent message used to communicate important information or status changes to the user.

**Best practices:**
- Use semantic color coding: red for errors, amber for warnings, green for success, blue for info
- Include a clear, actionable message — not just a status label
- Provide a dismiss action for non-critical alerts
- Position inline alerts close to the relevant content, not floating arbitrarily
- Use an icon alongside color to ensure accessibility for color-blind users
- Keep alert text to one or two sentences maximum

**Common layouts:**
- Top-of-page banner for system-wide announcements
- Inline form validation message beneath an input field
- Toast notification stack in the bottom-right corner
- Contextual warning inside a card or settings section

---

## Avatar

A visual representation of a user, typically displayed as a photo, illustration, or initials.

**Best practices:**
- Support three sizes: small (24–32 px), medium (40–48 px), large (64–80 px)
- Fall back gracefully: image → initials → generic icon
- Use a subtle ring or border to separate the avatar from its background
- For groups, stack avatars with a slight overlap and a '+N' overflow indicator
- Ensure the image is loaded lazily with a placeholder shimmer

**Common layouts:**
- User profile header with name and role
- Comment thread with avatar beside each message
- Team member list with stacked avatar group
- Navigation bar user menu trigger

---

## Badge

**Also known as:** Tag  ·  Label  ·  Chip

A compact label that sits within or near a larger component to convey status, category, or other metadata.

**Best practices:**
- Keep badge text to one or two words — they are labels, not sentences
- Use a limited palette of badge colors mapped to clear semantics
- Ensure sufficient contrast between badge text and background (WCAG AA minimum)
- Use pill shape (fully rounded corners) for status badges, rounded rectangles for tags
- Avoid overusing badges — if everything is badged, nothing stands out

**Common layouts:**
- Status indicator on a table row (Active, Pending, Archived)
- Tag cloud beneath a blog post or product card
- Notification count on a nav icon
- Feature label on a pricing tier card

---

## Breadcrumbs

**Also known as:** Breadcrumb trail

A trail of links that shows where the current page sits within the site's navigational hierarchy.

**Best practices:**
- Show the full hierarchy path; truncate middle segments on mobile with an ellipsis menu
- The current page should be the last item and should not be a link
- Use a subtle separator (/ or ›) with adequate spacing
- Place breadcrumbs near the top of the content area, below the header
- Keep breadcrumb text lowercase or sentence-case for readability

**Common layouts:**
- E-commerce category → subcategory → product page
- Documentation site section navigation
- Dashboard drill-down from overview to detail view
- File manager path display

---

## Button

An interactive control that triggers an action — submitting a form, opening a dialog, toggling visibility.

**Best practices:**
- Establish a clear visual hierarchy: primary (filled), secondary (outlined), tertiary (text-only)
- Use verb-first labels: 'Save changes', 'Create project', not 'Okay' or 'Submit'
- Minimum touch target of 44×44 px; desktop buttons at least 36 px tall
- Show a loading spinner inside the button during async actions — disable to prevent double-clicks
- Limit to one primary button per visible viewport section
- Ensure focus ring is visible and high-contrast for keyboard users

**Common layouts:**
- Form footer with primary action right-aligned and secondary action left-aligned
- Hero CTA button centered or left-aligned beneath headline
- Dialog footer with Cancel (secondary) and Confirm (primary)
- Floating action button (FAB) in bottom-right for mobile creation flows

---

## Button group

**Also known as:** Toolbar

A container that groups related buttons together as a single visual unit.

**Best practices:**
- Group only related actions — unrelated buttons should be separated
- Visually connect buttons with shared border or tight spacing (1–2 px gap)
- Clearly indicate the active/selected state in toggle-style groups
- Keep the group to 2–5 buttons; more options warrant a dropdown or overflow menu

**Common layouts:**
- Text editor toolbar (bold, italic, underline)
- View switcher (grid view, list view)
- Segmented date range selector (Day, Week, Month)
- Split button with primary action and a dropdown for alternatives

---

## Card

**Also known as:** Tile

A self-contained content block representing a single entity such as a contact, article, or task.

**Best practices:**
- Use a single, clear visual hierarchy within each card: media → title → meta → action
- Keep cards a consistent height in grid layouts — use line clamping for variable text
- Make the entire card clickable when it represents a navigable entity
- Use subtle elevation (shadow) or a border — not both simultaneously
- Limit card content to essential info; let the detail page carry the rest

**Common layouts:**
- Product grid with image, title, price, and CTA
- Blog post feed with thumbnail, headline, excerpt, and date
- Dashboard KPI cards with metric, delta, and sparkline
- Team member directory with avatar, name, and role

---

## Carousel

**Also known as:** Content slider

A component that cycles through multiple content slides, navigable via swipe, scroll, or button controls.

**Best practices:**
- Provide visible navigation arrows and pagination dots
- Support swipe gestures on touch devices
- Auto-advance only if the user hasn't interacted; pause on hover/focus
- Show a peek of the next slide to signal scrollability
- Keep slide count manageable (3–7) — carousels with many slides have low engagement
- Ensure accessibility: each slide should be reachable via keyboard

**Common layouts:**
- Hero image slideshow on a marketing homepage
- Product image gallery on a detail page
- Testimonial carousel with quote, author, and avatar
- Horizontal scrolling feature highlights in a mobile app

---

## Checkbox

A selection control — use in groups for multi-select from a list, or standalone for a single on/off choice.

**Best practices:**
- Use checkboxes for multi-select, not single toggles (use a switch for on/off)
- Align the checkbox to the first line of its label, not the center
- Support indeterminate state for 'select all' when children are partially selected
- Minimum 44 px touch target including label area
- Group related checkboxes under a fieldset with a legend for accessibility

**Common layouts:**
- Filter panel with multi-select facets
- Terms & conditions single checkbox with long label
- To-do list with check/uncheck per item
- Table row multi-select with header 'select all'

---

## Color picker

A control that lets users select a color value.

**Best practices:**
- Provide a spectrum picker, hue slider, and direct hex/RGB input
- Include a set of preset swatches for quick selection
- Show a real-time preview of the selected color
- Support copy-paste of hex/RGB/HSL values
- Remember recently used colors for convenience

**Common layouts:**
- Design tool color picker with spectrum, sliders, and input fields
- Theme customizer with preset palette and custom override
- Annotation tool with color swatch row
- Brand settings with primary/secondary/accent color pickers

---

## Combobox

**Also known as:** Autocomplete  ·  Autosuggest

A select-like input enhanced with a free-text field that filters available options as you type.

**Best practices:**
- Show suggestions after 1–2 characters to reduce noise
- Highlight matched text within each suggestion for scannability
- Allow keyboard navigation (arrow keys + Enter) through the dropdown
- Show a 'no results' message instead of an empty dropdown
- Debounce input to avoid excessive API calls (200–300 ms)

**Common layouts:**
- Search bar with autocomplete suggestions
- Address input with location suggestions
- Tag input that suggests existing tags
- Assignee picker in a project management tool

---

## Date input

A date entry control, often split into separate day, month, and year fields.

**Best practices:**
- Clearly label the expected format (DD/MM/YYYY or MM/DD/YYYY)
- Use separate fields for day, month, and year for unambiguous entry
- Validate in real-time and show errors inline
- Support auto-advancing between fields when a segment is complete

**Common layouts:**
- Date of birth entry in a registration form
- Passport/ID expiry date input
- Invoice date field in a financial form

---

## Datepicker

**Also known as:** Calendar  ·  Datetime picker

A calendar-based control for selecting dates visually.

**Best practices:**
- Allow both manual text entry and calendar selection
- Clearly indicate the expected date format (e.g., MM/DD/YYYY)
- Highlight today's date and the currently selected date
- Disable dates outside the valid range
- Support keyboard navigation through the calendar grid
- For date ranges, show both start and end in a connected picker

**Common layouts:**
- Booking flow with check-in / check-out range picker
- Form field with calendar dropdown on focus
- Dashboard date range filter in a toolbar
- Event creation form with start date and optional end date

---

## Drawer

**Also known as:** Tray  ·  Flyout  ·  Sheet

A panel that slides in from a screen edge to reveal secondary content or actions.

**Best practices:**
- Use drawers for secondary content or focused sub-tasks that don't warrant a full page
- Slide in from the right for detail panels, from the left for navigation
- Include a clear close button and support Escape to dismiss
- Dim the background with a semi-transparent overlay to establish focus
- Width should be 320–480 px on desktop; full-width on mobile

**Common layouts:**
- Mobile navigation menu sliding in from the left
- Shopping cart preview panel from the right
- Detail/edit panel in a master-detail layout
- Notification center sliding in from the right

---

## Dropdown menu

**Also known as:** Select menu

A menu triggered by a button that reveals a list of actions or navigation options — unlike a select, it is not a form input.

**Best practices:**
- Group related items with separators and optional group headings
- Support keyboard navigation: arrow keys to move, Enter to select, Escape to close
- Keep the menu to 7±2 items; use sub-menus or search for longer lists
- Position the menu to avoid viewport overflow — flip to top if near bottom edge
- Indicate destructive actions in red and place them last, separated

**Common layouts:**
- User account menu in the top-right navigation
- Context menu on right-click or kebab icon
- Action menu on a table row (Edit, Duplicate, Delete)
- Sort/filter dropdown in a toolbar

---

## Empty state

A placeholder shown when a view has no data to display, typically paired with a helpful action or suggestion.

**Best practices:**
- Include a clear illustration or icon to soften the empty feeling
- Write a helpful headline explaining the empty state
- Provide a primary CTA that guides the user toward the next step
- Avoid blame — frame it positively ('No projects yet' not 'You have no projects')
- Show the empty state in-place within the container, not as a full-page takeover

**Common layouts:**
- Empty dashboard with 'Create your first project' CTA
- Search results page with 'No results found' and suggestions
- Empty inbox with illustration and encouraging message
- Empty table with inline prompt to add data

---

## Fieldset

A container that groups related form fields under a shared label or legend.

**Best practices:**
- Use fieldsets to group related form fields under a descriptive legend
- Style the legend as a section heading within the form
- Ensure the fieldset is announced by screen readers for context

**Common layouts:**
- Address section grouping street, city, state, and zip fields
- Payment information section with card number, expiry, and CVV
- Personal details section in a multi-part form

---

## File

**Also known as:** Attachment  ·  Download

A visual representation of a file — such as an uploaded attachment or a downloadable document.

**Best practices:**
- Show file type icon, name, and size clearly
- Include a download action and optionally a preview action
- Display upload date or last modified date
- Use a progress indicator during upload

**Common layouts:**
- Attachment list below a message or form
- File card with icon, name, size, and download button
- Document grid with thumbnails and metadata

---

## File upload

**Also known as:** File input  ·  File uploader  ·  Dropzone

A control that lets users select and upload files from their device.

**Best practices:**
- Support drag-and-drop with a clearly defined drop zone
- Show accepted file types and size limits before upload
- Display upload progress with a progress bar per file
- Allow cancellation of in-progress uploads
- Show a preview (thumbnail for images, icon + name for documents) after selection
- Validate file type and size client-side before uploading

**Common layouts:**
- Profile photo upload with circular crop preview
- Document attachment area in a form
- Multi-file drag-and-drop zone with file list below
- Inline file field with browse button and filename display

---

## Footer

A region at the bottom of a page or section containing copyright info, legal links, or secondary navigation.

**Best practices:**
- Organize links into clear columns by category
- Include essential legal links: Privacy Policy, Terms of Service
- Keep the footer visually distinct but not distracting — muted background
- Include social links and a newsletter signup if appropriate
- Ensure the footer is accessible and links are keyboard-navigable

**Common layouts:**
- Multi-column footer with link groups, logo, and copyright
- Minimal SaaS footer with product links and social icons
- E-commerce footer with help, shipping, returns, and payment icons
- Single-line footer with copyright and key legal links

---

## Form

A collection of input controls that allows users to enter and submit structured data.

**Best practices:**
- Use a single-column layout for most forms — it's faster to scan
- Place labels above inputs for mobile-friendly forms
- Group related fields with visual proximity and optional fieldset headings
- Show inline validation on blur, not on every keystroke
- Disable the submit button until required fields are valid, or show clear errors on submit
- Keep forms as short as possible — ask only what's necessary

**Common layouts:**
- Sign-up form with name, email, password, and CTA
- Multi-step wizard form with progress indicator
- Settings form with grouped preference sections
- Contact form with name, email, subject, and message textarea

---

## Header

The persistent top-of-page region containing the site brand, primary navigation, and key actions.

**Best practices:**
- Keep the header height compact (56–72 px) to preserve content space
- Place the logo/brand on the left, primary navigation in the center or right
- Use a sticky header on long pages but consider auto-hide on scroll-down
- Ensure the mobile header collapses into a hamburger menu gracefully
- Maintain clear visual separation from page content (border-bottom or subtle shadow)

**Common layouts:**
- SaaS app header with logo, nav links, search, and user avatar
- Marketing site header with logo, nav links, and CTA button
- Dashboard header with breadcrumbs, page title, and action buttons
- Minimal header with centered logo and hamburger menu

---

## Heading

A title element that introduces and labels a content section.

**Best practices:**
- Use a strict heading hierarchy (h1 → h2 → h3) for accessibility and SEO
- Limit to one h1 per page — it's the page title
- Keep headings concise and descriptive — they're the outline of your content
- Use consistent sizing, weight, and spacing across heading levels

**Common layouts:**
- Page title (h1) with section headings (h2) and subsections (h3)
- Card title as an h3 within a page section
- Dashboard section headers separating widget groups

---

## Hero

**Also known as:** Jumbotron  ·  Banner

A prominent banner near the top of a page, typically featuring a full-width image or illustration with a headline.

**Best practices:**
- Lead with a compelling headline — clarity over cleverness
- Limit to one primary CTA and optionally one secondary CTA
- Use a high-quality image or illustration that reinforces the message
- Ensure text contrast against the background image (overlay or safe text zone)
- Keep hero height proportional — it should invite scrolling, not dominate the viewport

**Common layouts:**
- Split hero: headline + CTA on left, product screenshot on right
- Full-bleed background image with centered text overlay
- Minimal hero with large headline, subtext, and inline email capture
- Video background hero with centered headline and play button

---

## Icon

A small graphic symbol that communicates the purpose or meaning of an interface element at a glance.

**Best practices:**
- Use a consistent icon style throughout the product (outlined or filled, not mixed)
- Size icons to align with adjacent text (typically 16–24 px)
- Pair icons with text labels for clarity — icon-only buttons need tooltips
- Use aria-hidden='true' for decorative icons and aria-label for functional ones

**Common layouts:**
- Navigation item with icon + label
- Action button with icon + text ('Download report')
- Status indicator icon beside a label (check, warning, error)
- Icon-only toolbar with tooltips

---

## Image

**Also known as:** Picture

A component for displaying embedded images within a page.

**Best practices:**
- Always provide meaningful alt text for accessibility
- Use responsive images (srcset) to serve appropriate sizes
- Lazy-load images below the fold for performance
- Reserve space for images before they load to prevent layout shift
- Use modern formats (WebP, AVIF) with fallbacks

**Common layouts:**
- Hero banner with full-width background image
- Product image gallery with thumbnails and zoom
- Blog post featured image above the title or below the headline
- Avatar or profile photo in a circular frame

---

## Label

**Also known as:** Form label

A text element that identifies and describes a form input.

**Best practices:**
- Always associate labels with their form inputs (htmlFor / id pairing)
- Place labels above the input for vertical forms, beside for horizontal
- Mark required fields clearly (asterisk or 'required' text)
- Keep label text concise — use helper text for additional guidance

**Common layouts:**
- Form field with label above and helper text below
- Inline label beside a toggle or checkbox
- Floating label that moves to the top on input focus

---

## Link

**Also known as:** Anchor  ·  Hyperlink

A clickable reference to another resource — either an external page or a location within the current document.

**Best practices:**
- Make link text descriptive — avoid 'click here' or 'learn more' in isolation
- Underline links in body text for discoverability; nav links may rely on context
- Use a distinct color from surrounding text (but avoid pure blue if it clashes with your palette)
- Show a visited state for content-heavy pages to aid navigation
- External links should indicate they open in a new tab (icon or aria-label)

**Common layouts:**
- Inline text link within a paragraph
- Standalone link beneath a card or section as a 'read more' action
- Footer link columns for site navigation
- Breadcrumb links in a hierarchy path

---

## List

A component that groups related items into an ordered or unordered sequence.

**Best practices:**
- Use consistent vertical rhythm — equal spacing between list items
- For interactive lists, ensure each row has a clear hover and active state
- Include dividers between items in dense lists; omit them in spacious ones
- Support keyboard navigation when the list is interactive
- Use virtualization (windowing) for lists exceeding ~100 items

**Common layouts:**
- Email inbox with sender, subject, preview, and timestamp per row
- Settings list with label, value/toggle, and optional chevron
- Activity feed with avatar, description, and relative timestamp
- File list with icon, name, size, and date columns

---

## Modal

**Also known as:** Dialog  ·  Popup  ·  Modal window

An overlay that demands the user's attention — interaction is required before returning to the content beneath.

**Best practices:** Always provide X, Cancel, Escape. Trap focus. Return focus on close. Keep concise.

**Common layouts:** Confirmation dialog, form modal, image lightbox, onboarding modal.

---

## Navigation

**Also known as:** Nav  ·  Menu

A region containing links for moving between pages or jumping to sections.

**Best practices:** 5-7 items max, clear active state, collapse to hamburger on mobile.

---

## Pagination

A control for navigating between pages of content.

**Best practices:** Show first/last + window, Previous/Next buttons, ellipsis for gaps.

---

## Popover

Floating panel triggered by click near its trigger element — can contain interactive content.

**Best practices:** Trigger via click (not hover), dismiss on outside click/Escape.

---

## Progress bar

Horizontal indicator of task completion progress.

**Best practices:** Determinate when measurable, indeterminate when unknown. Animate smoothly.

---

## Progress indicator

**Also known as:** Progress tracker  ·  Stepper  ·  Steps

Visual display of advancement through a multi-step process.

**Best practices:** Distinguish completed/current/upcoming steps. Use numbered labels.

---

## Quote

**Also known as:** Pull quote  ·  Block quote

Styled block for displaying quotations.

**Best practices:** Distinct visual treatment, always attribute source, keep short.

---

## Radio button

**Also known as:** Radio  ·  Radio group

Selection control where user picks exactly one option from a set.

**Best practices:** Pre-select sensible default. Group under fieldset with legend.

---

## Rating

Control that displays or captures a star-based score.

**Best practices:** 5-star scale, show average + review count, half-star precision for display.

---

## Rich text editor

**Also known as:** RTE  ·  WYSIWYG editor

WYSIWYG editing surface for rich text content.

**Best practices:** Minimal default toolbar, keyboard shortcuts, sanitize pasted content.

---

## Search input

Text field designed for entering search queries.

**Best practices:** Magnifying glass icon, Cmd/Ctrl+K shortcut, debounce 200-300ms.

---

## Segmented control

Compact row of mutually exclusive options.

**Best practices:** 2-5 segments, equal widths, animate selection indicator.

---

## Select

**Also known as:** Dropdown  ·  Select input

Form input with scrollable option list when expanded.

**Best practices:** Native select for simple cases, custom needs full keyboard + ARIA.

---

## Separator

**Also known as:** Divider  ·  Horizontal rule

Visual divider between content sections.

**Best practices:** Subtle low-contrast, prefer spacing over separators.

---

## Skeleton

**Also known as:** Skeleton loader

Low-fidelity placeholder mimicking content shape during loading.

**Best practices:** Match actual layout shape, shimmer animation, show after 300ms delay.

---

## Skip link

Hidden navigation link for keyboard users to jump to main content.

**Best practices:** First focusable element, visible on focus, 'Skip to main content' label.

---

## Slider

**Also known as:** Range input

Draggable control for selecting a value from a defined range.

**Best practices:** Show current value, 44px touch target, pair with text input for precision.

---

## Spinner

**Also known as:** Loader  ·  Loading

Animated indicator for background processes.

**Best practices:** Show after 300ms delay, size to context, one consistent design.

---

## Stack

Layout utility applying uniform spacing between child components.

**Best practices:** Consistent spacing scale (4/8/12/16/24/32/48px), vertical default.

---

## Stepper

**Also known as:** Nudger  ·  Quantity  ·  Counter

Numeric input with increment/decrement buttons.

**Best practices:** Clear +/- buttons, allow direct entry, disable at min/max.

---

## Table

Structured grid of rows and columns for data display.

**Best practices:** Sticky header, right-align numbers, sortable columns, zebra striping.

---

## Tabs

**Also known as:** Tabbed interface

Selectable labels switching between content panels.

**Best practices:** 2-7 tabs, clear active indicator, keyboard arrow navigation.

---

## Text input

Single-line form field for short text values.

**Best practices:** Label above, inline validation on blur, placeholder as format hint only.

---

## Textarea

**Also known as:** Textbox

Multi-line text field for longer content entry.

**Best practices:** 3-5 rows default, show character count, auto-grow as user types.

---

## Toast

**Also known as:** Snackbar

Brief non-blocking notification in a floating layer.

**Best practices:** Auto-dismiss 4-6s, stack newest on top, undo action for destructive ops.

---

## Toggle

**Also known as:** Switch

Binary switch for immediate on/off settings.

**Best practices:** Label what it controls, 44px touch target, not for forms that need Save.

---

## Tooltip

**Also known as:** Toggletip

Small floating label for supplementary info on hover.

**Best practices:** Hover trigger with 300ms delay, never for essential content.

---

## Tree view

Collapsible nested hierarchy for browsing structured data.

**Best practices:** 16-24px indent per level, keyboard navigation, lazy-load deep children.

---

## Video

**Also known as:** Video player

Media component for playing video content.

**Best practices:** Poster image, captions, lazy-load, no autoplay with sound.

---

## Visually hidden

**Also known as:** Screenreader only

Content hidden visually but accessible to screen readers.

**Best practices:** Use clip-rect technique, never display:none. For skip links and icon labels.

---