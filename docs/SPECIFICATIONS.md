# Antai Specifications

## 1. Purpose

This document defines the current implemented scope of `Antai`.

It should be read as a description of what the application does today. Items not yet implemented are tracked in [TASKS.md](/home/kalden/projects/antai/docs/TASKS.md).

## 2. Current Product Definition

`Antai` is currently a local-first antkeeping web application that allows users to:

- register and log in with local credentials
- manage projects and colonies
- record colony history and reminders
- browse species guidance
- manage colony maps and zones
- upload colony photos
- record swarm sightings
- browse and refresh news content
- publish and browse public project/colony pages
- use in-app AI prompt and assistant workflows

## 3. Current In-Scope Modules

The current codebase implements these main modules:

- Authentication
- Profile
- Dashboard
- Projects
- Colonies
- Colony Journal
- Reminders
- Species
- Photos
- Colony Maps and Zones
- Swarm Sightings
- News and Educational Content
- AI Assistant

## 4. Current Delivery Constraints

The implemented project currently favors:

- one deployable service
- file-based persistence
- minimal infrastructure
- readable repository data
- local development simplicity

The project currently runs with:

- Node.js `>=22`
- direct server execution or Docker Compose

## 5. User Roles

### 5.1 Guest

Current guest capabilities:

- view the public landing page
- browse the public directory
- open public project and colony pages
- register
- log in

### 5.2 Authenticated User

Current authenticated capabilities:

- manage profile data
- manage projects
- manage colonies
- add and edit colony events
- manage reminders
- upload colony photos
- manage maps and zones
- browse species information
- record sightings
- manage news feeds
- use the AI assistant pane

## 6. Current Functional Behavior

### 6.1 Authentication

Implemented:

- local registration
- local login
- logout
- username/email/password capture
- newsletter preference capture

Not currently implemented:

- email verification
- social login

### 6.2 Profile

Implemented:

- profile display
- profile update flow
- basic account preference editing

### 6.3 Projects

Implemented:

- create project
- browse project list
- group colonies by project
- expose public project pages where relevant

### 6.4 Colonies

Implemented:

- create and edit colonies
- list colonies
- colony detail workspace
- colony status and summary fields
- species association

### 6.5 Journal

Implemented:

- colony event creation
- event editing
- timeline rendering
- dashboard activity summaries

### 6.6 Reminders

Implemented:

- reminder creation
- reminder editing
- reminder completion
- snooze behavior
- overdue and urgent views

### 6.7 Species

Implemented:

- local markdown-backed species catalog
- species detail rendering
- species refresh workflows using external species data sources

### 6.8 Photos

Implemented:

- colony photo upload
- gallery display
- primary photo selection workflows in colony views

Not currently implemented:

- video upload
- playlist support

### 6.9 Maps and Zones

Implemented:

- map creation and editing
- zone creation and editing
- zone detail view
- colony-linked map browsing

### 6.10 Swarm Sightings

Implemented:

- sighting creation
- sightings list/map-style presentation

### 6.11 News

Implemented:

- feed configuration
- refresh/sync flow
- cached article display

### 6.12 AI Assistant

Implemented:

- prepared prompt library
- colony-aware prompt rendering
- in-app AI pane
- Gemini key storage workflow
- CLI proxy endpoint for local agent execution

Not currently implemented as first-class product capabilities:

- full external ChatGPT integration
- full external Claude integration
- full external Gemini integration beyond the current key and prompt workflow

## 7. Current API Expectations

The current frontend depends on these server capabilities:

- bootstrap all core data on load
- write and delete structured records
- upload colony photos
- manage auth and profile
- manage news feeds and refreshes
- trigger species refresh
- proxy supported CLI AI commands

## 8. Deferred Items

These items should be treated as TODO work, not current system behavior:

- email verification
- social login
- video media workflows
- richer sensor ingestion and history pipelines
- production-ready automation connectors
- cross-platform external LLM integrations
- advanced moderation and community roles
- passive TV/dashboard mode
