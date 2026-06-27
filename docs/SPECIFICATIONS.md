# Antai Specifications

## 1. Purpose

This document translates [REQUIREMENTS.md](/home/kalden/projects/antai/REQUIREMENTS.md) into concrete development specifications for the `Antai` application.

It defines:

- application scope
- product modules
- core data domains
- interface structure
- user workflows
- AI behaviors
- automation and sensor integration behavior
- LLM interoperability behavior
- installation and maintainability constraints

This document is intentionally implementation-aware, but it should still preserve the simplicity goals of the project.

## 2. Product Definition

`Antai` is an antkeeping application that allows users to:

- manage one or more colonies
- record colony history and observations
- manage reminders and care routines
- consult species and care information
- analyze colony information with AI
- analyze colony photos with AI
- connect nest sensors and home automation tools
- access the same useful data from the web interface and LLM-based workflows

## 3. Scope

### 3.1 In Scope for First Deliverable

- account creation and authentication
- profile management
- colony management
- colony journal and timeline
- reminders
- species and care sheets
- dashboard
- photo management
- colony maps and zone definition
- responsive web interface
- simple install/update model

### 3.2 In Scope for Extended Deliverables

- AI colony assistant
- AI image analysis
- smart colony insights
- sensor monitoring
- home automation connectors
- LLM integrations
- swarm map
- news and educational content
- community-oriented features

## 4. Simplicity and Deployment Constraints

The product must be designed so that installation, update, and management are as simple as possible.

The preferred deployment target is:

- a lightweight web application
- minimal setup
- minimal operational burden
- usable from a browser after files are placed in a target folder or similarly simple environment

Development decisions must favor:

- minimal moving parts
- minimal required services
- minimal required configuration
- simple upgrade paths
- simple backup and restore

The codebase must be:

- easy to browse on GitHub
- clearly organized
- easy to onboard into
- easy to maintain by a small team or a single maintainer

## 5. Application Surfaces

`Antai` must expose the product through the following surfaces:

- `Antai` web interface
- LLM-compatible integration surface for graphical conversational tools
- LLM-compatible integration surface for CLI use

All primary business data must be accessible from:

- the `Antai` web interface
- LLM CLI workflows
- conversational AI integrations where enabled

## 6. User Roles

### 6.1 Guest

Can:

- view public landing content
- view public educational content if published publicly
- create an account
- log in

### 6.2 Authenticated User

Can:

- manage own profile
- manage own colonies
- manage own reminders
- access species and care sheets
- use AI features where enabled
- connect personal sensor or automation integrations where enabled
- access own data through supported LLM integrations

### 6.3 Future Community/Moderation Roles

Reserved for:

- curation of public content
- moderation of sightings
- publication of news or educational material

This role family should not complicate the first deliverable.

## 7. Functional Modules

The product must be structured around the following modules:

- Authentication
- Profile
- Dashboard
- Colonies
- Colony Journal
- Reminders
- Species and Care Sheets
- Photos and Media
- Colony Maps
- AI Assistant
- AI Image Analysis
- Smart Insights
- Sensors and Environment
- Automation Connectors
- LLM Integrations
- Swarm Map
- News and Educational Content

## 8. Module Specifications

### 8.1 Authentication Module

#### Responsibilities

- account creation
- login
- logout
- email verification
- optional newsletter preference
- optional social login

#### Required user actions

- create account with standard form
- verify account
- sign in with credentials
- sign out
- view authentication state

#### Minimum fields

- username
- email
- password
- newsletter preference

#### Resulting behaviors

- verified account becomes usable
- unauthenticated users cannot access private colony data

### 8.2 Profile Module

#### Responsibilities

- display user profile
- show user preferences
- surface linked features such as newsletter or future integrations

#### Required user actions

- view profile
- edit profile basics
- review account status

### 8.3 Dashboard Module

#### Responsibilities

- provide a single clear overview
- direct the user toward urgent or useful next actions

#### Required content

- colony summary
- reminder summary
- overdue tasks
- recent activity
- quick links to species content
- quick link into AI assistant

#### Optional future content

- sensor alerts
- swarm alerts
- insight highlights
- news highlights

### 8.4 Colony Module

#### Responsibilities

