# Codebase Knowledge Graph & AI Workflow

## Overview
This project uses a custom **Knowledge Graph** to map dependencies between files, components, functions, and hooks. This allows for precise context retrieval without reading every file in the `src` directory.

The graph is generated automatically during `npm run dev` and `npm run build` and saved to:
`.agents/ai_agent_instructions/codebase_graph.json`

## AI Agent Instructions
When you are asked to fix a bug, refactor code, or explain architecture, **do not guess** file relationships. Follow this workflow:

1.  **Consult the Graph:**
    Ask the user to run the search script to find relevant connections:
    `node .agents/ai_agent_instructions/scripts/search_graph.js "ComponentName"`
    
    *Or, if the user provides the `codebase_graph.json` file, parse it to find:*
    * **Inbound Edges:** Who calls this component? (Impact analysis)
    * **Outbound Edges:** What does this component rely on? (Dependency analysis)

2.  **Request Specific Files:**
    Instead of asking for "all files," request only the files identified in step 1.

## Developer Instructions

### Generating the Graph
The graph is rebuilt automatically on dev/build. To manually rebuild it:
```bash
npm run graph:gen
```