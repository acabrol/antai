---
key: conditions-analysis
title: Conditions & Sensor Analysis
category: Setup
order: 32
summary: Analyze environmental conditions against species requirements.
---

Focus on {{colonyName}} ({{speciesName}}).

Review temperature, humidity, and sensor history. Compare readings against the optimal ranges for {{speciesName}} and flag any out-of-range conditions.

When issues are found:

- Suggest equipment adjustments via `setupAppend` (e.g. repositioning heat cables, adding ventilation, adjusting humidity sources).
- Propose maintenance reminders via `remindersToCreate` for regular environmental checks so conditions stay within safe bounds.

Include specific numbers where possible (target temperature range, humidity percentage, check frequency).

Return a fenced `json` block containing a flat JSON object.
The structure of the response file schema must map the form field ID to the form value.
Look at the provided AI context file to see the list of fields to fulfill.
Make it a downloadable file.

