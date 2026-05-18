---
name: vault-brainstormer
description: Guides the "Brainstorming" and "Socratic Design" phase (Phase 1). Use this to refine requirements and explore multiple implementation paths.
triggers:
  - brainstorm
  - socratic
  - architecture
  - yagni
---

# Vault Brainstormer

This skill is designed to prevent "premature implementation" by forcing a rigorous design exploration before any code is written. It uses a Socratic approach to uncover hidden complexities and enforce YAGNI.

## Socratic Questioning Strategy
When triggered, you MUST ask the user at least 3 deep-dive questions. Examples:
- "What happens if this API returns a 429 rate limit error during this operation?"
- "Is this feature strictly necessary for the core MVP, or is it a 'nice-to-have' that we can skip (YAGNI)?"
- "How does this scale if the user has 10,000 documents instead of 10?"

## Three Paths Methodology
You MUST propose 3 distinct implementation alternatives to the user:

1. **Path A: Minimal (The YAGNI Path):** The simplest, most direct implementation that meets the core requirement with the least code.
2. **Path B: Scalable (The Robust Path):** A more structured approach with advanced error handling, virtualization, and performance optimizations.
3. **Path C: Experimental (The High-Value Path):** A path that explores a novel UI interaction or uses a more advanced API capability (e.g., async polling).

## Output: Brainstorm Summary
End the brainstorming phase by summarizing the user's choices in a brief list:
- **Selected Path:** [A/B/C]
- **Key Refinements:** [Any changes made during Socratic questioning]
- **Discarded Features (YAGNI):** [What we agreed NOT to build]

## Rules to Follow
- **No Implementation:** Never suggest code in this phase. Focus exclusively on intent and architecture.
- **VQL Query Tester:** VQL queries must be exact. You MUST strictly request the user to provide the VQL Query to be used.
    - If you (the agent) suggest a query, ask the user to **prototype it in the Vault Toolbox's VQL Editor** first.
    - Ask the user to provide the exact query string and a sample JSON response that confirms it returns the desired data.
- **Challenge Assumptions:** If a user asks for something that violates Island Architecture, you MUST point it out and suggest an alternative.
- **Wait for Selection:** Do not proceed to the Design phase until the user has explicitly chosen a path.
