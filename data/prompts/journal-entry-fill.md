---
key: journal-entry-fill
title: Journal Entry Generator
category: Colony Care
order: 21
summary: Generate journal observations from colony context data.
---

Focus on {{colonyName}}.

Analyze recent activity, sensor readings, and colony state to generate a batch of journal entries using `journalEntriesToCreate`. Each entry requires:

- **type** — one of `observation`, `feeding`, `cleaning`, `health`, `migration`, `population`, or `setup`.
- **dateTime** — ISO 8601 timestamp for the entry.
- **notes** — descriptive text for the observation.
- **workers** — estimated worker count at the time of the entry.
- **broodState** — one of `none`, `eggs`, `larvae`, `pupae`, or `all`.

Prioritize entries that fill gaps in the existing journal history. Avoid duplicating events that are already recorded.

Return a fenced `json` block containing a flat JSON object.
The structure of the response file schema must map the form field ID to the form value.
Look at the provided AI context file to see the list of fields to fulfill.
Make it a downloadable file.

