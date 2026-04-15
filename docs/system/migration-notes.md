# A3MALY Migration Notes

## Goal

Unify all application UI under the A3MALY design language and remove legacy styling paths.

## Completed

- Global tokens added and normalized in `app/globals.css`.
- Core primitives updated: `Button`, `Input`, `Card`, `Badge`, `Dropdown`, `Modal`, `UserMenu`.
- New primitives added: `Table`, `Tabs`.
- Shell components tokenized: `Sidebar`, `Navbar`, `GlobalCommand`.
- Major app modules migrated in batches:
  - Auth and landing surfaces
  - ERP module hubs and system-config forms
  - Accounts dashboards and settings
  - Companies and project pages (partial ongoing)
- CI workflows created for lint, type-check, build, and preview.

## In Progress

- Remaining legacy page-local forms and tables in some `app/projects` and `app/erp/accounts/*` leaf pages.
- Select module pages still contain hardcoded utility palettes pending cleanup.

## Migration Strategy

1. Replace local UI fragments with `components/ui` primitives.
2. Swap hardcoded colors/spacing with identity tokens.
3. Remove duplicated UI helpers once no references remain.
4. Run lint, type-check, and build after each module batch.

## Regression Checklist

- Visual consistency across module dashboards
- Form control height and spacing consistency
- Table header/row style consistency
- Modal and dropdown interaction parity
- No lint or type-check regressions
