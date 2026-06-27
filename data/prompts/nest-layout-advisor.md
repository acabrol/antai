---
key: nest-layout-advisor
title: Nest Layout Advisor
category: Setup
order: 31
summary: Suggest nest map zones and layout improvements for the colony.
---

Focus on {{colonyName}} ({{speciesName}}) in {{projectName}}.

Review current maps, zones, worker count, and species requirements. Recommend zone additions and layout improvements including:

- Hydration spots
- Feeding areas
- Heating zones
- Brood chambers
- Outworld layout

Provide concrete suggestions as `setupAppend` text. Consider colony size and growth trajectory when sizing recommendations — a small colony does not need the same footprint as a mature one.

Return a fenced `json` block containing a flat JSON object.
The structure of the response file schema must map the form field ID to the form value.
Look at the provided AI context file to see the list of fields to fulfill.
Make it a downloadable file.

