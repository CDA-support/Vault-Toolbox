# Developer Naming Conventions & Technical Debt

## Naming Conventions
- **Directories:** `kebab-case` (e.g., `component-editor`).
- **React Components:** `PascalCase` (e.g., `VqlEditorIsland.jsx`).
- **Custom Hooks:** `camelCase` with `use` prefix (e.g., `useVqlQuery.js`).
- **Services & Utils:** `PascalCase` for major domains (`ApiService.js`), `camelCase` for small utils.
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `VAULT_API_VERSION`).
- **Event Handlers:** Prefix with `handle` (internal) or `on` (props).

## Style Standards
- **Chakra UI v3 ONLY.** Never write raw CSS or use Tailwind.
- **TypeScript (TSX/TS) for all new files.** Avoid `any`.
- **Semantic Tokens from VeevaTheme.ts.** Never use hardcoded hex values. Always check `src/app/utils/shared/VeevaTheme.ts` first. If a new color is needed, it must be added there as both a raw and semantic token.
- **Island Architecture.** Adhere to the Nested Pillar layout (Outer Horizontal + Inner Vertical).
- **Mandatory vault-developer-mcp First:** For ANY Vault API endpoint, VQL object/field, MDL command, or SDK detail — call the relevant **vault-developer-mcp** tool BEFORE writing any code or making any design decisions. Never use training knowledge as a substitute.
- **Tool Visibility:** All new tools MUST be accessible via the application menu bar and have an ON/OFF toggle in the Settings page.
- **Mandatory Development Logging:** New APIs MUST include `console.log` statements for debugging until Phase 8. Instruct users to monitor **DevTools > Console (F12)** for real-time feedback during development.

## Key Technical Debts
- **Hybrid JS/TS:** Core services (`ApiService.js`) and many components are still in JS/JSX. Migrate to TS when modifying.
- **React Version:** Potential mismatch between `@types/react` (v19) and library (v18.2).
- **Testing Evolution:** Manual QA is legacy. Vitest TDD is the current mandatory standard for all new logic. Use `vault-unit-tester` to ensure coverage.
- **Bundle Size:** Monaco Editor and heavy libraries affect initial load time.
- **Rate Limiting:** No automated HTTP 429 retry mechanism.
