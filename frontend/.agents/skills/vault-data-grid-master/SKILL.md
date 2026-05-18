---
name: vault-data-grid-master
description: Guides implementation of high-performance data grids using TanStack Table and Virtualization.
triggers:
  - table
  - grid
  - virtualization
  - tanstack
---

# Vault Data Grid Master

This skill provides the procedural knowledge for building robust, virtualized data grids that maintain performance and visual consistency within the Vault Toolbox.

## Core Workflow

### 1. Define Column Logic (TanStack Table)
- Use `useReactTable` to manage sorting, filtering, and data mapping.
- Define `columnDef` with clear `id`, `header`, and `cell` renderers.
- Memoize columns and data using `useMemo` to prevent unnecessary re-renders.

### 2. Implement Virtualization (TanStack Virtual)
- **Mandatory for >50 items:** Use `useVirtualizer` to render only visible rows.
- Estimate row height (default `35px`) and set `overscan` (default `50`).
- Implement prefix/suffix padding rows to preserve sticky header behavior during scroll.

### 3. Style with Chakra UI
- **Environment Awareness:** Headers must change color based on environment:
    - **Sandbox:** `veeva_sandbox_green.500`
    - **Production:** `veeva_midnight_indigo.500`
- Use `stickyHeader` for all data grids.
- Ensure rows have hover states using `beige_color_mode`.

## Reference Materials
- **[table-logic.md](references/table-logic.md)**: Templates for `useReactTable` and column definitions.
- **[virtualization-pattern.md](references/virtualization-pattern.md)**: Implementation guide for row virtualization.

## Rules to Follow
- **Sticky Headers:** Always enable `stickyHeader` to maintain context.
- **Performance:** Always use `TanStack Virtual` for any dataset that could exceed 50 records.
- **Consistency:** Use the shared `VirtualizedTable.jsx` component if the requirements are standard. For custom logic, follow the pattern in `DataTable.tsx`.
- **Typing:** For new tables, use TypeScript interfaces for row data.