- create, update, archive, browse, and inspect colonies

#### Required colony fields

- colony name
- species reference or free-text species
- queen count
- acquisition or founding date
- status
- notes

#### Recommended additional fields

- worker count
- brood presence
- food preferences
- setup notes
- activity notes

#### Required user actions

- create colony
- edit colony
- archive colony
- browse all colonies
- open colony details

#### Colony list requirements

The list must allow users to quickly understand:

- colony name
- species
- current status
- recent activity or reminder state

### 8.5 Colony Journal Module

#### Responsibilities

- maintain chronological colony history

#### Required event fields

- linked colony
- event date/time
- event type
- note text
- optional photos

#### Supported event types

- feeding
- cleaning
- observation
- health issue
- migration or move
- worker count update
- brood update
- setup change

#### Required user actions

- add event
- edit event
- browse events chronologically
- filter events
- search events

### 8.6 Reminder Module

#### Responsibilities

- manage care tasks and notifications

#### Required reminder fields

- title or action label
- optional linked colony
- due date/time
- repeat rule
- note
- state

#### Required states

- pending
- completed
- overdue
- snoozed

#### Required user actions

- create reminder
- edit reminder
- complete reminder
- snooze reminder
- browse reminders

### 8.7 Species and Care Sheet Module

#### Responsibilities

- provide consultable species knowledge

#### Required species content fields

- species name
- optional common name
- origin or region
- founding type
- expected temperature
- expected humidity
- feeding advice
- temperament or aggression
- growth expectations
- practical notes

#### Required user actions

- browse species
- search species
- open species page
- save or favorite species page

#### Special case support

- unknown species
- genus-level identification
- species-group fallback

### 8.8 Photos and Media Module

#### Responsibilities

- attach photos to colonies and events
- attach videos to colonies and events
- preserve visual history
- provide image sources for AI analysis

#### Required user actions

- upload colony photo
- upload colony video
- upload event photo
- upload event video
- download colony photo
- download colony video
- download event photo
- download event video
- view photo timeline
- open image in detail
- browse galleries
- browse or consume playlists

### 8.9 Colony Maps Module

#### Responsibilities

- let users model the physical nest or setup as one or more maps
- let users define observed or monitored zones
- link media, sensors, and actions to zones

#### Required map capabilities

- create map for a colony
- edit map
- define zones inside the map
- place zones visually
- name zones
- describe zones

#### Required zone capabilities

- link a gallery to a zone
- link a playlist to a zone
- link photos or videos to a zone
- link sensor values to a zone
- link domotic actions or status to a zone
- view history of a zone over time

#### Required user actions

- create map
- add zone
- edit zone
- open zone detail
- inspect zone-linked media
- inspect zone-linked sensor history

### 8.10 AI Assistant Module

#### Responsibilities

- answer colony-specific questions
- summarize colony history
- recommend next actions
- detect possible issues from stored context

#### Input sources

- colony fields
- colony journal
- reminders
- species content
- photos
- colony maps and zones
- sensor history when connected

#### Required interaction modes

- web chat-like interface
- structured output for LLM integrations
- callable workflow for CLI-based use

#### Required output types

- summary
- recommendation
- warning
- explanation
- action checklist

### 8.11 AI Image Analysis Module

#### Responsibilities

- analyze colony photos

#### Required supported tasks

- species recognition suggestion
- uncertain-species assistance
- visible ant count estimation
- brood presence detection
- queen visibility suggestion when possible
- setup issue suggestion

#### Required result qualities

- human-readable summary
- structured results that can also be consumed outside the web UI
- non-destructive storage of analysis results when saved

### 8.12 Smart Insights Module

#### Responsibilities

- derive useful patterns from colony history

#### Required insight types

- growth trend summary
- care consistency summary
- feeding pattern summary
- reminder completion summary
- anomaly detection
- health-risk style alerts

#### Example triggers

- repeated missed tasks
- no brood evolution for unusual period
- visible colony decline
- mismatch between environment and species expectations
- repeated issues concentrated in one map zone

### 8.13 Sensors and Environment Module

#### Responsibilities

- display and associate environmental sensor data

#### Required user actions

- connect sensor source
- map sensor source to colony or nest
- map sensor source to zone
- view current values
- view historical values
- receive value-based alerts

