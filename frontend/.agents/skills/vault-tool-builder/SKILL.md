---
name: vault-tool-builder
description: Guides the structural scaffolding of new features. Use when generating initial files (Page, Island, Hook).
triggers:
  - scaffold
  - blueprint
  - layout
  - island
---

# Vault Tool Builder

This skill handles the creation and wiring of new feature files. It focuses on the structural organization and defers all layout and styling details to the **`vault-ui-designer`** skill.

## End-to-End Tool Wiring Guide
Follow these 4 steps to integrate a new feature into the shell:

1. **Register Route (`App.jsx`):** Add the page to the main router within the `<Layout />`.
2. **Navigation Sidebar (`SidebarItems.ts`):** Add an entry with an appropriate `PiIcon` and `pageId`.
3. **Register in Settings (`VaultToolboxSettings.ts`):** 
    - Add to `defaultSettings` (enabled: true).
    - Add to `PageSettingsMetadata` (Label & InfoText).
4. **Layout Verification:** Compare side-by-side with **Component Editor** to ensure **Nested Pillar** consistency.

## Rules to Follow
- **Shared Components Only:** Always use `<VirtualizedTable />`, `<CodeEditor />`, and `<CustomSelect />` from `src/app/components/shared/`.
- **Snippet Enforcement:** Import standard UI components from `.../shared/ui-components/` ONLY.
- **Background Messaging:** For cross-origin or persistent tasks, use `chrome.runtime.sendMessage` to communicate with `background.js`.
