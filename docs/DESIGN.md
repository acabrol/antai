# Antai Design

## 1. Purpose

This document describes the intended design of the `Antai` application based on:

- [REQUIREMENTS.md](/home/kalden/projects/antai/REQUIREMENTS.md)
- [SPECIFICATIONS.md](/home/kalden/projects/antai/SPECIFICATIONS.md)

It defines:

- product design direction
- information architecture
- navigation model
- screen hierarchy
- component patterns
- visual language
- responsive behavior
- AI, automation, and LLM interaction design

The goal is to make `Antai` feel simple, focused, calm, and useful for antkeepers of all experience levels.

## 2. Design Goals

The design must support the following goals:

- make colony management feel natural and low-friction
- keep important colony information readable at a glance
- reduce user effort for repetitive tracking tasks
- make AI features feel helpful, not intrusive
- make sensor and automation features understandable to non-expert users
- keep the whole experience visually clean and operationally simple

The design should not feel like:

- a generic dashboard template
- a cluttered admin panel
- an over-engineered smart-home console
- a chat app with ant features bolted on

## 3. Product Character

`Antai` should feel:

- calm
- practical
- reliable
- observant
- field-notebook inspired

The application should feel closer to:

- a structured antkeeping journal
- a colony control board
- a species handbook

than to:

- a social media platform
- a heavy enterprise tool

## 4. Visual Direction

### 4.1 Overall Look

The visual system should balance:

- natural tones inspired by nests, soil, bark, stone, glass, and humidity
- clean digital clarity for tracking and dashboards
- high readability for long-term daily use

The interface should avoid looking overly playful or toy-like.

It should also avoid harsh visual noise.

### 4.2 Color Direction

The palette should favor:

- earthy neutrals
- muted greens
- mineral grays
- warm sand or clay accents
- restrained signal colors for alerts and states

Suggested semantic usage:

- neutral surfaces for structure
- green for stable or healthy conditions
- amber for caution
- red for urgent alerts
- blue or teal for informational sensor states

Accent color use should remain controlled and purposeful.

### 4.3 Typography

Typography should be highly legible and calm.

The system should use:

- one primary text family optimized for interface reading
- one optional secondary family for headings or editorial content

The hierarchy should clearly distinguish:

- page title
- section title
- card title
- body text
- micro labels
- status labels

Long species and educational content must remain comfortable to read on laptop, tablet, and desktop.

### 4.4 Iconography

Icons should be:

- simple
- geometric
- clear at small sizes

Important icon groups include:

- colony
- queen
- worker count
- brood
- feeding
- cleaning
- reminder
- temperature
- humidity
- camera
- AI
- automation
- map
- article/news

Icons should support scanning, not replace text labels.

## 5. Information Architecture

The product structure should be centered around the user’s real workflow.

Primary top-level sections:

- Dashboard
- Colonies
- Reminders
- Species
- AI
- Profile

Secondary or extended sections:

- Maps
- Sensors
- Automation
- Swarm Map
- News

The structure should prioritize:

- everyday care actions first
- analysis second
- community and reading features third

## 6. Navigation Model

### 6.1 Core Navigation

The user must always be able to quickly reach:

- current colonies
- today’s reminders
- species information
- AI help

### 6.2 Navigation by Device

#### Smartphone

Use:

- bottom navigation or compact primary navigation
- one clear primary action per screen
- sticky quick actions where useful

Priority mobile actions:

- add colony event
- complete reminder
- capture photo
- ask AI about current colony

#### Tablet

Use:

- side navigation or hybrid side-plus-top navigation
- more visible shortcuts
- split-view patterns when helpful

#### Laptop and Desktop

Use:

- persistent left navigation
- top utility bar for search, profile, notifications, and AI entry
- room for secondary panels

#### TV

Use:

- simplified large-target navigation
- dashboard-first view
- alert and environment display focus

## 7. Core Screen Design

### 7.1 Landing / Entry Screen

Purpose:

- explain what `Antai` does
- make signup and login obvious
- present simplicity and major capabilities clearly

Content blocks:

- short product promise
- colony management value
- AI value
- automation value
- device compatibility
- simple install message

### 7.2 Dashboard Screen

Purpose:

- show what matters now

Layout sections:

- colony overview
- due and overdue reminders
- recent colony activity
- quick AI actions
- quick species access
- optional sensor alerts
- optional environmental summary

Design rules:

