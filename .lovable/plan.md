## Goal
Make the SPOT PACKERS & MOVERS brand identity clearly visible on the first/hero section of the homepage — bigger logo, clear company name treatment like the reference screenshot, but elevated for the premium feel of the site.

## Changes (frontend only, `src/routes/index.tsx`)

1. **Hero brand lockup** — Add a new prominent brand block above the "India's Trusted Packers & Movers" headline:
   - Large circular/rounded logo (80–96px) with subtle glow ring and glass backdrop
   - Wordmark next to it:
     - "SPOT" in large bold display font with gradient text
     - "PACKERS & MOVERS" as a refined tracked-out subtitle underneath
   - Entrance animation (fade + slide) via framer-motion

2. **Header navbar polish** — Slightly enlarge the existing logo + wordmark in the top nav so the brand reads clearly at a glance (logo ~48px, "SPOT" bolder, tagline crisper).

3. Keep all existing hero content (headline, subcopy, CTAs, phone numbers, right-side map panel) intact — only add the brand lockup above the headline and tighten spacing.

No backend, routing, or content changes.