#### Minimum supported value categories

- temperature
- humidity

#### Required history behavior

- sensor values must be recorded over time
- recorded history must be readable in the web interface
- recorded history must be usable for AI analysis
- recorded history must be readable in LLM-compatible workflows

### 8.14 Automation Connector Module

#### Responsibilities

- connect the application to external domotic systems

#### Required named connector targets

- Home Assistant
- Jeedom
- Domoticz

#### Required user-facing capabilities

- connect integration
- inspect connection status
- map devices or sensors
- map devices, sensors, or actions to zones
- define automation-related colony context

#### Supported automation concepts

- heating
- humidity control
- lighting schedules
- ventilation
- refill alerts

### 8.15 LLM Integration Module

#### Responsibilities

- allow `Antai` data and actions to be exposed to LLM ecosystems

#### Required integration targets

- ChatGPT graphical integration
- Gemini graphical integration
- Claude graphical integration
- CLI-driven LLM use

#### Required behaviors

- colony data must be readable from supported LLM workflows
- reminder data must be readable from supported LLM workflows
- care-sheet data must be readable from supported LLM workflows
- stored AI results must be readable from supported LLM workflows
- sensor and automation context should be readable when available
- map and zone data must be readable from supported LLM workflows
- recorded sensor history must be readable from supported LLM workflows

#### Output expectations

- responses must remain understandable in graphical chat interfaces
- responses must remain usable in CLI workflows
- the same core information must be accessible regardless of interface mode

#### LLM Workflow Mechanism

To ensure maximum interoperability with LLMs without requiring API keys or backend integrations, the application must support a universal export/prompt/import workflow on every page and form (excluding authentication views like login and register).

- **Download Phase:** Any view must allow downloading an `antai.ai.context/v1` JSON context file. This file contains the relevant context for the current view (e.g., active colony data, recent events, sensor history, schema template, and LLM instructions).
- **Prompt Phase:** The view must provide an "AI Action Bar" or similar mechanism with a "Copy Prompt" action. This copies a view-specific, prepared markdown prompt that instructs the LLM on what to analyze and explicitly requests a structured JSON response matching the import schema. The user pastes this prompt along with the downloaded context file into their preferred LLM (ChatGPT, Gemini, Claude, etc.).
- **Upload Phase:** The user downloads or copies the JSON response from the LLM and uploads it back into the application via an "Upload Result" action on the same page/form. The application parses and applies the structural changes (e.g., updating colony notes, creating reminders, adding journal entries).

#### File Format Standards

- **Context Export Format (`antai.ai.context/v1`):**
  - Must include `schemaVersion: "antai.ai.context/v1"`.
  - Must contain the full required data context for the active view (e.g., `project`, `selectedColony`, `speciesContext`, `reminders`, `recentEvents`).
  - Must include `aiImportInstructions` and the `aiImportSchema` template to instruct the LLM on the expected return format.
  - File extension: `.json`
- **Result Import Format (`antai.ai.result/v1`):**
  - Must include `schemaVersion: "antai.ai.result/v1"`.
  - Must include a `colonies` array containing objects with a `colonyRef` (matching by id or name).
  - Supported updates per colony include:
    - `updates`: Object containing scalar overwrites (`status`, `workerCount`) and appendable strings (`notesAppend`, `setupAppend`, `dietAppend`).
    - `remindersToCreate`: Array of objects (`title`, `dueDate`, `repeat`, `notes`).
    - `journalEntriesToCreate`: Array of objects (`type`, `dateTime`, `notes`, `workers`, `broodState`).
  - File extension: `.json`

#### Recommendations for Prompt Creation