- the most urgent information must appear first
- dashboard cards must be readable in isolation
- each card must lead to a deeper screen

### 7.3 Colony List Screen

Purpose:

- help users scan all colonies quickly

Each colony card or row should show:

- colony name
- species
- status
- queen count if useful
- most recent event or reminder indicator
- environment alert indicator if connected

Available list behaviors:

- search
- filtering
- sorting
- archive toggle

### 7.4 Colony Detail Screen

Purpose:

- serve as the central workspace for one colony

The colony detail page should include:

- colony identity header
- summary metrics
- current care state
- latest photos
- next reminders
- quick add actions
- AI assistant entry
- optional sensor summary

Recommended structure:

- header
- summary strip
- tabs or stacked sections

Suggested sections:

- Overview
- Journal
- Reminders
- Photos
- Maps
- Insights
- Environment

### 7.5 Colony Journal Screen

Purpose:

- present a readable chronological history

Design pattern:

- event timeline
- filter bar
- search
- date grouping

Each event card should show:

- event type
- date/time
- short note preview
- optional image preview
- optional structured values such as worker count or brood note

The add-event flow should be fast and optimized for repeated use.

### 7.6 Reminder Screen

Purpose:

- help users manage care routines without cognitive overload

Primary views:

- today
- upcoming
- overdue
- completed

Each reminder item should show:

- title
- linked colony if any
- due time
- repeat status
- quick complete action
- snooze action

### 7.7 Species Screen

Purpose:

- provide a knowledge base that feels readable and trustworthy

Views should include:

- species list
- search
- filters
- species detail

The species detail design should balance:

- structured values
- descriptive advice
- practical interpretation

### 7.8 Photo and Media Screen

Purpose:

- make visual documentation useful, not buried

Views should support:

- gallery by colony
- gallery by timeline
- image detail
- AI analysis result display
- comparison mode for older and newer images
- zone-linked gallery display
- playlist display for videos

### 7.9 Colony Map Screen

Purpose:

- provide a visual model of the colony setup or nest

The map screen should allow users to:

- see the colony map
- identify named zones
- open a zone detail
- understand which sensors, cameras, or actions belong to each zone
- navigate from a zone to linked gallery or playlist content

Recommended layout:

- main visual map area
- zone overlay layer
- zone list or legend
- contextual side panel or drawer

### 7.10 Zone Detail Screen

Purpose:

- centralize everything known about one zone

The zone detail view should include:

- zone name
- zone description
- linked media
- linked playlists
- linked sensor values
- linked camera stream when available
- linked automation actions when available
- recent zone history

## 8. AI Experience Design

### 8.1 AI Entry Points

AI should be accessible from:

- global navigation
- dashboard shortcuts
- colony detail screen
- zone detail screen
- photo analysis actions
- LLM integration surface

The user should never wonder:

- what AI knows
- what context is being used
- whether the answer is based on one colony or all colonies

### 8.2 AI Assistant Screen

The AI assistant should behave like a contextual colony advisor, not a generic chatbot.

The interface should make clear:

- current scope
- referenced colony
- referenced zone when relevant
- recent relevant context
- suggested questions

Recommended assistant layout:

- context header
- question input
- suggested prompts
- response area
- structured action summary

### 8.3 AI Response Format

AI responses should be easy to scan.

Preferred response structure:

- short conclusion
- key observations
- practical recommendation
- caution or uncertainty note when needed

When possible, the UI should provide:

- a save summary action
- create reminder from advice
- add note to colony
- compare with species guidance

### 8.4 AI Image Analysis UX

Photo analysis should be initiated from:

- upload flow
- image detail screen
- colony detail quick actions

Results should be displayed as:

- analysis summary
- detected clues
- estimated values
- confidence or uncertainty guidance
- next suggested action

The design must avoid overstating certainty.

## 9. Sensor and Automation Experience Design

### 9.1 Sensor Overview

Sensor information should feel integrated into colony care, not isolated in a technical panel.

The user should be able to see:

- current temperature
- current humidity
- recent trend
- expected range for species
- active warning state
- zone association when values come from a mapped area

### 9.2 Environment Section

The colony environment area should combine:

- live values
- short history
- species expectations
- AI/environment recommendations

This screen should answer:

- Is the nest environment stable?
- Is it appropriate for this species?
- Did colony behavior change after environmental change?
- Which zone is the source of the issue?

### 9.3 Automation Screen

