---
name: vault-knowledge-sync
description: Guides the systematic updating of the project's "Source of Truth" documentation. Use after implementing new features or refactoring.
triggers:
  - sync
  - documentation
  - graph
  - repo_map
---

# Vault Knowledge Sync

This skill ensures that the project's "Source of Truth" documents and the automated knowledge graph accurately reflect the current state of the codebase.

## Core Workflow

### 1. Identify Impacted Documents
Depending on the change, identify which markdown files in `.agents/ai_agent_instructions/` need updates:
- **New Feature:** `identity.md` (Description) and create a new file in `features/`.
- **Architectural Change:** `architecture.md`.
- **API Update:** `architecture.md` or `standards.md`.
- **Workflow/Testing Change:** `workflow.md`.
- **UI/Layout Change:** `vault-ui-designer/SKILL.md` or `standards.md`.

### 2. Update the Content
Apply surgical updates to the identified files. Maintain the existing tone, formatting, and level of detail.

### 3. Synchronize the Knowledge Graph, Repo Map & Skills Manifest
Ensure the automated graph reflects the new dependencies:
- Run `npm run graph:gen` to rebuild `codebase_graph.json`, the PageRank-weighted `repo_map.md`, and the `skills.md` manifest.
- **Progressive Disclosure Validation:** Verify that all `SKILL.md` files have valid YAML frontmatter (name, description, triggers).
- Verify the update by:
    1. Inspecting `skills.md` to ensure new skills are correctly indexed.
    2. Inspecting `repo_map.md` to ensure new/modified files appear with their expected exports.
    3. Searching for new/modified symbols in the JSON graph: `node .agents/ai_agent_instructions/scripts/search_graph.js "SymbolName"`.

## Reference Materials
- **[sync-checklist.md](references/sync-checklist.md)**: A quick checklist to run after any significant task.

## Rules to Follow
- **No Guessing:** If unsure about a dependency, consult `codebase_graph.json` or run the search script.
- **Tone Consistency:** Keep descriptions technical, concise, and focused on "How it works" and "Why."
- **Surgical Edits:** Only update the sections directly impacted by your changes.
- **Verification:** After updating, summarize which documents were modified and confirm the graph was regenerated.
