# Antai Architecture

## 1. Purpose

This document describes the target architecture of `Antai` based on:

- [REQUIREMENTS.md](/home/kalden/projects/antai/REQUIREMENTS.md)
- [SPECIFICATIONS.md](/home/kalden/projects/antai/SPECIFICATIONS.md)
- [DESIGN.md](/home/kalden/projects/antai/DESIGN.md)

The architecture must support:

- simplicity
- low operational burden
- clear maintainability
- multi-device web usage
- LLM interoperability
- future AI and automation extensions

## 2. Architecture Principles

The architecture must favor:

- the smallest reasonable number of moving parts
- simple deployment
- easy local development
- clear module boundaries
- easy backup and restore
- easy GitHub readability

When a simpler architecture can meet the same product goal, it should be preferred.

## 3. High-Level Shape

`Antai` should be structured as a lightweight web application with clearly separated concerns:

- presentation layer
- application layer
- data layer
- integration layer

Recommended runtime shape:

- one primary web application
- one persistent data store
- optional background jobs only where clearly necessary
- optional external AI and automation connectors

## 4. Main Architectural Layers

### 4.1 Presentation Layer

Responsibilities:

- render the web interface
- provide responsive UI for all supported device classes
- support user interaction for all modules
- expose AI, sensor, and automation workflows in the UI

This layer should remain readable and strongly aligned with product modules.

### 4.2 Application Layer

Responsibilities:

- implement business rules
- coordinate user workflows
- validate operations
- connect UI actions to stored data
- orchestrate AI and connector interactions

This layer should be organized by domain modules rather than by low-level utilities only.

### 4.3 Data Layer

Responsibilities:

- persist user-owned data
- support retrieval for UI and LLM access
- store colony history, reminders, species knowledge, AI outputs, and sensor-related context

This layer must keep the data model understandable and exportable.

### 4.4 Integration Layer

Responsibilities:

- connect to AI providers or local AI tools
- connect to home automation tools
- expose readable data to LLM-compatible workflows

This layer should remain optional and modular so the core product still works without every integration enabled.

## 5. Core Domains

The architecture must include the following core domains:

- auth
- users
- profile
- colonies
- colony events
- reminders
- species
- care sheets
- media
- colony maps
- colony zones
- AI assistant
- AI image analysis
- insights
- sensors
- automation
- LLM integrations
- swarm sightings
- news/content

Each domain should own its own business rules and primary data transformations.

## 6. Recommended Repository Structure

The repository should remain easy to browse on GitHub.

Recommended top-level structure:

```text
/app
/docs
/public
/scripts
/tests
README.md
REQUIREMENTS.md
SPECIFICATIONS.md
DESIGN.md
ARCHITECTURE.md
ROADMAP.md
USER_STORIES.md
TASKS.md
```

Recommended application structure:

```text
/app
  /ui
  /pages
  /features
    /auth
    /profile
    /dashboard
    /colonies
    /journal
    /reminders
    /species
    /media
    /ai
    /sensors
    /automation
    /llm
    /swarm
    /news
  /shared
  /data
  /integrations
```

The exact folder names may vary, but the structure must stay:

- predictable
- domain-oriented
- easy to navigate

## 7. Frontend Architecture

The frontend should be:

- component-based
- module-oriented
- responsive by default
- easy to test

The frontend should separate:

- route-level screens
- reusable UI components
- domain-specific feature components
- shared layout and navigation components
- client-side state logic

Frontend state should be kept simple.

Prefer:

- local state where possible
- feature-scoped state where needed
- global state only for truly global concerns

## 8. Backend / Application Service Architecture

The application service layer should expose clear feature-oriented services for:

- account operations
- colony operations
- journal operations
- reminder operations
- species content
- AI orchestration
- sensor ingestion and retrieval
- automation mapping
- LLM-readable data retrieval
- public/community data where enabled

Service contracts should be simple and explicit.

Business logic should not be hidden in random utility code or only inside UI handlers.

## 9. Data Architecture

The data model must support at least:

- user
- colony
- colony event
- reminder
- species
- care sheet
- photo/media item
- colony map
- colony zone
- AI summary
- AI image analysis result
- sensor source
- sensor reading
- automation connector
- swarm sighting
- article/content item

The data model should be:

- understandable
- easy to back up
- easy to inspect
- easy to export for LLM use

## 10. AI Architecture

The AI architecture must support multiple possible execution paths:

- remote API-based LLM provider
- tool-based LLM workflow
- future local or semi-local AI workflows if desired

The architecture should isolate:

- prompt/context building
- provider/tool selection
- response normalization
- storage of saved outputs

AI output should be treated as:

- generated assistance
- never a replacement for core source data

The system must preserve the underlying human-entered and system-collected colony data separately from AI-generated outputs.

## 11. Image Analysis Architecture

The image analysis flow should support:

- upload
- image storage reference
- AI analysis request
- analysis result storage
- later retrieval in UI and LLM workflows

The media architecture should also support:

- gallery-oriented retrieval
- playlist-oriented retrieval for videos
- zone-linked retrieval

The architecture should allow multiple image-analysis tasks over time without rewriting the whole media model.

## 12. Sensor and Automation Architecture

The architecture must separate:

- sensor sources
- sensor readings
- colony-to-sensor mapping
- zone-to-sensor mapping
- automation connector definitions
- automation rules or control mappings

Sensor history must be stored so it can be:

- reviewed in the UI
- used by AI logic
- exposed to LLM workflows

Connector-specific logic should remain isolated from the core colony domain.

This keeps the product usable even without any smart-home connection.

## 13. LLM Integration Architecture

The system must support data access patterns that work for:

- web UI
- graphical conversational integrations
- CLI-driven LLM workflows

This means the architecture should expose a stable, readable access layer for:

- colony summaries
- colony history
- reminders
- species/care content
- AI outputs
- sensor and automation context
- colony map and zone context

Important product data must not exist only as visual UI state.

## 14. Content Architecture

Species sheets, educational content, and future news items should be handled as structured content domains.

This content should remain:

- easy to edit
- easy to render in the UI
- easy to expose to AI or LLM-assisted reading

Colony maps and zone-linked media should follow the same clarity principle.

## 15. Deployment Architecture

The deployment architecture must respect the simplicity requirement.

Preferred characteristics:

- lightweight web serving
- minimal services
- minimal setup steps
- easy file-based deployment where feasible
- easy upgrade path

The architecture should avoid unnecessary infrastructure coupling.

## 16. Security Architecture Direction

Even while staying simple, the architecture must provide clear boundaries for:

- authentication
- private user data access
- integration permissions
- stored AI outputs
- connector credentials when used

Security design must remain understandable and not overcomplicate the product structure.

## 17. Testing Architecture

Testing should be organized by confidence level:

- unit tests for core business logic
- feature tests for major workflows
- integration tests for AI and connector boundaries where practical
- UI tests for core screens and responsive behavior

The testing approach should stay proportionate and simple.

## 18. Maintainability Rules

The architecture should remain maintainable by:

- keeping modules small and clear
- avoiding hidden coupling
- preferring explicit dependencies
- documenting domain boundaries
- keeping configuration minimal and understandable

## 19. Architecture Acceptance Direction

The architecture satisfies this document when:

- the core product can run with low operational burden
- modules map clearly to product features
- data remains readable in UI and LLM contexts
- AI and automation integrations remain optional extensions rather than architectural anchors
- the repository remains easy to understand on GitHub
- a new maintainer can quickly identify where each major feature lives