Automation must be presented in plain language.

Avoid exposing raw technical concepts as the primary user language.

Instead of system-first wording, prefer care-first wording such as:

- keep heating within target range
- alert me when humidity drops
- remind me if water refill is needed

The automation design should support:

- connection status
- mapped devices
- linked colony
- linked map zones
- readable automation rules

## 10. LLM Integration Design

### 10.1 Multi-Surface Consistency

The same product information should remain understandable in:

- `Antai` web interface
- ChatGPT-style integrations
- Gemini-style integrations
- Claude-style integrations
- CLI-based LLM workflows

### 10.2 LLM-Oriented Presentation

The design must assume that some users will interact through conversation or command line instead of normal screens.

This means the product should preserve:

- explicit labels
- readable entity names
- clean summaries
- clear field meanings

Important information must not depend only on:

- color
- visual grouping without labels
- hidden hover states

Map and zone data should remain understandable even outside the graphical map itself.

### 10.3 Conversational Integration Model

LLM integrations should feel like:

- a companion view into the same data
- not a separate product with different meanings

A user asking about a colony in a graphical AI interface or through CLI should receive:

- the same colony identity
- the same relevant history
- the same core recommendations

## 11. Knowledge and Community Design

### 11.1 Swarm Map

The map experience should remain simple and readable.

Key views:

- map with sightings
- list alternative
- sighting detail
- add sighting form

The design should support both:

- geographic browsing
- non-map browsing for users who prefer list views

### 11.2 News and Educational Content

Educational content should feel editorial, calm, and readable.

The design should support:

- card lists
- article pages
- featured content panels
- strong readability for long text

This area should visually differ from colony-management screens without feeling disconnected.

## 12. Responsive and Adaptive Behavior

### 12.1 Smartphone

Design priorities:

- fast capture
- fast updates
- task completion
- low-friction navigation

### 12.2 Tablet

Design priorities:

- richer detail views
- better reading
- split layouts where useful
- map plus side-panel layouts

### 12.3 TV

Design priorities:

- large typography
- high contrast
- simplified navigation
- passive monitoring

Best TV modes:

- dashboard
- sensor board
- alert display
- colony slideshow

### 12.4 Laptop and Desktop

Design priorities:

- dense but readable information
- efficient filtering
- analysis workflows
- editing comfort

## 13. Design System Rules

The design system should provide:

- consistent spacing
- consistent cards
- consistent form patterns
- consistent alert patterns
- consistent tags and status labels
- consistent empty states
- consistent AI response blocks

### Required reusable component families

- navigation
- page headers
- cards
- lists
- filters
- tabs
- timeline items
- reminder items
- media gallery items
- media playlist items
- map canvas
- zone overlays
- zone legends
- environment metric cards
- AI answer blocks
- status badges
- alert banners
- modal/dialog patterns

## 14. Content Design Rules

Language in the interface should be:

- plain
- practical
- direct
- low-jargon by default

Technical language should only appear when useful for advanced users.

The product should prefer:

- clear labels
- short explanations
- context-sensitive guidance

AI and automation features must not read like engineering dashboards unless the user explicitly enters a more advanced context.

## 15. Empty States and Onboarding

Empty states are important because many users will begin with no data.

The design must include helpful empty states for:

- no colonies
- no reminders
- no events
- no species favorites
- no sensor connections
- no automation rules
- no saved AI summaries

Each empty state should help the user understand:

- what this area is for
- what to do next
- why it matters

## 16. Error and Alert Design

Alerts should be prioritized by impact.

Alert categories:

- informational
- caution
- urgent

Possible alert sources:

- overdue care tasks
- environmental mismatch
- automation issue
- AI-detected anomaly
- missing verification or connection issue

Alerts must remain readable and actionable.

## 17. Accessibility and Readability

The design must support:

- strong text readability
- keyboard-friendly navigation on desktop
- touch-friendly interaction on mobile and tablet
- large-target interaction for TV-like use
- status communication that does not rely only on color

## 18. Design Acceptance Direction

The design will satisfy this document when:

- a beginner can understand the main workflow without training
- an experienced antkeeper can manage multiple colonies efficiently
- the dashboard surfaces what matters first
- AI feels contextual and useful
- sensor and automation features feel understandable
- all major data remains readable in both web and LLM contexts
- the application feels calm, focused, and easy to manage
- the design supports the project goal of maximum simplicity with meaningful power
