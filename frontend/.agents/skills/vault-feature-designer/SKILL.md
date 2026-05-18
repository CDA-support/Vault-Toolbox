---
name: vault-feature-designer
description: Guides the technical design phase (Phase 2). Use this to create comprehensive design documents after brainstorming.
triggers:
  - design
  - architecture
  - dod
  - definition of done
---

# Vault Feature Designer (Phase 2)

This skill enforces a rigorous design-first workflow. No implementation plan or code should be created until the technical design is fully approved by the user.

## Design Document Lifecycle

### 1. Pre-requisite: Brainstorm Approval
You MUST have completed the brainstorming phase (`vault-brainstormer`) and have a selected path (Minimal, Scalable, or Experimental).

### 2. Design Creation (`<name>_design.md`)
Create the design document in `.agents/features/[feature_name]/`. It MUST contain:
- **Feature Name and Goal:** Summary of objective.
- **User Story:** Agile format.
- **Selected Path Details:** Why this path was chosen and its trade-offs.
- **Affected Architecture:** Precise list of Files, Components, Hooks, and Services.
- **VQL & API Specifications:** Exact queries (provided/verified by the user via the VQL Editor), API endpoints, and the **expected payload and response** for all calls (based on samples provided by the user).
- **Definition of Done (DoD):** Itemized list of functional and quality criteria.
- **Mandatory DoD Items:**
    1. Tool MUST be launchable from the application menu bar.
    2. Tool MUST have an ON/OFF toggle in the Settings page.
    3. **Production Protection:** Modifying operations MUST be disabled/blocked in Production environments (using `isProductionVault()`), with a *"This feature is not available in Production."* message displayed to the user. Read-only operations remain enabled.

### 3. User Review & Approval
Present the design to the user. You MUST obtain explicit approval of the **DoD** before proceeding to the Implementation Plan (Phase 3).

## Rules to Follow
- **Strict Approval Gate:** Never begin Phase 3 (Implementation Plan) until the DoD is approved.
- **Surgical Design:** Ensure the "Affected Architecture" is precise to avoid scope creep.
- **Refer to Experts:** Use `vault-ui-designer` for layout patterns and `vault-api-integration` for API protocols.
