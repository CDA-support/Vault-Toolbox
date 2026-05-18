---
name: vault-unit-tester
description: Enforces the TDD (Red-Green-Refactor) mandate. Use during implementation to ensure logic is verified by tests.
triggers:
  - test
  - vitest
  - tdd
  - red-green-refactor
---

# Vault Unit Tester (TDD Mandate)

This skill addresses the project's technical debt by enforcing a mandatory Test-First cycle. No production code should exist without a preceding failing test.

## Core TDD Workflow (Red-Green-Refactor)

### Testing Evolution (Standard Update)
**Mandatory Standard:** Manual QA is legacy. Vitest TDD is the current mandatory standard for all new logic. While existing code may lack tests, every new feature or bug fix MUST include a Vitest suite.

### Step 1: RED (Write the Test First)
Identify the logic being added or fixed.
- Create or update the test file: `[FileName].test.ts` or `[FileName].test.tsx`.
- Write a failing test that accurately describes the new behavior or the bug reproduction.
- **Verification:** Run `npm test` and confirm the test **fails** as expected.

### Step 2: GREEN (Minimal Pass)
Write the **minimal amount of production code** required to make the test pass.
- Do not refactor or add "extra" logic yet.
- **Verification:** Run `npm test` and confirm the test **passes**.

### Step 3: REFACTOR (Structural Refinement)
Clean up the implementation while keeping the test green.
- Align with Island Architecture.
- Apply semantic tokens.
- Consolidate logic into clean abstractions.
- **Verification:** Run `npm test` to ensure the behavior remains correct.

## Framework Initialization (Vitest)
If `package.json` lacks testing dependencies, you MUST:
- Propose installing `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom`.
- Propose adding a `test` script: `"test": "vitest run"`.

## Mocking Rules
- **API Mocking:** Always mock the Veeva Vault API responses.
- **Chrome Context:** Always mock `chrome.cookies` and `sessionStorage`.
- **Global Provider Mocking:** Wrap hooks/components in the appropriate `AuthContext` or `SettingsContext` mocks during tests.

## Rules to Follow
- **Evidence over Claims:** Never claim a task is "Done" until the corresponding test is in the codebase and passing.
- **No Test, No Code:** If you write implementation code without a test first, it is a violation of the `AGENTS.md` mandate.
- **Surgical Tests:** Keep tests focused on one behavioral change at a time.
