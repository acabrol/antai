# Antai Roadmap

## 1. Purpose

This roadmap describes a realistic phased path to build `Antai` from the current documentation set.

It is based on:

- [REQUIREMENTS.md](/home/kalden/projects/antai/REQUIREMENTS.md)
- [SPECIFICATIONS.md](/home/kalden/projects/antai/SPECIFICATIONS.md)
- [DESIGN.md](/home/kalden/projects/antai/DESIGN.md)
- [ARCHITECTURE.md](/home/kalden/projects/antai/ARCHITECTURE.md)

## 2. Roadmap Principles

The roadmap must favor:

- fastest path to a usable product
- low complexity early
- stable foundations before advanced integrations
- visible progress
- simple deployment from the beginning

## 3. Milestone Overview

- Phase 0: Foundation and setup
- Phase 1: Core antkeeping product
- Phase 2: AI assistance
- Phase 3: Sensors and automation
- Phase 4: LLM interoperability
- Phase 5: Community and content expansion

## 4. Phase 0: Foundation and Setup

Goal:

- establish the project structure and minimal product shell

Deliverables:

- repository structure
- coding conventions
- base application shell
- navigation skeleton
- responsive layout foundation
- simple install/update workflow definition
- basic authentication flow structure

Exit condition:

- the project is runnable, documented, and easy to understand

## 5. Phase 1: Core Antkeeping Product

Goal:

- deliver a useful daily antkeeping application without advanced AI or automation

Deliverables:

- signup/login/profile
- colony list
- colony detail
- colony journal
- reminders
- species and care sheets
- dashboard
- photo upload and viewing
- colony maps and zone definition
- responsive multi-device web interface

Exit condition:

- a user can manage colonies end-to-end using only the web interface

## 6. Phase 2: AI Assistance

Goal:

- make colony history and photos more useful through AI

Deliverables:

- AI assistant
- colony summary generation
- recommendation generation
- warning/anomaly suggestions
- AI image analysis
- image-based ant count estimation
- species recognition assistance
- saved AI summaries
- zone-aware AI context

Exit condition:

- AI produces useful colony-aware outputs inside the application

## 7. Phase 3: Sensors and Automation

Goal:

- connect colony care with environmental monitoring

Deliverables:

- sensor model
- sensor history views
- temperature/humidity displays
- alerts from environmental thresholds
- colony-to-sensor mapping
- zone-to-sensor mapping
- first automation connector support
- first readable automation rules UI

Exit condition:

- a user can view environment data and act on it from colony context
- a user can associate environment data with specific map zones

## 8. Phase 4: LLM Interoperability

Goal:

- make `Antai` usable from external conversational and CLI-based AI tools

Deliverables:

- LLM-readable data access layer
- ChatGPT-compatible integration path
- Gemini-compatible integration path
- Claude-compatible integration path
- CLI-friendly access workflow
- readable structured outputs for colony, reminder, and AI data

Exit condition:

- core user data is accessible and useful from web and LLM workflows

## 9. Phase 5: Community and Content Expansion

Goal:

- expand beyond private colony management into discovery and sharing features

Deliverables:

- swarm map
- educational/news content area
- featured content workflows
- optional partner/resource area
- later community features if still aligned with simplicity goals

Exit condition:

- the product supports both private management and curated community-oriented value

## 10. Recommended Delivery Order Inside Each Phase

Within each phase, work should follow this order:

1. core data and business rules
2. usable screen flows
3. responsive behavior
4. integration or enhancement layer
5. polish and cleanup

## 11. Deferred Items

The following should stay explicitly deferred until clearly justified:

- complex moderation systems
- overly advanced social features
- heavy infrastructure requirements
- unnecessary microservice decomposition
- advanced automation features before basic sensor visibility is solid

## 12. Roadmap Success Criteria

The roadmap is successful when:

- each phase delivers a usable product increment
- complexity grows gradually
- documentation remains aligned with the actual product
- installation and maintenance remain simple across all phases
