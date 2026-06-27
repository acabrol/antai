---
key: reminder-planner
title: Care Reminder Planner
category: Colony Care
order: 22
summary: Propose upcoming care reminders based on colony status and species needs.
---

Focus on {{colonyName}} ({{speciesName}}).

Review overdue tasks, feeding cadence, seasonal needs, and colony health to generate care reminders via `remindersToCreate`. Each reminder requires:

- **title** — short description of the task.
- **dueDate** — ISO 8601 date for when the task is due.
- **repeat** — one of `none`, `daily`, `weekly`, `biweekly`, or `monthly`.
- **notes** — additional context or instructions for the task.

Consider hibernation schedules, feeding frequency, humidity checks, and nest inspections appropriate for {{speciesName}}. Space reminders sensibly so they do not cluster on the same day.

Return a fenced `json` block containing a flat JSON object.
The structure of the response file schema must map the form field ID to the form value.
Look at the provided AI context file to see the list of fields to fulfill.
Make it a downloadable file.