- **Context-Aware:** Prompts must use template variables (e.g., `{{colonyName}}`, `{{speciesName}}`, `{{projectName}}`) to dynamically inject the active context into the prompt text before copying.
- **Clear Instructions:** The prompt must clearly state its goal (e.g., "Analyze recent sensor data and suggest a care plan").
- **Schema Enforcement:** The prompt must explicitly instruct the LLM to return a fenced \`\`\`json block that matches the `antai.ai.result/v1` schema provided in the context file.
- **Fallback Behavior:** Prompts should instruct the LLM to return an empty `colonies` array if no structured updates are necessary, rather than returning invalid or missing JSON.
- **Separation of Concerns:** Keep prompts focused on single tasks (e.g., "Colony Overview Auto-Fill" vs "Journal Entry Generator") to prevent overwhelming the LLM and to ensure predictable JSON outputs.

### 8.16 Swarm Map Module

#### Responsibilities

- allow users to report and browse sightings

#### Required fields

- date
- location
- note
- optional photo
- optional species

#### Required user actions

- create sighting
- browse sightings
- inspect sighting detail

### 8.17 News and Educational Content Module

#### Responsibilities

- surface useful antkeeping content

#### Required user actions

- browse content list
- open content item
- access featured content from dashboard or home area

#### Required content categories

- husbandry advice
- species behavior
- beginner guidance
- seasonal activity
- research or discoveries
- setup tips

## 9. Interface Specifications

### 9.1 Navigation

The main navigation must expose at least:

- dashboard
- colonies
- reminders
- species
- AI
- profile

Extended navigation may also include:

- sensors
- automation
- maps
- swarm map
- news

### 9.2 Device Adaptation

#### Smartphone

Must prioritize:

- quick colony updates
- reminders
- photo capture
- compact navigation

#### Tablet

Must prioritize:

- larger reading layouts
- side-by-side detail views where useful
- easier journal review

#### TV

Must support:

- passive dashboard view
- alerts view
- environment status view
- slideshow or visual review mode

#### Laptop and Desktop

Must prioritize:

- detailed management
- filtering
- reading of long content
- multi-panel workflows when useful

### 9.3 Shared Interface Rules

Across all devices, the UI must:

- keep the same core information model
- avoid hiding important colony state
- preserve readability
- stay easy to understand for beginners

## 10. Data Domain Specifications

The application data model must support the following main domains:

- user
- profile
- colony
- colony event
- reminder
- species
- care sheet
- photo/media
- colony map
- colony zone
- AI analysis result
- AI summary/result
- sensor source
- sensor reading
- automation connector
- sighting
- educational content

These domains must be organized so the same underlying information can be surfaced in:

- the web interface
- graphical LLM integrations
- CLI LLM integrations

## 11. Cross-Module Rules

The following behaviors must hold across the whole application:

- a colony can have many journal events
- a colony can have many reminders
- a colony can have many photos
- a colony can have many maps
- a map can have many zones
- AI outputs may reference colony, event, image, species, or sensor context
- sensor sources may be linked to colonies or nests
- sensor sources may also be linked to map zones
- the same user-owned data must remain accessible across supported interfaces

## 12. LLM and CLI Readability Rules

Data exposed to LLM integrations or CLI workflows must be:

- human-readable
- structured enough to support automation
- understandable outside the graphical interface

The system should expose colony-related information in a way that can be meaningfully consumed by:

- web UI users
- ChatGPT-like tools
- Claude-like tools
- Gemini-like tools
- CLI workflows

Important application information must not exist only as visual UI state.

Map and zone information must also remain readable outside the graphical map itself.

## 13. Non-Functional Product Constraints

### 13.1 Simplicity

Every module should be implemented in the simplest form that still satisfies the product goals.

### 13.2 Maintainability

The codebase must remain easy to understand and easy to modify.

### 13.3 GitHub Readability

Repository structure must remain clean and conventional.

### 13.4 Low Operational Burden

The application should avoid requiring heavy operational setup unless clearly necessary.

## 14. Development Priorities

### Priority 1

- authentication
- profile
- colonies
- journal
- reminders
- species and care sheets
- dashboard
- responsive web UI

### Priority 2

- AI assistant
- AI image analysis
- smart insights

### Priority 3

- sensor monitoring
- automation connectors
- LLM integrations

### Priority 4

- swarm map
- news
- community extensions

## 15. Acceptance Direction

The application will satisfy this specification when:

- a user can manage colonies end-to-end from the web interface
- a user can maintain colony history and reminders
- a user can consult care sheets
- the interface remains usable across targeted device classes
- AI features can use stored colony context meaningfully
- sensor and automation features can be attached to colony workflows
- the same useful data can be read from web and LLM/CLI contexts
- installation and maintenance remain lightweight and simple
