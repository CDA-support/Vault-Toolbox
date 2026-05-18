---
name: vault-code-reviewer
description: Performs an automated "Self-Review" of code. Use this at the end of every task in TODO.md to ensure compliance with standards.
triggers:
  - ui-check
  - review
  - audit
  - checklist
---

# Vault Code Reviewer

This skill acts as an automated "Self-Audit" for any new or modified code. It ensures that the project's high standards are met before work is considered complete.

## UI Review (Island Architecture)
Check all new or modified UI components against the 19-point Island Architecture Checklist:
- **Pillars:** Header, Island, Status, and Context Panel.
- **Tokens:** Correct semantic tokens (`white_color_mode`, etc.).
- **Hierarchy:** Pages MUST use the `VStack` template.
- **Accessibility:** Tooltips on all icons; high-contrast borders for checkboxes in Dark Mode.
- **Consistency:** Tabs (60px height), indicators, and margins.
- **Visibility:** Tool MUST be integrated into the application menu bar and have an ON/OFF toggle in the Settings page.
- **Production Protection:** Confirm that modifying controls are disabled in Production with appropriate tooltip messaging.

## API & Data Review (Pattern Compliance)
Check all service/hook changes against the `ApiService` patterns:
- **Auth:** Sessions retrieved via cookies (Manifest V3 pattern).
- **Error Handling:** Use of `handleErrors` normalization.
- **Telemetry:** Presence of execution time and size metrics in responses.
- **No Direct Fetch:** All Vault calls MUST use the `vapil` request builders.
- **Logging:** Verify presence of `console.log` during development phases and its removal in Phase 8 (if requested).
- **Production Protection:** Verify that modifying API calls are gated by `isProductionVault()` checks.

## Architectural Review (SDD & YAGNI)
- **Impact Check:** Ensure no unrelated code was refactored.
- **YAGNI Audit:** Confirm no "dead code" or "just-in-case" logic was added.
- **Dryness:** Check for reuse of shared components (`<VirtualizedTable />`, `<CodeEditor />`).

## Output: Review Report
At the end of a task, provide a brief summary of the audit:
- **✅ PASS:** [Areas where the code is perfect]
- **⚠️ REFACTOR:** [Minor deviations from naming or styling standards]
- **❌ BLOCKED:** [Critical violations of Island Architecture or TDD mandates]

## Rules to Follow
- **Be Critical:** Do not rubber-stamp a review. If a standard is missed, point it out.
- **Reference Document:** Use the 19-point checklist as the primary authority.
- **Self-Correction:** If you find a violation in your own code, fix it IMMEDIATELY and re-review.
