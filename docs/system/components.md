# Unified Components

All application pages must consume shared primitives from `components/ui`.

## Core Primitives

- `Button`: variants `primary`, `secondary`, `outline`, `danger`, `ghost`; sizes `sm`, `md`, `lg`.
- `Input`: label, icon, and error state support; fixed identity radius and focus ring.
- `Card`: base container with identity border, radius, and padding.
- `Badge`: semantic status labels (`success`, `warning`, `danger`, `info`, `neutral`).
- `Table`: use `TableWrapper`, `Table`, `TableHead`, `TableRow`, `TableCell` helpers.
- `Tabs`: segmented navigation using identity color and spacing tokens.
- `Modal`: standardized overlay, panel, and header styles.
- `Dropdown`: identity menu surface and action item styling.

## Shell Primitives

- `Sidebar`: navigational grouping with tokenized spacing and surface colors.
- `Navbar`: top-level search and user actions with shared input and card primitives.
- `GlobalCommand`: command palette using shared `Input`, `Card`, and `Button` primitives.

## Rules

- No page-local button/input/card re-implementations.
- No direct hardcoded gray/blue utility palettes in feature pages.
- Prefer primitive composition over utility-class duplication.
