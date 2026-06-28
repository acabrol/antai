# Antai Architecture

## 1. Purpose

This document describes the current implemented architecture of `Antai`.

It reflects the code currently present in:

- `src/server.js`
- `public/index.html`
- `public/app.js`
- `data/`

Planned but not yet implemented areas belong in [TASKS.md](/home/kalden/projects/antai/docs/TASKS.md).

## 2. Current Runtime Shape

`Antai` is currently a small local-first web application with:

- one Node.js HTTP server
- one static single-page frontend
- one repository-backed datastore under `data/`
- optional AI entry points exposed through the UI

There is no separate database, background worker, or dedicated API framework in the current implementation.

## 3. Main Layers

### 3.1 Server Layer

The backend lives in `src/server.js` and currently handles:

- static asset serving from `public/`
- JSON API endpoints under `/api/`
- file-backed persistence in `data/`
- markdown front matter parsing and writing
- simple auth record management
- species/news bootstrap and refresh helpers
- CLI proxying for local AI agent commands

### 3.2 Client Layer

The frontend is a vanilla JavaScript SPA defined by:

- `public/index.html`
- `public/app.js`
- `public/styles.css`

The client currently handles:

- view routing inside one page
- rendering project, colony, reminder, species, news, and profile screens
- local UI state
- form submission and API calls
- AI assistant panel interactions

### 3.3 Data Layer

Persistent data is stored in the repository under `data/`.

Current data sources include:

- `data/app/users`
- `data/app/sightings`
- `data/app/connectors`
- `data/projects`
- `data/species`
- `data/news`
- `data/prompts`

The application stores most user-managed records as markdown files with front matter plus optional asset files for uploaded colony photos.

## 4. Current Feature Domains

The implemented architecture currently supports these main domains:

- authentication and profile
- projects
- colonies
- colony journal/events
- reminders
- species reference
- colony maps and zones
- colony photo gallery
- swarm sightings
- news feeds and cached articles
- public project and colony pages
- AI assistant and prepared prompts

## 5. Current API Surface

The server currently exposes these main endpoints:

- `GET /api/health`
- `GET /api/bootstrap`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/profile`
- `POST /api/settings/gemini`
- `POST /api/data/write`
- `POST /api/data/delete`
- `POST /api/species/refresh`
- `GET/POST /api/news/feeds`
- `POST /api/news/refresh`
- `POST /api/colonies/:id/photos`
- `POST /api/cli`

These endpoints are intentionally simple and map closely to the current SPA behavior.

## 6. Persistence Model

The current persistence strategy favors inspectable files over hidden storage.

Key characteristics:

- user and application data stays in the repository tree
- records are primarily markdown files with front matter
- uploaded colony photos are written into colony folders
- species and prompt content remain readable without the app running

This keeps backup, manual inspection, and Git-based review straightforward.

## 7. Deployment Model

`Antai` currently supports two primary run modes:

- direct local Node execution
- Docker Compose for containerized local deployment

Relevant entry points:

- `make run`
- `make up`
- `make deploy`

## 8. Current Architectural Constraints

The current codebase is intentionally optimized for:

- low setup overhead
- easy local iteration
- readable data files
- minimal infrastructure
- straightforward debugging

The tradeoff is that application logic is still centralized in a small number of files, especially `src/server.js` and `public/app.js`.

## 9. Known Gaps

The following items are not part of the implemented architecture yet and should be treated as TODO work rather than current capabilities:

- email verification
- social login
- richer role or moderation systems
- video/media playlist support
- real sensor ingestion pipelines
- real home automation integrations
- external LLM integration surfaces beyond the current in-app and CLI-oriented flows
- passive TV/dashboard mode

See [TASKS.md](/home/kalden/projects/antai/docs/TASKS.md) for tracking.
