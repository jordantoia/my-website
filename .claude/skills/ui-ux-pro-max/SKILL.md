# UI/UX Pro Max - Design Intelligence Overview

UI/UX Pro Max is a comprehensive design guidance system containing 50+ styles, 161 color palettes, 57 font pairings, 161 product types, 99 UX guidelines, and 25 chart types across 10 technology stacks.

## When to Use This Skill

Apply this skill for tasks involving **UI structure, visual design decisions, interaction patterns, or user experience quality control**. 

Must invoke for:
- Designing new pages or refactoring UI components
- Selecting color schemes, typography, spacing, or layout systems
- Reviewing UI code for UX, accessibility, or visual consistency
- Implementing navigation, animations, or responsive behavior
- Making product-level design decisions

Skip when working on pure backend logic, APIs, databases, or infrastructure unrelated to visual interfaces.

## Core Rule Priorities (1-10)

The system organizes guidance by impact level:

**Critical (Priority 1-2):**
- Accessibility (contrast 4.5:1, keyboard nav, ARIA labels)
- Touch & Interaction (44×44px minimum targets, 8px spacing, loading feedback)

**High (Priority 3-5):**
- Performance (WebP/AVIF, lazy loading, CLS < 0.1)
- Style Selection (match product type, SVG icons, consistency)
- Layout & Responsive (mobile-first, no horizontal scroll, viewport meta tag)

**Medium (Priority 6-10):**
- Typography & Color (16px base, 1.5 line-height, semantic tokens)
- Animation (150-300ms duration, transform/opacity only)
- Forms & Feedback (visible labels, error placement, progressive disclosure)
- Navigation Patterns (bottom nav ≤5 items, deep linking, back behavior)
- Charts & Data (legends, tooltips, accessible colors)

## Quick-Start Workflow

**Step 1:** Analyze product type, audience, style keywords, and target stack

**Step 2:** Generate design system using `--design-system` flag for comprehensive recommendations

**Step 3:** Supplement with detailed domain searches (`--domain`) as needed for deeper exploration

**Step 4:** Reference stack-specific guidelines for implementation details

**Step 5:** Verify against pre-delivery checklist covering visual quality, interaction, contrast, layout, and accessibility

## Key Deliverables

- **Design System:** Complete pattern, style, colors, typography, effects, and anti-patterns
- **Persistent Rules:** Master + page-specific overrides for hierarchical retrieval across sessions
- **Pre-Delivery Checklist:** Verification for visual quality, interaction, contrast, layout, and accessibility standards

This system emphasizes professional-grade UI focusing on accessibility, performance, and semantic consistency across platforms.
