# Antai Design

## 1. Purpose

This document describes the current product and interface design of `Antai` as implemented today.

It focuses on the live application structure, not the full historical target-state vision.

Future additions that are not yet in the UI should be tracked in [TASKS.md](/home/kalden/projects/antai/docs/TASKS.md).

## 2. Current Product Character

The implemented app presents `Antai` as:

- a local-first antkeeping workspace
- a project-and-colony management tool
- a structured journal for husbandry records
- a species and care reference
- an optional AI-assisted workflow surface

The experience is currently closer to a practical operations workspace than to a social or community platform.

## 3. Current Information Architecture

The implemented top-level areas are:

- Public Home
- Public Directory
- Auth
- Dashboard
- Projects
- Colonies
- Reminders
- Species
- Swarm Map
- News
- Profile
- AI Assistant pane

Additional task-oriented views currently exist for:

- create/edit colony
- create/edit event
- create/edit reminder
- create/edit map
- create/edit zone
- create/edit automation rule
- add sighting
- create project
- zone detail
- Gemini key setup

## 4. Current Navigation Model

### 4.1 Desktop

The current desktop experience uses:

- a persistent left sidebar for primary navigation
- a shell toolbar for navigation and AI pane toggles
- a main content area for active views
- a right-side AI assistant pane that can be shown or hidden

### 4.2 Mobile

The current mobile experience uses:

- a compact header
- a collapsible navigation pattern
- a dedicated mobile AI toggle

The application is responsive, but it is still fundamentally one SPA shell adapted across screen sizes.

## 5. Current Visual Direction

The current interface emphasizes:

- card-based dashboards
- muted, premium productivity styling
- dense but readable operational views
- a split between browsing content and editing structured records

The design already communicates a more polished product direction than the earlier generic planning docs, especially on the public landing and authenticated shell.

## 6. Current Core Screens

### 6.1 Public Entry

The public experience currently includes:

- a marketing-style landing page
- a public directory of projects and colonies
- public detail pages for selected published entities

### 6.2 Authentication

The auth screen currently supports:

- login
- registration
- newsletter preference capture at signup

Email verification and social sign-in are not currently part of the implemented flow.

### 6.3 Dashboard

The dashboard currently surfaces:

- colony statistics
- urgent care tasks
- recent journal observations
- formicarium condition summaries
- swarm sighting summaries

### 6.4 Projects and Colonies

The authenticated workspace currently supports:

- project grouping for colonies
- colony list browsing
- colony detail tabs
- colony editing
- photo upload and gallery review

### 6.5 Colony Detail

The colony detail view currently includes these operational tabs:

- overview
- journal
- reminders
- maps
- gallery
- sensors
- AI insights

Some tabs already exist as UI and data structures even where external integrations are still shallow.

### 6.6 Species

The species area currently supports:

- species browsing
- species detail views
- markdown-backed care information
- species refresh workflows

### 6.7 News

The news area currently supports:

- configurable feed list management
- refresh/sync workflows
- cached article presentation

### 6.8 AI Assistant

The AI experience currently includes:

- a dedicated assistant pane
- prepared prompt templates
- browser/API/CLI-oriented modes in the UI
- colony-aware prompt composition

This is implemented as an in-app assistant workflow, not as a fully shipped external integration platform.

## 7. Current Non-Implemented Design Areas

The following previously-described design areas are not part of the live product today and should be treated as TODO items:

- video-centric media browsing
- playlist-oriented media UX
- passive TV mode
- mature sensor dashboards backed by real device ingestion
- full automation connector UX
- social/community moderation patterns
- external AI platform integrations as first-class product surfaces

These remain valid future directions, but they are not current design reality.
