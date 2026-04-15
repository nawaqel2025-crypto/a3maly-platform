# Layout Rules

## Page Structure

- Use `dir="rtl"` for Arabic-facing ERP pages unless explicitly bilingual.
- Keep section containers inside identity cards where possible.
- Apply consistent vertical rhythm with token spacing values.

## Navigation

- Sidebar and top navigation must remain componentized.
- Module dashboards should use grid cards with consistent heading/body hierarchy.

## Forms

- Use `Input` and `Button` primitives for all forms.
- Keep form controls at consistent heights and radius.
- Use two-column responsive forms where business context allows.

## Tables

- Always wrap with `TableWrapper`.
- Header row uses light neutral background and semibold labels.
- Row hover uses identity background token.
- Keep action columns right-aligned and concise.

## Visual Consistency

- No ad-hoc hardcoded theme palettes in pages.
- No module-specific typography scales outside token set.
- Avoid mixing utility-only components with primitive components in the same block.
