# Project Foundation Document

## 🤖 New to AI-Driven Development?
If this is your first time working with an AI agent in a high-rigor project, here are some behaviors you might see:

### 1. What is "Plan Mode"?
Sometimes I will enter **Plan Mode**. This is a "read-only" state where I am forbidden from editing files. I use this to research the codebase, map out dependencies, and ensure a safe design before I touch any code. Think of it as me "stopping to think" before I "start to build."

### 2. What are "Sub-agents"?
For complex tasks, I might call a **Sub-agent** (like `generalist` or `codebase_investigator`). These are specialized agents that handle the heavy lifting of reading many files or running complex searches. They return a summary to me, which keeps our main conversation fast and focused.

### 3. Why the 8-Phase Lifecycle?
We follow a strict 8-phase process (Brainstorm -> Design -> Plan -> ToDo -> TDD -> Review -> Testing -> Finalize). This might feel slow at first, but it ensures that every line of code is **tested**, **well-designed**, and **maintainable**. We value "Evidence over Claims."

### 4. What are "Speak Modes"?
I support token-efficient communication modes (`rocky`, `signal`, `caveman`) to maintain long session histories. When a mode is active, I will use high-density notation or telegraphic compression for all conversational text, while keeping technical output (code, paths, logs) exact. Toggle these using the **`:speakmode`** command.

**Ready to start?** Type **`:tutorial`** for a guided walkthrough with an example feature.

**Project Title:** Vault Toolbox

**Description:**
Vault Toolbox is a Chrome Extension (Manifest V3) designed specifically for Veeva Vault developers and administrators. It acts as an integrated development environment within the browser, providing a suite of advanced tools to interact directly with Vault APIs and metadata. By operating within an authenticated session, it streamlines workflows that are typically cumbersome or require external scripting.

The core features include:

* **Component Editor:** An interface with Monaco Editor to view, fetch, and deploy MDL (Metadata Definition Language) component configurations.
* **VQL Editor:** A robust query editor for executing Vault Query Language (VQL) commands, featuring a visual query builder, query history, and CSV export capabilities.
* **Data Tools:** Utilities to initiate asynchronous data jobs, such as counting or deleting Vault objects and documents.
* **File Browser:** A file manager interface to explore, upload, and download files from the Vault File Staging area and the Direct Data API.
* **Data Navigator:** A powerful record inspector that parses Vault IDs and URLs, queries their full metadata, and presents it in a searchable, tabular format with deep links to related references and the Vault Admin UI.

### Modular Features
In addition to the core suite, the project may have modular tools specific to this branch/workspace only. Detailed requirements and technical designs for these tools are maintained independently in the `.agents/features/` directory.

## Tech Stack List

The project leverages a modern, component-driven frontend architecture, heavily utilizing React and ecosystem libraries.

**Core Frameworks & Libraries:**

* **React (v18.2):** The core UI library.
* **React Router DOM (v7.1):** For handling client-side routing within the extension.
* **TypeScript / JavaScript:** The primary programming languages.

**UI & Styling:**

* **Chakra UI (v3.13):** The foundational component library used for layout, typography, and interactive UI elements.
* **Emotion:** Used internally by Chakra UI for CSS-in-JS styling.
* **React Icons (v5.5):** For scalable vector icons used throughout the interface.

**Data Grids & Tree Views:**

* **TanStack Table (v8.21):** Used for building complex, sortable, and filterable data grids (e.g., in Data Navigator).
* **TanStack Virtual (v3.13):** Used for windowing/virtualizing large datasets in tables to ensure high performance (e.g., File Staging lists).
* **React Complex Tree (v2.4):** Used for rendering nested folder structures in the File Browser and Component Editor.

**Code Editing:**

* **Monaco Editor (v0.52):** The code editor that powers the VQL and MDL text areas, complete with custom syntax highlighting themes.

**Build Tools & Environment:**

* **Webpack (v5.97) & Webpack CLI:** Used to bundle the application assets for the Chrome Extension environment.
* **Babel (v7.26):** For transpiling modern JavaScript and React JSX.
* **ESLint (v9.21):** For code quality and linting.
* **Chrome Extensions API (Manifest V3):** For browser integration, tab management, and cookie handling.

## Prerequisites

To build and run this project locally, you will need the following installed on your machine:

* **Node.js:** A modern active LTS version (v18+ is recommended).
* **npm:** Node package manager (comes installed with Node.js).
* **Google Chrome:** To load and test the unpacked extension.
* **Veeva Vault Access:** Credentials (username/password) or an active session for a Veeva Vault environment (Sandbox, Production, or Dev) to utilize the extension's features.

## Installation and Setup

Follow these steps to set up the development environment and load the extension into Chrome:

1. **Install Dependencies:**
Navigate to the root directory of the project and run:
```bash
npm install

```


2. **Configure Environment Variables:**
Create a `.env` file in the root directory (refer to the *Environment Variables* section below).
3. **Build the Project:**
To build the project for development (which watches for changes and generates inline source maps):
```bash
npm run dev

```


To create a production build:
```bash
npm run build

```


*These commands will compile the React code and output the extension files into a `dist/` directory.*
4. **Load the Extension in Chrome:**
* Open Google Chrome and navigate to `chrome://extensions/`.
* Enable **"Developer mode"** by toggling the switch in the top right corner.
* Click the **"Load unpacked"** button.
* Select the newly generated `dist/` folder in your project directory.
* The Vault Toolbox extension will now appear in your extensions list and is ready to use.



## Environment Variables

The application relies on a `.env` file for configuration, which is loaded via `dotenv` during the Webpack build process.

Based on the `ApiService.js` implementation, the following environment variable is required:

* `DEVELOPER_TOOLBOX_LAMBDA_URL`
* **Description:** The URL endpoint for the AWS Lambda backend function. This serverless function is invoked to handle asynchronous "Data Tools" jobs, such as `COUNT_DATA` and `DELETE_DATA`.
* **Example:** `DEVELOPER_TOOLBOX_LAMBDA_URL=https://your-api-gateway-id.execute-api.region.amazonaws.com/prod/toolbox`
