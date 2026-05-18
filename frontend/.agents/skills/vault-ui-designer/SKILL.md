---
name: vault-ui-designer
description: Expert guide for all Vault Toolbox UI/UX standards, tokens, and layouts.
triggers:
  - ui
  - layout
  - tokens
  - css
  - styling
---

# Vault UI Designer

This skill is the **single source of truth** for the Vault Toolbox UI/UX design system. It defines the architectural patterns, styling standards, and validation criteria for all features.

## 1. Architectural Foundation: The "Nested Pillar" Layout
The application uses a **Nested Pillar** approach to separate the main workspace from contextual tools.

### Outer Layout (Horizontal Split)
Every tool page MUST use a `<Flex>` container with `height: '100%'`:
1.  **Pillar A (Workspace):** A `VStack` with `flex: 1` and `minWidth: 0`. This houses the tool's core components.
2.  **Pillar B (Right Sidebar):** A `Box` with `flex: '0 0 auto'`. This houses the `<ContextualHelpButton>` and any secondary tool icons or panels.

### Inner Layout (Vertical Workspace Stack - Pillar A)
Within Pillar A, the workspace MUST follow this arrangement using a specific `StackStyle`:
1.  **Header Row:** **Outside** the main island container. Contains `<Heading>` (fontSize='2rem', color='veeva_orange_color_mode') and page-level actions. Margin-left: `25px`.
2.  **Main Island:** High-contrast container (`white_color_mode`) with `borderRadius: '8px'` and shadow `0 0 5px rgba(0,0,0,0.25)`. **Width MUST be `calc(100% - 20px)`** with `0px 10px 5px 10px` margins.
3.  **Status Island:** Fixed-height (`42px`) bottom bar (`<VaultInfoIsland>`).

---

## 2. Design Tokens & Styling (VeevaTheme.ts)
### Mandatory Token Usage
Never use hardcoded hex values. All elements MUST use semantic tokens defined in `src/app/utils/shared/VeevaTheme.ts`.

| Key Token Name | Usage |
| :--- | :--- |
| `veeva_light_gray_color_mode` | Workspace Background (Pillar A) |
| `white_color_mode` | Island Background |
| `veeva_orange_color_mode` | Headings, Accents, Tab Indicators |
| `veeva_sunset_red_color_mode` | Destructive Actions / Errors |
| `selection_background_color_mode`| Hover / Selection states |

**The "Veeva-First" Rule:** 
- Consult `VeevaTheme.ts` before applying any style. 
- If a required color is missing, add it to `VeevaTheme.ts` as a new raw token AND a semantic token (with `base` and `_dark` values).

### Depth & Elevation (StackStyle)
The Workspace (Pillar A) `VStack` MUST use this specific style to provide the required depth:
```typescript
const StackStyle: StackProps = {
    height: '100%',
    backgroundColor: 'veeva_light_gray_color_mode',
    flex: 1,
    boxShadow: 'inset -5px 0 8px -8px rgba(0,0,0,0.3), inset 5px 0 8px -8px rgba(0,0,0,0.3)',
    gap: 0,
    minWidth: 0,
};
```

---

## 3. Universal UI Checklist (Validation Standards)
*These points are audited by the `:ui-check` command.*

1.  **Nested Pillars:** Presence of Pillar A (VStack) and Pillar B (Sidebar).
2.  **Stack Elevation:** Pillar A uses the `StackStyle` with inset shadows.
3.  **Horizontal Alignment:** Header and Island widths match (`calc(100% - 20px)` island width).
4.  **Island Margins:** Standardized at `0px 10px 5px 10px`.
5.  **Internal Island Scrolling:** Content (tables) MUST scroll internally; island headers remain sticky.
6.  **Contextual Help:** `<ContextualHelpButton>` is located at the bottom of the right-hand sidebar (Pillar B), NOT the Header Row.
7.  **API Name Visibility:** Labels display API names in brackets (e.g., `Label (api_name__v)`).
8.  **Semantic Dark Mode:** Zero hardcoded hex values; full use of `VeevaTheme.ts` semantic tokens.
9.  **Standard Tab Bar Sizing:** Tab bars are **60px** height with a **3px** solid border.
10. **Tab Trigger Size:** Text MUST be **xl**; Trigger width is **180px**.
11. **Production Protection:** Modifying controls (buttons, toggles) MUST be disabled in Production (`isProductionVault()`) and display a tooltip: *"This feature is not available in Production."*

---

## 4. Standard Page Template (Blueprint)
```jsx
export default function StandardToolPage() {
    return (
        <Flex justify='flex-start' height='100%'>
            {/* Pillar A: Workspace */}
            <VStack {...StackStyle}>
                <ToolHeaderRow />
                <ToolMainIsland />
                <VaultInfoIsland />
            </VStack>

            {/* Pillar B: Sidebar */}
            <Box height='100vh' flex='0 0 auto'>
                <Flex flexDirection='column' height='100%'>
                    {/* Secondary Tool Icons here */}
                    <Spacer />
                    <ContextualHelpButton tooltip='Tool Name' url='...' />
                </Flex>
            </Box>
        </Flex>
    );
}
```
