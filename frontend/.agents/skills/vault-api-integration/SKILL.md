---
name: vault-api-integration
description: Guides Vault API requests, VAPIL services, and ApiService facade patterns.
triggers:
  - api
  - vapil
  - vql
  - fetch
  - authentication
---

# Vault API Integration

This skill provides the procedural knowledge required to integrate with Veeva Vault APIs within the Vault Toolbox. It ensures consistency across the VAPIL service layer and the `ApiService` facade.
## Core API Architecture & Schema
The application interfaces with **Veeva Vault REST APIs** via a facade pattern centered in `src/app/services/ApiService.js`.

### API Strategy Check (VAPIL vs. Feature)
When a new Vault API is needed, you MUST determine its location:
- **VAPIL Entry (Default):** If the API is potentially reusable by other tools (e.g., Object metadata, Querying, Document info), add it to `src/app/services/vapil/` and expose it via `ApiService.js`.
- **Feature Encapsulation (Exception):** Only encapsulate an API call within a feature folder if it is extremely specific to that tool and has zero utility elsewhere. **Prefer VAPIL by default.**

### ApiService Return Patterns
...

Always check `response.queryResponse.responseStatus` before accessing data.
- **Success:** `{ queryResponse: { responseStatus: "SUCCESS", data: [...] }, responseTelemetry: { ... } }`
- **Error:** `{ queryResponse: { responseStatus: "FAILURE", errors: [...] } }`

### Telemetry & Normalization
`ApiService.js` intercepts responses to calculate `responseSizeInKB` and `executionTimeInMS`. It also normalizes all errors into a standard format:
```javascript
{ responseStatus: 'FAILURE', errors: [{ type: 'ErrorType', message: 'Readable message' }] }
```

## Authentication Flow (Manifest V3)
1. **Login:** Supports Integrated Session (detection) and Basic Auth.
2. **Storage:** Session ID is stored in an **HTTP-only Chrome cookie** (`vaultToolboxSessionId`) scoped to the `vaultDNS`.
3. **Authorization:** Intercepts requests to query the cookie API (`chrome.cookies.get`) and inject the `Authorization` header.
4. **Keep-Alive:** Uses `useVaultSessionKeepAlive.ts` to periodically ping the `/keep-alive` endpoint.

## Rules to Follow
- **Mandatory vault-developer-mcp Reference:** You **MUST ALWAYS** and **ONLY** reference the **vault-developer-mcp** tools when looking up information about Vault APIs, endpoints, VQL (Vault Query Language), MDL, or Vault Java SDK. Do not use general web search or internal assumptions for these technical details.
- **Verify API Responses:** For any new Vault API endpoints, first use the **vault-developer-mcp** to retrieve the official documentation. Then, ask the user for the **exact endpoint, sample payload, and sample response** (from their specific Vault, Postman, or a previous run) to confirm the implementation matches their environment. Never assume the structure of the request or response.
- **VQL Error Handling:** When executing VQL queries, the implementation **MUST** explicitly check for `responseStatus: 'FAILURE'` to handle errors. Responses with `responseStatus: 'SUCCESS'` or `responseStatus: 'WARNING'` MUST be accepted as successful executions, though warnings should be logged for development visibility.
- **Async API Job Polling:** If an API is asynchronous and returns a `job_id__sys` (or similar), the implementation MUST:
    1.  **Poll Interval:** Check the job status every **10 seconds**.
    2.  **User Feedback:** Display a clear message informing the user that the system is "Waiting on results..." while polling.
    3.  **Completion:** Once the job finishes, display a definitive success or failure message based on the final job status.
- **Mandatory Development Logging:** New APIs MUST include `console.log` statements for debugging during development. You MUST instruct the user to check **DevTools > Console (F12)** for real-time feedback.
- **Logging Cleanup:** In **Phase 8**, you MUST ask the user if the development logging should be removed before finalization.
- **No Direct Fetch:** Never use `window.fetch` directly for Vault APIs; always use the `request` wrapper in `VaultRequest.js`.
- **Credentials:** Always set `credentials: 'omit'` (handled by the `request` wrapper) to avoid conflicting with browser-managed Vault sessions.
- **Telemetry:** Always include telemetry for methods that return data to the UI (e.g., Query, Metadata).
- **DNS Verification:** For login/auth tasks, verify the `vaultDNS` against the response endpoint to prevent cross-site session leakage.
- **Production Guard-Rails:** For any method that modifies Vault (POST/PUT/DELETE for non-retrieve endpoints), the implementation MUST include a check for `isProductionVault()`. If true, the operation MUST be blocked or restricted to non-production environments to prevent accidental data loss or configuration corruption. Read-only methods (GET, VQL SELECT) are exempt from this block.

