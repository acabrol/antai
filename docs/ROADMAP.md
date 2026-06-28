# Antai Roadmap

## 1. Purpose

This roadmap starts from the current implemented application state rather than from an empty scaffold.

It should be read together with:

- [ARCHITECTURE.md](/home/kalden/projects/antai/docs/ARCHITECTURE.md)
- [SPECIFICATIONS.md](/home/kalden/projects/antai/docs/SPECIFICATIONS.md)
- [TASKS.md](/home/kalden/projects/antai/docs/TASKS.md)

## 2. Current Baseline

The project already includes:

- a runnable Node.js server
- a responsive vanilla JS SPA
- local auth
- profile editing
- project and colony management
- colony events and reminders
- species pages
- colony maps and zones
- colony photo uploads
- swarm sightings
- news feed management
- public project/colony pages
- in-app AI assistant workflows

## 3. Near-Term Roadmap

### Phase 1: Solidify the Current Product

Focus:

- reduce ambiguity between implemented and planned features
- harden current workflows
- improve data consistency and UX polish
- add tests around core flows

### Phase 2: Complete Missing Core Features

Focus:

- close obvious gaps in the current core product
- decide whether currently partial modules should be expanded or simplified

Candidate items:

- better public/private publishing controls
- stronger photo management UX
- refinement of maps and zone workflows
- more complete AI settings and output handling

### Phase 3: Expand Deferred Features

Focus:

- implement selectively from the deferred backlog in [TASKS.md](/home/kalden/projects/antai/docs/TASKS.md)

Candidate areas:

- email verification
- social login
- richer sensor support
- automation connectors
- external LLM integration surfaces
- video workflows

## 4. Roadmap Principles

Prioritize work that:

- improves the current shipped experience
- keeps deployment simple
- preserves readable repository-backed data
- avoids adding infrastructure without clear value

## 5. Explicitly Deferred

The following areas should remain roadmap items only until intentionally developed:

- TV mode
- moderation and community role systems
- broad social features
- heavy infrastructure decomposition
