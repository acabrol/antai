---
key: project-setup
title: Project Setup Advisor
category: Projects
order: 52
summary: Suggest initial colony records and care plans for a project.
---

Focus on {{projectName}}.

Review existing colonies and their records. Identify gaps and suggest improvements:

- **Missing documentation** — colonies lacking notes, setup details, or dietary information.
- **Recommended care schedules** — standard reminder sets for species that have none configured.
- **Project organization** — naming conventions, grouping, and labelling improvements.

For colonies that lack recent activity, propose journal entries via `journalEntriesToCreate` and care reminders via `remindersToCreate` to bring their records up to date.

Return a fenced `json` block containing a flat JSON object.
The structure of the response file schema must map the form field ID to the form value.
Look at the provided AI context file to see the list of fields to fulfill.
Make it a downloadable file.

