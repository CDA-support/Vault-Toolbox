# Vault Knowledge Sync: Task Completion Checklist

Run this checklist after completing any Directive to ensure the project's documentation remains the "Source of Truth."

## 1. Documentation Review
- [ ] **Foundation:** If a new core capability was added, is it listed in `1_project_foundation_document.md`?
- [ ] **Architecture:** If folder structures or state flows changed, is `2_architecture_and_design_document.md` updated?
- [ ] **API:** If a new VAPIL endpoint was added, is it documented in `3_data_and_api_integration_document.md`?
- [ ] **Workflow:** If dependencies or naming conventions changed, is `4_developer_workflow_and_quality_document.md` updated?
- [ ] **UI/UX:** If new styling tokens or layout rules were introduced, is `8_ui_design_principles_and_layout_standards.md` updated?

## 2. Knowledge Graph Synchronization
- [ ] Run `npm run graph:gen` to rebuild `src/ai_agent_instructions/codebase_graph.json`.
- [ ] Verify the new connections with `npm run graph:search "YourNewComponentOrHook"`.

## 3. Summarization
- [ ] Briefly state which documents were updated.
- [ ] Confirm that no documentation was guess-work; it was all based on the verified code changes.
