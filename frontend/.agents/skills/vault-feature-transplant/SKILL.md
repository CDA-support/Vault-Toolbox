---
name: vault-feature-transplant
description: Guidance for surgically transplanting features from a fork into the main project.
triggers:
  - transplant
  - port
  - fork
  - adoption
---

# Vault Feature Transplant

This skill enforces a rigorous "Surgical Transplant" protocol to ensure features from forks or branches are integrated without breaking the "Green Baseline."

## 0. The Source Inquiry (Pre-Flight)

If the user asks to transplant a feature but does not provide specific instructions or a source path, you MUST ask for clarification:
1. **Ask for Source:** "Where is the source for this transplant? Is it a local folder, a remote repository, or a specific branch in the current repo?"
2. **List Branches:** If the user indicates they want something from the current repo but haven't specified the branch, run `git branch` and list the available branches for them to select from.

## 1. The Discovery Protocol (Feature Verification)

Before starting the transplant, you MUST map the source to ensure all dependencies are captured and verify the feature actually exists.

### Step 1: Feature Verification & Summary
- **Do Not Assume:** The existence of a feature's design (`_design.md`) or implementation (`_implementation.md`) documents in `.agents/features/` DOES NOT mean the feature was built.
- **Proof of Life:** You MUST verify the existence of the actual feature code. Check for the entry point (e.g., `src/app/pages/<FeatureName>Page.tsx`) or the core island component.
- **Provide Summary:** If available, provide the user with a summary of the *verified* features available in the source branch/folder before proceeding.

### Step 2: Architecture Mapping
1.  **Locate Repo Map:** Search for `repo_map.md` within the provided source directory/branch. Use this to understand the high-level architecture and PageRank of the fork's files.
2.  **Search the Graph:** Use the source's own `search_graph.js` (usually in `.agents/ai_agent_instructions/scripts/`) to identify related components, hooks, and services.
    - **Command:** `node <fork_path>/.agents/ai_agent_instructions/scripts/search_graph.js "<feature_keyword>"`
3.  **Identify Core Pillars:** Based on the repo map and graph search, identify:
    - **Entry Point:** The Page component (e.g., `src/app/pages/*Page.tsx`).
    - **Logic Hook:** The custom hook (e.g., `src/app/hooks/use*.ts`).
    - **UI Components:** The islands and sub-components.
    - **Service Layer:** Any new VAPIL or ApiService methods.

## 2. The Transplant Protocol

### Step 1: Mapping
- Create a destination map. Standard locations:
    - `src/app/pages/`
    - `src/app/hooks/<feature_name>/`
    - `src/app/components/<feature_name>/`
    - `src/app/services/vapil/`

### Step 2: Surgical Copy
- Create directories in the destination first.
- Copy files precisely. Maintain file extensions (`.ts` vs `.tsx`).
- Update imports within the copied files to match the destination structure.

### Step 3: Nerve Ending Integration
"Tie the nerve endings" by updating these global files:
1. **Routing (`src/app/App.jsx`):** Import the Page and register the `<Route>`.
2. **Context (`src/app/App.jsx`):** Wrap with any new Providers if the feature requires its own state context.
3. **Navigation (`src/app/utils/shared/SidebarItems.ts`):** Add the tool to the sidebar array with a relevant `react-icons/pi` icon.
4. **Settings (`src/app/utils/settings/VaultToolboxSettings.ts`):** Add the `pageId` to `defaultSettings` and `PageSettingsMetadata` so it can be toggled.
5. **API Facade (`src/app/services/ApiService.js`):** Export wrapper functions for new VAPIL requests.

### Step 4: Dependency Resolution
- Check for missing NPM packages in the fork's `package.json` (e.g., `jszip`, `dagre`, `@xyflow/react`).
- Check for missing `@types`.
- Run `npm run build` to flush out any "implicit any" or missing import errors.

## 3. Verification
- **Build:** `npm run build` must pass.
- **Lint:** `npm run lint` must be clean.
- **Red Baseline:** Run `npm test` to ensure no regressions.
