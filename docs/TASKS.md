# Antai Tasks

## 1. Purpose

This document breaks the current `Antai` scope into implementation tasks.

It is intended as a practical execution checklist and should evolve with development.

## 2. Phase 0: Project Foundation

- Create base repository structure.
- Add root documentation links and update the main README.
- Define the application module layout.
- Define naming conventions.
- Define minimal local development workflow.
- Define minimal deployment workflow.
- Establish responsive layout shell.
- Establish navigation shell.

## 3. Phase 1: Core Product

### 3.1 Authentication

- Implement signup flow.
- Implement login flow.
- Implement logout flow.
- Implement email verification flow.
- Implement profile page.
- Implement newsletter preference handling.
- Add optional social login placeholder path.

### 3.2 Dashboard

- Build dashboard layout.
- Add colony overview widget.
- Add upcoming reminders widget.
- Add overdue reminders widget.
- Add recent activity widget.
- Add AI entry shortcut.

### 3.3 Colonies

- Implement colony list page.
- Implement create colony flow.
- Implement edit colony flow.
- Implement archive colony flow.
- Implement colony detail page.
- Add colony status presentation.
- Add quick summary fields.

### 3.4 Colony Journal

- Implement journal data model.
- Implement journal list/timeline view.
- Implement add event flow.
- Implement edit event flow.
- Add event filtering.
- Add event search.

### 3.5 Reminders

- Implement reminder data model.
- Implement reminder list views.
- Implement create reminder flow.
- Implement complete reminder action.
- Implement snooze reminder action.
- Implement overdue reminder state.

### 3.6 Species and Care Sheets

- Implement species list view.
- Implement species search.
- Implement species detail view.
- Implement favorite/save feature.
- Support unknown species fallback.

### 3.7 Photos

- Implement photo upload flow.
- Implement video upload flow.
- Implement colony photo gallery.
- Implement event photo gallery.
- Implement downloadable media actions.
- Implement video playlist support.
- Implement image detail view.

### 3.8 Colony Maps

- Define colony map data model.
- Define colony zone data model.
- Implement colony map list and detail flow.
- Implement create map flow.
- Implement zone creation and editing flow.
- Implement zone visual placement flow.
- Implement zone detail view.
- Implement linking galleries to zones.
- Implement linking playlists to zones.

### 3.9 Responsive UX

- Validate smartphone layout.
- Validate tablet layout.
- Validate laptop/desktop layout.
- Add TV-friendly passive dashboard mode baseline.

## 4. Phase 2: AI Features

### 4.1 AI Assistant

- Define AI assistant interaction model.
- Implement colony-context prompt building.
- Implement zone-context prompt building.
- Implement AI assistant screen.
- Implement suggested prompts.
- Implement response rendering blocks.
- Add save summary action.
- Add create reminder from AI action.
- Add add note from AI action.

### 4.2 AI Image Analysis

- Define image analysis input flow.
- Implement analysis request flow.
- Implement species recognition result view.
- Implement ant count result view.
- Implement brood detection result view.
- Implement setup issue suggestion view.
- Add saved analysis results storage.

### 4.3 Smart Insights

- Implement growth summary logic.
- Implement care consistency summary logic.
- Implement reminder completion summary logic.
- Implement anomaly detection rules baseline.
- Surface insights on colony detail and dashboard.

## 5. Phase 3: Sensors and Automation

### 5.1 Sensors

- Define sensor source model.
- Define sensor reading model.
- Implement sensor connection UI.
- Implement sensor-to-colony mapping UI.
- Implement sensor-to-zone mapping UI.
- Implement current values display.
- Implement historical trend display.
- Implement persistent sensor history recording.
- Implement threshold alert display.

### 5.2 Automation

- Define automation connector model.
- Add connector status view.
- Add Home Assistant integration placeholder and workflow.
- Add Jeedom integration placeholder and workflow.
- Add Domoticz integration placeholder and workflow.
- Implement readable automation rule UI.
- Implement zone-linked automation mapping.

### 5.3 Environment Intelligence

- Combine species expectations with sensor values.
- Surface environment mismatch warnings.
- Add AI/environment recommendation entry point.
- Surface zone-specific environment warnings.

## 6. Phase 4: LLM Interoperability

- Define LLM-readable data access layer.
- Define stable colony summary format.
- Define stable reminder summary format.
- Define stable species/care sheet format.
- Define stable AI result format.
- Define stable sensor summary format.
- Define stable map and zone summary format.
- Support graphical conversational integration path.
- Support CLI-oriented integration path.
- Validate that core data stays readable outside the GUI.

## 7. Phase 5: Community and Content

### 7.1 Swarm Map

- Define sighting model.
- Implement add sighting flow.
- Implement sightings list.
- Implement sightings map view.
- Implement sighting detail view.

### 7.2 News and Content

- Define article/content model.
- Implement content list.
- Implement content detail page.
- Implement featured content block.

### 7.3 Community Extensions

- Evaluate partner/resource presentation.
- Evaluate public showcase concept.
- Defer direct messaging unless still aligned with simplicity goals.

## 8. Cross-Cutting Tasks

- Keep all major data readable in the web UI and LLM contexts.
- Keep the install/update path lightweight.
- Keep the repository structure clean and conventional.
- Add tests for core user flows.
- Add tests for AI and integration boundaries where practical.
- Review all features against simplicity constraints before merging.

## 9. Immediate Recommended Next Tasks

- Finalize tech stack choices in line with simplicity constraints.
- Scaffold the repository and application shell.
- Implement authentication and profile baseline.
- Implement colony list and colony detail baseline.
- Implement journal and reminders baseline.
- Add species/care sheet baseline.
- Add initial responsive layout validation.
